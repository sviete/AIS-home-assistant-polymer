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
import {
  css,
  CSSResultArray,
  customElement,
  html,
  LitElement,
  property,
  PropertyValues,
  TemplateResult,
} from "lit-element";

import { haStyle } from "../../../resources/styles";

@customElement("ha-config-ais-dom-config-logs")
class HaConfigAisDomConfiglLogs extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() public isWide?: boolean;

  @property({ type: String }) private logLevel = "info";

  @property({ type: String }) private logDrive = "-";

  @property({ type: String }) private logError = "";

  @property({ type: Number }) private logRotating = 1;

  @property({ type: String }) private logIconAnimationStyle;

  @property({ type: String }) private dbIconAnimationStyle;

  @property({ type: Array }) private usbDrives = [];

  @property({ type: Array }) private dbDrives = [];

  @property({ type: Boolean }) private dbConnectionValidating = false;

  @property({ type: String }) private dbConnectionInfoButton = "";

  @property({ type: String }) private validationError = "";

  @property({ type: String }) private logModeInfo = "";

  @property({ type: String }) private dbUrl = "";

  @property({ type: String }) private dbConectionDisplayStyle = "";

  @property({ type: String }) private dbKeepDaysDisplayStyle = "";

  @property({ type: String }) private dbFileDisplayStyle = "";

  @property({ type: Array }) private dbDrive = [];

  @property({ type: String }) private dbEngine = "";

  @property({ type: String }) private dbUser = "";

  @property({ type: String }) private dbPassword = "";

  @property({ type: String }) private dbServerIp = "";

  @property({ type: String }) private dbServerName = "";

  @property({ type: String }) private dbKeepDays = "";

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
          @apply --layout-vertical;
          @apply --layout-center-center;
          height: 70px;
        }
        .config-invalid .text {
          color: var(--google-red-500);
          font-weight: 500;
        }

        @keyframes pulse {
          0% {
            background-color: var(--card-background-color);
          }
          100% {
            background-color: var(--primary-color);
          }
        }
        @keyframes pulseRed {
          0% {
            background-color: var(--card-background-color);
          }
          100% {
            background-color: var(--material-error-color);
          }
        }
      `,
    ];
  }

  protected firstUpdated(changedProps: PropertyValues): void {
    super.firstUpdated(changedProps);
    this.dbConnectionInfoButton = this._computeDbConnectionSettings(this.hass);
    this.dbDrives = this.hass.states[
      "input_select.ais_usb_flash_drives"
    ].attributes.options;
    this.usbDrives = this.dbDrives;
  }

  protected render(): TemplateResult {
    return html`
      <hass-subpage header="Konfiguracja bramki AIS dom">
        <div .class=${this.isWide}>
          <ha-config-section .is-wide=${this.isWide}>
            <span slot="header">Ustawienie zapisu logów systemu</span>
            <span slot="introduction">
              Tu możesz skonfigurować zapis logów do pliku na wymiennym dysku
            </span>
            <ha-card header="Zapis logów systemu do pliku">
              <div id="card-icon" .style=${this.logIconAnimationStyle}>
                <ha-icon-button icon="mdi:record-rec"></ha-icon-button>
              </div>
              <div class="card-content">
                Żeby włączyć logowanie w systemie Asystent domowy, wystarczy
                wybrać lokalizację na dysku wymiennym, w której będzie
                zapisywany plik z rejestrem działań w systemie. <br />
                Dodatkowo można też określić poziom szczegółowości logowania i
                liczbę dni przechowywanych w jednym pliku loga. <br /><br />
                Wybór dysku do zapisu logów systemu: <br />
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
                    .on-selected-item-changed=${this.logDriveChanged}
                  >
                    ${this.usbDrives!.map(
                      (item: string) =>
                        html`
                          <paper-item .itemName=${item} .itemValue=${item}>
                            ${item}
                          </paper-item>
                        `
                    )}
                  </paper-listbox>
                </ha-paper-dropdown-menu>
              </div>

              <div class="card-content">
                Wybór poziomu logowania: <br />
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
                    .selected-item-changed=${this.logLevelChanged}
                  >
                    <paper-item item-name="critical">critical</paper-item>
                    <paper-item item-name="fatal">fatal</paper-item>
                    <paper-item item-name="error">error</paper-item>
                    <paper-item item-name="warning">warning</paper-item>
                    <paper-item item-name="warn">warn</paper-item>
                    <paper-item item-name="info">info</paper-item>
                    <paper-item item-name="debug">debug</paper-item>
                  </paper-listbox>
                </ha-paper-dropdown-menu>
                <br /><br />
                W tym miejscu możesz określić liczbę dni przechowywanych w
                jednym pliku loga. Rotacja plików dziennika wykonywna jest o
                północy.
                <paper-input
                  type="number"
                  .value=${this.logRotating}
                  .on-change=${this.logRotatingDaysChanged}
                  maxlength="4"
                  max="9999"
                  min="1"
                  label-float="Liczba dni przechowywanych w jednym pliku loga"
                  label="Liczba dni przechowywanych w jednym pliku loga"
                >
                  <ha-icon icon="mdi:calendar" slot="suffix"></ha-icon>
                </paper-input>
                <div class="config-invalid">
                  <span class="text">
                    ${this.logError}
                  </span>
                </div>
              </div>
              <div class="card-content">
                ${this.logModeInfo}
              </div>
              <div class="card-content">
                * Zmiana poziomu logowania wykonywana jest online - po tej
                zmianie nie trzeba ponownie uruchomieć systemu. Zastosowanie
                zmiany dysku do zapisu systemu lub zmiany liczby dni
                przechowywanych w jednym pliku loga wymaga restartu systemu.
              </div>
            </ha-card>
          </ha-config-section>

          <ha-config-section .is-wide=${this.isWide}>
            <span slot="header">Ustawienia zapisu zdarzeń systemu</span>
            <span slot="introduction">
              Tu możesz skonfigurować zapis zdarzeń do bazy danych na dysku
              wymiennym lub do zdalnego serwera bazodanowego
            </span>
            <ha-card header="Zapis zdarzeń do bazy danych">
              <div id="card-icon" .style=${this.dbIconAnimationStyle}>
                <ha-icon-button icon="mdi:database"></ha-icon-button>
              </div>
              <div class="card-content">
                Wybierz silnik bazodanowy, który chcesz użyć do rejestracji
                zdarzeń.<br /><br />Najprostszy wybór to baza SQLite, która nie
                wymaga konfiguracji i może rejestrować dane w pamięci - taka
                baza jest automatycznie używana, gdy rejestracja zdarzeń
                włączana jest przez integrację (np. Historia lub Dziennik).
                <br /><br />Gdy system generuje więcej zdarzeń lub gdy chcesz
                mieć dostęp do historii, to zalecamy zapisywać zdarzenia na
                zewnętrznym dysku lub w zdalnej bazie danych. <br /><br />
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
                    .on-selected-changed=${this.dbEngineChanged}
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
                    <paper-item item-name="PostgreSQL">PostgreSQL</paper-item>
                  </paper-listbox>
                </ha-paper-dropdown-menu>
              </div>

              <div class="card-content" .style=${this.dbFileDisplayStyle}>
                Wybór dysku do zapisu bazy danych: <br />
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
                    .selected-changed=${this.logDriveChanged}
                  >
                    ${this.dbDrive!.map(
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
              </div>
              <div class="card-content" .style=${this.dbConectionDisplayStyle}>
                Parametry połączenia z bazą danych: <br />
                <paper-input
                  placeholder="Użytkownik"
                  type="text"
                  id="db_user"
                  value=${this.dbUser}
                  .on-change=${this._computeDbUrl}
                >
                  <ha-icon icon="mdi:account" slot="suffix"></ha-icon>
                </paper-input>
                <paper-input
                  placeholder="Hasło"
                  no-label-float=""
                  type="password"
                  id="db_password"
                  .value=${this.dbPassword}
                  .on-change=${this._computeDbUrl}
                >
                  <ha-icon icon="mdi:lastpass" slot="suffix"></ha-icon>
                </paper-input>
                <paper-input
                  placeholder="IP Serwera DB"
                  no-label-float=""
                  type="text"
                  id="db_server_ip"
                  value=${this.dbServerIp}
                  .on-change=${this._computeDbUrl}
                >
                  <ha-icon icon="mdi:ip-network" slot="suffix"></ha-icon>
                </paper-input>
                <paper-input
                  placeholder="Nazwa bazy"
                  no-label-float=""
                  type="text"
                  id="db_server_name"
                  value=${this.dbServerName}
                  .on-change=${this._computeDbUrl}
                >
                  <ha-icon icon="mdi:database-check" slot="suffix"></ha-icon>
                </paper-input>
                <br /><br />
              </div>
              <div class="card-content" style=${this.dbKeepDaysDisplayStyle}>
                Żeby utrzymać system w dobrej kondycji, codziennie dokładnie o
                godzinie 4:12 rano Asystent usuwa z bazy zdarzenia i stany
                starsze niż <b>określona liczba dni</b> (2 dni dla bazy w
                pamięci urządzenia i domyślnie 10 dla innych lokalizacji).
                <br />
                W tym miejscu możesz określić liczbę dni, których historia ma
                być przechowywana w bazie danych.
                <paper-input
                  id="db_keep_days"
                  type="number"
                  value=${this.dbKeepDays}
                  .on-change=${this._computeDbUrl}
                  maxlength="4"
                  max="9999"
                  min="1"
                  label-float="Liczba dni historii przechowywanych w bazie"
                  label="Liczba dni historii przechowywanych w bazie"
                >
                  <ha-icon icon="mdi:calendar" slot="suffix"></ha-icon>
                </paper-input>
              </div>
              <div class="card-content">
                ${this.dbUrl}
                <br /><br />
                <div class="center-container">
                  <template is="dom-if" if=${!this.dbConnectionValidating}>
                    <paper-spinner active=""></paper-spinner>
                  </template>
                  <template is="dom-if" if=${!this.dbConnectionValidating}>
                    <div class="config-invalid">
                      <span class="text">
                        ${!this.validationError}
                      </span>
                    </div>
                    <ha-call-service-button
                      class="warning"
                      .hass=${!this.hass}
                      domain="ais_files"
                      service="check_db_connection"
                      .service-data=${this._addAisDbConnectionData()}
                      >${this.dbConnectionInfoButton}
                    </ha-call-service-button>
                  </template>
                </div>
                <div>
                  * po zmianie połączenia z bazą wymagany jest restart systemu.
                </div>
              </div>
            </ha-card>
          </ha-config-section>
        </div>
      </hass-subpage>
    `;
  }

  private _computeLogsSettings(hass) {
    const connectionInfo = hass.states["sensor.ais_logs_settings_info"];
    const connInfoAttr = connectionInfo.attributes;
    this.logDrive = connInfoAttr.logDrive;
    this.logLevel = connInfoAttr.logLevel;
    this.logRotating = connInfoAttr.logRotating;
    if (connectionInfo.state > 0) {
      if (this.logLevel === "debug") {
        this.logIconAnimationStyle = "animation: pulseRed 2s infinite;";
      } else if (this.logLevel === "info") {
        this.logIconAnimationStyle = "animation: pulseRed 4s infinite;";
      } else if (this.logLevel === "info") {
        this.logIconAnimationStyle = "animation: pulse 5s infinite;";
      } else if (this.logLevel === "warn") {
        this.logIconAnimationStyle = "animation: pulse 6s infinite;";
      } else if (this.logLevel === "warning") {
        this.logIconAnimationStyle = "animation: pulse 7s infinite;";
      } else if (this.logLevel === "error") {
        this.logIconAnimationStyle = "animation: pulse 8s infinite;";
      } else if (this.logLevel === "fatal") {
        this.logIconAnimationStyle = "animation: pulse 9s infinite;";
      } else if (this.logLevel === "critical") {
        this.logIconAnimationStyle = "animation: pulse 10s infinite;";
      }
    } else {
      this.logIconAnimationStyle = "";
    }
    let logError = "";
    if (connInfoAttr.logError) {
      logError = connInfoAttr.logError;
    }
    if (this.logLevel === "debug" && connectionInfo.state) {
      logError +=
        " Logowanie w trybie debug generuje duże ilości logów i obciąża system. Używaj go tylko na czas diagnozowania problemu. ";
    }

    return logError;
  }

  private logDriveChanged(ev) {
    console.log("logDriveChanged");
    this.logDrive = ev.detail.value;
    if (this.logDrive !== "-") {
      this.logModeInfo =
        "Zapis logów do pliku /dyski-wymienne/" + this.logDrive + "/ais.log";
    } else {
      this.logModeInfo = "Zapis logów do pliku wyłączony ";
    }

    this.hass.callService("ais_files", "change_logger_settings", {
      log_drive: this.logDrive,
      log_level: this.logLevel,
      log_rotating: this.logRotating,
    });
  }

  private logLevelChanged(ev) {
    console.log("logLevelChanged");
    this.logLevel = ev.detail.value;
    this.logModeInfo = "Poziom logów: " + this.logLevel;
    this.hass.callService("ais_files", "change_logger_settings", {
      log_drive: this.logDrive,
      log_level: this.logLevel,
      log_rotating: this.logRotating,
    });
  }

  private logRotatingDaysChanged(ev) {
    console.log("logRotatingDaysChanged");
    this.logRotating = Number(ev.target.value);
    if (this.logRotating === 1) {
      this.logModeInfo = "Rotacja logów codziennie.";
    } else {
      this.logModeInfo = "Rotacja logów co " + this.logRotating + " dni.";
    }

    this.hass.callService("ais_files", "change_logger_settings", {
      log_drive: this.logDrive,
      log_level: this.logLevel,
      log_rotating: this.logRotating,
    });
  }

  // DB recorder
  private _computeDbConnectionSettings(hass) {
    const connectionInfo = hass.states["sensor.ais_db_connection_info"];
    const connInfoAttr = connectionInfo.attributes;
    this.validationError = connInfoAttr.errorInfo;
    this.dbEngine = connInfoAttr.dbEngine;
    if (!this.dbEngine) {
      this.dbEngine = "-";
    }
    if (!this.dbDrive) {
      this.dbDrive = connInfoAttr.dbDrive;
    }
    this.dbUrl = connInfoAttr.dbUrl;
    this.dbPassword = connInfoAttr.dbPassword;
    this.dbUser = connInfoAttr.dbUser;
    this.dbServerIp = connInfoAttr.dbServerIp;
    this.dbServerName = connInfoAttr.dbServerName;
    this.dbKeepDays = connInfoAttr.dbKeepDays;

    let buttonName = "";
    if (connectionInfo.state === "no_db_url_saved") {
      buttonName = "Sprawdź połączenie";
      this.dbIconAnimationStyle = "";
    } else if (connectionInfo.state === "db_url_saved") {
      buttonName = "Usuń polączenie";
      this.dbIconAnimationStyle = "animation: pulse 6s infinite;";
    } else if (connectionInfo.state === "db_url_not_valid") {
      buttonName = "Sprawdź połączenie";
      this.dbIconAnimationStyle = "animation: pulseRed 3s infinite;";
    } else if (connectionInfo.state === "db_url_valid") {
      buttonName = "Zapisz połączenie";
      this.dbIconAnimationStyle = "animation: pulse 4s infinite;";
    }

    this.dbConnectionValidating = false;
    this._doComputeDbUrl(false);
    return buttonName;
  }

  private _addAisDbConnectionData() {
    return {
      buttonClick: true,
    };
  }

  private _doComputeDbUrl(getFromPage) {
    let dbUrl = "";
    if (this.dbEngine === "-") {
      this.dbConectionDisplayStyle = "display: none";
      this.dbFileDisplayStyle = "display: none";
      this.dbKeepDaysDisplayStyle = "display: none";
      dbUrl = "";
    } else if (this.dbEngine === "SQLite (file)") {
      this.dbConectionDisplayStyle = "display: none";
      this.dbFileDisplayStyle = "";
      this.dbKeepDaysDisplayStyle = "";
      dbUrl =
        "sqlite://///data/data/pl.sviete.dom/files/home/dom/dyski-wymienne/" +
        this.dbDrive +
        "/ais.db";
      if (getFromPage) {
        this.dbKeepDays = this.shadowRoot.getElementById("db_keep_days").value;
      }
    } else if (this.dbEngine === "SQLite (memory)") {
      this.dbConectionDisplayStyle = "display: none";
      this.dbFileDisplayStyle = "display: none";
      this.dbKeepDaysDisplayStyle = "display: none";
      dbUrl = "sqlite:///:memory:";
    } else {
      this.dbFileDisplayStyle = "display: none";
      this.dbConectionDisplayStyle = "";
      this.dbKeepDaysDisplayStyle = "";
      if (getFromPage) {
        this.dbPassword = this.shadowRoot?.getElementById("db_password").value;
        this.dbUser = this.shadowRoot?.getElementById("db_user").value;
        this.dbServerIp = this.shadowRoot?.getElementById("db_server_ip").value;
        this.dbServerName = this.shadowRoot?.getElementById(
          "db_server_name"
        ).value;
        this.dbKeepDays = this.shadowRoot.getElementById("db_keep_days").value;
      }
      let dbUserPass = "";
      if (this.dbUser || this.dbPassword) {
        dbUserPass = this.dbUser + ":" + this.dbPassword + "@";
      }
      if (this.dbEngine === "MariaDB") {
        dbUrl =
          "mysql+pymysql://" +
          dbUserPass +
          this.dbServerIp +
          "/" +
          this.dbServerName +
          "?charset=utf8mb4";
      } else if (this.dbEngine === "MySQL") {
        dbUrl =
          "mysql://" +
          dbUserPass +
          this.dbServerIp +
          "/" +
          this.dbServerName +
          "?charset=utf8mb4";
      } else if (this.dbEngine === "PostgreSQL") {
        dbUrl =
          "postgresql://" +
          dbUserPass +
          this.dbServerIp +
          "/" +
          this.dbServerName;
      }
    }

    this.dbUrl = dbUrl;
  }

  private _computeDbUrl() {
    this._doComputeDbUrl(true);
    // set backend state
    this.hass.callService("ais_files", "check_db_connection", {
      buttonClick: false,
      dbEngine: this.dbEngine,
      dbDrive: this.dbDrive,
      dbUrl: this.dbUrl,
      dbPassword: this.dbPassword,
      dbUser: this.dbUser,
      dbServerIp: this.dbServerIp,
      dbServerName: this.dbServerName,
      dbKeepDays: this.dbKeepDays,
      errorInfo: "",
    });
  }

  private dbDriveChanged(ev) {
    const newVal = ev.detail.value;
    this.dbDrive = newVal;
    this._computeDbUrl();
  }

  private dbEngineChanged(ev) {
    const newVal = ev.detail.value;
    this.dbEngine = newVal;
    this._computeDbUrl();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-config-ais-dom-config-logs": HaConfigAisDomConfiglLogs;
  }
}
