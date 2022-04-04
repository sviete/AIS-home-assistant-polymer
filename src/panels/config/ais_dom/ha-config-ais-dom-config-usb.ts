import "../../../components/ha-switch";
import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import { css, CSSResultArray, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";
import "../../../components/ha-circular-progress";
import "./ha-config-ais-dom-dashboard";
import "../../../components/ha-button-menu";
import "@material/mwc-list/mwc-list-item";
import {
  mdiZigbee,
  mdiZWave,
  mdiAccountVoiceOff,
  mdiAccountVoice,
} from "@mdi/js";
import { haStyle } from "../../../resources/styles";
import { HomeAssistant } from "../../../types";
import { handleFetchPromise } from "../../../util/hass-call-api";

export interface aisUsbSettingsInfo {
  usbAutoStartServices: boolean;
  usbVoiceNotification: boolean;
}
export interface aisSaveUsbSettingsResponse {
  info: string;
  error: string;
}

export const aisGetUsbSettings = () =>
  handleFetchPromise<aisUsbSettingsInfo>(
    fetch("/api/ais_file/ais_usb_view", {
      method: "GET",
      credentials: "same-origin",
    })
  );

export const aisSaveUsbSettings = (params: aisUsbSettingsInfo) =>
  handleFetchPromise<aisSaveUsbSettingsResponse>(
    fetch("/api/ais_file/ais_usb_view", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify(params),
    })
  );
/*
 *
 */
@customElement("ha-config-ais-dom-config-usb")
class HaConfigAisDomConfigUsb extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) private usbsetingsValidating = false;

  @property({ type: Boolean }) public isWide = true;

  @property({ type: Boolean }) public narrow = false;

  @property({ type: String }) private errorUsbInfo = "";

  @property({ type: String }) private messageUsbInfo = "";

  @property() private usbSettingsInfo = {
    usbAutoStartServices: true,
    usbVoiceNotification: true,
  };

  protected async firstUpdated() {
    try {
      const result = await aisGetUsbSettings();
      this.usbSettingsInfo = result;
    } catch (err) {
      // eslint-disable-next-line
      this.errorUsbInfo = err;
    }
  }

  protected render(): TemplateResult {
    return html`
      <hass-subpage header="Konfiguracja bramki AIS dom">
        <div .narrow=${this.narrow}>
          <ha-config-section .isWide=${this.isWide}>
            <span slot="header">Obsługa urządzeń USB</span>
            <span slot="introduction">
              W tym miejscu możesz ustalić czy Asystent ma sam rozpoznawać
              adaptery USB i uruchamiać automatycznie domyślne usługi Zigbee i
              Zwave. <br />
              Oraz czy ma głosowo powiadamiać o dodaniu i usunięciu urządzenia
              USB.
            </span>
            <ha-card header="Automatyczne rozpoznawanie urządzeń USB">
              <div class="card-content">
                Asystent domowy powiadamia komunikatem głosowym o tym, jakie
                urządzenie zostało dodane i jeżeli obsługa danego urządzenia
                jest wspierana, to Asystent rozpozna, na jakim porcie działa
                urządzenie i wykona dalsze akcje związane z obsługą danego
                urządzenia.
                <br />
                <br />
                <h2>
                  Automatyczne uruchamianie i zatrzymywanie usług
                  <ha-svg-icon slot="icon" path=${mdiZigbee}></ha-svg-icon>
                  <ha-svg-icon slot="icon" path=${mdiZWave}></ha-svg-icon>
                </h2>
                ${this.usbSettingsInfo.usbAutoStartServices
                  ? html`
                      Asystent automatycznie uruchamia i zatrzymuje domyślne
                      usługi powiązane z obsługiwanymi urządzeniami
                      (zigbee2mqtt, zwave2mqtt). Możesz tę funkcję wyłączyć.
                    `
                  : html`
                      Jeśl chcesz, żeby asystent automatycznie uruchamiał i
                      zatrzymywał domyślne usługi powiązane z obsługiwanymi
                      urządzeniami (zigbee2mqtt, zwave2mqtt), to możesz tę
                      funkcję włączyć.
                    `}

                <br /><br />
                ${!this.usbsetingsValidating
                  ? html` <b
                        >Automatyczny start usług dla urządzeń USB:&nbsp;</b
                      >
                      <ha-switch
                        .checked=${this.usbSettingsInfo.usbAutoStartServices}
                        @change=${this.switchAutoUsb}
                      ></ha-switch>`
                  : html`<div style="width: 100%; text-align: center;">
                      <ha-circular-progress active></ha-circular-progress>
                    </div>`}
                <br />
                <br />

                ${this.usbSettingsInfo.usbVoiceNotification
                  ? html`
                      <h2>
                        Powiadomienia głosowe o urządzeniach USB
                        <ha-svg-icon
                          slot="icon"
                          path=${mdiAccountVoice}
                        ></ha-svg-icon>
                      </h2>
                      Asystent powiadamia komunikatem głosowym o tym, jakie
                      urządzenie USB zostało dodane lub usunięte. Możesz tę
                      funkcję wyłączyć.
                    `
                  : html`
                      <h2>
                        Powiadomienia głosowe o urządzeniach USB
                        <ha-svg-icon
                          slot="icon"
                          path=${mdiAccountVoiceOff}
                        ></ha-svg-icon>
                      </h2>
                      Jeśl chcesz, żeby asystent powiadamiał komunikatem
                      głosowym o tym, jakie urządzenie USB zostało dodane lub
                      usunięte, to możesz tę funkcję włączyć.
                    `}

                <br /><br />
                ${!this.usbsetingsValidating
                  ? html` <b>Powiadomienia głosowe o urządzeniach USB:&nbsp;</b>
                      <ha-switch
                        .checked=${this.usbSettingsInfo.usbVoiceNotification}
                        @change=${this.switchVoiceForUsb}
                      ></ha-switch>`
                  : html`<div style="width: 100%; text-align: center;">
                      <ha-circular-progress active></ha-circular-progress>
                    </div>`}
              </div>
            </ha-card>
          </ha-config-section>
        </div>
      </hass-subpage>
    `;
  }

  static get styles(): CSSResultArray {
    return [
      haStyle,
      css`
        .content {
          padding-bottom: 32px;
        }

        .border {
          margin: 32px auto 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
          max-width: 1040px;
        }
        .narrow .border {
          max-width: 640px;
        }
        .card-actions {
          display: flex;
        }
        ha-card > paper-toggle-button {
          margin: -4px 0;
          position: absolute;
          top: 32px;
          right: 8px;
        }
        .center-container {
          @apply --layout-vertical;
          @apply --layout-center-center;
          height: 70px;
        }
      `,
    ];
  }

  switchAutoUsb(ev) {
    this.usbSettingsInfo.usbAutoStartServices = ev.target.checked;
    this.saveUsbSettings();
  }

  switchVoiceForUsb(ev) {
    this.usbSettingsInfo.usbVoiceNotification = ev.target.checked;
    this.saveUsbSettings();
  }

  private async saveUsbSettings(): Promise<void> {
    this.usbsetingsValidating = true;
    try {
      const result = await aisSaveUsbSettings(this.usbSettingsInfo);
      this.errorUsbInfo = result.error;
      this.messageUsbInfo = result.info;
    } catch (err) {
      this.errorUsbInfo = err;
    }

    this.usbsetingsValidating = false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-config-ais-dom-config-usb": HaConfigAisDomConfigUsb;
  }
}
