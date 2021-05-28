import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import { HomeAssistant } from "../../../types";
import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";
import "./ha-config-ais-dom-dashboard";
import "../../../components/ha-paper-dropdown-menu";
import "../../../components/ha-switch";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu";
import "@polymer/paper-item/paper-item";
import "@polymer/paper-listbox/paper-listbox";
import "../../../components/buttons/ha-call-service-button";
import "../../../components/ha-icon";
import "../../../components/ha-icon-button";
import "../../../components/ha-circular-progress";
import { handleFetchPromise } from "../../../util/hass-call-api";
import {css, CSSResultGroup, html, LitElement, PropertyValues, TemplateResult} from "lit";
import {customElement, property} from 'lit/decorators';
import { haStyle } from "../../../resources/styles";

export interface aisSaveDbSettingsResponse {
  info: string;
  error: string;
}

export const aisSaveDbSettings = (params: {
  dbEngine: string;
  dbDrive: string;
  dbUser: string;
  dbPassword: string;
  dbServerIp: string;
  dbServerName: string;
  dbKeepDays: number;
  dbShowLogbook: boolean;
  dbShowHistory: boolean;
}) =>
  handleFetchPromise<aisSaveDbSettingsResponse>(
    fetch("/api/ais_file/ais_db_view", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify(params),
    })
  );

