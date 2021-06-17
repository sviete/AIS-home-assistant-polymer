import "../../../components/ha-switch";
import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import { css, CSSResultArray, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";

import "./ha-config-ais-dom-dashboard";
import "../../../components/paper-time-input";
import "../../../components/ha-button-menu";
import "@material/mwc-list/mwc-list-item";
import { haStyle } from "../../../resources/styles";
import { HomeAssistant } from "../../../types";
import { mdiZigbee, mdiZWave } from "@mdi/js";
/*
 *
 */
@customElement("ha-config-ais-dom-config-usb")
class HaConfigAisDomConfigUsb extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public isWide = true;

  @property({ type: Boolean }) public narrow = false;

  @property({ type: String }) public autoUsb = "";

  protected firstUpdated() {
    this.autoUsb = this.hass.states[
      "input_boolean.ais_auto_services_for_usb"
    ].state;
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
              Zwave.
            </span>
            <ha-card header="Automatyczne rozpoznawanie urządzeń USB">
              <div class="card-content">
                Na bramce dostarczamy działającą w tle usługę USB, której celem
                jest wykrywanie połączenia i rozłączania urządzeń USB. Usługa
                monitoruje zdarzenia za pomocą mechanizmu inotify dostępnego w
                systemie Linux. Dzięki temu Asystent domowy powiadamia
                komunikatem głosowym o tym, jakie urządzenie zostało dodane i
                jeżeli obsługa danego urządzenia jest wspierana, to Asystent
                rozpozna, na jakim porcie działa urządzenie i wykona dalsze
                akcje związane z obsługą danego urządzenia.
                <br />
                <br />
                <h2>
                  Automatyczne uruchamianie i zatrzymywanie usług
                  <ha-svg-icon slot="icon" path=${mdiZigbee}></ha-svg-icon>
                  <ha-svg-icon slot="icon" path=${mdiZWave}></ha-svg-icon>
                </h2>
                ${this.hass.states["input_boolean.ais_auto_services_for_usb"]
                  .state === "on"
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
                <b>Automatyczny start usług dla urządzeń USB:&nbsp;</b>
                <ha-switch
                  .checked=${this.hass.states[
                    "input_boolean.ais_auto_services_for_usb"
                  ].state === "on"}
                  @change=${this.switchAutoUsb}
                ></ha-switch>
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

  switchAutoUsb() {
    this.hass.callService("input_boolean", "toggle", {
      entity_id: "input_boolean.ais_auto_services_for_usb",
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-config-ais-dom-config-usb": HaConfigAisDomConfigUsb;
  }
}
