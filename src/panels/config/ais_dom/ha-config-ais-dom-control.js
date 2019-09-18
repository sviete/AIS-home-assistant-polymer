import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "@polymer/paper-icon-button/paper-icon-button";
import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";

import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";

import "./ha-config-ais-dom-navigation";
import LocalizeMixin from "../../../mixins/localize-mixin";

/*
 * @appliesMixin LocalizeMixin
 */
class HaConfigAisDomControl extends LocalizeMixin(PolymerElement) {
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
      </style>

      <hass-subpage header="Konfiguracja bramki AIS dom">
        <div class$="[[computeClasses(isWide)]]">
          <div class="content">
            <ha-config-section is-wide="[[isWide]]">
              <span slot="header">Konfiguracja bramki AIS dom</span>
              <span slot="introduction"
                >Tutaj możesz skonfigurować parametry bramki AIS dom. Pracujemy
                nad tym, żeby wszystkie opcje bramki można było łatwo
                konfigurować z interfejsu użytkownika.
              </span>

              <ha-config-ais-dom-navigation
                hass="[[hass]]"
                show-advanced="[[showAdvanced]]"
              ></ha-config-ais-dom-navigation>
            </ha-config-section>
          </div>
        </div>
      </hass-subpage>
    `;
  }

  static get properties() {
    return {
      hass: Object,
      isWide: Boolean,
      showAdvanced: Boolean,
    };
  }

  computeClasses(isWide) {
    return isWide ? "content" : "content narrow";
  }
}

customElements.define("ha-config-ais-dom-control", HaConfigAisDomControl);
