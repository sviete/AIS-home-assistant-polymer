import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";

import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";

import "./ha-config-ais-dom-dashboard";
import "../../../components/paper-time-input.js";
import "../../../components/ha-switch";
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
            <span slot="header">Ustawienia trybu nocnego</span>
            <span slot="introduction"
              >Możesz ustalić, w jakich godzinach asystent ma ściszać audio oraz
              zmieniać wygląd aplikacji na "nocny"</span
            >
            <ha-card header="Uruchamiaj tryb nocny*">
              <div id="ha-switch-id">
                <ha-switch
                  checked="{{quietMode}}"
                  on-change="changeQuietMode"
                ></ha-switch>
              </div>
              <div
                class="card-content"
                style="display: flex; align-items: center;"
              >
                Rozpocznij o godzinie
                <paper-time-input
                  id="ais_quiet_mode_start"
                  hour="[[quietModeStartH]]"
                  min="[[quietModeStartM]]"
                  amPm="false"
                  hide-label
                  format="24"
                  maxlength="2"
                  on-change="_selectedValueChanged"
                  style="margin-right:7px;margin-left:7px;"
                ></paper-time-input>
                zakończ o godzinie
                <paper-time-input
                  id="ais_quiet_mode_stop"
                  hour="[[quietModeStopH]]"
                  min="[[quietModeStopM]]"
                  amPm="false"
                  hide-label
                  format="24"
                  maxlength="2"
                  on-change="_selectedValueChanged"
                  style="margin-right:7px;margin-left:7px;"
                ></paper-time-input>
              </div>
              <div class="card-content">
                *[[quietModeInfo]] o godzinie
                [[quietModeStartH]]:[[quietModeStartM]] asystent:
                <ul>
                  <li>zredukuje głośność czytanych powiadomień do 20%</li>
                  <li>zredukuje głośność odtwarzacza audio do 20%</li>
                  <li>zmieni motyw wyglądu aplikacji na nocny</li>
                </ul>
                Po zakończeniu ciszy nocnej, o godzinie
                [[quietModeStopH]]:[[quietModeStopM]], głośność i wygląd zostaną
                automatycznie przywrócone do wartości przed ciszą nocną.
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
      quietMode: {
        type: Boolean,
        computed: "_computeQuietMode(hass)",
      },
      quietModeInfo: String,
      quietModeStartH: String,
      quietModeStartM: String,
      quietModeStopH: String,
      quietModeStopM: String,
    };
  }

  computeClasses(isWide) {
    return isWide ? "content" : "content narrow";
  }

  _computeQuietMode(hass) {
    this.quietModeStartH =
      hass.states["input_datetime.ais_quiet_mode_start"].state.split(":")[0] ||
      "22";
    this.quietModeStartM =
      hass.states["input_datetime.ais_quiet_mode_start"].state.split(":")[1] ||
      "00";
    this.quietModeStopH =
      hass.states["input_datetime.ais_quiet_mode_stop"].state.split(":")[0] ||
      "6";
    this.quietModeStopM =
      hass.states["input_datetime.ais_quiet_mode_stop"].state.split(":")[1] ||
      "00";

    if (hass.states["input_boolean.ais_quiet_mode"].state === "off") {
      this.quietModeInfo = "Jeśli włączysz tryb nocny, to ";
      return false;
    }
    this.quietModeInfo = "";
    return true;
  }

  _selectedValueChanged(ev) {
    var el = ev.target;
    // call service
    this.hass.callService("input_datetime", "set_datetime", {
      entity_id: "input_datetime." + el.id,
      time: el.value,
    });
  }

  changeQuietMode() {
    this.hass.callService("input_boolean", "toggle", {
      entity_id: "input_boolean.ais_quiet_mode",
    });
  }
}

customElements.define("ha-config-ais-dom-config-night", HaConfigAisDomControl);
