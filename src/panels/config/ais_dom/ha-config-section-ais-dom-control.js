import "@material/mwc-button";
import "@polymer/paper-input/paper-input";
import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";

import "../../../components/ha-card";
import "../../../components/buttons/ha-call-service-button";
import "../../../resources/ha-style";

import "../ha-config-section";

import isComponentLoaded from "../../../common/config/is_component_loaded";
import LocalizeMixin from "../../../mixins/localize-mixin";

/*
 * @appliesMixin LocalizeMixin
 */
class HaConfigSectionAisDomControl extends LocalizeMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="iron-flex ha-style">
        .validate-container {
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
      </style>
      <ha-config-section is-wide="[[isWide]]">
        <span slot="header">Kontrola bramki AIS dom</span>
        <span slot="introduction"
          >Na tej stronie możesz zmieniać parametry swojej bramki AIS dom</span
        >
        <ha-card header="Synchronizacja z Portalem Integratora">
          <div class="card-content">
            Jeśli ostatnio wprowadzałeś zmiany w Portalu Integratora, takie jak
            dodanie nowych typów audio czy też dostęp do zewnętrznych serwisów.
            To przyciskiem poniżej możesz uruchomić natychmiastowe pobranie tych
            zmian na bramkę bez czekania na automatyczną synchronizację.
            <div class="validate-container">
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

        <ha-card header="Zdalny dostęp z Internetu">
          <paper-toggle-button
            .checked="true"
            @change="changeRemote"
          ></paper-toggle-button>
          <div class="card-content">
            Tunel zapewnia bezpieczne zdalne połączenie z Twoim urządzeniem
            kiedy jesteś z dala od domu. \nTwoja bramka dostępna jest pod
            adresem
            <a href="[[remoteDomain]]" target="_blank">[[remoteDomain]]</a>.
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

        <ha-card header="Zarządzanie bramką">
          <div class="card-content">
            W tej sekcji możesz zrestartować lub całkowicie wyłączyć swoją
            bramkę AIS dom
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

      remoteDomain: {
        type: String,
        computed: "_computeRemoteDomain(hass, _domain, _service)",
      },
    };
  }

  _computeRemoteDomain(hass, domain, service) {
    return hass.states["camera.remote_access"].state;
  }
  // _computeRemoteConnected(hass, domain, service) {
  //   if (hass.states["input_boolean.ais_remote_access"].state == "on") {
  //     return "checked";
  //   };
  //   return "";
  // }

  changeRemote() {
    console.log("OK");
  }
}

customElements.define(
  "ha-config-section-ais-dom-control",
  HaConfigSectionAisDomControl
);
