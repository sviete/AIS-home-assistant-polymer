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
        ha-card > div#ha-switch-id {
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
            <span slot="header">Ustawienie zapisu do plików</span>
            <span slot="introduction"
              >Tu możesz ustalić czy loigi i baza danych ma być zapisywana na
              wymiennym dysku</span
            >
            <ha-card header="Zapis do plików">
              <div id="ha-switch-id">
                <ha-switch
                  checked="{{recMode}}"
                  on-change="changeRecMode"
                ></ha-switch>
              </div>
              <div class="card-content">
                Wybór dysku do zapisu: <br />
                <ha-paper-dropdown-menu
                  label-float="Wybrany dysk"
                  dynamic-align=""
                  label="Dyski wymienne"
                >
                  <paper-listbox
                    slot="dropdown-content"
                    selected="[[recDrive.state]]"
                    on-selected-changed="recDriveChanged"
                    attr-for-selected="item-name"
                  >
                    <template
                      is="dom-repeat"
                      items="[[recDrive.attributes.options]]"
                    >
                      <paper-item item-name$="[[item]]">[[item]]</paper-item>
                    </template>
                  </paper-listbox>
                </ha-paper-dropdown-menu>
              </div>
              <div class="card-content">
                [[recLogModeInfo]]
                <ul>
                  <li>[[recDbModeFileLog]]</li>
                  <li>[[quietModeFileDB]]</li>
                </ul>
              </div>
            </ha-card>
          </ha-config-section>

          <ha-config-section is-wide="[[isWide]]">
            <span slot="header">Ustawienia poziomu logowania</span>
            <span slot="introduction">
              Możesz zmienić poziom logowania z domyślnego "warning" na inny.
              Naprzykład na "debug" żeby sparwdzić działanie nowego komponentu.
            </span>
            <ha-card header="Wybór poziomu logowania">
              <div class="card-content">
                <div class="log_level">
                  <paper-icon-button
                    class="user-button"
                    icon="mdi:bug-check"
                  ></paper-icon-button
                  ><mwc-button>debug</mwc-button>
                </div>
                <div class="log_level">
                  <paper-icon-button
                    class="user-button"
                    icon="mdi:information-outline"
                  ></paper-icon-button
                  ><mwc-button>info</mwc-button>
                </div>
                <div class="log_level">
                  <paper-icon-button
                    class="user-button"
                    icon="hass:alert"
                  ></paper-icon-button
                  ><mwc-button>warning</mwc-button>
                </div>
                <div class="log_level">
                  <paper-icon-button
                    class="user-button"
                    icon="mdi:alert-box"
                  ></paper-icon-button
                  ><mwc-button>error</mwc-button>
                </div>
                <div class="log_level">
                  <paper-icon-button
                    class="user-button"
                    icon="mdi:alert-octagon"
                  ></paper-icon-button
                  ><mwc-button>fatal</mwc-button>
                </div>
                <div class="log_level">
                  <paper-icon-button
                    class="user-button"
                    icon="mdi:alert-octagram"
                  ></paper-icon-button
                  ><mwc-button>critical</mwc-button>
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
      recMode: {
        type: Boolean,
        computed: "_computeRecMode(hass)",
      },
      recDrive: {
        type: Object,
        computed: "_computeRecDrive(hass)",
      },
      recLogModeInfo: String,
      recDbModeInfo: String,
      recDbModeFileLog: String,
      quietModeFileDB: String,
    };
  }

  computeClasses(isWide) {
    return isWide ? "content" : "content narrow";
  }

  _computeRecDrive(hass) {
    return hass.states["input_select.ais_usb_flash_drives"];
  }

  _computeRecMode(hass) {
    const drive = hass.states["input_select.ais_usb_flash_drives"].state;
    let ret = false;
    if (hass.states["input_boolean.ais_logs_rec_mode"].state === "off") {
      this.recLogModeInfo = "Jeśli włączysz zapis, to utworzymy pliki: ";
      ret = false;
    } else {
      this.recLogModeInfo = "Rejestrowanie do plików: ";
      ret = true;
    }

    if (drive !== "-") {
      this.recDbModeFileLog = drive + "/xxxx.log";
      this.quietModeFileDB = drive + "/ddddd.db";
    } else {
      this.recDbModeFileLog = "";
      this.quietModeFileDB = "";
    }

    return ret;
  }

  recDriveChanged(ev) {
    var oldVal = this.hass.states["input_select.ais_usb_flash_drives"].state;
    var newVal = ev.detail.value;

    if (!newVal || oldVal === newVal) return;

    this.hass.callService("input_select", "select_option", {
      entity_id: "input_select.ais_usb_flash_drives",
      option: newVal,
    });
    this._computeRecMode(this.hass);
  }

  changeRecMode() {
    this.hass.callService("input_boolean", "toggle", {
      entity_id: "input_boolean.ais_logs_rec_mode",
    });
  }
}

customElements.define(
  "ha-config-ais-dom-config-logs",
  HaConfigAisDomControlLogs
);
