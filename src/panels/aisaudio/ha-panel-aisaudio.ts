import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators";
import "@polymer/app-layout/app-header-layout/app-header-layout";
import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "@material/mwc-checkbox";
import "@material/mwc-formfield";
import {
  mdiMicrophone,
  mdiFolderMultiple,
  mdiMusicNotePlus,
  mdiInformation,
} from "@mdi/js";
import { showVoiceCommandDialog } from "../../dialogs/voice-command-dialog/show-ha-voice-command-dialog";
import { showMediaBrowserDialog } from "../../components/media-player/show-media-browser-dialog";
import { showCheckMediaSourceAisDialog } from "../../components/media-player/show-check-media-source-ais-dialog";
import { showAddMediaSourceAisDialog } from "../../components/media-player/show-add-media-source-ais-dialog";
import { MediaPickedEvent } from "../../data/media-player";
import "../../components/ha-menu-button";
import "../../components/ha-card";
import { aisAudioLovelace } from "./ais_audio_lovelace";
import type { HomeAssistant } from "../../types";
import "../lovelace/views/hui-view";
import { Lovelace } from "../lovelace/types";
import { haStyle } from "../../resources/styles";

@customElement("ha-panel-aisaudio")
class PanelAisAudio extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean, reflect: true })
  public narrow!: boolean;

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
        // eslint-disable-next-line no-console
        console.log("option: " + option),
    });
  }

  private _showAddAisMedia(): void {
    showAddMediaSourceAisDialog(this, {
      selectedOptionCallback: (option: string) =>
        // eslint-disable-next-line no-console
        console.log("option: " + option),
    });
  }

  private _showVoiceCommandDialog(): void {
    showVoiceCommandDialog(this, this.hass);
  }

  protected render(): TemplateResult {
    const lovelace: Lovelace = {
      config: aisAudioLovelace,
      rawConfig: aisAudioLovelace,
      editMode: false,
      urlPath: null,
      enableFullEditMode: () => undefined,
      mode: "storage",
      locale: this.hass.locale,
      saveConfig: async () => undefined,
      deleteConfig: async () => undefined,
      setEditMode: () => undefined,
    };

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
              .path=${mdiInformation}
              @click=${this._showCheckAisMedia}
            ></ha-icon-button>
            <ha-icon-button
              label="Dodaj audio"
              icon="hass:music-note-plus"
              .path=${mdiMusicNotePlus}
              @click=${this._showAddAisMedia}
            ></ha-icon-button>
            <div main-title>Audio</div>
            <ha-icon-button
              label="Przeglądaj media"
              .path=${mdiFolderMultiple}
              @click=${this._showBrowseMedia}
            ></ha-icon-button>
            <ha-icon-button
              label="Rozpocznij rozmowę"
              .path=${mdiMicrophone}
              @click=${this._showVoiceCommandDialog}
            ></ha-icon-button>
          </app-toolbar>
        </app-header>
        <hui-view .hass=${this.hass} .lovelace=${lovelace} index="0"></hui-view>
      </app-header-layout>
    `;
  }

  static get styles(): CSSResultGroup {
    return [
      haStyle,
      css`
        :host {
          min-height: 100vh;
          height: 0;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          background: var(--primary-background-color);
        }
        :host > * {
          flex: 1;
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
