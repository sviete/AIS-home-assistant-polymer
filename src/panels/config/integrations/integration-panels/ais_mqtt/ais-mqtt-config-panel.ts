import "@material/mwc-list/mwc-list-item";
import "../../../../../components/ha-button-menu";
import "@material/mwc-button";
import "@polymer/paper-input/paper-input";
import { css, CSSResultArray, html, LitElement, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators";
import "../../../../../components/ha-card";
import "../../../../../components/ha-code-editor";
import {
  getConfigEntries,
  reloadConfigEntry,
} from "../../../../../data/config_entries";
import { showOptionsFlowDialog } from "../../../../../dialogs/config-flow/show-dialog-options-flow";
import "../../../../../layouts/hass-subpage";
import { haStyle } from "../../../../../resources/styles";
import { HomeAssistant } from "../../../../../types";
import { showAlertDialog } from "../../../../../dialogs/generic/show-dialog-box";
import {
  showAisFileDialog,
  HaAisFileDialogParams,
} from "../../../../../dialogs/ais-files/show-dialog-ais-file";
import { mdiDotsVertical } from "@mdi/js";

@customElement("ais-mqtt-config-panel")
class HaPanelDevAisMqtt extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  protected firstUpdated() {}

  protected render(): TemplateResult {
    return html`
      <hass-subpage .hass=${this.hass}>
        <ha-button-menu corner="BOTTOM_START" slot="toolbar-icon">
          <mwc-icon-button slot="trigger" alt="menu">
            <ha-svg-icon .path=${mdiDotsVertical}></ha-svg-icon>
          </mwc-icon-button>
          <mwc-list-item @click=${this._openMosquittoFile}>
            Edit MQTT supla.conf
          </mwc-list-item>
          <mwc-list-item @click=${this._restartMosquittoService}>
            Restart MQTT sevice
          </mwc-list-item>
        </ha-button-menu>
        <div class="content">
          <ha-card header="Ustawienia SUPLA MQTT">
            <ha-dialog> </ha-dialog>
            <div class="card-actions">
              <mwc-button @click=${this._openOptionFlow}
                >Dane połączenia
              </mwc-button>
              <mwc-button @click=${this._reloadIntegration}
                >Wczytaj ponownie
              </mwc-button>
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

  private async _reloadIntegration() {
    const searchParams = new URLSearchParams(window.location.search);
    if (!searchParams.has("config_entry")) {
      // eslint-disable-next-line no-console
      console.log("No config_entry");
    } else {
      await reloadConfigEntry(
        this.hass,
        searchParams.get("config_entry") || ""
      );
      showAlertDialog(this, {
        text: "OK. Integracja została ponownie wczytana.",
      });
    }
  }

  private async _openMosquittoFile() {
    const filePath =
      "/data/data/pl.sviete.dom/files/usr/etc/mosquitto/mqtt_conf.d/supla.conf";
    const file = await this.hass.callApi<string>("POST", "ais_file/read", {
      filePath: filePath,
    });
    const fileParams: HaAisFileDialogParams = {
      dialogTitle: "MQTT mosquitto.conf",
      filePath: filePath,
      fileBody: file,
      readonly: false,
    };
    showAisFileDialog(this, fileParams);
  }

  private async _restartMosquittoService() {
    this.hass.callService("ais_shell_command", "restart_pm2_service", {
      service: "mqtt",
    });
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
