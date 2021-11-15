import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";

import "./ha-config-ais-dom-dashboard";
import { css, html, CSSResultArray, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import { showConfigFlowDialog } from "../../../dialogs/config-flow/show-dialog-config-flow";
import { fireEvent } from "../../../common/dom/fire_event";
import { haStyle } from "../../../resources/styles";
import { HomeAssistant } from "../../../types";

@customElement("ha-config-ais-dom-config-wifi")
class HaConfigAisDomConfigWifi extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public isWide = true;

  @property({ type: Boolean }) public narrow = false;

  protected async firstUpdated() {
    // console.log("ok");
  }

  protected render(): TemplateResult {
    if (!this.hass) {
      return html``;
    }

    return html`
      <hass-subpage header="Konfiguracja bramki AIS dom">
        <div .narrow=${this.narrow}>
          <ha-config-section .isWide=${this.isWide}>
            <span slot="header">Połączenie WiFi</span>
            <span slot="introduction"
              >Możesz sprawdzić lub skonfigurować parametry połączenia
              WiFi</span
            >
            <ha-card header="Parametry sieci">
              <div class="card-content" style="display: flex;">
                <div style="text-align: center;">
                  <div class="aisInfoRow">Lokalna nazwa hosta</div>
                  <div class="aisInfoRow">
                    <mwc-button
                      >${this.hass.states["sensor.local_host_name"].state}
                      <ha-icon
                        class="user-button"
                        icon="hass:cog"
                        @click=${this.createFlowHostName}
                      ></ha-icon>
                    </mwc-button>
                  </div>
                </div>
                <div style="text-align: center;" @click=${this.showLocalIpInfo}>
                  <div class="aisInfoRow">Lokalny adres IP</div>
                  <div class="aisInfoRow">
                    <mwc-button
                      >${this.hass.states["sensor.internal_ip_address"]
                        .state}</mwc-button
                    >
                  </div>
                </div>
                <div
                  @click=${this.showWiFiSpeedInfo}
                  style="text-align: center;"
                >
                  <div class="aisInfoRow">Prędkość połączenia WiFi</div>
                  <div class="aisInfoRow">
                    <mwc-button
                      >${this.hass.states[
                        "sensor.ais_wifi_service_current_network_info"
                      ].state}</mwc-button
                    >
                  </div>
                </div>
              </div>
              <div class="card-actions">
                <ha-icon
                  class="user-button"
                  icon="hass:wifi"
                  @click=${this.showWiFiGroup}
                ></ha-icon
                ><mwc-button @click=${this.createFlowWifi}
                  >Konfigurator połączenia z siecą WiFi</mwc-button
                >
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
        div.aisInfoRow {
          display: inline-block;
        }
        .center-container {
          @apply --layout-vertical;
          @apply --layout-center-center;
          height: 70px;
        }
        div.card-actions {
          text-align: center;
        }
      `,
    ];
  }

  showWiFiGroup() {
    fireEvent(this, "hass-more-info", {
      entityId: "group.internet_status",
    });
  }

  showWiFiSpeedInfo() {
    fireEvent(this, "hass-more-info", {
      entityId: "sensor.ais_wifi_service_current_network_info",
    });
  }

  showLocalIpInfo() {
    fireEvent(this, "hass-more-info", {
      entityId: "sensor.internal_ip_address",
    });
  }

  _continueFlow(flowId) {
    showConfigFlowDialog(this, {
      continueFlowId: flowId,
      dialogClosedCallback: () => {
        // eslint-disable-next-line no-console
        console.log("OK");
      },
    });
  }

  createFlowHostName() {
    this.hass
      .callApi("POST", "config/config_entries/flow", {
        handler: "ais_host",
      })
      .then((result) => {
        // eslint-disable-next-line no-console
        this._continueFlow(result.flow_id);
      });
  }

  createFlowWifi() {
    this.hass
      .callApi("POST", "config/config_entries/flow", {
        handler: "ais_wifi_service",
      })
      .then((result) => {
        // eslint-disable-next-line no-console
        console.log(result);
        this._continueFlow(result.flow_id);
      });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-config-ais-dom-config-wifi": HaConfigAisDomConfigWifi;
  }
}
