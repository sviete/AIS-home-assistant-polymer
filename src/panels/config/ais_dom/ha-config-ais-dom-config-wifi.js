import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "@polymer/paper-icon-button/paper-icon-button";
import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";

import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";

import "./ha-config-ais-dom-dashboard";
import { showConfigFlowDialog } from "../../../dialogs/config-flow/show-dialog-config-flow";
import { fireEvent } from "../../../common/dom/fire_event";

import "../../../components/state-history-charts";
import { processConfigEntities } from "../../lovelace/common/process-config-entities";

/*
 *
 */
class HaConfigAisDomControl extends PolymerElement {
  static get template() {
    return html`
      <style include="iron-flex ha-style">
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
      </style>

      <hass-subpage header="Konfiguracja bramki AIS dom">
        <div class$="[[computeClasses(isWide)]]">
          <ha-config-section is-wide="[[isWide]]">
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
                    <mwc-button on-click="showLocalIpInfo"
                      >[[aisLocalHostName]]</mwc-button
                    ><paper-icon-button
                      class="user-button"
                      icon="hass:settings"
                      on-click="createFlowHostName"
                    ></paper-icon-button>
                  </div>
                </div>
                <div on-click="showLocalIpInfo" style="text-align: center;">
                  <div class="aisInfoRow">Lokalny adres IP</div>
                  <div class="aisInfoRow">
                    <mwc-button>[[aisLocalIP]]</mwc-button>
                  </div>
                </div>
                <div on-click="showWiFiSpeedInfo" style="text-align: center;">
                  <div class="aisInfoRow">Prędkość połączenia WiFi</div>
                  <div class="aisInfoRow">
                    <mwc-button>[[aisWiFiSpeed]]</mwc-button>
                  </div>
                </div>
              </div>
              <div class="card-actions">
                <div>
                  <paper-icon-button
                    class="user-button"
                    icon="hass:wifi"
                    on-click="showWiFiGroup"
                  ></paper-icon-button
                  ><mwc-button on-click="createFlowWifi"
                    >Konfigurator połączenia z siecą WiFi</mwc-button
                  >
                </div>
              </div>
            </ha-card>
          </ha-config-section>
        </div>
      </hass-subpage>
    `;
  }

  static get properties() {
    return {
      hass: Object,
      isWide: Boolean,
      showAdvanced: Boolean,
      aisLocalHostName: {
        type: String,
        computed: "_computeAisLocalHostName(hass)",
      },

      aisLocalIP: {
        type: String,
        computed: "_computeAisLocalIP(hass)",
      },

      aisWiFiSpeed: {
        type: String,
        computed: "_computeAisWiFiSpeed(hass)",
      },
      _config: Object,
      _names: Object,
      _entities: Array,
      _cacheConfig: Object,
    };
  }

  computeClasses(isWide) {
    return isWide ? "content" : "content narrow";
  }

  _computeAisLocalHostName(hass) {
    return hass.states["sensor.local_host_name"].state;
  }

  _computeAisLocalIP(hass) {
    return hass.states["sensor.internal_ip_address"].state;
  }

  _computeAisWiFiSpeed(hass) {
    return hass.states["sensor.ais_wifi_service_current_network_info"].state;
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

  ready() {
    super.ready();
    const entities = processConfigEntities([
      "sensor.ais_wifi_service_current_network_info",
    ]);

    const _entities = [];
    const _names = {};
    for (const entity of entities) {
      _entities.push(entity.entity);
      if (entity.name) {
        _names[entity.entity] = entity.name;
      }
    }

    this.setProperties({
      _cacheConfig: {
        cacheKey: _entities.join(),
        hoursToShow: 24,
        refresh: 0,
      },
      _entities,
      _names,
    });
  }
}

customElements.define("ha-config-ais-dom-config-wifi", HaConfigAisDomControl);
