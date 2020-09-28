import {
  customElement,
  LitElement,
  property,
  CSSResultArray,
  css,
  TemplateResult,
  PropertyValues,
  html,
} from "lit-element";

import "@polymer/app-layout/app-header-layout/app-header-layout";
import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "@polymer/paper-checkbox/paper-checkbox";
import "@material/mwc-checkbox";
import "@material/mwc-formfield";
import { showVoiceCommandDialog } from "../../dialogs/voice-command-dialog/show-ha-voice-command-dialog";
import { showMediaBrowserDialog } from "../../components/media-player/show-media-browser-dialog";
import { showCheckMediaSourceAisDialog } from "../../components/media-player/show-check-media-source-ais-dialog";
import { MediaPickedEvent } from "../../data/media-player";
import "../../components/ha-menu-button";
import "../../components/ha-card";
import { aisAudioLovelace } from "./ais_audio_lovelace";
import type { HomeAssistant } from "../../types";
import { haStyle } from "../../resources/styles";
import "../lovelace/views/hui-view";
import { Lovelace } from "../lovelace/types";
// import { loadJS } from "../../common/dom/load_resource";
// import { hassUrl } from "../../data/auth";

@customElement("ha-panel-aisaudio")
class PanelAisAudio extends LitElement {
  @property() public hass!: HomeAssistant;

  @property({ type: Boolean, reflect: true })
  public narrow!: boolean;

  @property() private _columns?: number;

  // AIS DOM
  // aisJs = [
  //   "/static/ais_dom/cards/card-tools.js?v=11",
  //   "/static/ais_dom/cards/ais-tts.js",
  // ].forEach((resource) => {
  //   const normalizedUrl = new URL(resource, hassUrl).toString();
  //   loadJS(normalizedUrl);
  // });

  private mqls?: MediaQueryList[];

  private lovelace: Lovelace = {
    config: aisAudioLovelace,
    editMode: false,
    urlPath: null,
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

  private _showBrowseMedia(): void {
    showMediaBrowserDialog(this, {
      action: "play",
      entityId: "media_player.wbudowany_glosnik",
      mediaPickedCallback: (pickedMedia: MediaPickedEvent) =>
        this.hass!.callService("media_player", "play_media", {
          entity_id: "media_player.wbudowany_glosnik",
          media_content_id: pickedMedia.item.media_content_id,
          media_content_type: pickedMedia.item.media_content_type,
        }),
    });
  }

  private _showCheckAisMedia(): void {
    showCheckMediaSourceAisDialog(this, {
      selectedOptionCallback: (option: string) =>
        console.log("option: " + option),
    });
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

  private _showVoiceCommandDialog(): void {
    showVoiceCommandDialog(this);
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
            <ha-icon-button
              label="Informacje o audio"
              icon="hass:information"
              @click=${this._showCheckAisMedia}
            ></ha-icon-button>
            <div main-title>Audio</div>
            <ha-icon-button
              label="Przeglądaj media"
              icon="hass:folder-multiple"
              @click=${this._showBrowseMedia}
            ></ha-icon-button>
            <ha-icon-button
              label="Rozpocznij rozmowę"
              icon="hass:forum-outline"
              @click=${this._showVoiceCommandDialog}
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
