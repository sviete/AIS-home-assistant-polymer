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
  @property() private topic = "dom/cmnd/rfraw";
  @property() private listenTopic = "+/tele/RESULT";
  @property() private payload = "177";
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
                @value-changed=${this._valueChanged}
              ></paper-input>
            </form>
            <div class="events">
              ${this._messages.map(
                (msg) => html`
                  if ('RfRaw' in msg.payload){
                  <pre>${msg.payload}</pre>
                  <div class="bottom">
                    <mwc-button @click=${this._handleSubmit} type="submit">
                      Dodaj do przełączników
                    </mwc-button>
                  </div>
                  }
                `
              )}
            </div>
          </div>
        </ha-card>

        <mqtt-subscribe-card .hass=${this.hass}></mqtt-subscribe-card>
      </div>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    this.listenTopic = ev.detail.value;
  }

  private async _handleSubmit(): Promise<void> {
    this.hass.callService("mqtt", "publish", {
      topic: this.topic,
      payload_template: this.payload,
    });
    this.hass.callService("ais_ai_service", "say_it", {
      text: "Bramka RF w trybie uczenia",
    });
    if (this._subscribed) {
      this._subscribed();
      this._subscribed = undefined;
    } else {
      this._subscribed = await subscribeMQTTTopic(
        this.hass!,
        this.listenTopic,
        (message) => this._handleMessage(message)
      );
    }
  }

  private _handleMessage(message: MQTTMessage) {
    const tail =
      this._messages.length > 30 ? this._messages.slice(0, 29) : this._messages;
    let payload: string;
    try {
      payload = JSON.stringify(JSON.parse(message.payload), null, 4);
    } catch (e) {
      payload = message.payload;
    }
    this._messages = [
      {
        payload,
        message,
        time: new Date(),
        id: this._messageCount++,
      },
      ...tail,
    ];
  }
}
