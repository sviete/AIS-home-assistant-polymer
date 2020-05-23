import {
  LitElement,
  TemplateResult,
  html,
  property,
  customElement,
  css,
  CSSResult,
} from "lit-element";

import { HomeAssistant } from "../../../../types";

import "../../../../components/entity/state-badge";

import "@polymer/paper-item/paper-item";
import "@polymer/paper-item/paper-icon-item";
import "@polymer/paper-item/paper-item-body";

import "../../../../components/ha-card";
import "../../../../components/ha-icon";
import "../../../../components/ha-switch";
import { EntityRegistryStateEntry } from "../../devices/ha-config-device-page";
import { HassEntity } from "home-assistant-js-websocket";
import {
  loadAddAisDomDeviceDialog,
  showAddAisDomDeviceDialog,
} from "./show-dialog-ais-dom-device-detail";

@customElement("ha-ais-dom-rf433-config-card")
export class HaDeviceEntitiesCard extends LitElement {
  static get styles(): CSSResult {
    return css`
      ha-icon {
        width: 40px;
      }
      mwc-button {
        background-color: #727272;
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
      .div-right {
        width: 100%;
        text-align: right;
      }
      .bottom {
        font-size: 80%;
        color: var(--secondary-text-color);
      }
      div.left {
        position: absolute;
        left: 22px;
        color: var(--secondary-text-color);
      }
      form {
        display: block;
        padding: 16px;
      }
      .events {
        margin: 26px 0;
      }
      .event {
        border: 3px solid var(--divider-color);
        padding: 4px;
        margin-top: 4px;
        padding-top: 26px;
        background-repeat: no-repeat;
        background-position: right;
        background-size: 20%;
        background-image: url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 5 24"><path fill="b9b2b2" fill-opacity="0.1" d="M4.93,4.93C3.12,6.74 2,9.24 2,12C2,14.76 3.12,17.26 4.93,19.07L6.34,17.66C4.89,16.22 4,14.22 4,12C4,9.79 4.89,7.78 6.34,6.34L4.93,4.93M19.07,4.93L17.66,6.34C19.11,7.78 20,9.79 20,12C20,14.22 19.11,16.22 17.66,17.66L19.07,19.07C20.88,17.26 22,14.76 22,12C22,9.24 20.88,6.74 19.07,4.93M7.76,7.76C6.67,8.85 6,10.35 6,12C6,13.65 6.67,15.15 7.76,16.24L9.17,14.83C8.45,14.11 8,13.11 8,12C8,10.89 8.45,9.89 9.17,9.17L7.76,7.76M16.24,7.76L14.83,9.17C15.55,9.89 16,10.89 16,12C16,13.11 15.55,14.11 14.83,14.83L16.24,16.24C17.33,15.15 18,13.65 18,12C18,10.35 17.33,8.85 16.24,7.76M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"></path></svg>');
      }
      .event:first-child {
        border-top: 2px solid var(--divider-color);
      }
      pre {
        margin: 0px;
        max-width: 600px;
        display: block;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
      span.idx {
        color: var(--secondary-text-color);
        font-size: large;
        font-weight: bold;
      }

      div.right ha-icon {
        position: relative;
        top: -20px;
        color: var(--primary-color);
      }
    `;
  }

  @property() public hass!: HomeAssistant;

  @property() public deviceId!: string;

  @property() public entities!: EntityRegistryStateEntry[];

  @property() public narrow!: boolean;

  @property() private _currentMode = 0;

  @property() private _currentModeHeader = "Uczenie kodów RF";

  @property() private _instructionInfo =
    "Aby nauczyć Asystenta kodów pilota radiowego (lub innego urządzenia wysyłającego kody radiowe o częstotliwości 433), uruchom tryb uczenia kodów RF, naciskając przycisk poniżej.";

