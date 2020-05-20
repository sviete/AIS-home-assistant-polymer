import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";

import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";

import "./ha-config-ais-dom-dashboard";
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
          border: 7px solid var(--primary-color);
          width: 110px;
          height: 110px;
        }
      </style>

      <hass-subpage header="Konfiguracja bramki AIS dom">
        <div class$="[[computeClasses(isWide)]]">
          <ha-config-section is-wide="[[isWide]]">
            <span slot="header">Ustawienia głosu Asystenta</span>
            <span slot="introduction"
              >Możesz zmienić głos asystenta i dostosować szybkość i ton mowy
              oraz godziny, w których asystent powinien być ściszony</span
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
                    src="/static/ais_dom/Ania.jpg"
                  />
                </div>
                <div class="person">
                  <img
                    class$='[[personImgClass(selectedVoice, "Jola lokalnie")]]'
                    data-voice="Jola lokalnie"
                    alt="Jola Lokalnie"
                    title="Jola Lokalnie"
                    on-click="switchTtsPerson"
                    src="/static/ais_dom/Asia.jpg"
                  />
                </div>
                <div class="person">
                  <img
                    class$='[[personImgClass(selectedVoice, "Celina")]]'
                    data-voice="Celina"
                    alt="Celina"
                    title="Celina"
                    on-click="switchTtsPerson"
                    src="/static/ais_dom/Celka.jpg"
                  />
                </div>
                <div class="person">
                  <img
                    class$='[[personImgClass(selectedVoice, "Anżela")]]'
                    data-voice="Anżela"
                    alt="Anżela"
                    title="Anżela"
                    on-click="switchTtsPerson"
                    src="/static/ais_dom/Anzela.jpg"
                  />
                </div>
                <div class="person">
                  <img
                    class$='[[personImgClass(selectedVoice, "Asia")]]'
                    data-voice="Asia"
                    alt="Asia"
                    title="Asia"
                    on-click="switchTtsPerson"
                    src="/static/ais_dom/Kasia.jpg"
                  />
                </div>
                <div class="person">
                  <img
                    class$='[[personImgClass(selectedVoice, "Sebastian")]]'
                    data-voice="Sebastian"
                    alt="Sebastian"
                    title="Sebastian"
                    on-click="switchTtsPerson"
                    src="/static/ais_dom/Sebastian.jpg"
                  />
                </div>
                <div class="person">
                  <img
                    class$='[[personImgClass(selectedVoice, "Bartek")]]'
                    data-voice="Bartek"
                    alt="Bartek"
                    title="Bartek"
                    on-click="switchTtsPerson"
                    src="/static/ais_dom/Bartek.jpg"
                  />
                </div>
                <div class="person">
                  <img
                    class$='[[personImgClass(selectedVoice, "Andrzej")]]'
                    data-voice="Andrzej"
                    alt="Andrzej"
                    title="Andrzej"
                    on-click="switchTtsPerson"
                    src="/static/ais_dom/Andrzej.jpg"
                  />
                </div>
              </div>
              <div class="card-actions person-actions">
                <div on-click="tuneVoiceTone">
                  <ha-icon-button
                    class="user-button"
                    icon="hass:tune"
                  ></ha-icon-button
                  ><mwc-button>Ton mowy</mwc-button>
                </div>
                <div on-click="tuneVoiceSpeed">
                  <ha-icon-button
                    class="user-button"
                    icon="hass:play-speed"
                  ></ha-icon-button
                  ><mwc-button>Szybkość mowy</mwc-button>
                </div>
                <div>
                  <ha-icon-button
                    class="user-button"
                    icon="hass:account"
                  ></ha-icon-button
                  ><mwc-button>[[selectedVoice]]</mwc-button>
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
      selectedVoice: {
        type: String,
        computed: "_computeAisSelectedVoice(hass)",
      },
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
}

customElements.define("ha-config-ais-dom-config-tts", HaConfigAisDomControl);
