import "../../components/data-table/ha-data-table";
import "../../components/ha-card";
import "../../components/ha-menu-button";
import "@material/mwc-icon-button";
import {
  mdiHistory,
  mdiInformationOutline,
  mdiPencil,
  mdiPlus,
  mdiElectricSwitch,
} from "@mdi/js";
import "@polymer/paper-tooltip/paper-tooltip";
import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
  PropertyValues,
} from "lit-element";
import "@polymer/polymer/lib/elements/dom-repeat";
import { fireEvent } from "../../common/dom/fire_event";
import { navigate } from "../../common/navigate";
import "../../components/entity/ha-entity-toggle";
import "../../components/ha-fab";
import "../../components/ha-svg-icon";
import "../../components/ha-button-related-filter-menu";
import { triggerAutomationActions } from "../../data/automation";
import { haStyle } from "../../resources/styles";
import { computeStateDomain } from "../../common/entity/compute_state_domain";
import { HomeAssistant } from "../../types";
import {
  DataTableColumnContainer,
  DataTableRowData,
} from "../../components/data-table/ha-data-table";
import { formatDateTime } from "../../common/datetime/format_date_time";
import memoizeOne from "memoize-one";
import { HassEntityBase } from "home-assistant-js-websocket";
import { HaCheckbox } from "../../components/ha-checkbox";

export interface AutomationRowData extends DataTableRowData {
  id: string;
  name: string;
  last_triggered: string;
  entity: HassEntityBase;
}

@customElement("ha-panel-aisttsauto")
class HaPanelAisTtsAuto extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public isWide!: boolean;

  @property({ type: Boolean }) public narrow!: boolean;

  private _columns = memoizeOne(
    (narrow: boolean, _locale): DataTableColumnContainer => {
      const columns: DataTableColumnContainer = {
        toggle: {
          title: html`&nbsp;&nbsp;&nbsp;&nbsp;<ha-svg-icon
              path=${mdiElectricSwitch}
            ></ha-svg-icon>`,
          type: "icon",
          template: (_toggle, automation: any) =>
            html`
              <ha-checkbox
                .key=${automation.id}
                .hass=${this.hass}
                @change=${this._handleRowCheckboxClick}
                .checked=${automation.entity.state === "on"}
              >
              </ha-checkbox>
            `,
        },
        name: {
          title: "Nazwa",
          sortable: true,
          filterable: true,
          direction: "asc",
          grows: true,
        },
      };

      if (!narrow) {
        columns.last_triggered = {
          sortable: true,
          width: "20%",
          title: this.hass.localize("ui.card.automation.last_triggered"),
          template: (last_triggered) => html`
            ${last_triggered
              ? formatDateTime(new Date(last_triggered), this.hass.locale)
              : this.hass.localize("ui.components.relative_time.never")}
          `,
        };
        columns.trigger = {
          title: html`
            <mwc-button style="visibility: hidden">
              ${this.hass.localize("ui.card.automation.trigger")}
            </mwc-button>
          `,
          width: "20%",
          template: (_info, automation: any) => html`
            <mwc-button
              .automation=${automation.entity}
              @click=${(ev) => this._runActions(ev)}
            >
              URUCHOM
            </mwc-button>
          `,
        };
      }

      if (this.hass.user!.is_admin) {
        columns.info = {
          title: "",
          type: "icon-button",
          template: (_info, automation) => html`
            <mwc-icon-button
              .automation=${automation.entity}
              @click=${this._showInfo}
              label="Info"
            >
              <ha-svg-icon .path=${mdiInformationOutline}></ha-svg-icon>
            </mwc-icon-button>
          `,
        };
        columns.trace = {
          title: "",
          type: "icon-button",
          template: (_info, automation: any) => html`
            <a
              href="/config/automation/trace/${automation.entity.attributes.id}"
            >
              <mwc-icon-button label="Ślad">
                <ha-svg-icon .path=${mdiHistory}></ha-svg-icon>
              </mwc-icon-button>
            </a>
          `,
        };
        columns.edit = {
          title: "",
          type: "icon-button",
          template: (_info, automation: any) => html`
            <a
              href="/config/automation/edit/${automation.entity.attributes.id}"
            >
              <mwc-icon-button label="Edit">
                <ha-svg-icon path=${mdiPencil}></ha-svg-icon>
              </mwc-icon-button>
            </a>
          `,
        };
      }
      return columns;
    }
  );

  protected firstUpdated(changedProps: PropertyValues): void {
    super.firstUpdated(changedProps);
  }

  private _get_automations(states) {
    const l_automation: AutomationRowData[] = [];
    Object.values(this.hass.states).forEach((entity) => {
      if (
        computeStateDomain(entity) === "automation" &&
        !entity.entity_id.startsWith("automation.ais_")
      ) {
        l_automation.push({
          id: entity.entity_id,
          name: entity.attributes.friendly_name,
          last_triggered: entity.attributes.last_triggered,
          entity: entity,
        });
      }
    });
    return l_automation;
  }

  protected render(): TemplateResult {
    return html`
      <ha-app-layout>
        <app-header slot="header" fixed>
          <app-toolbar>
            <ha-menu-button
              .hass=${this.hass}
              .narrow=${this.narrow}
            ></ha-menu-button>
            <div main-title>TTS Automatyczny</div>
            ${this.hass.user!.is_admin
              ? html`<ha-icon-button
                  label="Dodaj"
                  icon="hass:plus"
                  @click=${this._createNew}
                ></ha-icon-button>`
              : html``}
          </app-toolbar>
        </app-header>
        <ha-card class="content">
          <ha-data-table
            .columns=${this._columns(this.narrow, this.hass.locale)}
            .data=${this._get_automations(this.hass.states)}
            auto-height
            searchLabel="Szukaj"
            noDataText="Brak danych"
          ></ha-data-table>
        </ha-card>
      </ha-app-layout>
    `;
  }

  private _showInfo(ev) {
    ev.stopPropagation();
    const entityId = ev.currentTarget.automation.entity_id;
    fireEvent(this, "hass-more-info", { entityId });
  }

  private _runActions(ev) {
    const entityId = ev.currentTarget.automation.entity_id;
    triggerAutomationActions(this.hass, entityId);
  }

  private _createNew() {
    navigate(this, "/config/automation/edit/new");
  }

  private _handleRowCheckboxClick(ev: Event) {
    const key = (ev.currentTarget as any).key;
    const hass = (ev.currentTarget as any).hass;
    const checkbox = ev.currentTarget as HaCheckbox;
    let mode = "off";
    if (checkbox.checked) {
      mode = "on";
    }
    hass.callService("ais_tts", "change_auto_mode", {
      entity_id: key,
      change_to: mode,
    });
  }

  static get styles() {
    return [
      haStyle,
      css`
        ha-card.content {
          padding: 16px;
        }

        .has-header {
          padding-top: 0;
        }

        .checked span {
          color: var(--primary-color);
        }
        .content {
          padding-bottom: 32px;
          max-width: 94%;
          margin: 0 auto;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-panel-aisttsauto": HaPanelAisTtsAuto;
  }
}
