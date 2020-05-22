import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "@polymer/paper-radio-button/paper-radio-button";
import "@polymer/paper-radio-group/paper-radio-group";
import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";

import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";

import "./ha-config-ais-dom-dashboard";
import "../../../components/ha-switch";
import "../../../components/buttons/ha-call-service-button";
import "../../../components/ha-icon";

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

        .validate-container {
          @apply --layout-vertical;
          @apply --layout-center-center;
          min-height: 140px;
        }

        .validate-result {
          color: var(--google-green-500);
          font-weight: 500;
        }

        .config-invalid .text {
          color: var(--google-red-500);
          font-weight: 500;
        }

        .config-invalid {
          text-align: center;
          margin-top: 20px;
        }

        .validate-log {
          white-space: pre-wrap;
          direction: ltr;
        }
      </style>

      <hass-subpage header="Konfiguracja bramki AIS dom">
        <div class$="[[computeClasses(isWide)]]">
          <ha-config-section is-wide="[[isWide]]">
            <span slot="header">Oprogramowanie bramki</span>
            <span slot="introduction"
              >Możesz zaktualizować system do najnowszej wersji, wykonać kopię
              zapasową ustawień i zsynchronizować bramkę z Portalem
              Integratora</span
            >
            <ha-card header="Wersja systemu Asystent domowy">
              <div class="card-content">
                [[aisVersionInfo]]
                <div>
                  <div style="margin-top:30px;" id="ha-switch-id">
                    <ha-switch
                      checked="{{autoUpdateMode}}"
                      on-change="changeAutoUpdateMode"
                      style="position: absolute; right: 20px;"
                    ></ha-switch
                    ><span
                      ><h3>
                        Autoaktualizacja
                        <ha-icon icon="[[aisAutoUpdateIcon]]"></ha-icon></h3
                    ></span>
                  </div>
                </div>

                <div style="display: inline-block;">
                  <div>
                    [[aisAutoUpdateInfo]]
                  </div>
                  <div style="margin-top: 15px;">
                    Aktualizacje dostarczają najnowsze funkcjonalności oraz
                    poprawki zapewniające bezpieczeństwo i stabilność działania
                    systemu.
                    <table style="margin-top: 10px;">
                      <template
                        is="dom-repeat"
                        items="[[aisAutoUpdatFullInfo]]"
                      >
                        <tr>
                          <td><ha-icon icon="[[item.name_icon]]"></ha-icon> [[item.name]]</td>
                          <td>[[item.value]]</td>
                          <td>[[item.new_value]]</td>
                          <td><ha-icon icon="[[item.icon]]"></ha-icon></td>
                        </tr>
                        <template
                            is="dom-if"
                            if="[[_isEqualTo(item.name, 'Status')]]"
                          >
                            <tr style="height: 1em;"></tr>
                          </template>
                      </template>
                    </table>
                  </div>
                </div>
                <div class="center-container">
                  <ha-call-service-button
                    class="warning"
                    hass="[[hass]]"
                    domain="ais_updater"
                    service="execute_upgrade"
                    service-data="[[aisUpdateSystemData]]"
                    >[[aisButtonVersionCheckUpgrade]]
                  </ha-call-service-button>
                </div>
              </div>
            </ha-card>

            <ha-card header="Kopia konfiguracji Bramki">
              <div class="card-content">
                W tym miejscu możesz, sprawdzić poprawność ustawień bramki,
                wykonać jej kopię i przesłać ją do portalu integratora. <b>Uwaga,
                ponieważ konfiguracja może zawierać hasła i tokeny dostępu do
                usług, zalecamy zaszyfrować ją hasłem</b>. Gdy kopia jest
                zabezpieczona hasłem, to można ją otworzyć/przywrócić tylko po
                podaniu hasła.
                <h2>
                  Nowa kopia ustawień
                  <ha-icon icon="mdi:cloud-upload-outline"></ha-icon>
                </h2>
                <br />
                <div class="center-container">
                  Kopia zapasowa ustawień:
                  <br />
                  <paper-radio-group selected="all" id="backup_type1">
                      <paper-radio-button name="all">Wszystkich</paper-radio-button>
                      <paper-radio-button name="ha">Home Assistant</paper-radio-button>
                      <paper-radio-button name="zigbee">Zigbee</paper-radio-button>
                  </paper-radio-group>
                  <br />
                  Przed wykonaniem nowej kopii ustawień sprawdź poprawność
                  konfiguracji
                </div>
                <br />
                <div style="border-bottom: 1px solid white;">
                  <template is="dom-if" if="[[!validateLog]]">
                    <div class="validate-container">
                      <div class="validate-result" id="result">
                        [[backupInfo]]
                      </div>
                      <template is="dom-if" if="[[!validating]]">
                        <div class="config-invalid">
                          <span class="text">
                            [[backupError]]
                          </span>
                        </div>
                        <template
                          is="dom-if"
                          if="[[_isEqualTo(backupStep, '1')]]"
                        >
                          <paper-input
                            placeholder="hasło"
                            no-label-float=""
                            type="password"
                            id="password1"
                          ></paper-input>
                        </template>
                        <mwc-button raised="" on-click="doBackup">
                          <template
                            is="dom-if"
                            if="[[_isEqualTo(backupStep, '0')]]"
                          >
                            Sprawdź konfigurację
                          </template>
                          <template
                            is="dom-if"
                            if="[[_isEqualTo(backupStep, '1')]]"
                          >
                            Wykonaj kopie konfiguracji
                          </template>
                        </mwc-button>
                      </template>
                      <template is="dom-if" if="[[validating]]">
                        <paper-spinner active=""></paper-spinner>
                      </template>
                    </div>
                  </template>
                  <template is="dom-if" if="[[validateLog]]">
                    <div class="config-invalid">
                      <mwc-button raised="" on-click="doBackup">
                        Popraw i sprawdź ponownie
                      </mwc-button>
                    </div>
                    <p></p>
                    <div id="configLog" class="validate-log">
                      [[validateLog]]
                    </div>
                  </template>
                </div>

                <template is="dom-if" if="[[isBackupValid]]">
                  <h2>
                    Przywracanie ustawień
                    <ha-icon icon="mdi:backup-restore"></ha-icon>
                  </h2>
                  <div class="validate-container">
                    <table style="margin-top: 40px; margin-bottom: 10px;">
                      <template is="dom-repeat" items="[[aisBackupFullInfo]]">
                        <tr>
                          <td><ha-icon icon="[[item.icon]]"></ha-icon> [[item.name]]</td>
                          <td>[[item.value]]</td>
                          <td>[[item.new_value]]</td>
                        </tr>
                      </template>
                    </table>
                      <div class="validate-container">
                        <div class="validate-result" id="result">
                          [[restoreInfo]]
                        </div>
                        <template is="dom-if" if="[[!validating]]">
                        <div class="config-invalid">
                          <span class="text">
                            [[restoreError]]
                          </span>
                        </div>
                        Przywracanie ustawień z kopii:
                        <br />
                        <paper-radio-group selected="all" id="backup_type2">
                            <paper-radio-button name="all">Wszystkich</paper-radio-button>
                            <paper-radio-button name="ha">Home Assistant</paper-radio-button>
                            <paper-radio-button name="zigbee">Zigbee</paper-radio-button>
                        </paper-radio-group>
                        <br />
                        <paper-input
                          placeholder="hasło"
                          no-label-float=""
                          type="password"
                          id="password2"
                        ></paper-input>
                        <mwc-button raised="" on-click="restoreBackup">
                          Przywróć konfigurację z kopii
                        </mwc-button>
                      </div>
                    </template>
                    <template is="dom-if" if="[[validating]]">
                      <paper-spinner active=""></paper-spinner>
                    </template>
                  </div>
                </template>
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
      aisVersionInfo: {
        type: String,
        computed: "_computeAisVersionInfo(hass)",
      },
      aisBackupInfo: {
        type: String,
        computed: "_computeAisBackupInfo(hass)",
      },
      aisAutoUpdateInfo: { type: String },
      aisAutoUpdateIcon: { type: String },
      aisAutoUpdatFullInfo: {
        type: Array,
        value: [],
      },
      aisBackupFullInfo: {
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
      validating: {
        type: Boolean,
        value: false,
      },
      backupStep: {
        type: String,
        value: "0",
        computed: "_computeAisBackupStep(hass)",
      },
      validateLog: {
        type: String,
        value: "",
      },
      backupInfo: {
        type: String,
        value: "",
      },
      backupError: {
        type: String,
        value: "",
      },
      restoreInfo: {
        type: String,
        value: "",
      },
      restoreError: {
        type: String,
        value: "",
      },
      isBackupValid: {
        type: Boolean,
        value: null,
      },
    };
  }

  ready() {
    super.ready();
    this.hass.callService("ais_cloud", "set_backup_step", {
      step: "0",
    });
    this.hass.callService("ais_cloud", "get_backup_info");
  }

  computeClasses(isWide) {
    return isWide ? "content" : "content narrow";
  }

  _computeAisVersionInfo(hass) {
    var versionInfo = hass.states["sensor.version_info"];
    var versionInfoAttr = versionInfo.attributes;
    this.aisAutoUpdatFullInfo = [];

    if ("update_check_time" in versionInfoAttr) {
      this.aisAutoUpdatFullInfo.push({
        name: "Sprawdzono o",
        name_icon: "",
        value: versionInfoAttr.update_check_time,
        icon: "",
      });
    }

    if ("update_status" in versionInfoAttr) {
      this.aisAutoUpdatFullInfo.push({
        name: "Status",
        name_icon: "",
        value: this.getVersionName(versionInfoAttr.update_status),
        icon: this.getVersionIcon(versionInfoAttr.update_status),
      });
    }

    if ("zigbee2mqtt_current_version" in versionInfoAttr) {
      this.aisAutoUpdatFullInfo.push({
        name: "Zigbee",
        name_icon: "mdi:zigbee",
        value: versionInfoAttr.zigbee2mqtt_current_version,
        new_value: versionInfoAttr.zigbee2mqtt_newest_version,
        icon: versionInfoAttr.reinstall_zigbee2mqtt
          ? "hass:alert"
          : "hass:check",
      });
    }

    if ("dom_app_current_version" in versionInfoAttr) {
      this.aisAutoUpdatFullInfo.push({
        name: "Home Assistant",
        name_icon: "mdi:home-assistant",
        value: versionInfoAttr.dom_app_current_version,
        new_value: versionInfoAttr.dom_app_newest_version,
        icon: versionInfoAttr.reinstall_dom_app ? "hass:alert" : "hass:check",
      });
    }
    if ("android_app_current_version" in versionInfoAttr) {
      this.aisAutoUpdatFullInfo.push({
        name: "Android",
        name_icon: "mdi:android",
        value: versionInfoAttr.android_app_current_version,
        new_value: versionInfoAttr.android_app_newest_version,
        icon: versionInfoAttr.reinstall_android_app
          ? "hass:alert"
          : "hass:check",
      });
    }
    if ("linux_apt_current_version" in versionInfoAttr) {
      this.aisAutoUpdatFullInfo.push({
        name: "Linux",
        name_icon: "mdi:linux",
        value: versionInfoAttr.linux_apt_current_version,
        new_value: versionInfoAttr.linux_apt_newest_version,
        icon: versionInfoAttr.reinstall_linux_apt ? "hass:alert" : "hass:check",
      });
    }

    return versionInfo.state;
  }

  _computeAisBackupStep(hass) {
    var backupInfo = hass.states["sensor.aisbackupinfo"];
    if (backupInfo.state === "0") {
      this.validating = false;
    }
    return backupInfo.state;
  }

  _computeAisBackupInfo(hass) {
    var backupInfo = hass.states["sensor.aisbackupinfo"];
    var backupInfoAttr = backupInfo.attributes;
    this.aisBackupFullInfo = [];
    this.isBackupValid = false;
    this.backupInfo = backupInfoAttr.backup_info;
    this.backupError = backupInfoAttr.backup_error;
    this.restoreInfo = backupInfoAttr.restore_info;
    this.restoreError = backupInfoAttr.restore_error;
    if ("file_size" in backupInfoAttr) {
      this.isBackupValid = !!backupInfoAttr.file_name;
      this.aisBackupFullInfo.push({
        name: "Home Assistant",
        value: backupInfoAttr.file_name,
        new_value: backupInfoAttr.file_size,
        icon: "mdi:home-assistant",
      });
    }
    if ("file_zigbee_size" in backupInfoAttr) {
      this.isBackupValid = !!backupInfoAttr.file_zigbee_name;
      this.aisBackupFullInfo.push({
        name: "Zigbee",
        value: backupInfoAttr.file_zigbee_name,
        new_value: backupInfoAttr.file_zigbee_size,
        icon: "mdi:zigbee",
      });
    }
    return backupInfo.state;
  }

  getVersionName(status) {
    var retS = status;
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
    } else if (status === "unknown") {
      retS = "Nieznany";
    } else if (status === "restart") {
      retS = "Restartowanie";
    }
    return retS;
  }

  getVersionIcon(status) {
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
    } else if (status === "unknown") {
      retS = "mdi:help-circle-outline";
    } else if (status === "restart") {
      retS = "mdi:restart-alert";
    }
    return retS;
  }

  _computeAisButtonVersionCheckUpgrade(hass) {
    var attr = hass.states["sensor.version_info"].attributes;
    if (
      attr.reinstall_dom_app ||
      attr.reinstall_android_app ||
      attr.reinstall_linux_apt ||
      attr.reinstall_zigbee2mqtt
    ) {
      if (attr.update_status === "outdated") {
        return "Zainstaluj teraz aktualizację";
      }
      if (attr.update_status === "unknown") {
        return "Spróbuj ponownie";
      }
      return "Aktualizacja -> " + this.getVersionName(attr.update_status);
    }
    return "Sprawdź dostępność aktualizacji";
  }

  _computeAutoUpdateMode(hass) {
    if (hass.states["input_boolean.ais_auto_update"].state === "off") {
      this.aisAutoUpdateIcon = "mdi:sync-off";
      this.aisAutoUpdateInfo =
        "Możesz aktualizować system samodzielnie w dogodnym dla Ciebie czasie lub włączyć aktualizację automatyczną.";
      return false;
    }
    this.aisAutoUpdateIcon = "mdi:sync";
    this.aisAutoUpdateInfo =
      "Codziennie sprawdzimy i automatycznie zainstalujemy dostępne aktualizacje.";
    return true;
  }

  _isEqualTo(currentStep, stepNumber) {
    return currentStep === stepNumber;
  }

  changeAutoUpdateMode() {
    this.hass.callService("input_boolean", "toggle", {
      entity_id: "input_boolean.ais_auto_update",
    });
  }

  doBackup() {
    // 1. validation
    if (this.backupStep === "0") {
      this.validating = true;
      this.validateLog = "";

      this.hass.callApi("POST", "config/core/check_config").then((result) => {
        this.validating = false;
        var valid = result.result === "valid" ? "1" : "0";
        if (valid === "0") {
          this.hass.callService("ais_cloud", "set_backup_step", {
            step: valid,
            backup_error: "Konfiguracja niepoprawna",
          });
          this.validateLog = result.errors;
        } else {
          this.hass.callService("ais_cloud", "set_backup_step", {
            step: valid,
            backup_info: "Konfiguracja poprawna można wykonać kopię",
          });
          this.validateLog = "";
        }
      });
    } else {
      // 2. backup and transfer
      this.validating = true;
      this.validateLog = "";
      var password = this.shadowRoot.getElementById("password1").value;
      var type = this.shadowRoot.getElementById("backup_type1").selected;
      console.log(type);
      this.hass.callService("ais_cloud", "do_backup", {
        password: password,
        type: type,
      });
    }
  }

  restoreBackup() {
    this.validating = true;
    this.validateLog = "";
    var password = this.shadowRoot.getElementById("password2").value;
    var type = this.shadowRoot.getElementById("backup_type2").selected;
    console.log(type);
    this.hass.callService("ais_cloud", "restore_backup", {
      password: password,
      type: type,
    });
  }
}

customElements.define("ha-config-ais-dom-config-update", HaConfigAisDomControl);
