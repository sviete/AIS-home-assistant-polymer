import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";

import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";

import "./ha-config-ais-dom-dashboard";
import "../../../components/buttons/ha-call-service-button";
import "../../../components/ha-icon";
import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { property } from "lit/decorators";
import { HomeAssistant } from "../../../types";

/*
 *
 */
class HaConfigAisDomControl extends LitElement {
  @property() public hass?: HomeAssistant;

  @property({ type: Boolean }) public isWide = true;

  @property({ type: Boolean }) public narrow = false;

  static get styles(): CSSResultGroup {
    return css`
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
        width: 100%;
      }
      .center-container {
        @apply --layout-vertical;
        @apply --layout-center-center;
        height: 70px;
      }
    `;
  }

  protected render(): TemplateResult {
    return html`
      <hass-subpage header="Konfiguracja bramki AIS dom">
        <div .narrow=${this.narrow}>
          <ha-config-section .isWide=${this.isWide}>
            <span slot="header">Wyłączenie bramki</span>
            <span slot="introduction"
              >W tej sekcji możesz zrestartować lub całkowicie wyłączyć bramkę
            </span>
            <ha-card header="Restart lub wyłączenie">
              <div class="card-content">
                W tej sekcji możesz zrestartować lub całkowicie wyłączyć bramkę
              </div>
              <div class="card-actions warning">
                <div>
                  <ha-call-service-button
                    class="warning"
                    .hass=${this.hass}
                    domain="script"
                    service="ais_restart_system"
                  >
                    <ha-icon icon="mdi:refresh">&nbsp;</ha-icon>Uruchom ponownie
                  </ha-call-service-button>
                </div>
                <div>
                  <ha-call-service-button
                    class="warning"
                    .hass=${this.hass}
                    domain="script"
                    service="ais_stop_system"
                    ><ha-icon icon="mdi:stop">&nbsp;</ha-icon>Wyłącz
                  </ha-call-service-button>
                </div>
              </div>
            </ha-card>
          </ha-config-section>
        </div>
      </hass-subpage>
    `;
  }
}

customElements.define("ha-config-ais-dom-config-power", HaConfigAisDomControl);

declare global {
  interface HTMLElementTagNameMap {
    "ha-config-ais-dom-config-power": HaConfigAisDomControl;
  }
}
