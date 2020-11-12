import "../../lovelace/entity-rows/hui-timer-entity-row";
import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import {
  customElement,
  property,
  css,
  html,
  CSSResult,
  internalProperty,
  TemplateResult,
  LitElement,
} from "lit-element";
import { HomeAssistant } from "../../../types";
import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";

import "./ha-config-ais-dom-dashboard";
import "./ais-webhooks";
import "../../../components/ha-switch";

@customElement("ha-config-ais-dom-config-remote")
class HaConfigAisDomControl extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @internalProperty() private _qrCode?: TemplateResult;

  @property() public narrow!: boolean;

  @internalProperty() private remoteDomain;

  async _generateQR() {
    const qrcode = await import("qrcode");
    const canvas = await qrcode.toCanvas(`${this.remoteDomain}`, {
      width: 280,
      errorCorrectionLevel: "Q",
    });
    const context = canvas.getContext("2d");

    const imageObj = new Image();
    imageObj.src = "/static/icons/favicon-192x192.png";
    await new Promise((resolve) => {
      imageObj.onload = resolve;
    });
    context.drawImage(
      imageObj,
      canvas.width / 3,
      canvas.height / 3,
      canvas.width / 3,
      canvas.height / 3
    );

    this._qrCode = html`<img src=${canvas.toDataURL()}></img>`;
  }

  changeRemote() {
    this.hass.callService("input_boolean", "toggle", {
      entity_id: "input_boolean.ais_remote_access",
    });
  }

  enableGatePariringByPin() {
    this.hass.callService("ais_cloud", "enable_gate_pairing_by_pin");
  }

  protected firstUpdated() {
    this._generateQR();
  }

  protected render(): TemplateResult {
    this.remoteDomain =
      "https://" +
      this.hass.states["sensor.ais_secure_android_id_dom"].state +
      ".paczka.pro";

    return html`
      <hass-subpage header="Konfiguracja bramki AIS dom">
        <div .isWide=${this.isWide}>
          <ha-config-section .isWide=${this.isWide}>
            <span slot="header">Zdalny dostęp</span>
            <span slot="introduction"
              >W tej sekcji możesz skonfigurować zdalny dostęp do bramki</span
            >
            <ha-card header="Szyfrowany tunel">
              <div id="ha-switch-id">
                <ha-switch
                  .checked=${this.hass.states["input_boolean.ais_remote_access"]
                    .state === "on"}
                  @change=${this.changeRemote}
                ></ha-switch>
              </div>
              <div class="card-content">
                Tunel zapewnia bezpieczne zdalne połączenie z Twoim urządzeniem
                kiedy jesteś z dala od domu. Twoja bramka dostępna
                ${this.hass.states["input_boolean.ais_remote_access"].state ===
                "on"
                  ? html` jest `
                  : ` będzie `}
                z Internetu pod adresem
                <a href=${this.remoteDomain} target="_blank"
                  >${this.remoteDomain}</a
                >.
                <div
                  class="center-container border"
                  style="height: 320px; text-align: center;"
                >
                  <div id="qr" style="text-align: center; margin-top: 10px;">
                    ${this._qrCode
                      ? this._qrCode
                      : html`
                          <mwc-button @click=${this._generateQR}
                            >Pokaż kod QR
                          </mwc-button>
                        `}
                  </div>
                  Zeskanuj kod QR za pomocą aplikacji na telefonie.
                </div>
              </div>
              <div class="card-content" style="text-align:center;">
                <svg style="width:48px;height:48px" viewBox="0 0 24 24">
                  <path
                    fill="#929395"
                    d="M1,11H6L3.5,8.5L4.92,7.08L9.84,12L4.92,16.92L3.5,15.5L6,13H1V11M8,0H16L16.83,5H17A2,2 0 0,1 19,7V17C19,18.11 18.1,19 17,19H16.83L16,24H8L7.17,19H7C6.46,19 6,18.79 5.62,18.44L7.06,17H17V7H7.06L5.62,5.56C6,5.21 6.46,5 7,5H7.17L8,0Z"
                  />
                </svg>
                <br />
                ${this.hass.states["timer.ais_dom_pin_join"].state === "active"
                  ? html`PIN aktywny przez dwie munuty: <br />
                      <span class="pin"
                        >${this.hass.states["sensor.gate_pairing_pin"]
                          .state}</span
                      ><br /> `
                  : html`<br />
                      <mwc-button @click=${this.enableGatePariringByPin}
                        >Generuj kod PIN</mwc-button
                      >`}
              </div>
              <div class="card-actions">
                <a
                  href="https://www.ai-speaker.com/docs/ais_bramka_remote_www_index"
                  target="_blank"
                >
                  <mwc-button>Dowiedz się jak to działa</mwc-button>
                </a>
              </div>
            </ha-card>

            <ais-webhooks .hass=${this.hass}></ais-webhooks>
          </ha-config-section>
        </div>
      </hass-subpage>
    `;
  }

  static get styles(): CSSResult[] {
    return [
      css`
        .content {
          padding-bottom: 32px;
        }
        a {
          color: var(--primary-color);
        }
        span.pin {
          color: var(--primary-color);
          font-size: 2em;
        }
        .border {
          margin-bottom: 12px;
          border-bottom: 2px solid rgba(0, 0, 0, 0.11);
          max-width: 1040px;
        }
        .narrow .border {
          max-width: 640px;
        }
        .center-container {
          @apply --layout-vertical;
          @apply --layout-center-center;
          height: 70px;
        }
        ha-card > div#ha-switch-id {
          margin: -4px 0;
          position: absolute;
          right: 8px;
          top: 32px;
        }
        .card-actions a {
          text-decoration: none;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-config-ais-dom-config-remote": HaConfigAisDomControl;
  }
}
