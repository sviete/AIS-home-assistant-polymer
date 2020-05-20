import {
  LitElement,
  TemplateResult,
  html,
  property,
  customElement,
  css,
  CSSResult,
} from "lit-element";
import { classMap } from "lit-html/directives/class-map";

import { HomeAssistant } from "../../../../types";

import "../../../../components/entity/state-badge";

import "@polymer/paper-item/paper-item";
import "@polymer/paper-item/paper-icon-item";
import "@polymer/paper-item/paper-item-body";

import "../../../../components/ha-card";
import "../../../../components/ha-icon";
import "../../../../components/ha-switch";
import { fireEvent } from "../../../../common/dom/fire_event";
import { computeDomain } from "../../../../common/entity/compute_domain";
import { domainIcon } from "../../../../common/entity/domain_icon";
// tslint:disable-next-line
import { EntityRegistryStateEntry } from "../ha-config-ais-dom-device-page";
import { showConfirmationDialog } from "../../../../dialogs/generic/show-dialog-box";

@customElement("ha-ais-dom-device-entities-card")
export class HaDeviceEntitiesCard extends LitElement {
  @property() public hass!: HomeAssistant;
  @property() public deviceId!: string;
  @property() public entities!: EntityRegistryStateEntry[];
  @property() public narrow!: boolean;
  @property() private _showDisabled = false;

  protected render(): TemplateResult {
    return html`
      <ha-card>
        ${this.entities.length
          ? this.entities.map((entry: EntityRegistryStateEntry) => {
              if (!this._showDisabled && entry.disabled_by) {
                return "";
              }
              const stateObj = this.hass.states[entry.entity_id];
              const platform = entry.platform;
              return html`
                <paper-icon-item
                  .entry=${entry}
                  class=${classMap({ "disabled-entry": !!entry.disabled_by })}
                >
                  ${stateObj
                    ? html`
                        <state-badge
                          @click=${this._openMoreInfo}
                          .stateObj=${stateObj}
                          slot="item-icon"
                        ></state-badge>
                      `
                    : html`
                        <ha-icon
                          slot="item-icon"
                          .icon=${domainIcon(computeDomain(entry.entity_id))}
                        ></ha-icon>
                      `}
                  <paper-item-body two-line @click=${this._openMoreInfo}>
                    <div class="name">${entry.stateName}</div>
                    <div class="secondary entity-id">${entry.entity_id}</div>
                  </paper-item-body>
                  <div class="buttons">
                    ${stateObj
                      ? html`
                          <ha-icon-button
                            @click=${this._openMoreInfo}
                            icon="hass:information-outline"
                          ></ha-icon-button>
                        `
                      : ""}
                    ${platform !== "ais_drives_service"
                      ? html`
                          <ha-icon-button
                            @click=${this._confirmDeleteEntry}
                            icon="hass:delete"
                          ></ha-icon-button>
                        `
                      : ""}
                  </div>
                </paper-icon-item>
              `;
            })
          : html`
              <div class="config-entry-row">
                <paper-item-body two-line>
                  <div>
                    ${this.hass.localize(
                      "ui.panel.config.devices.entities.none"
                    )}
                  </div>
                </paper-item-body>
              </div>
            `}
      </ha-card>
    `;
  }

  private _confirmDeleteEntry(ev: MouseEvent): void {
    const entry = (ev.currentTarget! as any).closest("paper-icon-item").entry;
    showConfirmationDialog(this, {
      title: "Usuwanie encji z systemu",
      text: "Czy na pewno usunąć tę pozycję?",
      confirm: () => this._deleteEntry(entry),
    });
  }

  private _deleteEntry(_entry): void {
    this.hass.callService("ais_dom_device", "remove_ais_dom_entity", {
      entity_id: _entry.entity_id,
    });
  }

  private _openMoreInfo(ev: MouseEvent) {
    const entry = (ev.currentTarget! as any).closest("paper-icon-item").entry;
    fireEvent(this, "hass-more-info", { entityId: entry.entity_id });
  }

  static get styles(): CSSResult {
    return css`
      ha-icon {
        width: 40px;
      }
      .entity-id {
        color: var(--secondary-text-color);
      }
      .buttons {
        text-align: right;
        margin: 0 0 0 8px;
      }
      .disabled-entry {
        color: var(--secondary-text-color);
      }
      state-badge {
        cursor: pointer;
      }
      paper-icon-item:not(.disabled-entry) paper-item-body {
        cursor: pointer;
      }
    `;
  }
}
