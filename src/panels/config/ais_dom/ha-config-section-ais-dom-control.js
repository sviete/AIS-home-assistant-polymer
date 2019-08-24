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

  _computeAisSelectedVoice(hass) {
    return hass.states["input_select.assistant_voice"].state;
  }

  personImgClass(selectedVoice, person) {
    console.log(selectedVoice, person);
    if (selectedVoice == person) {
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
}

customElements.define(
  "ha-config-section-ais-dom-control",
  HaConfigSectionAisDomControl
);
