import "@material/mwc-button";
import "@polymer/paper-input/paper-input";
import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";

import "../../../components/ha-card";
import "../../../components/buttons/ha-call-service-button";
import "../../../resources/ha-style";
import "../../../state-summary/state-card-input_number";

import "../ha-config-section";

import isComponentLoaded from "../../../common/config/is_component_loaded";
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
        .barcode-button {
          --paper-icon-button: {
            width: 60px;
            height: 60px;
          }
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
        <span slot="header">Wybór głosu Asystenta</span>
        <span slot="introduction">Wybierz głos swojego Asystenta domowego</span>
        <ha-card header="Konfiguracja głosu Asystenta domowego">
          <div class="card-content">
            Wybierz głos asystenta
            <paper-icon-button
              class="barcode-button"
              icon="hass:qrcode-scan"
              on-click="showBarcodeInfo"
            ></paper-icon-button>
            <paper-icon-button
              class="barcode-button"
              icon="hass:qrcode-scan"
              on-click="showBarcodeInfo"
            ></paper-icon-button>
            <paper-icon-button
              class="barcode-button"
              icon="hass:qrcode-scan"
              on-click="showBarcodeInfo"
            ></paper-icon-button>
            <paper-icon-button
              class="barcode-button"
              icon="hass:qrcode-scan"
              on-click="showBarcodeInfo"
            ></paper-icon-button>
            <paper-icon-button
              class="barcode-button"
              icon="hass:qrcode-scan"
              on-click="showBarcodeInfo"
            ></paper-icon-button>
            <paper-icon-button
              class="barcode-button"
              icon="hass:qrcode-scan"
              on-click="showBarcodeInfo"
            ></paper-icon-button>
            <paper-icon-button
              class="barcode-button"
              icon="hass:qrcode-scan"
              on-click="showBarcodeInfo"
            ></paper-icon-button>
            <paper-icon-button
              class="barcode-button"
              icon="hass:qrcode-scan"
              on-click="showBarcodeInfo"
            ></paper-icon-button>
            <state-card-input_number min="0.1" max="2" value="1" step="0.1">
            </state-card-input_number>
          </div>
        </ha-card>
      </ha-config-section>

      <ha-config-section is-wide="[[isWide]]">
        <span slot="header">Konfiguracja bramki</span>
        <span slot="introduction"
          >W tej sekcji możesz skonfigurować parametry bramki</span
        >
        <ha-card header="Zdalny dostęp">
          <paper-toggle-button
            checked="{{remoteConnected}}"
            on-change="changeRemote"
          ></paper-toggle-button>
          <div class="card-content">
            Tunel zapewnia bezpieczne zdalne połączenie z Twoim urządzeniem
            kiedy jesteś z dala od domu. Twoja bramka dostępna [[remoteInfo]] z
            Internetu pod adresem
            <a href="[[remoteDomain]]" target="_blank">[[remoteDomain]]</a>.
            <div class="center-container">
              <paper-icon-button
                class="barcode-button"
                icon="hass:qrcode-scan"
                on-click="showBarcodeInfo"
              ></paper-icon-button>
              Kliknij ikonę powyżej, a następnie zeskanuj kod QR za pomocą
              aplikacji na telefonie.
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

        <ha-card header="Restart lub wyłączenie">
          <div class="card-content">
            W tej sekcji możesz zrestartować lub całkowicie wyłączyć bramkę
          </div>
          <div class="card-actions warning">
            <ha-call-service-button
              class="warning"
              hass="[[hass]]"
              domain="script"
              service="ais_restart_system"
              >Uruchom ponownie
            </ha-call-service-button>
            <ha-call-service-button
              class="warning"
              hass="[[hass]]"
              domain="script"
              service="ais_stop_system"
              >Zatrzymaj
            </ha-call-service-button>
          </div>
        </ha-card>

        <ha-card header="x">
          <div class="card-content">
            yyy
            <div class="center-container">
              <ha-call-service-button></ha-call-service-button>
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

      aisButtonVersionCheckUpgrade: {
        type: String,
        computed: "_computeAisButtonVersionCheckUpgrade(hass)",
      },

      aisUpdateSystemData: {
        type: Object,
        value: { say: true },
      },
    };
  }

  _computeRemoteDomain(hass) {
    return hass.states["camera.remote_access"].state;
  }
  _computeAisVersionInfo(hass) {
    return hass.states["sensor.version_info"].state;
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
    if (hass.states["input_boolean.ais_remote_access"].state == "on") {
      this.remoteInfo = "jest";
      return true;
    }
    this.remoteInfo = "będzie";
    return false;
  }

  changeRemote() {
    this.hass.callService("input_boolean", "toggle", {
      entity_id: "input_boolean.ais_remote_access",
    });
  }

  showBarcodeInfo() {
    fireEvent(this, "hass-more-info", { entityId: "camera.remote_access" });
  }
}

customElements.define(
  "ha-config-section-ais-dom-control",
  HaConfigSectionAisDomControl
);
