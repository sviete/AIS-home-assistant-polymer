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
import "@polymer/iron-icon";

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
      form {
        display: block;
        padding: 16px;
      }
      .events {
        margin: 26px 0;
      }
      .event {
        border-bottom: 3px solid var(--divider-color);
        /* padding-bottom: 46px; */
        padding-top: 26px;
      }
      .event:first-child {
        border-top: 2px solid var(--divider-color);
      }
      .event:last-child {
        border-bottom: 0;
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
    `;
  }
  @property() public hass!: HomeAssistant;
  @property() public deviceId!: string;
  @property() public entities!: EntityRegistryStateEntry[];
  @property() public narrow!: boolean;
  @property() private _currentMode: number = 0;
  @property() private _currentModeHeader: string = "Uczenie kodów RF";
  @property() private _instructionInfo: string =
    "Aby nauczyć Asystenta kodów pilota radiosego (lub innego urządzenia wysyłającego kody radiowe o częstotliwości 433), uruchom tryb uczenia kodów RF, naciskając przycisk poniżej.";

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
                    <div class="event">
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
                                value="Nazwa przycisku"
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
                                  <iron-icon icon="mdi:rocket"></iron-icon>
                                  Testuj
                                </mwc-button>
                                <mwc-button
                                  @click=${this._handleSubmitEntitySwitch}
                                  .data-b0=${msg.B0}
                                  .data-topic=${msg.topic}
                                  .data-idx=${idx}
                                  type="submit"
                                >
                                  <iron-icon icon="mdi:flash"></iron-icon>
                                  Dodaj Przycisk
                                </mwc-button>
                                <!-- <mwc-button
                                  @click=${this._handleSubmitEntitySensor}
                                  .data-b0=${msg.B0}
                                  .data-topic=${msg.topic}
                                  type="submit"
                                >
                                  <iron-icon icon="hass:eye"></iron-icon>
                                  Dodaj Sensor
                                </mwc-button> -->
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
        "Teraz wyślij kilka kodów (naciśnij kilka razy przyciski na pilocie). Po skończeniu wysyłania przejdz w tryb testowania kodów naciskając przycisk poniżej.";
    } else if (this._currentMode === 1) {
      this._currentMode = 2;
      this.hass.callService("ais_dom_device", "stop_rf_sniffing", {
        clear: false,
      });
      this._currentModeHeader = "Testowanie i zapisanie kodów RF";
      this._instructionInfo =
        "Przetestuj odebrane kody, ten który działa dodaj jako przycisk lub czujnik do systemu. By zakończyć tryb testowania/dodawania naciśnij przycisk poniżej.";
    } else if (this._currentMode === 2) {
      this._currentMode = 0;
      this._currentModeHeader = "Uczenie kodów RF";
      this._instructionInfo =
        "Aby nauczyć Asystenta kodów z pilota (lub innego urządzenia wysyłającego kody radiowe o częstotliwości 433), uruchom tryb uczenia kodów RF naciskając przycisk poniżej";
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

  private async _handleSubmitEntitySwitch(ev: CustomEvent) {
    if (ev.currentTarget != null) {
      const b0 = ev.currentTarget["data-b0"];
      const gateTopic = ev.currentTarget["data-topic"];
      const idx = ev.currentTarget["data-idx"];
      const entityName = this.shadowRoot!.getElementById("name_" + idx);
      this.hass.callService("ais_dom_device", "add_ais_dom_entity", {
        name: entityName!.value,
        topic: gateTopic,
        deviceId: this.deviceId,
        code: b0,
        type: "switch",
      });
    }
  }

  private async _handleSubmitEntitySensor(ev: CustomEvent) {
    // TODO
    showAddAisDomDeviceDialog(this, { entityType: "sensor" });
    if (ev.currentTarget != null) {
      const b0 = ev.currentTarget["data-b0"];
      const gateTopic = ev.currentTarget["data-topic"];
      const entityName = "todo";
      this.hass.callService("ais_dom_device", "add_ais_dom_entity", {
        name: entityName,
        topic: gateTopic,
        deviceId: this.deviceId,
        code: b0,
        type: "sensor",
      });
    }
  }
}
