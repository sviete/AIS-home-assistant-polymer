import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "@polymer/paper-radio-button/paper-radio-button";
import "@polymer/paper-radio-group/paper-radio-group";
import "@material/mwc-linear-progress/mwc-linear-progress";
import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";

import "./ha-config-ais-dom-dashboard";
import "../../../components/ha-switch";
import "../../../components/buttons/ha-call-service-button";
import "../../../components/ha-icon";
import { css, html, CSSResultArray, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import { repeat } from "lit/directives/repeat";
import { haStyle } from "../../../resources/styles";
import { HomeAssistant } from "../../../types";

/*
 *
 */
@customElement("ha-config-ais-dom-config-update")
class HaConfigAisDomConfigUpdate extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public isWide = true;

  @property({ type: String }) public aisVersionInfo = "";

  @property({ type: Array }) private aisAutoUpdatFullInfo = [];

  @property({ type: Array }) private aisBackupFullInfo = [];

  @property({ type: Boolean }) public isBackupValid = true;

  @property({ type: String }) public validateLog = "";

  @property({ type: String }) public backupInfo = "";

  @property({ type: String }) public backupError = "";

  @property({ type: String }) public restoreInfo = "";

  @property({ type: String }) public restoreError = "";

  @property({ type: String }) public aisButtonVersionCheckUpgrade = "";

  @property({ type: Object }) public aisUpdateSystemData = { say: true };

  @property({ type: Boolean }) public validating = false;

  protected async firstUpdated() {
    this.aisVersionInfo = this._computeAisVersionInfo();
    this.aisButtonVersionCheckUpgrade =
      this._computeAisButtonVersionCheckUpgrade();
  }

  protected render(): TemplateResult {
    return html`
      <hass-subpage header="Konfiguracja bramki AIS dom">
        <ha-config-section .isWide=${this.isWide}>
          <span slot="header">Oprogramowanie bramki</span>
          <span slot="introduction"
            >Możesz zaktualizować system do najnowszej wersji, wykonać kopię
            zapasową ustawień i zsynchronizować bramkę z Portalem
            Integratora</span
          >
          <ha-card header="Wersja systemu AI-Speaker">
            <div class="card-content">
              ${this.aisVersionInfo}
              <div>
                <div style="margin-top:30px;" id="ha-switch-id">
                  <ha-switch
                    .checked=${this.hass.states["input_boolean.ais_auto_update"]
                      .state === "on"}
                    @change=${this.changeAutoUpdateMode}
                    style="position: absolute; right: 20px;"
                  ></ha-switch
                  ><span
                    ><h3>
                      Autoaktualizacja
                      <ha-icon
                        icon=${this.hass.states["input_boolean.ais_auto_update"]
                          .state === "on"
                          ? "mdi:sync-off"
                          : "mdi:sync"}
                      ></ha-icon></h3
                  ></span>
                </div>
              </div>

              <div style="display: inline-block;">
                <div>
                  ${this.hass.states["input_boolean.ais_auto_update"].state ===
                  "on"
                    ? html`Codziennie sprawdzimy i automatycznie zainstalujemy
                      dostępne aktualizacje.`
                    : html`Możesz aktualizować system samodzielnie w dogodnym
                      dla Ciebie czasie lub włączyć aktualizację automatyczną.`}
                </div>
                <div style="margin-top: 15px;">
                  Aktualizacje dostarczają najnowsze funkcjonalności oraz
                  poprawki zapewniające bezpieczeństwo i stabilność działania
                  systemu.
                  <table style="margin-top: 10px;">
                    ${repeat(
                      this.aisAutoUpdatFullInfo,
                      (item) =>
                        html`
                          <tr>
                            <td>
                              <ha-icon icon=${item.name_icon}></ha-icon>
                              ${item.name}
                            </td>
                            <td>${item.value}</td>
                            <td>${item.new_value}</td>
                            <td><ha-icon icon=${item.icon}></ha-icon></td>
                          </tr>
                          ${item.name !== "Status"
                            ? html`<tr style="height: 1em;"></tr>`
                            : html``}
                        `
                    )}
                  </table>
                </div>
              </div>

              ${!this._showUpdateButton
                ? html` <div class="center-container">
                    <ha-call-service-button
                      class="warning"
                      .hass=${this.hass}
                      domain="ais_updater"
                      service="execute_upgrade"
                      service-data="[[aisUpdateSystemData]]"
                    >
                      ${this.aisButtonVersionCheckUpgrade}
                    </ha-call-service-button>
                  </div>`
                : html`
                    <br />
                    <mwc-linear-progress
                      determinate
                      progress="0.5"
                      buffer="0.75"
                    >
                    </mwc-linear-progress>
                  `}
            </div>
          </ha-card>

          <ha-card header="Kopia konfiguracji Bramki">
            <div class="card-content">
              W tym miejscu możesz, sprawdzić poprawność ustawień bramki,
              wykonać jej kopię i przesłać ją do portalu integratora.
              <b
                >Uwaga, ponieważ konfiguracja może zawierać hasła i tokeny
                dostępu do usług, zalecamy zaszyfrować ją hasłem</b
              >. Gdy kopia jest zabezpieczona hasłem, to można ją
              otworzyć/przywrócić tylko po podaniu hasła.
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
                  <paper-radio-button name="ha">AIS HA</paper-radio-button>
                  <paper-radio-button name="zigbee">Zigbee</paper-radio-button>
                </paper-radio-group>
                <br />
                Przed wykonaniem nowej kopii ustawień sprawdź poprawność
                konfiguracji
              </div>
              <br />
              <div style="border-bottom: 1px solid white;">
                ${!this.validateLog
                  ? html` <div class="validate-container">
                      <div class="validate-result" id="result">
                        ${this.backupInfo}
                      </div>
                      ${!this.validating
                        ? html` <div class="config-invalid">
                              <span class="text"> ${this.backupError} </span>
                            </div>
                            ${this.hass.states["sensor.ais_backup_info"]
                              .state === "1"
                              ? html`
                                  <paper-input
                                    placeholder="hasło"
                                    no-label-float=""
                                    type="password"
                                    id="password1"
                                  ></paper-input>
                                `
                              : html``}
                            <mwc-button raised="" @click=${this.doBackup}>
                              ${this.hass.states["sensor.ais_backup_info"]
                                .state === "0"
                                ? html` Wykonaj kopie konfiguracji `
                                : html``}
                              ${this.hass.states["sensor.ais_backup_info"]
                                .state === "1"
                                ? html` Wykonaj kopie konfiguracji `
                                : html``}
                            </mwc-button>`
                        : html`<paper-spinner active=""></paper-spinner>`}
                    </div>`
                  : html``}
                ${this.validateLog
                  ? html` <div class="config-invalid">
                        <mwc-button raised="" @click=${this.doBackup}>
                          Popraw i sprawdź ponownie
                        </mwc-button>
                      </div>
                      <p></p>
                      <div id="configLog" class="validate-log">
                        ${this.validateLog}
                      </div>`
                  : html``}
              </div>
              ${this.isBackupValid
                ? html` <h2>
                      Przywracanie ustawień
                      <ha-icon icon="mdi:backup-restore"></ha-icon>
                    </h2>
                    <div class="validate-container">
                      <table style="margin-top: 40px; margin-bottom: 10px;">
                        ${repeat(
                          this.aisBackupFullInfo,
                          (item) =>
                            html`
                              <tr>
                                <td>
                                  <ha-icon icon=${item.icon}></ha-icon>
                                  ${item.name}
                                </td>
                                <td>${item.value}</td>
                                <td>${item.new_value}</td>
                              </tr>
                            `
                        )}
                      </table>
                      <div class="validate-container">
                        <div class="validate-result" id="result">
                          ${this.restoreInfo}
                        </div>

                        ${!this.validating
                          ? html`
                            <div class="config-invalid">
                              <span class="text">
                              ${this.restoreError}
                              </span>
                            </div>
                            Przywracanie ustawień z kopii:
                            <br />
                            <paper-radio-group selected="all" id="backup_type2">
                                <paper-radio-button name="all">Wszystkich</paper-radio-button>
                                <paper-radio-button name="ha">AIS HA</paper-radio-button>
                                <paper-radio-button name="zigbee">Zigbee</paper-radio-button>
                            </paper-radio-group>
                            <br />
                            <paper-input
                              placeholder="hasło"
                              no-label-float=""
                              type="password"
                              id="password2"
                            ></paper-input>
                            <mwc-button raised="" @click=${this.restoreBackup}>
                              Przywróć konfigurację z kopii
                            </mwc-button>
                          </div>`
                          : html` <paper-spinner active=""></paper-spinner> `}
                      </div>
                    </div>`
                : html``}
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
                  .hass=${this.hass}
                  domain="script"
                  service="ais_cloud_sync"
                  >Synchronizuj z Portalem Integratora
                </ha-call-service-button>
              </div>
            </div>
          </ha-card>
        </ha-config-section>
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
        .center-container {
          text-align: center;
          margin-top: 2em;
          height: 70px;
        }
        table {
          width: 100%;
        }

        td:first-child {
          width: 33%;
        }

        .validate-container {
          text-align: center;
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
      `,
    ];
  }

  _computeAisVersionInfo() {
    const versionInfo = this.hass.states["sensor.version_info"];
    const versionInfoAttr = versionInfo.attributes;
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
        name: "AIS HA",
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

  _computeAisBackupInfo(hass) {
    const backupInfo = hass.states["sensor.ais_backup_info"];
    const backupInfoAttr = backupInfo.attributes;
    this.aisBackupFullInfo = [];
    this.isBackupValid = false;
    this.backupInfo = backupInfoAttr.backup_info;
    this.backupError = backupInfoAttr.backup_error;
    this.restoreInfo = backupInfoAttr.restore_info;
    this.restoreError = backupInfoAttr.restore_error;
    if ("file_size" in backupInfoAttr) {
      this.isBackupValid = !!backupInfoAttr.file_name;
      this.aisBackupFullInfo.push({
        name: "AIS HA",
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
    let retS = status;
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
    let retS = "";
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

  _computeAisButtonVersionCheckUpgrade() {
    const attr = this.hass.states["sensor.version_info"].attributes;
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

  _showUpdateButton(hass) {
    const attr = hass.states["sensor.version_info"].attributes;
    if (
      attr.reinstall_dom_app ||
      attr.reinstall_android_app ||
      attr.reinstall_linux_apt ||
      attr.reinstall_zigbee2mqtt
    ) {
      if (attr.update_status === "outdated") {
        return true;
      }
      if (attr.update_status === "unknown") {
        return true;
      }
      return false;
    }
    return true;
  }

  changeAutoUpdateMode() {
    this.hass.callService("input_boolean", "toggle", {
      entity_id: "input_boolean.ais_auto_update",
    });
  }

  doBackup() {
    // 1. validation
    if (this.hass.states["sensor.ais_backup_info"].state === "0") {
      this.validating = true;
      this.validateLog = "";

      this.hass.callApi("POST", "config/core/check_config").then((result) => {
        this.validating = false;
        const valid = result.result === "valid" ? "1" : "0";
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
      const password = this.shadowRoot.getElementById("password1").value;
      const type = this.shadowRoot.getElementById("backup_type1").selected;
      this.hass.callService("ais_cloud", "do_backup", {
        password: password,
        type: type,
      });
    }
  }

  restoreBackup() {
    this.validating = true;
    this.validateLog = "";
    const password = this.shadowRoot.getElementById("password2").value;
    const type = this.shadowRoot.getElementById("backup_type2").selected;
    this.hass.callService("ais_cloud", "restore_backup", {
      password: password,
      type: type,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-config-ais-dom-config-update": HaConfigAisDomConfigUpdate;
  }
}
