import "../../../components/ha-time-input";
import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";

import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";

import "./ha-config-ais-dom-dashboard";
import "../../../components/ha-base-time-input";
import "../../../components/ha-switch";
import { css, html, CSSResultGroup, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import { HomeAssistant } from "../../../types";
/*
 *
 */

@customElement("ha-config-ais-dom-config-night")
class HaConfigAisDomConfigNight extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public isWide = true;

  @property({ type: Boolean }) public narrow = false;

  @property({ type: Boolean }) public quietMode = false;

  @property({ type: String }) public quietModeInfo;

  protected async firstUpdated() {
    this.quietMode = this._computeQuietMode(this.hass);
  }

  static get styles(): CSSResultGroup {
    return css`
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
    `;
  }

  protected render(): TemplateResult {
    return html`
      <hass-subpage header="Konfiguracja bramki AIS dom">
        <div .narrow=${this.narrow}>
          <ha-config-section .isWide=${this.isWide}>
            <span slot="header">Ustawienia trybu nocnego</span>
            <span slot="introduction"
              >Możesz ustalić, w jakich godzinach asystent ma ściszać audio oraz
              zmieniać wygląd aplikacji na "nocny"</span
            >
            <ha-card header="Uruchamiaj tryb nocny*">
              <div id="ha-switch-id">
                <ha-switch
                  .checked=${this.quietMode}
                  @change=${this.changeQuietMode}
                ></ha-switch>
              </div>
              <div
                class="card-content"
                style="display: flex; align-items: center;"
              >
                Rozpocznij o godzinie
                <ha-time-input
                  id="ais_quiet_mode_start"
                  .value=${this.hass.states[
                    "input_datetime.ais_quiet_mode_start"
                  ].state || "22:00"}
                  .locale=${this.hass.locale}
                  @value-changed=${this._selectedValueChanged}
                ></ha-time-input>
                zakończ o godzinie
                <ha-time-input
                  id="ais_quiet_mode_stop"
                  .value=${this.hass.states[
                    "input_datetime.ais_quiet_mode_stop"
                  ].state || "6:00"}
                  .locale=${this.hass.locale}
                  @value-changed=${this._selectedValueChanged}
                ></ha-time-input>
              </div>
              <div class="card-content">
                ${this.hass.states["input_boolean.ais_quiet_mode"].state ===
                "on"
                  ? html`o godzinie`
                  : html`Jeśli włączysz tryb nocny, to o godzinie`}
                ${this.hass.states["input_datetime.ais_quiet_mode_start"]
                  .state || "22:00"}
                asystent:
                <ul>
                  <li>zredukuje głośność czytanych powiadomień do 20%</li>
                  <li>zredukuje głośność odtwarzacza audio do 20%</li>
                  <li>zmieni motyw wyglądu aplikacji na nocny</li>
                </ul>
                Po zakończeniu ciszy nocnej, o godzinie
                ${this.hass.states["input_datetime.ais_quiet_mode_stop"]
                  .state || "6:00"},
                głośność i wygląd zostaną automatycznie przywrócone do wartości
                przed ciszą nocną.
              </div>
            </ha-card>
          </ha-config-section>
        </div>
      </hass-subpage>
    `;
  }

  computeClasses(isWide) {
    return isWide ? "content" : "content narrow";
  }

  _computeQuietMode(hass) {
    if (hass.states["input_boolean.ais_quiet_mode"].state === "off") {
      this.quietModeInfo = "Jeśli włączysz tryb nocny, to ";
      return false;
    }
    this.quietModeInfo = "";
    return true;
  }

  _selectedValueChanged(ev) {
    const el = ev.target;
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

declare global {
  interface HTMLElementTagNameMap {
    "ha-config-ais-dom-config-night": HaConfigAisDomConfigNight;
  }
}