  protected render(): TemplateResult {
    const stateObj: HassEntity = this.hass.states[
      "sensor.ais_dom_mqtt_rf_sensor"
    ];
    return html`
      <div class="content">
        <ha-card header=${this._currentModeHeader}>
          <div class="card-content">
            <p>
              ${this._instructionInfo}
            </p>
            <div class="div-right">
              <mwc-button @click=${this._handleModeSubmit} type="submit">
                ${
                  this._currentMode === 0
                    ? "Start nasłuchiwania kodów"
                    : this._currentMode === 1
                    ? "Start testowania/dodawania"
                    : "Koniec testowania/dodawania"
                }
              </mwc-button>
            </div>
            ${
              this._currentMode !== 0
                ? html`<div class="events">
              ${stateObj.attributes.codes.map(
                (msg, idx) =>
                  html`
                    <div class="event" id="event_${idx}">
                      <div class="right">
                        <ha-icon
                          icon="mdi:close"
                          @click=${this._handleCloseCode}
                          .data-idx=${idx}
                        ></ha-icon>
                      </div>
                      <span class="idx">[${idx + 1}]</span> Rozpoznany kod RF:
                      <span
                        style="font-size:xx-small; width:100%; display: block; white-space: pre-wrap; word-wrap: break-word; text-align: left;"
                        >(${msg.B1})</span
                      >
                      <pre>${msg.B0}</pre>
                      ${this._currentMode === 2
                        ? html`
                            <div class="bottom">
                              <paper-input
                                label="Nazwa"
                                value="Nazwa"
                                id=${"name_" + idx}
                                }
                              ></paper-input>
                              <div class="div-right">
                                <mwc-button
                                  @click=${this._handleTestCode}
                                  .data-b0=${msg.B0}
                                  .data-topic=${msg.topic}
                                  .data-idx=${idx}
                                  type="submit"
                                >
                                  <ha-icon icon="mdi:rocket"></ha-icon>
                                  Testuj
                                </mwc-button>
                                <mwc-button
                                  @click=${this._handleSubmitEntity}
                                  .data-b0=${msg.B0}
                                  .data-topic=${msg.topic}
                                  .data-idx=${idx}
                                  .data-ttt=${"switch"}
                                  type="submit"
                                >
                                  <ha-icon icon="mdi:flash"></ha-icon>
                                  Dodaj Przycisk
                                </mwc-button>
                                <mwc-button
                                  @click=${this._handleSubmitEntity}
                                  .data-b0=${msg.B0}
                                  .data-topic=${msg.topic}
                                  .data-idx=${idx}
                                  .data-ttt=${"sensor"}
                                  type="submit"
                                >
                                  <ha-icon icon="mdi:motion-sensor"></ha-icon>
                                  Dodaj Czujnik
                                </mwc-button>
                              </div>
                            </div>
                          `
                        : html``}
                    </div>
                  `
              )}
            </div>
          </div>
          `
                : html``
            }
        </ha-card>

        <mqtt-subscribe-card .hass=${this.hass}></mqtt-subscribe-card>
      </div>
    `;
  }

  protected firstUpdated(changedProps) {
    super.firstUpdated(changedProps);
    loadAddAisDomDeviceDialog();
  }

  private async _handleModeSubmit(): Promise<void> {
    if (this._currentMode === 0) {
      this._currentMode = 1;
      this.hass.callService("ais_dom_device", "start_rf_sniffing");
      this._currentModeHeader = "Nasłuchiwanie kodów RF";
      this._instructionInfo =
        "Teraz wyślij kilka kodów (naciśnij kilka razy przyciski na pilocie). Po skończeniu wysyłania przejdź w tryb testowania kodów, naciskając przycisk poniżej.";
    } else if (this._currentMode === 1) {
      this._currentMode = 2;
      this.hass.callService("ais_dom_device", "stop_rf_sniffing", {
        clear: false,
      });
      this._currentModeHeader = "Testowanie i zapisanie kodów RF";
      this._instructionInfo =
        "Przetestuj odebrane kody, ten, który działa dodaj jako przycisk do systemu. By zakończyć tryb testowania/dodawania naciśnij przycisk poniżej.";
    } else if (this._currentMode === 2) {
      this._currentMode = 0;
      this._currentModeHeader = "Uczenie kodów RF";
      this._instructionInfo =
        "Aby nauczyć Asystenta kodów pilota radiowego (lub innego urządzenia wysyłającego kody radiowe o częstotliwości 433), uruchom tryb uczenia kodów RF, naciskając przycisk poniżej.";
      this.hass.callService("ais_dom_device", "stop_rf_sniffing", {
        clear: true,
      });
    }
  }

  private async _handleTestCode(ev: CustomEvent) {
    if (ev.currentTarget != null) {
      const b0 = ev.currentTarget["data-b0"];
      const gateTopic = ev.currentTarget["data-topic"];
      this.hass.callService("ais_dom_device", "send_rf_code", {
        topic: gateTopic,
        deviceId: this.deviceId,
        code: b0,
      });
    }
  }

  private async _handleCloseCode(ev: CustomEvent) {
    if (ev.currentTarget != null) {
      const idx = ev.currentTarget["data-idx"];
      this.shadowRoot!.getElementById("event_" + idx)!.style.display = "none";
    }
  }

  private async _handleSubmitEntity(ev: CustomEvent) {
    if (ev.currentTarget != null) {
      const b0 = ev.currentTarget["data-b0"];
      const gateTopic = ev.currentTarget["data-topic"];
      const idx = ev.currentTarget["data-idx"];
      const entityTtt = ev.currentTarget["data-ttt"];
      const entityName = this.shadowRoot!.getElementById("name_" + idx);
      console.log("entityTyp " + entityTtt);
      console.log("ev.currentTarget:" + ev.currentTarget);
      this.hass.callService("ais_dom_device", "add_ais_dom_entity", {
        name: entityName!.value,
        topic: gateTopic,
        deviceId: this.deviceId,
        code: b0,
        type: entityTtt,
      });
      this.shadowRoot!.getElementById("event_" + idx)!.style.display = "none";
    }
  }
}
