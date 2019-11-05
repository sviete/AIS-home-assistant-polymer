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
import { subscribeMQTTTopic, MQTTMessage } from "../../../../data/mqtt";
import format_time from "../../../../common/datetime/format_time";

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
    `;
  }
  @property() public hass!: HomeAssistant;
  @property() public deviceId!: string;
  @property() public entities!: EntityRegistryStateEntry[];
  @property() public narrow!: boolean;
  @property() private listenTopic = "+/tele/RESULT";
  @property() private _subscribed?: () => void;
  @property() private _messages: Array<{
    id: number;
    message: MQTTMessage;
    payload: string;
    time: Date;
  }> = [];

  private _messageCount = 0;

  public disconnectedCallback() {
    super.disconnectedCallback();
    if (this._subscribed) {
      this._subscribed();
      this._subscribed = undefined;
    }
  }

  protected render(): TemplateResult {
    return html`
      <div class="content">
        <ha-card header="Tryb uczenia">
          <div class="card-content">
            <p>
              Uruchom tryb uczenia kodów RF naciskając przycisk
              <b>START UCZENIA</b>
            </p>
            <mwc-button
              .disabled=${this.listenTopic === ""}
              @click=${this._handleSubmit}
              type="submit"
            >
              ${this._subscribed ? "Koniec uczenia" : "Start uczenia"}
            </mwc-button>
            <form>
              <paper-input
                .label=${this._subscribed ? "Nasłuchuje" : "Temat"}
                .disabled=${1 === 1}
                .value=${this.listenTopic}
              ></paper-input>
            </form>
            <div class="events">
              ${this._messages.map(
                (msg) => html`
                  <pre>${msg.payload}</pre>
                  <div class="bottom">
                    <mwc-button
                      @click=${this._handleSubmitSwitch}
                      type="submit"
                    >
                      Dodaj do przełączników
                    </mwc-button>
                    <mwc-button
                      @click=${this._handleSubmitSensor}
                      type="submit"
                    >
                      Dodaj do czujników
                    </mwc-button>
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
    if (this._subscribed) {
      this._subscribed();
      this._subscribed = undefined;
      this.hass.callService("mqtt", "publish", {
        topic: "dom/cmnd/rfraw",
        payload_template: 177,
      });
      this.hass.callService("ais_ai_service", "say_it", {
        text: "Koniec trybu uczenia bramki RF",
      });
      this._messages = [];
    } else {
      this._subscribed = await subscribeMQTTTopic(
        this.hass!,
        this.listenTopic,
        (message) => this._handleMessage(message)
      );
      this.hass.callService("mqtt", "publish", {
        topic: "dom/cmnd/rfraw",
        payload_template: 177,
      });
      this.hass.callService("ais_ai_service", "say_it", {
        text: "Bramka RF w trybie uczenia",
      });
    }
  }

  private async _handleSubmitSwitch(): Promise<void> {
    console.log("_handleSubmitSwitch");
  }

  private async _handleSubmitSensor(): Promise<void> {
    console.log("_handleSubmitSensor");
  }

  private _handleMessage(message: MQTTMessage) {
    const tail =
      this._messages.length > 30 ? this._messages.slice(0, 29) : this._messages;
    let payload: string;
    try {
      payload = JSON.parse(message.payload).RfRaw.Data;
      // if (payload.includes("B1")) {
      this._messages = [
        {
          payload,
          message,
          time: new Date(),
          id: this._messageCount++,
        },
        ...tail,
      ];
      // }
    } catch (e) {
      console.log("message.payload: " + message.payload + " e: " + e);
    }
  }
}
