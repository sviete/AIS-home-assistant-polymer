import "../../../components/ha-radio";
import "../../../components/ha-formfield";
import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "@material/mwc-linear-progress/mwc-linear-progress";
import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";

import "./ha-config-ais-dom-dashboard";
import "../../../components/ha-switch";
import "../../../components/buttons/ha-call-service-button";
import "../../../components/ha-icon";
import { css, html, CSSResultArray, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import { haStyle } from "../../../resources/styles";
import { HomeAssistant } from "../../../types";

/*
 *
 */
@customElement("ha-config-ais-dom-config-update")
class HaConfigAisDomConfigUpdate extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public isWide = true;

  @property({ type: Boolean }) public validateConfigInProgress = false;

  @property({ type: String }) public validateLog = "";

  @property({ type: String }) public aisButtonVersionCheckUpgrade = "";

  @property({ type: String }) public backupType = "all";

  @property({ type: String }) public backupType2 = "all";

  protected async firstUpdated() {
    // --- //
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
              <div
                style="color:${this._getTextColor(
                  this.hass.states["sensor.version_info"]
                )}"
              >
                ${this.hass.states["sensor.version_info"].state}
              </div>
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
                          ? "mdi:sync"
                          : "mdi:sync-off"}
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
                    ${this.hass.states["sensor.version_info"].attributes
                      .update_check_time
                      ? html`<tr>
                          <td>
                            <ha-icon icon=""></ha-icon>
                            Sprawdzono o
                          </td>
                          <td>
                            ${this.hass.states["sensor.version_info"].attributes
                              .update_check_time}
                          </td>
                          <td></td>
                          <td><ha-icon icon=""></ha-icon></td>
                        </tr>`
                      : html``}
                    ${this.hass.states["sensor.version_info"].attributes
                      .update_status
                      ? html`<tr>
                          <td>
                            <ha-icon icon=""></ha-icon>
                            Status
                          </td>
                          <td>
                            ${this.getVersionName(
                              this.hass.states["sensor.version_info"].attributes
                                .update_status
                            )}
                          </td>
                          <td></td>
                          <td>
                            <ha-icon
                              icon=${this.getVersionIcon(
                                this.hass.states["sensor.version_info"]
                                  .attributes.update_status
                              )}
                            ></ha-icon>
                          </td>
                        </tr>`
                      : html``}
                    <tr style="height: 1em;"></tr>
                    ${this.hass.states["sensor.version_info"].attributes
                      .zigbee2mqtt_current_version
                      ? html`<tr>
                          <td>
                            <ha-icon icon="mdi:zigbee"></ha-icon>
                            Zigbee
                          </td>
                          <td>
                            ${this.hass.states["sensor.version_info"].attributes
                              .zigbee2mqtt_current_version}
                          </td>
                          <td>
                            ${this.hass.states["sensor.version_info"].attributes
                              .zigbee2mqtt_newest_version}
                          </td>
                          <td>
                            <ha-icon
                              icon=${this.hass.states["sensor.version_info"]
                                .attributes.reinstall_zigbee2mqtt
                                ? "hass:alert"
                                : "hass:check"}
                            ></ha-icon>
                          </td>
                        </tr>`
                      : html``}
                    ${this.hass.states["sensor.version_info"].attributes
                      .zigbee2mqtt_current_version
                      ? html`<tr>
                          <td>
                            <ha-icon icon="mdi:home-assistant"></ha-icon>
                            AIS HA
                          </td>
                          <td>
                            ${this.hass.states["sensor.version_info"].attributes
                              .dom_app_current_version}
                          </td>
                          <td>
                            ${this.hass.states["sensor.version_info"].attributes
                              .dom_app_newest_version}
                          </td>
                          <td>
                            <ha-icon
                              icon=${this.hass.states["sensor.version_info"]
                                .attributes.reinstall_dom_app
                                ? "hass:alert"
                                : "hass:check"}
                            ></ha-icon>
                          </td>
                        </tr>`
                      : html``}
                    ${this.hass.states["sensor.version_info"].attributes
                      .android_app_current_version
                      ? html`<tr>
                          <td>
                            <ha-icon icon="mdi:android"></ha-icon>
                            Android
                          </td>
                          <td>
                            ${this.hass.states["sensor.version_info"].attributes
                              .android_app_current_version}
                          </td>
                          <td>
                            ${this.hass.states["sensor.version_info"].attributes
                              .android_app_newest_version}
                          </td>
                          <td>
                            <ha-icon
                              icon=${this.hass.states["sensor.version_info"]
                                .attributes.reinstall_android_app
                                ? "hass:alert"
                                : "hass:check"}
                            ></ha-icon>
                          </td>
                        </tr>`
                      : html``}
                    ${this.hass.states["sensor.version_info"].attributes
                      .linux_apt_current_version
                      ? html`<tr>
                          <td>
                            <ha-icon icon="mdi:linux"></ha-icon>
                            Linux
                          </td>
                          <td>
                            ${this.hass.states["sensor.version_info"].attributes
                              .linux_apt_current_version}
                          </td>
                          <td>
                            ${this.hass.states["sensor.version_info"].attributes
                              .linux_apt_newest_version}
                          </td>
                          <td>
                            <ha-icon
                              icon=${this.hass.states["sensor.version_info"]
                                .attributes.reinstall_linux_apt
                                ? "hass:alert"
                                : "hass:check"}
                            ></ha-icon>
                          </td>
                        </tr>`
                      : html``}
                  </table>
                </div>
              </div>

              ${this._showUpdateButton(this.hass.states["sensor.version_info"])
                ? html` <div class="center-container">
                    <ha-call-service-button
                      class="warning"
                      .hass=${this.hass}
                      domain="ais_updater"
                      service="execute_upgrade"
                      .serviceData=${{ say: true }}
                    >
                      ${this._computeAisButtonVersionCheckUpgrade(
                        this.hass.states["sensor.version_info"]
                      )}
                    </ha-call-service-button>
                  </div>`
                : html`
                    <br /><br /><br />
                    ${this.hass.states["sensor.version_info"].attributes
                      .progress
                      ? html` <mwc-linear-progress
                          determinate
                          .progress=${this.hass.states["sensor.version_info"]
                            .attributes.progress}
                          .buffer=${this.hass.states["sensor.version_info"]
                            .attributes.buffer}
                        >
                        </mwc-linear-progress>`
                      : html`<mwc-linear-progress indeterminate>
                        </mwc-linear-progress>`}
                    <br />
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
                <div class="backup-types" id="backup_type1">
                  <ha-formfield name="all" label="Wszystkich">
                    <ha-radio
                      name="bt"
                      @change=${this._handleBackupTypeValueChanged}
                      value="all"
                      .checked=${this.backupType === "all"}
                    >
                    </ha-radio>
                  </ha-formfield>
                  <ha-formfield name="ha" label="AIS HA">
                    <ha-radio
                      name="bt"
                      @change=${this._handleBackupTypeValueChanged}
                      value="ha"
                      .checked=${this.backupType === "ha"}
                    >
                    </ha-radio>
                  </ha-formfield>
                  <ha-formfield name="zigbee" label="Zigbee">
                    <ha-radio
                      name="bt"
                      @change=${this._handleBackupTypeValueChanged}
                      value="zigbee"
                      .checked=${this.backupType === "zigbee"}
                    >
                    </ha-radio>
                  </ha-formfield>
                </div>
                Przed wykonaniem nowej kopii ustawień sprawdź poprawność
                konfiguracji
              </div>
              <br />
              <div>
                ${!this.validateLog
                  ? html` <div class="validate-container">
                      <div class="validate-result" id="result">
                        ${this.hass.states["sensor.ais_backup_info"].attributes
                          .backup_info}
                      </div>

                      ${!this.validateConfigInProgress
                        ? html` <div class="config-invalid">
                              <span class="text">
                                ${this.hass.states["sensor.ais_backup_info"]
                                  .attributes.backup_error}
                              </span>
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
                                ? html` Sprawdź konfigurację `
                                : html``}
                              ${this.hass.states["sensor.ais_backup_info"]
                                .state === "1"
                                ? html` Wykonaj kopie konfiguracji `
                                : html``}
                            </mwc-button>`
                        : html`<mwc-linear-progress indeterminate>
                          </mwc-linear-progress>`}
                    </div>`
                  : html`<div class="config-invalid">
                        <mwc-button raised="" @click=${this.doBackup}>
                          Popraw i sprawdź ponownie
                        </mwc-button>
                      </div>
                      <p></p>
                      <div id="configLog" class="validate-log">
                        ${this.validateLog}
                      </div>`}
              </div>
              ${this.hass.states["sensor.ais_backup_info"].attributes
                .file_size ||
              this.hass.states["sensor.ais_backup_info"].attributes
                .file_zigbee_size
                ? html` <h2>
                      Przywracanie ustawień z kopii
                      <ha-icon icon="mdi:cloud-download-outline"></ha-icon>
                    </h2>
                    W tym miejscu możesz, przywrócić ustawienia bramki z kopii,
                    która zostanie pobrana z portalu integratora. Jeśli
                    zaszyfrowałeś kopię hasłem, to podaj je przed wykonaniem
                    przywracania ustawień z kopii.
                    <div class="validate-container">
                      <table style="margin-top: 40px; margin-bottom: 10px;">
                        ${this.hass.states["sensor.ais_backup_info"].attributes
                          .file_size
                          ? html` <tr>
                              <td>
                                <ha-icon icon="mdi:home-assistant"></ha-icon>
                                AIS HA
                              </td>
                              <td>
                                ${this.hass.states["sensor.ais_backup_info"]
                                  .attributes.file_name}
                              </td>
                              <td>
                                ${this.hass.states["sensor.ais_backup_info"]
                                  .attributes.file_size}
                              </td>
                            </tr>`
                          : html``}
                        ${this.hass.states["sensor.ais_backup_info"].attributes
                          .file_zigbee_size
                          ? html` <tr>
                              <td>
                                <ha-icon icon="mdi:zigbee"></ha-icon>
                                Zigbee
                              </td>
                              <td>
                                ${this.hass.states["sensor.ais_backup_info"]
                                  .attributes.file_zigbee_name}
                              </td>
                              <td>
                                ${this.hass.states["sensor.ais_backup_info"]
                                  .attributes.file_zigbee_size}
                              </td>
                            </tr>`
                          : html``}
                      </table>
                      <div class="validate-container">
                        <div class="validate-result" id="result">
                          ${this.hass.states["sensor.ais_backup_info"]
                            .attributes.restore_info}
                        </div>
                        <div class="config-invalid">
                          <span class="text">
                            ${this.hass.states["sensor.ais_backup_info"]
                              .attributes.restore_error}
                          </span>
                        </div>
                        Przywracanie ustawień z kopii:
                        <div class="center-container">
                          <div class="backup-types" id="backup_type2">
                            ${this.hass.states["sensor.ais_backup_info"]
                              .attributes.file_size &&
                            this.hass.states["sensor.ais_backup_info"]
                              .attributes.file_zigbee_size
                              ? html` <ha-formfield
                                  name="all"
                                  label="Wszystkich"
                                >
                                  <ha-radio
                                    name="bt2"
                                    @change=${this
                                      ._handleBackupType2ValueChanged}
                                    value="all"
                                    .checked=${this.backupType2 === "all"}
                                  >
                                  </ha-radio>
                                </ha-formfield>`
                              : html``}
                            ${this.hass.states["sensor.ais_backup_info"]
                              .attributes.file_size
                              ? html` <ha-formfield name="ha" label="AIS HA">
                                  <ha-radio
                                    name="bt2"
                                    @change=${this
                                      ._handleBackupType2ValueChanged}
                                    value="ha"
                                    .checked=${this.backupType2 === "ha"}
                                  >
                                  </ha-radio>
                                </ha-formfield>`
                              : html``}
                            ${this.hass.states["sensor.ais_backup_info"]
                              .attributes.file_zigbee_size
                              ? html` <ha-formfield
                                  name="zigbee"
                                  label="Zigbee"
                                >
                                  <ha-radio
                                    name="bt2"
                                    @change=${this
                                      ._handleBackupType2ValueChanged}
                                    value="zigbee"
                                    .checked=${this.backupType2 === "zigbee"}
                                  >
                                  </ha-radio>
                                </ha-formfield>`
                              : html``}
                          </div>
                          <paper-input
                            placeholder="hasło"
                            no-label-float=""
                            type="password"
                            id="password2"
                          ></paper-input>
                          <mwc-button raised="" @click=${this.restoreBackup}>
                            Przywróć konfigurację z kopii
                          </mwc-button>
                        </div>
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
          min-height: 70px;
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
          color: #0da035;
        }

        .config-invalid {
          text-align: center;
          color: #f44336;
        }

        .validate-log {
          white-space: pre-wrap;
          direction: ltr;
          color: #f44336;
        }
      `,
    ];
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
      retS = "mdi:clock-alert-outline";
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

  private _handleBackupTypeValueChanged(ev: CustomEvent) {
    const input = ev.currentTarget;
    this.backupType = input.value;
  }

  private _handleBackupType2ValueChanged(ev: CustomEvent) {
    const input = ev.currentTarget;
    this.backupType2 = input.value;
  }

  _computeAisButtonVersionCheckUpgrade(versionInfo) {
    const attr = versionInfo.attributes;
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

  _showUpdateButton(versionInfo) {
    const attr = versionInfo.attributes;
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

  _getTextColor(versionInfo) {
    const attr = versionInfo.attributes;
    if (
      attr.reinstall_dom_app ||
      attr.reinstall_android_app ||
      attr.reinstall_linux_apt ||
      attr.reinstall_zigbee2mqtt
    ) {
      if (attr.update_status === "outdated") {
        return "#f44336";
      }
      if (attr.update_status === "unknown") {
        return "#ff9800";
      }
      return "#ff9800";
    }
    return "#0da035";
  }

  changeAutoUpdateMode() {
    this.hass.callService("input_boolean", "toggle", {
      entity_id: "input_boolean.ais_auto_update",
    });
  }

  isBackupInProgress(backupInfo) {
    if (backupInfo.state === "0") {
      return false;
    }
    return true;
  }

  doBackup() {
    // 1. validation
    if (this.hass.states["sensor.ais_backup_info"].state === "0") {
      this.validateConfigInProgress = true;
      this.validateLog = "";

      this.hass.callApi("POST", "config/core/check_config").then((result) => {
        this.validateConfigInProgress = false;
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
      this.validateLog = "";
      const password = this.shadowRoot.getElementById("password1").value;
      const type = this.backupType;
      this.hass.callService("ais_cloud", "do_backup", {
        password: password,
        type: type,
      });
    }
  }

  restoreBackup() {
    this.validateLog = "";
    const password = this.shadowRoot.getElementById("password2").value;
    const type = this.backupType2;
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
