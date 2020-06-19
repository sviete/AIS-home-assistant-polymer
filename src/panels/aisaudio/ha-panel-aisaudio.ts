import {
  customElement,
  LitElement,
  property,
  CSSResultArray,
  css,
  TemplateResult,
  html,
} from "lit-element";

import "@polymer/app-layout/app-header-layout/app-header-layout";
import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "@material/mwc-checkbox";
import "@material/mwc-formfield";

import "../../components/ha-menu-button";
import "../../components/ha-card";
import { aisAudioLovelace } from "./ais_audio_lovelace";
import type { HomeAssistant } from "../../types";
import { haStyle } from "../../resources/styles";
import "../lovelace/views/hui-view";
import { Lovelace } from "../lovelace/types";

@customElement("ha-panel-aisaudio")
class PanelAisAudio extends LitElement {
  @property() public hass!: HomeAssistant;

  @property({ type: Boolean, reflect: true })
  public narrow!: boolean;

  @property() private _columns?: number;

  private mqls?: MediaQueryList[];

  private lovelace: Lovelace = {
    config: aisAudioLovelace,
    editMode: false,
    enableFullEditMode: () => undefined,
    mode: "storage",
    language: "pl",
    saveConfig: async () => undefined,
    deleteConfig: async () => undefined,
    setEditMode: () => undefined,
  };

  private _updateColumns() {
    const matchColumns = this.mqls!.reduce(
      (cols, mql) => cols + Number(mql.matches),
      0
    );
    // Do -1 column if the menu is docked and open
    this._columns = Math.max(
      1,
      matchColumns -
        Number(!this.narrow && this.hass!.dockedSidebar === "docked")
    );
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    if (changedProps.has("narrow")) {
      this._updateColumns();
      return;
    }

    if (!changedProps.has("hass")) {
      return;
    }

    const oldHass = changedProps.get("hass") as this["hass"];

    if (oldHass && this.hass!.dockedSidebar !== oldHass.dockedSidebar) {
      this._updateColumns();
    }
  }

  protected firstUpdated() {
    this._updateColumns = this._updateColumns.bind(this);
    this.mqls = [300, 600, 900, 1200].map((width) => {
      const mql = matchMedia(`(min-width: ${width}px)`);
      mql.addListener(this._updateColumns);
      return mql;
    });
    this._updateColumns();
  }

  protected render(): TemplateResult {
    return html`
      <app-header-layout has-scrolling-region>
        <app-header fixed slot="header">
          <app-toolbar>
            <ha-menu-button
              .hass=${this.hass}
              .narrow=${this.narrow}
            ></ha-menu-button>
            <div main-title>Audio</div>
            <ha-icon-button
              icon="hass:refresh"
              @click=${this._handleRefresh}
            ></ha-icon-button>
          </app-toolbar>
        </app-header>
        <hui-view
          .hass=${this.hass}
          .lovelace=${this.lovelace}
          index="0"
          .columns=${this._columns}
        ></hui-view>
      </app-header-layout>
    `;
  }

  private async _handleRefresh(): Promise<void> {
    console.log("refresh");
  }

  static get styles(): CSSResultArray {
    return [
      haStyle,
      css`
        .content {
          padding: 16px;
          display: flex;
          box-sizing: border-box;
        }

        :host(:not([narrow])) .content {
          height: calc(100vh - 64px);
        }

        :host([narrow]) .content {
          flex-direction: column-reverse;
          padding: 8px 0 0 0;
        }

        :host([narrow]) .calendar-list {
          margin-bottom: 24px;
          width: 100%;
          padding-right: 0;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-panel-aisaudio": PanelAisAudio;
  }
}
