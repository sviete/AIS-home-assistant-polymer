import "@material/mwc-button";
import "@polymer/paper-input/paper-input";
import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";

import "../../../components/ha-card";
import "../../../components/buttons/ha-call-service-button";
import "../../../resources/ha-style";
import "../../../state-summary/state-card-input_number";

import "../ha-config-section";
import "./ais-webhooks";

import { showConfigFlowDialog } from "../../../dialogs/config-flow/show-dialog-config-flow";
import LocalizeMixin from "../../../mixins/localize-mixin";
import { fireEvent } from "../../../common/dom/fire_event";

/*
 * @appliesMixin LocalizeMixin
 */
class HaConfigSectionAisDomControl extends LocalizeMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="iron-flex ha-style">
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

        div.person {
          display: inline-block;
          margin: 10px;
        }

        img {
          border-radius: 50%;
          width: 100px;
          height: 100px;
          border: 20px;
        }
        img.person-img-selected {
          border: 7px solid #ff9800;
          width: 110px;
          height: 110px;
        }
        div.aisInfoRow {
          display: inline-block;
        }
        div.card-content {
          width: 600px;
        }
      </style>
      <ha-config-section is-wide="[[isWide]]">
        <span slot="header">Oprogramowanie bramki</span>
        <span slot="introduction"
          >Możesz zaktualizować system do najnowszej wersji i zsynchronizować
          bramkę z Portalem Integratora</span
        >
        <ha-card header="Wersja systemu Asystent domowy">
          <div class="card-content">
            [[aisVersionInfo]]
            <div class="center-container">
              <ha-call-service-button
                class="warning"
                hass="[[hass]]"
                domain="ais_shell_command"
                service="execute_upgrade"
                service-data="[[aisUpdateSystemData]]"
                >[[aisButtonVersionCheckUpgrade]]
              </ha-call-service-button>
            </div>
          </div>
        </ha-card>
        <ha-card header="Synchronizacja z Portalem Integratora">
          <div class="card-content">
            Jeśli ostatnio wprowadzałeś zmiany w Portalu Integratora, takie jak
            dodanie nowych typów audio czy też dostęp do zewnętrznych serwisów.
            To przyciskiem poniżej możesz uruchomić natychmiastowe pobranie tych
            zmian na bramkę bez czekania na automatyczną synchronizację.
            <div class="center-container">
              <ha-call-service-button
                class="warning"
                hass="[[hass]]"
                domain="script"
                service="ais_cloud_sync"
                >Synchronizuj z Portalem Integratora
              </ha-call-service-button>
            </div>
          </div>
        </ha-card>
      </ha-config-section>

      <ha-config-section is-wide="[[isWide]]">
        <span slot="header">Konfiguracja bramki</span>
        <span slot="introduction"
          >W tej sekcji możesz skonfigurować parametry bramki</span
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
          <div class="center-container" style="height: 0px;">
            <ha-call-service-button
              class="info"
              hass="[[hass]]"
              domain="script"
              service="fake_script"
            >
            </ha-call-service-button>
          </div>
        </ha-card>
        <ha-card header="Wybór głosu Asystenta">
          <div class="card-content">
            <div class="person">
              <img
                class$='[[personImgClass(selectedVoice, "Jola online")]]'
                data-voice="Jola online"
                alt="Jola Online"
                title="Jola Online"
                on-click="switchTtsPerson"
                src="/static/ais_dom/Ania.png"
              />
            </div>
            <div class="person">
              <img
                class$='[[personImgClass(selectedVoice, "Jola lokalnie")]]'
                data-voice="Jola lokalnie"
                alt="Jola Lokalnie"
                title="Jola Lokalnie"
                on-click="switchTtsPerson"
                src="/static/ais_dom/Asia.png"
              />
            </div>
            <div class="person">
              <img
                class$='[[personImgClass(selectedVoice, "Celina")]]'
                data-voice="Celina"
                alt="Celina"
                title="Celina"
                on-click="switchTtsPerson"
                src="/static/ais_dom/Celka.png"
              />
            </div>
            <div class="person">
              <img
                class$='[[personImgClass(selectedVoice, "Anżela")]]'
                data-voice="Anżela"
                alt="Anżela"
                title="Anżela"
                on-click="switchTtsPerson"
                src="/static/ais_dom/Anzela.png"
              />
            </div>
            <div class="person">
              <img
                class$='[[personImgClass(selectedVoice, "Asia")]]'
                data-voice="Asia"
                alt="Asia"
                title="Asia"
                on-click="switchTtsPerson"
                src="/static/ais_dom/Kasia.png"
              />
            </div>
            <div class="person">
              <img
                class$='[[personImgClass(selectedVoice, "Sebastian")]]'
                data-voice="Sebastian"
                alt="Sebastian"
                title="Sebastian"
                on-click="switchTtsPerson"
                src="/static/ais_dom/Sebastian.png"
              />
            </div>
            <div class="person">
              <img
                class$='[[personImgClass(selectedVoice, "Bartek")]]'
                data-voice="Bartek"
                alt="Bartek"
                title="Bartek"
                on-click="switchTtsPerson"
                src="/static/ais_dom/Bartek.png"
              />
            </div>
            <div class="person">
              <img
                class$='[[personImgClass(selectedVoice, "Andrzej")]]'
                data-voice="Andrzej"
                alt="Andrzej"
                title="Andrzej"
                on-click="switchTtsPerson"
                src="/static/ais_dom/Andrzej.png"
              />
            </div>
          </div>
          <div class="card-actions person-actions">
            <div on-click="tuneVoiceTone">
              <paper-icon-button
                class="user-button"
                icon="hass:tune"
              ></paper-icon-button
              ><mwc-button>Ton mowy</mwc-button>
            </div>
            <div on-click="tuneVoiceSpeed">
              <paper-icon-button
                class="user-button"
                icon="hass:play-speed"
              ></paper-icon-button
              ><mwc-button>Szybkość mowy</mwc-button>
            </div>
            <div>
              <paper-icon-button
                class="user-button"
                icon="hass:account"
              ></paper-icon-button
              ><mwc-button>[[selectedVoice]]</mwc-button>
            </div>
          </div>
        </ha-card>
      </ha-config-section>

      <ha-config-section is-wide="[[isWide]]">
        <span slot="header">Zdalny dostęp</span>
        <span slot="introduction"
          >W tej sekcji możesz skonfigurować zdalny dostęp do bramki</span
        >
        <ha-card header="Szyfrowany tunel">
          <paper-toggle-button
            checked="{{remoteConnected}}"
            on-change="changeRemote"
          ></paper-toggle-button>
          <div class="card-content">
            Tunel zapewnia bezpieczne zdalne połączenie z Twoim urządzeniem
            kiedy jesteś z dala od domu. Twoja bramka dostępna [[remoteInfo]] z
            Internetu pod adresem
            <a href="[[remoteDomain]]" target="_blank">[[remoteDomain]]</a>.
            <div class="center-container" style="height:100px">
              <div on-click="showBarcodeInfo">
                <svg style="width:48px;height:48px" viewBox="0 0 24 24">
                  <path
                    fill="#ffffff"
                    d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H11V13H9V11M15,11H17V13H19V11H21V13H19V15H21V19H19V21H17V19H13V21H11V17H15V15H17V13H15V11M19,19V15H17V19H19M15,3H21V9H15V3M17,5V7H19V5H17M3,3H9V9H3V3M5,5V7H7V5H5M3,15H9V21H3V15M5,17V19H7V17H5Z"
                  />
                </svg>
              </div>
              Kliknij obrazek z kodem by go powiększyć, a następnie zeskanuj kod
              QR za pomocą aplikacji na telefonie.
            </div>
          </div>
          <div class="card-actions">
            <a
              href="https://sviete.github.io/AIS-docs/docs/en/ais_bramka_remote_www_index.html"
              target="_blank"
            >
              <mwc-button>Dowiedz się jak to działa</mwc-button>
            </a>
          </div>
        </ha-card>

        <ais-webhooks hass="[[hass]]"></ais-webhooks>
      </ha-config-section>
      <ha-config-section is-wide="[[isWide]]">
        <span slot="header">Zatrzymanie bramki</span>
        <ha-card header="Restart lub wyłączenie">
          <div class="card-content">
            W tej sekcji możesz zrestartować lub całkowicie wyłączyć bramkę
            <div class="center-container" style="height: 0px;">
              <ha-call-service-button
                class="info"
                hass="[[hass]]"
                domain="script"
                service="fake_script"
              >
              </ha-call-service-button>
            </div>
          </div>
          <div class="card-actions warning">
            <div>
              <paper-icon-button
                class="user-button"
                icon="hass:refresh"
              ></paper-icon-button>
              <ha-call-service-button
                class="warning"
                hass="[[hass]]"
                domain="script"
                service="ais_restart_system"
                >Uruchom ponownie
              </ha-call-service-button>
            </div>
            <div>
              <paper-icon-button
                class="user-button"
                icon="hass:stop"
              ></paper-icon-button>
              <ha-call-service-button
                class="warning"
                hass="[[hass]]"
                domain="script"
                service="ais_stop_system"
                >Zatrzymaj
              </ha-call-service-button>
            </div>
          </div>
        </ha-card>
      </ha-config-section>
    `;
  }

  static get properties() {
    return {
      hass: {
        type: Object,
      },

      isWide: {
        type: Boolean,
        value: false,
      },

      remoteInfo: {
        type: String,
        value: "jest",
      },

      remoteDomain: {
        type: String,
        computed: "_computeRemoteDomain(hass)",
      },

      remoteConnected: {
        type: Boolean,
        computed: "_computeRremoteConnected(hass)",
      },

      aisVersionInfo: {
        type: String,
        computed: "_computeAisVersionInfo(hass)",
      },

      selectedVoice: {
        type: String,
        computed: "_computeAisSelectedVoice(hass)",
      },

      aisButtonVersionCheckUpgrade: {
        type: String,
        computed: "_computeAisButtonVersionCheckUpgrade(hass)",
      },

      aisUpdateSystemData: {
        type: Object,
        value: { say: true },
      },

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
    };
  }

  _computeRemoteDomain(hass) {
    return (
      "https://" +
      hass.states["sensor.ais_secure_android_id_dom"].state +
      ".paczka.pro"
    );
  }

  _computeAisVersionInfo(hass) {
    return hass.states["sensor.version_info"].state;
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

  _computeAisButtonVersionCheckUpgrade(hass) {
    if ("reinstall_dom_app" in hass.states["sensor.version_info"].attributes) {
      if (hass.states["sensor.version_info"].attributes.reinstall_dom_app) {
        return "Zainstaluj aktualizację";
      }
    }
    return "Sprawdz dostępność aktualizacji";
  }

  _computeRremoteConnected(hass) {
    if (hass.states["input_boolean.ais_remote_access"].state === "on") {
      this.remoteInfo = "jest";
      return true;
    }
    this.remoteInfo = "będzie";
    return false;
  }

  _computeAisSelectedVoice(hass) {
    return hass.states["input_select.assistant_voice"].state;
  }

  personImgClass(selectedVoice, person) {
    if (selectedVoice === person) {
      return "person-img-selected";
    }
    return "";
  }

  changeRemote() {
    this.hass.callService("input_boolean", "toggle", {
      entity_id: "input_boolean.ais_remote_access",
    });
  }

  showBarcodeInfo() {
    fireEvent(this, "hass-more-info", { entityId: "camera.remote_access" });
  }

  tuneVoiceSpeed() {
    fireEvent(this, "hass-more-info", {
      entityId: "input_number.assistant_rate",
    });
  }

  tuneVoiceTone() {
    fireEvent(this, "hass-more-info", {
      entityId: "input_number.assistant_tone",
    });
  }

  switchTtsPerson(e) {
    this.hass.callService("input_select", "select_option", {
      entity_id: "input_select.assistant_voice",
      option: e.target.dataset.voice,
    });
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
        console.log(result);
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

customElements.define(
  "ha-config-section-ais-dom-control",
  HaConfigSectionAisDomControl
);
