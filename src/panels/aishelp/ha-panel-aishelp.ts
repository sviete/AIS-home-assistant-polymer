import "../../components/ha-menu-button";
import "@material/mwc-button";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "@polymer/paper-input/paper-input";
import { HomeAssistant } from "../../types";
import "../../components/ha-card";
import "../../resources/ha-style";
import "../config/ha-config-section";
import { CustomPanelInfo } from "../../data/panel_custom";
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

@customElement("ha-panel-aishelp")
class HaPanelAishelp extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @internalProperty() private _qrCode?: TemplateResult;

  @property() public panel!: CustomPanelInfo;

  @property() public narrow!: boolean;

  @internalProperty() private aisLocalIP;

  @internalProperty() private remoteDomain;

  @internalProperty() private remoteConnectedInfo;

  @internalProperty() private serviceRemoteStatusColor = "#000000";

  @internalProperty() private aisSecureAndroidId = "dom-xxxxxxxx";

  protected firstUpdated() {
    this.aisLocalIP = this.hass.states["sensor.internal_ip_address"].state;
    this.aisSecureAndroidId = this.hass.states[
      "sensor.ais_secure_android_id_dom"
    ].state;
    this.remoteConnectedInfo =
      "https://" + this.aisSecureAndroidId + ".paczka.pro";

    if (this.hass.states["input_boolean.ais_remote_access"].state === "on") {
      this.serviceRemoteStatusColor = "#FF9800";
      this.remoteConnectedInfo = "Twoja bramka jest dostępna pod adresem: ";
    } else {
      this.serviceRemoteStatusColor = "#000000";
      this.remoteConnectedInfo =
        "Gdy włączysz szyfrowany tunel to Twoja bramka będzie dostępna z Internetu pod adresem: ";
    }

    this._generateQR();
  }

  async _generateQR() {
    const qrcode = await import("qrcode");
    const canvas = await qrcode.toCanvas(`${this.aisSecureAndroidId}`, {
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

  protected render(): TemplateResult {
    return html`
      <app-toolbar>
        <ha-menu-button
          .hass=${this.hass}
          .narrow=${this.narrow}
        ></ha-menu-button>
        <div main-title>${this.panel.title}</div>
      </app-toolbar>
      <div class="content">
        <hass-subpage>
          <ha-config-section class="content" ?is-wide=${this.isWide}>
            <span slot="header">Przydatne Linki</span>
            <span slot="introduction"
              >W tej sekcji znajdziesz przydatne linki dotyczące twojej
              bramki</span
            >
            <ha-card header="Identyfikator bramki">
              <svg style="width:36px;height:36px" viewBox="0 0 24 24">
                <path
                  d="M6,18V8H8V18H6M6,4.5H8V6.5H6V4.5M17,4H19V18H17V17.75C17,17.75 15.67,18 15,18A5,5 0 0,1 10,13A5,5 0 0,1 15,8C15.67,8 17,8.25 17,8.25V4M17,10.25C17,10.25 15.67,10 15,10A3,3 0 0,0 12,13A3,3 0 0,0 15,16C15.67,16 17,15.75 17,15.75V10.25Z"
                />
              </svg>
              <div class="card-content">
                To urządzenie posiada swój unikalny identyfikator, został on
                losowo wygenerowany przy pierwszym uruchomieniu i pozostanie
                stały przez cały okres użytkowania urządzenia. Identyfikator
                tego urządzenia to <a href="#"> ${this.aisSecureAndroidId} </a>
                <div id="qr" style="text-align: center; margin-top: 10px;">
                  ${this._qrCode
                    ? this._qrCode
                    : html`
                        <mwc-button @click=${this._generateQR}
                          >Pokaż kod QR
                        </mwc-button>
                      `}
                </div>
              </div>
            </ha-card>
            <ha-card header="Aplikacja">
              <svg style="width:36px;height:36px" viewBox="0 0 24 24">
                <path
                  d="M3,4H21A1,1 0 0,1 22,5V16A1,1 0 0,1 21,17H22L24,20V21H0V20L2,17H3A1,1 0 0,1 2,16V5A1,1 0 0,1 3,4M4,6V15H20V6H4Z"
                />
              </svg>
              <div class="card-content">
                Aplikacja dostępna jest w sieci lokalnej pod adresem:
                <a href="http://${this.aisLocalIP}" target="_blank"
                  >http://${this.aisLocalIP}</a
                >
              </div>
            </ha-card>
            <ha-card header="Serwer FTP">
              <svg style="width:36px;height:36px" viewBox="0 0 24 24">
                <path
                  d="M13,19H14A1,1 0 0,1 15,20H22V22H15A1,1 0 0,1 14,23H10A1,1 0 0,1 9,22H2V20H9A1,1 0 0,1 10,19H11V17H4A1,1 0 0,1 3,16V12A1,1 0 0,1 4,11H20A1,1 0 0,1 21,12V16A1,1 0 0,1 20,17H13V19M4,3H20A1,1 0 0,1 21,4V8A1,1 0 0,1 20,9H4A1,1 0 0,1 3,8V4A1,1 0 0,1 4,3M9,7H10V5H9V7M9,15H10V13H9V15M5,5V7H7V5H5M5,13V15H7V13H5Z"
                />
              </svg>
              <div class="card-content">
                Na urządzeniu działa serwer ftp dostępny pod adresem:
                <a href="ftp://${this.aisLocalIP}" target="_blank"
                  >ftp://${this.aisLocalIP}</a
                >
              </div>
            </ha-card>
            <ha-card header="SSH">
              <svg style="width:36px;height:36px" viewBox="0 0 24 24">
                <path
                  d="M20,19V7H4V19H20M20,3A2,2 0 0,1 22,5V19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19V5C2,3.89 2.9,3 4,3H20M13,17V15H18V17H13M9.58,13L5.57,9H8.4L11.7,12.3C12.09,12.69 12.09,13.33 11.7,13.72L8.42,17H5.59L9.58,13Z"
                />
              </svg>
              <div class="card-content">
                Pobierz
                <a href="/local/id_rsa_ais?v=1" target="_blank"
                  >autoryzowany klucz ssh</a
                >
                i połącz się ze swojej konsoli poleceniem: <br />ssh
                ${this.aisLocalIP} -i ścieżka_do_pobranego_klucza_ssh
                <br /><br />Możesz też łączyć się za pomocą hasła:<br /><a
                  >ssh ${this.aisLocalIP}</a
                ><br />szczegóły w
                <a
                  href="https://www.ai-speaker.com/docs/ais_bramka_remote_ssh#dost%C4%99p-do-konsoli-z-klienta-ssh)"
                  target="_blank"
                  >dokumentacji</a
                >
              </div>
            </ha-card>
            <ha-card header="Tunel">
              <div
                class="svgStatusIconDiv"
                style="fill:${this.serviceRemoteStatusColor}"
              >
                <svg style="width:36px;height:36px" viewBox="0 0 24 24">
                  <path
                    d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                  />
                </svg>
              </div>
              <div class="card-content">
                ${this.remoteConnectedInfo}
                <a href=${this.remoteDomain}>${this.remoteDomain}</a>
                <p>
                  Ustawienia zdalnego dostępu możesz zmienić w
                  <a href="/config/ais_dom">konfiguracji bramki</a>
                </p>
              </div>
            </ha-card>
            <ha-card header="Portal Integratora">
              <svg style="width:36px;height:36px" viewBox="0 0 24 24">
                <path
                  d="M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.21 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14M22,13A3,3 0 0,0 19,10H17.5V9.5A5.5,5.5 0 0,0 12,4C9.5,4 7.37,5.69 6.71,8H6A4,4 0 0,0 2,12A4,4 0 0,0 6,16H9V16.5C9,17 9.06,17.5 9.17,18H6A6,6 0 0,1 0,12C0,8.9 2.34,6.36 5.35,6.04C6.6,3.64 9.11,2 12,2C15.64,2 18.67,4.59 19.36,8.04C21.95,8.22 24,10.36 24,13C24,14.65 23.21,16.1 22,17V16.5C22,15.77 21.88,15.06 21.65,14.4C21.87,14 22,13.5 22,13Z"
                />
              </svg>
              <div class="card-content">
                Portal Integratora to miejsce, w którym można dodawać własne
                stacje radiowe, podcasty oraz konfigurować inne składowe systemu
                <a
                  href="https://www.ai-speaker.com/ords/f?p=100"
                  target="_blank"
                  >Przejdz do Portalu Integratora</a
                >
              </div>
            </ha-card>
            <br />
          </ha-config-section>
        </hass-subpage>
      </div>
    `;
  }

  static get styles(): CSSResult[] {
    return [
      css`
        app-toolbar {
          background-color: var(--primary-color);
        }
        .center-container {
          @apply --layout-vertical;
          @apply --layout-center-center;
          height: 70px;
        }
        a {
          color: var(--primary-color);
        }
        ha-card > paper-toggle-button {
          margin: -4px 0;
          position: absolute;
          right: 8px;
          top: 32px;
        }
        .card-actions {
          display: flex;
        }
        .card-actions a {
          text-decoration: none;
        }
        .spacer {
          flex-grow: 1;
        }
        .content {
          background-color: var(--primary-background-color);
          width: 100%;
          min-height: 100%;
        }
        ha-card > svg {
          margin: -4px 0;
          position: absolute;
          right: 32px;
          top: 32px;
        }
        div.svgStatusIconDiv {
          margin: -4px 0;
          position: absolute;
          right: 32px;
          top: 32px;
        }
        svg > path {
          fill: var(--primary-color);
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-panel-aishelp": HaPanelAishelp;
  }
}
