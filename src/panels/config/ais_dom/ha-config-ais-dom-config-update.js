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
        table {
          width: 100%;
        }

        td:first-child {
          width: 33%;
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
                <div>
                  <div style="margin-top:30px;">
                    <paper-toggle-button
                      checked="{{autoUpdateMode}}"
                      on-change="changeAutoUpdateMode"
                      style="position: absolute; right: 20px;"
                    ></paper-toggle-button
                    ><span><h3>Autoaktualizacja</h3></span>
                  </div>
                </div>

                <div style="display: inline-block;">
                  <div>
                    [[aisAutoUpdateInfo]]
                  </div>
                  <div style="margin-top: 15px;">
                    <table>
                      <template
                        is="dom-repeat"
                        items="[[aisAutoUpdatFullInfo]]"
                      >
                        <tr>
                          <td>[[item.name]]</td>
                          <td>[[item.value]]</td>
                          <td>[[item.new_value]]</td>
                          <td><iron-icon icon="[[item.icon]]"></iron-icon></td>
                        </tr>
                      </template>
                    </table>
                  </div>
                </div>
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
                serwisów, to przyciskiem poniżej możesz uruchomić natychmiastowe
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

      aisAutoUpdateInfo: {
        type: String,
      },
      aisAutoUpdatFullInfo: {
        type: Array,
        value: [],
      },
      aisButtonVersionCheckUpgrade: {
        type: String,
        computed: "_computeAisButtonVersionCheckUpgrade(hass)",
      },
      aisUpdateSystemData: {
        type: Object,
        value: { say: true },
      },
      autoUpdateMode: {
        type: Boolean,
        computed: "_computeAutoUpdateMode(hass)",
      },
    };
  }

  computeClasses(isWide) {
    return isWide ? "content" : "content narrow";
  }

  _computeAisVersionInfo(hass) {
    function getVersionName(status) {
      var retS = "Nieznany";
      if (status === "checking") {
        retS = "Sprawdzanie";
      } else if (status === "outdated") {
        retS = "Nieaktualny";
      } else if (status === "downloading") {
        retS = "Pobieranie";
      } else if (status === "installing") {
        retS = "Instalowanie";
      } else if (status === "updated") {
        retS = "Aktualny";
      }
      return retS;
    }

    function getVersionIcon(status) {
      var retS = "";
      if (status === "checking") {
        retS = "mdi:cloud-sync";
      } else if (status === "outdated") {
        retS = "";
      } else if (status === "downloading") {
        retS = "mdi:progress-download";
      } else if (status === "installing") {
        retS = "mdi:progress-wrench";
      } else if (status === "updated") {
        retS = "mdi:emoticon-happy-outline";
      }
      return retS;
    }

    var versionInfo = hass.states["sensor.version_info"];
    var versionInfoAttr = versionInfo.attributes;
    this.aisAutoUpdatFullInfo = [];

    if ("update_check_time" in versionInfoAttr) {
      this.aisAutoUpdatFullInfo.push({
        name: "Sprawdzono o",
        value: versionInfoAttr.update_check_time,
        icon: "",
      });
    }

    if ("update_status" in versionInfoAttr) {
      this.aisAutoUpdatFullInfo.push({
        name: "Status",
        value: getVersionName(versionInfoAttr.update_status),
        icon: getVersionIcon(versionInfoAttr.update_status),
      });
    }

    if ("dom_app_current_version" in versionInfoAttr) {
      this.aisAutoUpdatFullInfo.push({
        name: "Asystent domowy",
        value: versionInfoAttr.dom_app_current_version,
        new_value: versionInfoAttr.dom_app_newest_version,
        icon: versionInfoAttr.reinstall_dom_app ? "hass:alert" : "hass:check",
      });
    }
    if ("android_app_current_version" in versionInfoAttr) {
      this.aisAutoUpdatFullInfo.push({
        name: "Android",
        value: versionInfoAttr.android_app_current_version,
        new_value: versionInfoAttr.android_app_newest_version,
        icon: versionInfoAttr.reinstall_android_app
          ? "hass:alert"
          : "hass:check",
      });
    }
    if ("linux_current_version" in versionInfoAttr) {
      this.aisAutoUpdatFullInfo.push({
        name: "Linux",
        value: versionInfoAttr.linux_current_version,
        new_value: versionInfoAttr.linux_apt_newest_version,
        icon: versionInfoAttr.reinstall_linux_app ? "hass:alert" : "hass:check",
      });
    }

    return versionInfo.state;
  }

  _computeAisButtonVersionCheckUpgrade(hass) {
    if ("reinstall_dom_app" in hass.states["sensor.version_info"].attributes) {
      if (hass.states["sensor.version_info"].attributes.reinstall_dom_app) {
        return "Zainstaluj teraz aktualizację";
      }
    }
    return "Sprawdz dostępność aktualizacji";
  }

  _computeAutoUpdateMode(hass) {
    if (hass.states["input_boolean.ais_auto_update"].state === "off") {
      this.aisAutoUpdateInfo =
        "System Asystent domowy możesz aktualizować samodzielnie w dogodnym dla Ciebie czasie lub włączyć aktualizację automatyczną. Gdy aktualizacja automatyczna zostanie włączona, to każdego dnia system sprawdza, czy są dostępne nowe wersje komponentów systemu i je automatycznie aktualizuje. Dzięki czemu zawsze korzystasz z najnowszych funkcji systemu oraz poprawek zapewniających bezpieczeństwo i stabilność działania aplikacji.";
      return false;
    }
    this.aisAutoUpdateInfo =
      "Autoaktualizacja komponentów systemu Asystent domowy jest włączona. Jeśli podczas codziennego sprawdzenia dostępności nowej wersji będzie dostępna aktualizacja, to ją automatycznie zainstalujemy.";
    return true;
  }

  changeAutoUpdateMode() {
    this.hass.callService("input_boolean", "toggle", {
      entity_id: "input_boolean.ais_auto_update",
    });
  }
}

customElements.define("ha-config-ais-dom-config-update", HaConfigAisDomControl);
