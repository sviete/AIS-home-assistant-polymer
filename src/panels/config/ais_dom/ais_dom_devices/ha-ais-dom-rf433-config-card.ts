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
        padding-bottom: 46px;
        padding-top: 26px;
      }
      .event:first-child {
        border-top: 2px solid var(--divider-color);
      }
      .event:last-child {
        border-bottom: 0;
      }
    `;
  }
  @property() public hass!: HomeAssistant;
  @property() public deviceId!: string;
  @property() public entities!: EntityRegistryStateEntry[];
  @property() public narrow!: boolean;
  @property() private newButtonName = "Przycisk / Sensor";
  @property() private _sniffing: boolean = false;
  @property() private _instructionInfo: string =
    "Aby nauczyć Asystenta kodów z pilota (lub innego urządzenia wysyłającego kody radiowe o częstotliwości 433), uruchom tryb uczenia kodów RF naciskając przycisk poniżej";

  protected render(): TemplateResult {
    const stateObj: HassEntity = this.hass.states[
      "sensor.ais_dom_mqtt_rf_sensor"
    ];
    // if (stateObj.attributes.codes.length > 0) {
    //   this._sniffing = true;
    // }
    return html`
      <div class="content">
        <ha-card header="Tryb uczenia">
          <div class="card-content">
            <p>
              ${this._instructionInfo}
            </p>
            <div class="div-right">
              <mwc-button @click=${this._handleSubmit} type="submit">
                ${this._sniffing ? "Koniec uczenia" : "Start uczenia"}
              </mwc-button>
            </div>
            <div class="events">
              ${stateObj.attributes.codes.map(
                (msg) =>
                  html`
                    <div class="event">
                      Rozpoznany kod RF:
                      <span
                        style="font-size:xx-small; width:100%; display: flex;"
                      >
                        (${msg.B1})
                      </span>
                      <pre
                        style="font-size:smaller; width:100%; display: flex;"
                      >
                        ${msg.B0}
                      </pre
                      >
                      <div class="bottom">
                        <paper-input
                          label="Nazwa"
                          .value=${this.newButtonName}
                          @value-changed=${this._valueChanged}
                        ></paper-input>
                        <div class="div-right">
                          <mwc-button
                            @click=${this._handleTestCode}
                            .data-b0=${msg.B0}
                            .data-topic=${msg.topic}
                            type="submit"
                          >
                            <iron-icon icon="mdi:rocket"></iron-icon>
                            Testuj
                          </mwc-button>
                          <mwc-button
                            @click=${this._handleSubmitEntitySwitch}
                            .data-b0=${msg.B0}
                            .data-topic=${msg.topic}
                            type="submit"
                          >
                            <iron-icon icon="mdi:flash"></iron-icon>
                            Dodaj Przycisk
                          </mwc-button>
                          <mwc-button
                            @click=${this._handleSubmitEntitySensor}
                            .data-b0=${msg.B0}
                            .data-topic=${msg.topic}
                            type="submit"
                          >
                            <iron-icon icon="hass:eye"></iron-icon>
                            Dodaj Sensor
                          </mwc-button>
                        </div>
                      </div>
                    </div>
                  `
              )}
            </div>
          </div>
        </ha-card>

        <mqtt-subscribe-card .hass=${this.hass}></mqtt-subscribe-card>
      </div>
    `;
  }

  private async _handleSubmit(): Promise<void> {
    if (this._sniffing) {
      this._sniffing = false;
      this.hass.callService("ais_dom_device", "stop_rf_sniffing");
      this._instructionInfo =
        "Aby nauczyć Asystenta kodów z pilota (lub innego urządzenia wysyłającego kody radiowe o częstotliwości 433), uruchom tryb uczenia kodów RF naciskając przycisk poniżej.";
    } else {
      this._sniffing = true;
      this._instructionInfo =
        "Teraz wyślij kilka kodów (naciśnij kilka razy przyciski na pilocie).";
      this.hass.callService("ais_dom_device", "start_rf_sniffing");
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
      this.hass.callService("ais_dom_device", "add_ais_dom_entity", {
        name: this.newButtonName,
        topic: gateTopic,
        deviceId: this.deviceId,
        code: b0,
        type: "switch",
      });
    }
  }

  private async _handleSubmitEntitySensor(ev: CustomEvent) {
    if (ev.currentTarget != null) {
      const b0 = ev.currentTarget["data-b0"];
      const gateTopic = ev.currentTarget["data-topic"];
      this.hass.callService("ais_dom_device", "add_ais_dom_entity", {
        name: this.newButtonName,
        topic: gateTopic,
        deviceId: this.deviceId,
        code: b0,
        type: "sensor",
      });
    }
  }

  private _valueChanged(ev: CustomEvent): void {
    this.newButtonName = ev.detail.value;
  }
}
