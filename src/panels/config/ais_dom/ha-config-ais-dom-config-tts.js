import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "@polymer/paper-icon-button/paper-icon-button";
import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";

import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";

import "./ha-config-ais-dom-navigation";
import { fireEvent } from "../../../common/dom/fire_event";
import "../../../components/paper-time-input.js";
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
        ha-card > paper-toggle-button {
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
        img.person-img-selected {
          border: 7px solid #ff9800;
          width: 110px;
          height: 110px;
        }
      </style>

      <hass-subpage header="Konfiguracja bramki AIS dom">
        <div class$="[[computeClasses(isWide)]]">
          <ha-config-section is-wide="[[isWide]]">
            <span slot="header">Ustawienia głosu Asystenta</span>
            <span slot="introduction"
              >Możesz zmienić głos asystenta i dostosować szybkość i ton mowy
              oraz godziny w których asystent powinien być ściszony</span
            >
            <ha-card header="Wybór głosu Asystenta">
              <div class="card-content">
                <div class="person">
                  <img
                    class$='[[personImgClass(selectedVoice, "Jola online")]]'
                    data-voice="Jola online"
                    alt="Jola Online"
                    title="Jola Online"
                    on-click="switchTtsPerson"
                    src="/static/ais_dom/Ania.png"
                  />
                </div>
                <div class="person">
                  <img
                    class$='[[personImgClass(selectedVoice, "Jola lokalnie")]]'
                    data-voice="Jola lokalnie"
                    alt="Jola Lokalnie"
                    title="Jola Lokalnie"
                    on-click="switchTtsPerson"
                    src="/static/ais_dom/Asia.png"
                  />
                </div>
                <div class="person">
                  <img
                    class$='[[personImgClass(selectedVoice, "Celina")]]'
                    data-voice="Celina"
                    alt="Celina"
                    title="Celina"
                    on-click="switchTtsPerson"
                    src="/static/ais_dom/Celka.png"
                  />
                </div>
                <div class="person">
                  <img
                    class$='[[personImgClass(selectedVoice, "Anżela")]]'
                    data-voice="Anżela"
                    alt="Anżela"
                    title="Anżela"
                    on-click="switchTtsPerson"
                    src="/static/ais_dom/Anzela.png"
                  />
                </div>
                <div class="person">
                  <img
                    class$='[[personImgClass(selectedVoice, "Asia")]]'
                    data-voice="Asia"
                    alt="Asia"
                    title="Asia"
                    on-click="switchTtsPerson"
                    src="/static/ais_dom/Kasia.png"
                  />
                </div>
                <div class="person">
                  <img
                    class$='[[personImgClass(selectedVoice, "Sebastian")]]'
                    data-voice="Sebastian"
                    alt="Sebastian"
                    title="Sebastian"
                    on-click="switchTtsPerson"
                    src="/static/ais_dom/Sebastian.png"
                  />
                </div>
                <div class="person">
                  <img
                    class$='[[personImgClass(selectedVoice, "Bartek")]]'
                    data-voice="Bartek"
                    alt="Bartek"
                    title="Bartek"
                    on-click="switchTtsPerson"
                    src="/static/ais_dom/Bartek.png"
                  />
                </div>
                <div class="person">
                  <img
                    class$='[[personImgClass(selectedVoice, "Andrzej")]]'
                    data-voice="Andrzej"
                    alt="Andrzej"
                    title="Andrzej"
                    on-click="switchTtsPerson"
                    src="/static/ais_dom/Andrzej.png"
                  />
                </div>
              </div>
              <div class="card-actions person-actions">
                <div on-click="tuneVoiceTone">
                  <paper-icon-button
                    class="user-button"
                    icon="hass:tune"
                  ></paper-icon-button
                  ><mwc-button>Ton mowy</mwc-button>
                </div>
                <div on-click="tuneVoiceSpeed">
                  <paper-icon-button
                    class="user-button"
                    icon="hass:play-speed"
                  ></paper-icon-button
                  ><mwc-button>Szybkość mowy</mwc-button>
                </div>
                <div>
                  <paper-icon-button
                    class="user-button"
                    icon="hass:account"
                  ></paper-icon-button
                  ><mwc-button>[[selectedVoice]]</mwc-button>
                </div>
              </div>
            </ha-card>
            <ha-card header="Uruchamiaj Tryb nocny*">
              <paper-toggle-button
                checked="{{quietMode}}"
                on-change="changeQuietMode"
              ></paper-toggle-button>
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
                [[quietModeStartH]]:[[quietModeStartM]], asystent:
                <ul>
                  <li>zredukuje głośność czytanych powiadomień do 20%</li>
                  <li>zredukuje głośność odtwarzacza audio do 20%</li>
                  <li>zmieni motyw wyglądu aplikacji na nocny</li>
                </ul>
                Po zakończeniu ciszy nocnej, o godzinie
                [[quietModeStopH]]:[[quietModeStopM]] głośność i wygląd zostaną
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
      selectedVoice: {
        type: String,
        computed: "_computeAisSelectedVoice(hass)",
      },
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

  _computeAisSelectedVoice(hass) {
    return hass.states["input_select.assistant_voice"].state;
  }

  personImgClass(selectedVoice, person) {
    if (selectedVoice === person) {
      return "person-img-selected";
    }
    return "";
  }

  tuneVoiceSpeed() {
    fireEvent(this, "hass-more-info", {
      entityId: "input_number.assistant_rate",
    });
  }

  tuneVoiceTone() {
    fireEvent(this, "hass-more-info", {
      entityId: "input_number.assistant_tone",
    });
  }

  switchTtsPerson(e) {
    this.hass.callService("input_select", "select_option", {
      entity_id: "input_select.assistant_voice",
      option: e.target.dataset.voice,
    });
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
      this.quietModeInfo = "Jeśli włączysz tryb nocny to ";
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

customElements.define("ha-config-ais-dom-config-tts", HaConfigAisDomControl);
