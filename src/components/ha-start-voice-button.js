import "@polymer/paper-icon-button/paper-icon-button";
import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";

import { EventsMixin } from "../mixins/events-mixin";

import isComponentLoaded from "../common/config/is_component_loaded";
import { fireEvent } from "../common/dom/fire_event";
import { navigate } from "../common/navigate";

/*
 * @appliesMixin EventsMixin
 */
class HaStartVoiceButton extends EventsMixin(PolymerElement) {
  static get template() {
    return html`
      <paper-icon-button
        aria-label="Start conversation"
        icon="hass:microphone"
        hidden$="[[!canListen]]"
        on-click="handleListenClick"
      ></paper-icon-button>
      <paper-icon-button
        on-click="handleAishelpClick"
        aria-label="Pomoc"
        icon="hass:help-circle"
      ></paper-icon-button>
    `;
  }

  static get properties() {
    return {
      hass: {
        type: Object,
        value: null,
      },

      canListen: {
        type: Boolean,
        computed: "computeCanListen(hass)",
        notify: true,
      },
    };
  }

  computeCanListen(hass) {
    return (
      "webkitSpeechRecognition" in window &&
      isComponentLoaded(hass, "conversation") &&
      location.protocol === "https:"
    );
  }

  handleListenClick() {
    fireEvent(this, "show-dialog", {
      dialogImport: () =>
        import(/* webpackChunkName: "voice-command-dialog" */ "../dialogs/ha-voice-command-dialog"),
      dialogTag: "ha-voice-command-dialog",
    });
  }

  handleAishelpClick() {
    navigate(this, `/aishelp`);
  }
}

customElements.define("ha-start-voice-button", HaStartVoiceButton);
