import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "@polymer/paper-icon-button/paper-icon-button";
import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";

import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";

import "./ha-config-ais-dom-navigation";

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
        .center-container {
          @apply --layout-vertical;
          @apply --layout-center-center;
          height: 70px;
        }
      </style>

      <hass-subpage header="Konfiguracja bramki AIS dom">
        <div class$="[[computeClasses(isWide)]]">
          <ha-config-section is-wide="[[isWide]]">
            <span slot="header">Oprogramowanie bramki</span>
            <span slot="introduction"
              >Możesz zaktualizować system do najnowszej wersji i
              zsynchronizować bramkę z Portalem Integratora</span
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
                Jeśli ostatnio wprowadzałeś zmiany w Portalu Integratora, takie
                jak dodanie nowych typów audio czy też dostęp do zewnętrznych
                serwisów. To przyciskiem poniżej możesz uruchomić natychmiastowe
                pobranie tych zmian na bramkę bez czekania na automatyczną
                synchronizację.
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
        </div>
      </hass-subpage>
    `;
  }

  static get properties() {
    return {
      hass: Object,
      isWide: Boolean,
      showAdvanced: Boolean,
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

  computeClasses(isWide) {
    return isWide ? "content" : "content narrow";
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
}

customElements.define("ha-config-ais-dom-config-update", HaConfigAisDomControl);
