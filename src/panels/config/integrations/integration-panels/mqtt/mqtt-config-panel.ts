import "@material/mwc-list/mwc-list-item";
import "../../../../../components/ha-button-menu";
import "@material/mwc-button";
import "@polymer/paper-input/paper-input";
import {
  css,
  CSSResultArray,
  customElement,
  html,
  internalProperty,
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
import "./mqtt-subscribe-card";
import {
  showAisFileDialog,
  HaAisFileDialogParams,
} from "../../../../../dialogs/ais-files/show-dialog-ais-file";
import { mdiDotsVertical } from "@mdi/js";

@customElement("mqtt-config-panel")
class HaPanelDevMqtt extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @internalProperty() private topic = "";

  @internalProperty() private payload = "";

  private inited = false;

  protected firstUpdated() {
    if (localStorage && localStorage["panel-dev-mqtt-topic"]) {
      this.topic = localStorage["panel-dev-mqtt-topic"];
    }
    if (localStorage && localStorage["panel-dev-mqtt-payload"]) {
      this.payload = localStorage["panel-dev-mqtt-payload"];
    }
    this.inited = true;
  }

  protected render(): TemplateResult {
    return html`
      <hass-subpage .hass=${this.hass}>
        <ha-button-menu corner="BOTTOM_START" slot="toolbar-icon">
          <mwc-icon-button slot="trigger" alt="menu">
            <ha-svg-icon .path=${mdiDotsVertical}></ha-svg-icon>
          </mwc-icon-button>
          <mwc-list-item @click=${this._openMosquittoFile}>
            Edit mosquitto.conf
          </mwc-list-item>
          <mwc-list-item @click=${this._restartMosquittoService}>
            Restart mosquitto sevice
          </mwc-list-item>
        </ha-button-menu>
        <div class="content">
          <ha-card header="Ustawienia MQTT">
            <div class="card-actions">
              <mwc-button @click=${this._openOptionFlow}
                >Re-konfiguracja połączenia MQTT</mwc-button
              >
            </div>
          </ha-card>

          <ha-card
            header="${this.hass.localize(
              "ui.panel.config.mqtt.description_publish"
            )}"
          >
            <div class="card-content">
              <paper-input
                label="${this.hass.localize("ui.panel.config.mqtt.topic")}"
                .value=${this.topic}
                @value-changed=${this._handleTopic}
              ></paper-input>

              <p>
                ${this.hass.localize("ui.panel.config.mqtt.payload")}
              </p>
              <ha-code-editor
                mode="jinja2"
                .value="${this.payload}"
                @value-changed=${this._handlePayload}
              ></ha-code-editor>
            </div>
            <div class="card-actions">
              <mwc-button @click=${this._publish}
                >${this.hass.localize(
                  "ui.panel.config.mqtt.publish"
                )}</mwc-button
              >
            </div>
          </ha-card>

          <mqtt-subscribe-card .hass=${this.hass}></mqtt-subscribe-card>
        </div>
      </hass-subpage>
    `;
  }

  private _handleTopic(ev: CustomEvent) {
    this.topic = ev.detail.value;
    if (localStorage && this.inited) {
      localStorage["panel-dev-mqtt-topic"] = this.topic;
    }
  }

  private _handlePayload(ev: CustomEvent) {
    this.payload = ev.detail.value;
    if (localStorage && this.inited) {
      localStorage["panel-dev-mqtt-payload"] = this.payload;
    }
  }

  private _publish(): void {
    if (!this.hass) {
      return;
    }
    this.hass.callService("mqtt", "publish", {
      topic: this.topic,
      payload_template: this.payload,
    });
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

  private async _openMosquittoFile() {
    const filePath =
      "/data/data/pl.sviete.dom/files/usr/etc/mosquitto/mosquitto.conf";
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
    "developer-tools-mqtt": HaPanelDevMqtt;
  }
}