@customElement("ha-config-ais-dom-config-logs")
class HaConfigAisDomConfiglLogs extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() public isWide?: boolean;

  @property({ type: String }) private logLevel = "";

  @property({ type: String }) private logDrive = "";

  @property({ type: Number }) private logRotating = 1;

  @property({ type: Boolean }) private dbConnectionValidating = false;

  @property({ type: String }) private logModeInfo = "";

  @property({ type: String }) private dbDrive = "";

  @property({ type: String }) private dbEngine = "";

  @property({ type: String }) private dbUser = "";

  @property({ type: String }) private dbPassword = "";

  @property({ type: String }) private dbServerIp = "";

  @property({ type: String }) private dbServerName = "";

  @property({ type: Number }) private dbKeepDays = 10;

  @property({ type: String }) private errorDbInfo = "";

  @property({ type: String }) private messageDbInfo = "";

  @property({ type: Boolean }) private dbShowLogbook = false;

  @property({ type: Boolean }) private dbShowHistory = false;

  static get styles(): CSSResultGroup[] {
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
        .card-actions {
          display: flex;
        }
        ha-card > div#card-icon {
          margin: -4px 0;
          position: absolute;
          top: 1em;
          right: 1em;
          border-radius: 25px;
        }
        .center-container {
          text-align: center;
          height: 70px;
        }

        .config-invalid {
          color: red;
          text-align: center;
          padding-bottom: 1em;
        }
        .config-valid {
          color: green;
          text-align: center;
          padding-bottom: 1em;
        }

        @keyframes pulse {
          0% {
            background-color: var(--card-background-color);
          }
          100% {
            background-color: orange;
          }
        }
        @keyframes pulseRed {
          0% {
            background-color: var(--card-background-color);
          }
          100% {
            background-color: red;
          }
        }
      `,
    ];
  }

  private getLogError(logSettingsInfo) {
    let logError = "";
    if (logSettingsInfo.attributes.errorInfo) {
      logError = logSettingsInfo.attributes.errorInfo + " ";
    }
    if (this.logLevel === "debug") {
      logError +=
        "Logowanie w trybie debug generuje duże ilości logów i obciąża system. Używaj go tylko podczas diagnozowania problemu. ";
    }
    return logError;
  }

  private isNotSeleced(option) {
    if (!option) {
      return true;
    }
    if (option === "-") {
      return true;
    }
    if (option === "") {
      return true;
    }

    return false;
  }

  private getLogIconAnimationStyle(_logSettingsInfo) {
    if (!this.isNotSeleced(this.logDrive)) {
      if (this.logLevel === "debug") {
        return "animation: pulseRed 2s infinite;";
      }
      if (this.logLevel === "info") {
        return "animation: pulse 4s infinite;";
      }
      if (this.logLevel === "warning") {
        return "animation: pulse 7s infinite;";
      }
      if (this.logLevel === "error") {
        return "animation: pulse 8s infinite;";
      }
      if (this.logLevel === "critical") {
        return "animation: pulse 10s infinite;";
      }
    }
    return "";
  }

  // DB recorder

  private getDbStatusIcon(dbEngine) {
    // memory "animation: pulse 6s infinite;";
    if (this.isNotSeleced(dbEngine)) {
      return html``;
    }
    let dbIcon = "mdi:database";
    if (dbEngine === "SQLite (memory)") {
      dbIcon = "mdi:memory";
    }
    if (dbEngine === "SQLite (file)") {
      dbIcon = "mdi:file";
    }
    if (dbEngine === "PostgreSQL") {
      dbIcon = "mdi:server";
    }
    return html`
      <div id="card-icon" style="animation: pulse 6s infinite;">
        <ha-icon-button icon=${dbIcon}></ha-icon-button>
      </div>
    `;
  }

  private _getDbConnectionSettings() {
    // DB
    const dbConnectionInfo = this.hass.states["sensor.ais_db_connection_info"];
    const dbConnInfoAttr = dbConnectionInfo.attributes;
    this.dbEngine = dbConnInfoAttr.dbEngine;
    this.dbDrive = dbConnInfoAttr.dbDrive;
    this.dbPassword = dbConnInfoAttr.dbPassword;
    this.dbUser = dbConnInfoAttr.dbUser;
    this.dbServerIp = dbConnInfoAttr.dbServerIp;
    this.dbServerName = dbConnInfoAttr.dbServerName;
    this.dbKeepDays = dbConnInfoAttr.dbKeepDays;
    this.errorDbInfo = "";
    this.messageDbInfo = "";
    this.dbShowLogbook = dbConnInfoAttr.dbShowLogbook;
    this.dbShowHistory = dbConnInfoAttr.dbShowHistory;
  }

  private _getLogSettings() {
    // LOG
    const connectionInfo = this.hass.states["sensor.ais_logs_settings_info"];
    const connInfoAttr = connectionInfo.attributes;
    this.logDrive = connInfoAttr.logDrive;
    this.logLevel = connInfoAttr.logLevel;
    this.logRotating = connInfoAttr.logRotating;
  }

  protected firstUpdated(changedProps: PropertyValues): void {
    super.firstUpdated(changedProps);
    // DB
    this._getDbConnectionSettings();

    // LOG
    this._getLogSettings();
  }

  protected render(): TemplateResult {
    return html`
      <hass-subpage header="Konfiguracja bramki AIS dom">
        <ha-config-section .is-wide=${this.isWide}>
          <span slot="header">Konfiguracja zapisu zdarzeń systemu</span>
          <ha-card header="Baza danych do zapisu zdarzeń">
            <!-- show db satus  -->
            ${this.getDbStatusIcon(this.dbEngine)}
            ${!this.dbConnectionValidating
              ? html`
                  <div class="card-content">
                    Najprostszy wybór to baza SQLite, która nie wymaga
                    konfiguracji i może rejestrować dane w pamięci.
                    <b>Zmiany konfiguracji bazy wymagają restartu systemu.</b>
                    Baza w pamięci jest automatycznie używana, gdy włączysz
                    komponent Historia lub Dziennik.
                    <br />
                    <br />
                    <ha-icon icon="hass:poll-box" slot="suffix"></ha-icon>
                    <ha-switch
                      .checked=${this.dbShowHistory}
                      @change=${this.dbShowHistoryChanged}
                    ></ha-switch>
                    Historia - prezentowanie zdarzeń zapisanych w bazie na
                    wykresach w aplikacji
                    <br />
                    <br />

                    <ha-icon
                      icon="hass:format-list-bulleted-type"
                      slot="suffix"
                    ></ha-icon>
                    <ha-switch
                      .checked=${this.dbShowLogbook}
                      @change=${this.dbShowLogbookChanged}
                    ></ha-switch>
                    Dziennik - prezentowanie zmian zapisanych w bazie w
                    chronologicznej kolejności

                    <br /><br />

                    Wybór silnika bazy danych:
                    <br />
                    <ha-icon-button icon="mdi:database"></ha-icon-button>
                    <ha-paper-dropdown-menu
                      label-float="Silnik bazy danych"
                      dynamic-align=""
                      label="Silnik bazy danych"
                    >
                      <paper-listbox
                        attr-for-selected="item-name"
                        slot="dropdown-content"
                        selected=${this.dbEngine}
                        @iron-select=${this.dbEngineChanged}
                      >
                        <paper-item item-name="-">-</paper-item>
                        <paper-item item-name="SQLite (memory)"
                          >SQLite (memory)</paper-item
                        >
                        <paper-item item-name="SQLite (file)"
                          >SQLite (file)</paper-item
                        >
                        <paper-item item-name="MariaDB">MariaDB</paper-item>
                        <paper-item item-name="MySQL">MySQL</paper-item>
                        <paper-item item-name="PostgreSQL"
                          >PostgreSQL</paper-item
                        >
                      </paper-listbox>
                    </ha-paper-dropdown-menu>
                  </div>

                  <!-- MEMORY -->
                  ${this.dbEngine === "SQLite (memory)"
                    ? html`
                        <div class="card-content">
                          Żeby utrzymać system w dobrej kondycji, codziennie
                          dokładnie o godzinie 5:15 rano, Asystent czyści pamięć
                          i usuwa zdarzenia i stany starsze niż 2 dni.
                          <br /><br />
                          Gdy chcesz zapisywać większą ilość dni w historii, to
                          zalecamy zapisywać zdarzenia na zewnętrznym dysku lub
                          w zdalnej bazie danych.
                        </div>
                      `
                    : html``}

                  <!-- FILE -->
                  ${this.dbEngine === "SQLite (file)"
                    ? html`
                        <div class="card-content">
                          Wybór dysku do zapisu bazy danych: <br />
                          <ha-icon-button
                            icon="mdi:usb-flash-drive"
                          ></ha-icon-button>
                          <ha-paper-dropdown-menu
                            label-float="Wybrany dysk"
                            dynamic-align=""
                            label="Dyski wymienne"
                          >
                            <paper-listbox
                              slot="dropdown-content"
                              attr-for-selected="item-name"
                              .selected=${this.dbDrive}
                              @iron-select=${this.dbDriveChanged}
                            >
                              ${this.hass.states[
                                "input_select.ais_usb_flash_drives"
                              ].attributes.options!.map(
                                (item: string) =>
                                  html`
                                    <paper-item
                                      .itemName=${item}
                                      .itemValue=${item}
                                    >
                                      ${item}
                                    </paper-item>
                                  `
                              )}
                            </paper-listbox>
                          </ha-paper-dropdown-menu>
                          <br /><br />
                        </div>
                      `
                    : html``}
                  <!-- DB -->
                  ${this.dbEngine === "MariaDB" ||
                  this.dbEngine === "MySQL" ||
                  this.dbEngine === "PostgreSQL"
                    ? html`
                        <div class="card-content">
                          Parametry połączenia z bazą danych: <br />
                          <paper-input
                            placeholder="Użytkownik"
                            type="text"
                            id="db_user"
                            value=${this.dbUser}
                            @value-changed=${this.dbUserChanged}
                          >
                            <ha-icon icon="mdi:account" slot="suffix"></ha-icon>
                          </paper-input>
                          <paper-input
                            placeholder="Hasło"
                            no-label-float=""
                            type="password"
                            id="db_password"
                            .value=${this.dbPassword}
                            @value-changed=${this.dbPasswordChanged}
                          >
                            <ha-icon
                              icon="mdi:lastpass"
                              slot="suffix"
                            ></ha-icon>
                          </paper-input>
                          <paper-input
                            placeholder="IP Serwera DB"
                            no-label-float=""
                            type="text"
                            id="db_server_ip"
                            value=${this.dbServerIp}
                            @value-changed=${this.dbServerIpChanged}
                          >
                            <ha-icon
                              icon="mdi:ip-network"
                              slot="suffix"
                            ></ha-icon>
                          </paper-input>
                          <paper-input
                            placeholder="Nazwa bazy"
                            no-label-float=""
                            type="text"
                            id="db_server_name"
                            value=${this.dbServerName}
                            @value-changed=${this.dbServerNameChanged}
                          >
                            <ha-icon
                              icon="mdi:database-check"
                              slot="suffix"
                            ></ha-icon>
                          </paper-input>
                        </div>
                      `
                    : html``}

                  <!-- KEEP DAYS -->
                  ${this.dbEngine === "SQLite (file)" ||
                  this.dbEngine === "MariaDB" ||
                  this.dbEngine === "MySQL" ||
                  this.dbEngine === "PostgreSQL"
                    ? html`
                  <div class="card-content">
                    Żeby utrzymać system w dobrej kondycji, codziennie dokładnie o godzinie 5:15 rano Asystent usuwa z bazy zdarzenia i stany starsze niż <b>określona liczba dni</b>.
                    <br /><br />
                    W tym miejscu możesz określić liczbę dni, których historia ma być
                    przechowywana w bazie danych.
                    <paper-input
                      id="db_keep_days"
                      type="number"
                      value=${this.dbKeepDays}
                      @value-changed=${this.dbKeepDaysChanged}
                      maxlength="4"
                      max="9999"
                      min="1"
                      label-float="Liczba dni historii przechowywanych w bazie"
                      label="Liczba dni historii przechowywanych w bazie"
                    >
                      <ha-icon icon="mdi:calendar" slot="suffix"></ha-icon>
                    </paper-input>
                  </div>
                  <div class="center-container">
                          <mwc-button
                            @click="${this.saveDbSettings}"
                          > Sprawdź i zapisz
                          </mwc-button>
                  </div>
                </div>
                `
                    : html``}
                `
              : html`<div style="width: 100%; text-align: center;">
                  <ha-circular-progress active></ha-circular-progress>
                </div>`}

            <div class="center-content">
              <div class="config-invalid">
                <span class="text">
                  ${this.errorDbInfo}
                </span>
              </div>
              <div class="config-valid">
                <span class="text">
                  ${this.messageDbInfo}
                </span>
              </div>
            </div>
          </ha-card>
        </ha-config-section>

        <ha-config-section .is-wide=${this.isWide}>
          <span slot="header">Ustawienie zapisu logów systemu</span>
          <ha-card header=" Wybór parametrów logowania">
            <div
              id="card-icon"
              .style=${this.getLogIconAnimationStyle(
                this.hass.states["sensor.ais_logs_settings_info"]
              )}
            >
              <ha-icon-button icon="mdi:content-save-edit"></ha-icon-button>
            </div>
            <div class="card-content">
              <ha-icon-button icon="mdi:bug-check"></ha-icon-button>
              <ha-paper-dropdown-menu
                label-float="Poziom logowania"
                dynamic-align=""
                label="Poziomy logowania"
              >
                <paper-listbox
                  slot="dropdown-content"
                  attr-for-selected="item-name"
                  .selected=${this.logLevel}
                  @iron-select=${this.logLevelChanged}
                >
                  <paper-item item-name="critical">critical</paper-item>
                  <paper-item item-name="error">error</paper-item>
                  <paper-item item-name="warning">warning</paper-item>
                  <paper-item item-name="info">info</paper-item>
                  <paper-item item-name="debug">debug</paper-item>
                </paper-listbox>
              </ha-paper-dropdown-menu>
              <br />

              Jeśli chcesz zapisywać logi trwale do pliku, wybierz dysk wymienny
              (USB, SD card) na którym będą zapisywane logi: <br />
              <ha-icon-button icon="mdi:usb-flash-drive"></ha-icon-button>

              <ha-paper-dropdown-menu
                label-float="Wybrany dysk"
                dynamic-align=""
                label="Dyski wymienne"
              >
                <paper-listbox
                  slot="dropdown-content"
                  attr-for-selected="item-name"
                  .selected=${this.logDrive}
                  @iron-select=${this.logDriveChanged}
                >
                  ${this.hass.states[
                    "input_select.ais_usb_flash_drives"
                  ].attributes.options!.map(
                    (item: string) =>
                      html`
                        <paper-item .itemName=${item} .itemValue=${item}>
                          ${item}
                        </paper-item>
                      `
                  )}
                </paper-listbox>
              </ha-paper-dropdown-menu>

              <br /><br />
              ${!this.isNotSeleced(this.logDrive)
                ? html`
                    Możesz określić liczbę dni przechowywanych w jednym pliku.
                    Rotacja plików dziennika wykonywna jest o północy.
                    <paper-input
                      type="number"
                      .value=${this.logRotating}
                      @change=${this.logRotatingDaysChanged}
                      maxlength="4"
                      max="9999"
                      min="1"
                      label-float="Liczba dni przechowywanych w jednym pliku loga"
                      label="Liczba dni przechowywanych w jednym pliku loga"
                    >
                      <ha-icon icon="mdi:calendar" slot="suffix"></ha-icon>
                    </paper-input>
                    Zmiana dysku lub zmiana liczby dni przechowywanych będzie
                    zralizowana po restartcie systemu.
                  `
                : html``}
            </div>

            <div class="card-content">
              <div class="config-invalid">
                <span class="text">
                  ${this.getLogError(
                    this.hass.states["sensor.ais_logs_settings_info"]
                  )}
                </span>
              </div>
            </div>
            <div class="card-content">
              ${this.logModeInfo}
            </div>
          </ha-card>
        </ha-config-section>
        <br />
        <br />
      </hass-subpage>
    `;
  }

  private saveLoggerSettings() {
    this.hass.callService("ais_files", "change_logger_settings", {
      log_drive: this.logDrive,
      log_level: this.logLevel,
      log_rotating: this.logRotating,
    });
  }

  private logDriveChanged(ev) {
    const newValue = ev.target!.selected;
    if (newValue !== this.logDrive) {
      this.logDrive = newValue;
      if (!this.isNotSeleced(this.logDrive)) {
        this.logModeInfo =
          "Zapis logów do pliku /dyski-wymienne/" + this.logDrive + "/ais.log";
      } else {
        this.logModeInfo = "Zapis logów do pliku wyłączony ";
      }
      this.saveLoggerSettings();
    }
  }

  private logLevelChanged(ev) {
    const newValue = ev.target!.selected;
    if (newValue !== this.logLevel) {
      this.logLevel = newValue;
      this.logModeInfo = "Poziom logowania: " + this.logLevel;
      this.saveLoggerSettings();
    }
  }

  private logRotatingDaysChanged(ev) {
    const newValue = Number(ev.target.value);
    if (this.logRotating !== newValue) {
      this.logRotating = newValue;
      if (this.logRotating === 1) {
        this.logModeInfo = "Rotacja logów codziennie.";
      } else {
        this.logModeInfo = "Rotacja logów co " + this.logRotating + " dni.";
      }
      this.saveLoggerSettings();
    }
  }

  private async saveDbSettings(): Promise<void> {
    this.dbConnectionValidating = true;
    try {
      const result = await aisSaveDbSettings({
        dbEngine: this.dbEngine,
        dbDrive: this.dbDrive,
        dbPassword: this.dbPassword,
        dbUser: this.dbUser,
        dbServerIp: this.dbServerIp,
        dbServerName: this.dbServerName,
        dbKeepDays: this.dbKeepDays,
        dbShowLogbook: this.dbShowLogbook,
        dbShowHistory: this.dbShowHistory,
      });

      this.errorDbInfo = result.error;
      this.messageDbInfo = result.info;
    } catch (err) {
      // eslint-disable-next-line
      this.errorDbInfo = err;
    }

    this.dbConnectionValidating = false;
  }

  private dbShowLogbookChanged(ev) {
    const newVal = ev.target.checked;
    if (newVal !== this.dbShowLogbook) {
      this.dbShowLogbook = newVal;
      if (this.dbShowLogbook && this.isNotSeleced(this.dbEngine)) {
        this.dbEngine = "SQLite (memory)";
      }
      this.saveDbSettings();
    }
  }

  private dbShowHistoryChanged(ev) {
    const newVal = ev.target.checked;
    if (newVal !== this.dbShowHistory) {
      this.dbShowHistory = newVal;
      if (this.dbShowHistory && this.isNotSeleced(this.dbEngine)) {
        this.dbEngine = "SQLite (memory)";
      }
      this.saveDbSettings();
    }
  }

  private dbEngineChanged(ev) {
    const newVal = ev.target!.selected;
    if (newVal !== this.dbEngine) {
      this.dbEngine = newVal;
      if (this.isNotSeleced(newVal)) {
        this.dbShowHistory = false;
        this.dbShowLogbook = false;
        this.saveDbSettings();
      }
      if (newVal === "SQLite (memory)") {
        this.saveDbSettings();
      }
      if (newVal === "SQLite (file)") {
        this.dbDrive = "-";
      }
    }
  }

  private dbDriveChanged(ev) {
    const newVal = ev.target!.selected;
    if (newVal !== this.dbDrive) {
      this.dbDrive = newVal;
    }
  }

  private dbUserChanged(ev) {
    const newVal = ev.detail.value;
    if (newVal !== this.dbUser) {
      this.dbUser = newVal;
    }
  }

  private dbPasswordChanged(ev) {
    const newVal = ev.detail.value;
    if (newVal !== this.dbPassword) {
      this.dbPassword = newVal;
    }
  }

  private dbServerIpChanged(ev) {
    const newVal = ev.detail.value;
    if (newVal !== this.dbServerIp) {
      this.dbServerIp = newVal;
    }
  }

  private dbServerNameChanged(ev) {
    const newVal = ev.detail.value;
    if (newVal !== this.dbServerName) {
      this.dbServerName = newVal;
    }
  }

  private dbKeepDaysChanged(ev) {
    const newVal = ev.detail.value;
    if (newVal !== this.dbKeepDays) {
      this.dbKeepDays = newVal;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-config-ais-dom-config-logs": HaConfigAisDomConfiglLogs;
  }
}
