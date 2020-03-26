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
            <span slot="header">Ustawienia zapisu zdażeń systemu</span>
            <span slot="introduction">
              Tu możesz skonfigurować zapis zdażeń do bazy danych na dysku
              wymiennym
            </span>
            <ha-card header="Zapis do bazy danych">
              <div id="card-icon">
                <paper-icon-button icon="mdi:database"></paper-icon-button>
              </div>
              <div class="card-content">
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
                    on-selected-changed="recDBDriveChanged"
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
                <br />
                <br />
                Funkcjonalność w przygotowaniu...
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
      recDbDrive: {
        type: String,
        computed: "_computeRecDbDrive(hass)",
      },
      recLogModeInfo: String,
      recDbModeInfo: String,
    };
  }

  ready() {
    super.ready();
    this.hass.callService("ais_files", "get_ext_drivers_info");
    // this._computeRecDrives(this.hass);
    // this._computeRecLogDrive(this.hass);
    // this._computeLogsLevels(this.hass);
    // this._computeRecDbDrive(this.hass);
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

  _computeRecLogDrive(hass) {
    return hass.states["input_text.ais_logs_path"].state;
  }

  _computeRecDbDrive(hass) {
    return hass.states["input_text.ais_db_path"].state;
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

    this.hass.callService("ais_files", "change_logger_settings", {
      value: newVal,
    });
  }

  recLogLevelChanged(ev) {
    var oldVal = this.hass.states["input_select.ais_system_logs_level"].state;
    var newVal = ev.detail.value;

    if (!newVal || oldVal === newVal) return;

    this.hass.callService("logger", "set_default_level", {
      level: newVal,
    });
  }

  recDBDriveChanged(ev) {
    var oldVal = this.hass.states["input_text.ais_db_path"].state;
    var newVal = ev.detail.value;

    if (!newVal || oldVal === newVal) return;

    this.hass.callService("ais_files", "change_db_settings", {
      value: newVal,
    });
  }
}

customElements.define(
  "ha-config-ais-dom-config-logs",
  HaConfigAisDomControlLogs
);
