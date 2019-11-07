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
      .div-full {
        height: 40px;
        width: 100%;
      }
      .div-left {
        float: left;
        width: 50%;
      }
      .div-right {
        float: right;
        width: 50%;
      }
    `;
  }
  @property() public hass!: HomeAssistant;
  @property() public deviceId!: string;
  @property() public entities!: EntityRegistryStateEntry[];
  @property() public narrow!: boolean;
  @property() private listenTopic = "+/tele/RESULT";
  @property() private newButtonName = "Nowy przełącznik";
  @property() private _subscribed?: () => void;
  @property() private _messages: Array<{
    id: number;
    message: MQTTMessage;
    payload: string;
    buttons: any;
  }> = [];

  private _messageCount = 0;
  private _payloadsArray: MQTTMessage[] = [];

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
                disabled="true"
                .value=${this.listenTopic}
              ></paper-input>
            </form>
            <div class="events">
              ${this._messages.map(
                (msg) =>
                  html`
                    <p>${msg.buttons}</p>
                    <p style="font-size:smaller; width:100%; display: flex;">
                      ${msg.payload}
                    </p>
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
        topic: "dom/cmnd/RfRaw",
        payload_template: "AAB155",
      });
      this.hass.callService("ais_ai_service", "say_it", {
        text: "Koniec trybu uczenia bramki RF",
      });
    } else {
      // reset codes
      this._messages = [];
      this._payloadsArray = [];
      //
      this._subscribed = await subscribeMQTTTopic(
        this.hass!,
        this.listenTopic,
        (message) => this._handleMessage(message)
      );
      this.hass.callService("mqtt", "publish", {
        topic: "dom/cmnd/RfRaw",
        payload_template: "AAB155",
      });
      this.hass.callService("ais_ai_service", "say_it", {
        text: "Bramka RF w trybie uczenia",
      });
    }
  }

  private async _handleSubmitSwitch(): Promise<void> {
    this.hass.callService("ais_dom_device", "add_new_rf433_switch", {
      name: this.newButtonName,
      deviceId: this.deviceId,
      codes: this._payloadsArray,
    });
  }

  private _valueChanged(ev: CustomEvent): void {
    this.newButtonName = ev.detail.value;
  }

  private _handleMessage(message: MQTTMessage) {
    const tail =
      this._messages.length > 4 ? this._messages.slice(0, 4) : this._messages;
    let payload: string;
    try {
      payload = JSON.parse(message.payload).RfRaw.Data;
      if (payload.includes("B1")) {
        this._messageCount++;
        let displayButtons = html``;
        if (this._messageCount % 5 === 0) {
          // stop lerning mode
          this._handleSubmit();
          //
          displayButtons = html`
            <div class="bottom">
              <form>
                <div class="div-full">
                  <div class="div-left">
                    <paper-input
                      label="Nazwa przełącznika"
                      .value=${this.newButtonName}
                      @value-changed=${this._valueChanged}
                    ></paper-input>
                  </div>
                  <div class="div-right">
                    <mwc-button
                      @click=${this._handleSubmitSwitch}
                      type="submit"
                    >
                      Dodaj do przełączników
                    </mwc-button>
                  </div>
                </div>
              </form>
            </div>
          `;
        }
        this._messages = [
          {
            payload,
            message,
            id: this._messageCount,
            buttons: displayButtons,
          },
          ...tail,
        ];
        this._payloadsArray.push(message);
      }
    } catch (e) {
      console.log("message.payload: " + message.payload + " e: " + e);
    }
  }
}
