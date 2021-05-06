import "../../layouts/ha-app-layout";
import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "@polymer/paper-checkbox/paper-checkbox";
import "../../components/ha-icon-button";
import "@polymer/paper-item/paper-icon-item";
import "@polymer/paper-item/paper-item";
import "@polymer/paper-item/paper-item-body";
import "@polymer/paper-listbox/paper-listbox";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu-light";
import "@material/mwc-list/mwc-list-item";
import "@polymer/paper-input/paper-textarea";
import "@polymer/paper-radio-button/paper-radio-button";
import "@polymer/paper-radio-group/paper-radio-group";
import "../../components/ha-button-menu";
import "../../components/ha-card";
import "../../components/ha-menu-button";
import "../../components/ha-slider";
import "../../components/ha-expansion-panel";
import { HomeAssistant } from "../../types";
import { haStyle } from "../../resources/styles";
import { css, customElement, html, LitElement, property } from "lit-element";

@customElement("ha-panel-aisttsauto")
export class HaPanelAisTtsAuto extends LitElement {
  @property() hass!: HomeAssistant;

  @property() public narrow!: boolean;

  protected firstUpdated(changedProps: PropertyValues): void {
    super.firstUpdated(changedProps);
    console.log("OK");
  }

  protected render() {
    return html`
      <ha-app-layout>
        <app-header slot="header" fixed>
          <app-toolbar>
            <ha-menu-button
              .hass=${this.hass}
              .narrow=${this.narrow}
            ></ha-menu-button>
            <div main-title>TTS w trybie automatycznym</div>
          </app-toolbar>
        </app-header>

        <div class="content">
          <ha-card> ok ccsdcss </ha-card>
        </div>
      </ha-app-layout>
    `;
  }

  static get styles() {
    return [
      haStyle,
      css`
        ha-card {
          padding: 16px;
        }

        .has-header {
          padding-top: 0;
        }

        :host {
          height: 100%;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-panel-aisttsauto": HaPanelAisTtsAuto;
  }
}
