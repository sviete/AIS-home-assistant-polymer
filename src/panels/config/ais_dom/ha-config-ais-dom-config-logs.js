import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";

import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";

import "./ha-config-ais-dom-navigation";
import "../../../components/ha-switch";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu";
import "@polymer/paper-item/paper-item";
import "@polymer/paper-listbox/paper-listbox";
/*
 *
 */
class HaConfigAisDomControlLogs extends PolymerElement {
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
        .card-actions {
          display: flex;
        }
        ha-card > div#card-icon {
          margin: -4px 0;
          position: absolute;
          top: 32px;
          right: 8px;
        }
        .center-container {
          @apply --layout-vertical;
          @apply --layout-center-center;
          height: 70px;
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
      </style>

      <hass-subpage header="Konfiguracja bramki AIS dom">
        <div class$="[[computeClasses(isWide)]]">
          <ha-config-section is-wide="[[isWide]]">
            <span slot="header">Ustawienie zapisu logów systemu</span>
            <span slot="introduction"
              >Tu możesz skonfigurować zapis logów do pliku na wymiennym
              dysku</span
            >
            <ha-card header="Zapisu logów systemu do pliku">
              <div id="card-icon">
                <paper-icon-button
                  icon="mdi:file-document-edit-outline"
                ></paper-icon-button>
              </div>
              <div class="card-content">
                W tym miejscu możesz określić poziom rejestrowania działań w
                Asystencie domowym oraz wybrać lokalizację do pliku loga na
                dysku zewnętrznym.<br /><br />
                Wybór dysku do zapisu logów systemu: <br />
                <paper-icon-button
                  icon="mdi:usb-flash-drive"
                ></paper-icon-button>
                <ha-paper-dropdown-menu
                  label-float="Wybrany dysk"
                  dynamic-align=""
                  label="Dyski wymienne"
                >
                  <paper-listbox
                    slot="dropdown-content"
                    selected="[[recLogDrive]]"
                    on-selected-changed="recLogDriveChanged"
                    attr-for-selected="item-name"
                  >
                    <template
                      is="dom-repeat"
                      items="[[recDrives.attributes.options]]"
                    >
                      <paper-item item-name$="[[item]]">[[item]]</paper-item>
                    </template>
                  </paper-listbox>
                </ha-paper-dropdown-menu>
              </div>
              <div class="card-content">
                Wybór poziomu logowania: <br />
                <paper-icon-button icon="mdi:bug-check"></paper-icon-button>
                <ha-paper-dropdown-menu
                  label-float="Poziom logowania"
                  dynamic-align=""
                  label="Poziomy logowania"
                >
                  <paper-listbox
                    slot="dropdown-content"
                    selected="[[logsLevels.state]]"
                    on-selected-changed="recLogLevelChanged"
                    attr-for-selected="item-name"
                  >
                    <template
                      is="dom-repeat"
                      items="[[logsLevels.attributes.options]]"
                    >
                      <paper-item item-name$="[[item]]">[[item]]</paper-item>
                    </template>
                  </paper-listbox>
                </ha-paper-dropdown-menu>
              </div>
              <div class="card-content">
                [[recLogModeInfo]]
              </div>
            </ha-card>
          </ha-config-section>

          <ha-config-section is-wide="[[isWide]]">
            <span slot="header">Ustawienia zapisu zdarzeń systemu</span>
            <span slot="introduction">
              Tu możesz skonfigurować zapis zdarzeń do bazy danych na dysku
              wymiennym lub do zdalnego serwera bazodanowego
            </span>
            <ha-card header="Zapis zdarzeń do bazy danych">
              <div id="card-icon">
                <paper-icon-button icon="mdi:database"></paper-icon-button>
              </div>
              <div class="card-content">
                Wybierz silnik bazodanowy, który chcesz użyć do rejestracji
                zdarzeń.<br /><br />Domyślnie jest to SQLite, który nie wymaga
                konfiguracji, a jedynie podania lokalizacji na dysku zewnętrznym
                gdzie zostanie utworzony plik bazodanowy ais.db.
                <br /><br />Wybór silnika bazy danych:
                <br />
                <paper-icon-button icon="mdi:database"></paper-icon-button>
                <ha-paper-dropdown-menu
                  label-float="Silnik bazy danych"
                  dynamic-align=""
                  label="Silnik bazy danych"
                >
                  <paper-listbox
                    slot="dropdown-content"
                    selected="[[recDbEngines.state]]"
                    on-selected-changed="recDbEngineChanged"
                    attr-for-selected="item-name"
                  >
                    <template
                      is="dom-repeat"
                      items="[[recDbEngines.attributes.options]]"
                    >
                      <paper-item item-name$="[[item]]">[[item]]</paper-item>
                    </template>
                  </paper-listbox>
                </ha-paper-dropdown-menu>
              </div>
              <div class="card-content" style="display: [[recDbFileDisplay]]">
                Wybór dysku do zapisu bazy danych: <br />
                <paper-icon-button
                  icon="mdi:usb-flash-drive"
                ></paper-icon-button>
                <ha-paper-dropdown-menu
                  label-float="Wybrany dysk"
                  dynamic-align=""
                  label="Dyski wymienne"
                >
                  <paper-listbox
                    slot="dropdown-content"
                    selected="[[recDbDrive]]"
                    on-selected-changed="recDbDriveChanged"
                    attr-for-selected="item-name"
                  >
                    <template
                      is="dom-repeat"
                      items="[[recDrives.attributes.options]]"
                    >
                      <paper-item item-name$="[[item]]">[[item]]</paper-item>
                    </template>
                  </paper-listbox>
                </ha-paper-dropdown-menu>
              </div>
              <div
                class="card-content"
                style="display: [[recDbConectionDisplay]]"
              >
                Parametry połączenia z bazą danych: <br />
                <paper-input
                  placeholder="Użytkownik"
                  type="text"
                  id="db_user"
                  on-change="_recDbModeInfo"
                >
                  <iron-icon icon="mdi:account" slot="suffix"></iron-icon>
                </paper-input>
                <paper-input
                  placeholder="Hasło"
                  no-label-float=""
                  type="password"
                  id="db_password"
                  on-change="_recDbModeInfo"
                  ><iron-icon icon="mdi:lastpass" slot="suffix"></iron-icon
                ></paper-input>
                <paper-input
                  placeholder="IP Serwera DB"
                  no-label-float=""
                  type="text"
                  id="db_server_ip"
                  on-change="_recDbModeInfo"
                  ><iron-icon icon="mdi:ip-network" slot="suffix"></iron-icon
                ></paper-input>
                <paper-input
                  placeholder="Nazwa bazy"
                  no-label-float=""
                  type="text"
                  id="db_server_name"
                  on-change="_recDbModeInfo"
                  ><iron-icon
                    icon="mdi:database-check"
                    slot="suffix"
                  ></iron-icon
                ></paper-input>
              </div>
              <div class="card-content">
                DB URL: [[recDbModeInfo]]
                <br />
                <div class="center-container">
                  <template is="dom-if" if="[[!dbConnectionValid]]">
                    <mwc-button raised="" on-click="doCheckDbConnection">
                      Sprawdz połączenie
                    </mwc-button>
                  </template>
                  <template is="dom-if" if="[[dbConnectionValid]]">
                    <mwc-button raised="" on-click="doSaveDbConnection">
                      Zastosuj połączenie do zapisu zdarzeń
                    </mwc-button>
                  </template>
                  <template is="dom-if" if="[[validating]]">
                    <paper-spinner active=""></paper-spinner>
                  </template>
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
      recDrives: {
        type: Object,
        computed: "_computeRecDrives(hass)",
      },
      recLogDrive: {
        type: String,
        computed: "_computeRecLogDrive(hass)",
      },
      logsLevels: {
        type: Object,
        computed: "_computeLogsLevels(hass)",
      },
      recDbDrives: {
        type: Object,
        computed: "_computeRecDbDrives(hass)",
      },
      recDbDrive: {
        type: String,
      },
      recDbEngines: {
        type: Object,
        computed: "_computeDbEngines(hass)",
      },
      recDbEngine: {
        type: String,
      },
      validating: {
        type: Boolean,
        value: false,
      },
      dbConnectionInfo: {
        type: Object,
        computed: "getDbConnectionInfo()",
      },
      dbConnectionValid: Boolean,
      recLogModeInfo: String,
      recDbModeInfo: String,
      recDbConectionDisplay: String,
      recDbFileDisplay: String,
    };
  }

  ready() {
    super.ready();
    this.hass.callService("ais_files", "get_ext_drivers_info");
    this._recDbModeInfo(this.hass);
    this.dbConnectionValid = false;
  }

  doCheckDbConnection() {
    this.validating = true;
    this.hass.callService("ais_files", "check_db_connection", {
      dburl: this.recDbModeInfo,
    });

    this.dbConnectionValid = true;
    this.getDbConnectionInfo();
  }

  getDbConnectionInfo() {
    var connectionInfo = this.hass.states["sensor.ais_db_connection_info"];
    if (connectionInfo.state === "0") {
      console.log("--------------");
      this.validating = false;
    }
    console.log(connectionInfo.state);
    console.log(this.validating);
    return connectionInfo;
  }

  doSaveDbConnection() {
    var dbUrl = this.getDbConnectionInfo();
    this.hass.callService("ais_files", "change_db_connection", {
      value: dbUrl,
    });
    // this.dbConnectionValid = false;
  }

  computeClasses(isWide) {
    return isWide ? "content" : "content narrow";
  }

  _computeRecDrives(hass) {
    return hass.states["input_select.ais_usb_flash_drives"];
  }

  _computeLogsLevels(hass) {
    return hass.states["input_select.ais_system_logs_level"];
  }

  _computeDbEngines(hass) {
    const engines = hass.states["input_select.ais_db_engines"];
    this.recDbEngine = engines.state;
    return engines;
  }

  _computeRecLogDrive(hass) {
    return hass.states["input_text.ais_logs_path"].state;
  }

  _computeRecDbDrives(hass) {
    const drives = hass.states["input_select.ais_usb_flash_drives"];
    this.recDbDrive = hass.states["input_text.ais_db_path"].state;
    return drives;
  }

  recLogDriveChanged(ev) {
    var oldVal = this.hass.states["input_text.ais_logs_path"].state;
    var newVal = ev.detail.value;

    if (!newVal || oldVal === newVal) return;

    if (newVal !== "-") {
      this.recLogModeInfo =
        "Logowanie do pliku /dyski-wymienne/" + newVal + "/ais.log";
    } else {
      this.recLogModeInfo = "Logowanie wyłączone ";
    }
  }

  recLogLevelChanged(ev) {
    var oldVal = this.hass.states["input_select.ais_system_logs_level"].state;
    var newVal = ev.detail.value;

    if (!newVal || oldVal === newVal) return;

    this.hass.callService("logger", "set_default_level", {
      level: newVal,
    });

    this.hass.callService("input_select", "select_option", {
      entity_id: "input_select.ais_system_logs_level",
      option: newVal,
    });
  }

  _recDbModeInfo() {
    let dbUrl = "";
    if (this.recDbEngine === "SQLite") {
      this.recDbConectionDisplay = "none";
      this.recDbFileDisplay = "";
      dbUrl =
        "sqlite://///data/data/pl.sviete.dom/files/home/dom/dyski-wymienne/" +
        this.recDbDrive +
        "/ais.db";
    } else {
      this.recDbFileDisplay = "none";
      this.recDbConectionDisplay = "";
      var dbPassword = this.shadowRoot.getElementById("db_password").value;
      var dbUser = this.shadowRoot.getElementById("db_user").value;
      var dbServerIp = this.shadowRoot.getElementById("db_server_ip").value;
      var dbServerName = this.shadowRoot.getElementById("db_server_name").value;
      var dbUserPass = "";
      if (dbUser || dbPassword) {
        dbUserPass = dbUser + ":" + dbPassword + "@";
      }
      if (this.recDbEngine === "MariaDB") {
        dbUrl =
          "mysql+pymysql://" +
          dbUserPass +
          dbServerIp +
          "/" +
          dbServerName +
          "?charset=utf8";
      } else if (this.recDbEngine === "MySQL") {
        dbUrl =
          "mysql://" +
          dbUserPass +
          dbServerIp +
          "/" +
          dbServerName +
          "?charset=utf8";
      } else if (this.recDbEngine === "PostgreSQL") {
        dbUrl = "postgresql://" + dbUserPass + dbServerIp + "/" + dbServerName;
      }
    }

    this.recDbModeInfo = dbUrl;
  }

  recDbDriveChanged(ev) {
    var oldVal = this.hass.states["input_text.ais_db_path"].state;
    var newVal = ev.detail.value;

    if (!newVal || oldVal === newVal) return;

    this.hass.callService("ais_files", "change_sqlight_path", {
      value: newVal,
    });

    this.recDbDrive = newVal;
    this._recDbModeInfo();
  }

  recDbEngineChanged(ev) {
    var oldVal = this.hass.states["input_select.ais_db_engines"].state;
    var newVal = ev.detail.value;

    if (!newVal || oldVal === newVal) return;

    this.hass.callService("input_select", "select_option", {
      entity_id: "input_select.ais_db_engines",
      option: newVal,
    });

    this.recDbEngine = newVal;
    this._recDbModeInfo();
  }
}

customElements.define(
  "ha-config-ais-dom-config-logs",
  HaConfigAisDomControlLogs
);
