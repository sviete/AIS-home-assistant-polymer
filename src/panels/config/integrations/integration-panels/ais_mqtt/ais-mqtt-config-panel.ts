import "@material/mwc-list/mwc-list-item";
import "../../../../../components/ha-button-menu";
import "@material/mwc-button";
import "@polymer/paper-input/paper-input";
import {
  css,
  CSSResultArray,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from "lit-element";
import "../../../../../components/ha-card";
import "../../../../../components/ha-code-editor";
import { getConfigEntries } from "../../../../../data/config_entries";
import { showOptionsFlowDialog } from "../../../../../dialogs/config-flow/show-dialog-options-flow";
import "../../../../../layouts/hass-subpage";
import { haStyle } from "../../../../../resources/styles";
import { HomeAssistant } from "../../../../../types";

@customElement("ais-mqtt-config-panel")
class HaPanelDevAisMqtt extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  protected firstUpdated() {}

  protected render(): TemplateResult {
    return html`
      <hass-subpage .hass=${this.hass}>
        <div class="content">
          <ha-card header="Ustawienia SUPLA MQTT">
            <div class="card-actions">
              <mwc-button @click=${this._openOptionFlow}
                >Dane połączenia</mwc-button
              >
            </div>
          </ha-card>
        </div>
      </hass-subpage>
    `;
  }

  private async _openOptionFlow() {
    const searchParams = new URLSearchParams(window.location.search);
    if (!searchParams.has("config_entry")) {
      return;
    }
    const configEntryId = searchParams.get("config_entry") as string;
    const configEntries = await getConfigEntries(this.hass);
    const configEntry = configEntries.find(
      (entry) => entry.entry_id === configEntryId
    );
    showOptionsFlowDialog(this, configEntry!);
  }

  static get styles(): CSSResultArray {
    return [
      haStyle,
      css`
        :host {
          -ms-user-select: initial;
          -webkit-user-select: initial;
          -moz-user-select: initial;
        }

        .content {
          padding: 24px 0 32px;
          max-width: 600px;
          margin: 0 auto;
          direction: ltr;
        }
        ha-card:first-child {
          margin-bottom: 16px;
        }
        mqtt-subscribe-card {
          display: block;
          margin: 16px auto;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ais-mqtt-config-panel": HaPanelDevAisMqtt;
  }
}
