import "@material/mwc-button/mwc-button";
import "@material/mwc-list/mwc-list";
import "@material/mwc-list/mwc-list-item";
import "@polymer/paper-item/paper-item";
import "@polymer/paper-radio-group/paper-radio-group";
import "@polymer/paper-radio-button/paper-radio-button";
import "@polymer/paper-input/paper-input";
import {
  css,
  CSSResult,
  customElement,
  html,
  LitElement,
  property,
  internalProperty,
  TemplateResult,
} from "lit-element";
import "../ha-circular-progress";
import "../ha-chips";
import { createCloseHeading } from "../ha-dialog";
import { haStyleDialog } from "../../resources/styles";
import type { HomeAssistant } from "../../types";
import { HassEntity } from "home-assistant-js-websocket";
import { CheckMediaSourceAisDialogParams } from "./show-check-media-source-ais-dialog";

export interface AisAnswer {
  info: string;
  error: boolean;
  found: boolean;
}

export const CheckMediaSourceAisWs = (
  hass: HomeAssistant
): Promise<AisAnswer> =>
  hass.callWS<AisAnswer>({
    type: "ais_cloud/check_ais_media_source",
  });

export const ConfirmMediaSourceAisWs = (
  hass: HomeAssistant
): Promise<AisAnswer> =>
  hass.callWS<AisAnswer>({
    type: "ais_cloud/confirm_ais_media_source",
  });

@customElement("hui-dialog-add-media-source-ais")
export class HuiDialogAddMediaSourceAis extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false })
  @internalProperty()
  private _loading = false;

  @internalProperty() private audioName = "";

  @internalProperty() private radioType = "";

  @internalProperty() private shareAudio = false;

  private _params?: CheckMediaSourceAisDialogParams;

  private _aisMediaInfo?: HassEntity;

  public showDialog(params: CheckMediaSourceAisDialogParams): void {
    this._params = params;
    this._aisMediaInfo = this.hass.states[
      "media_player.wbudowany_glosnik"
    ] as HassEntity;
  }

  public closeDialog() {
    this._params = undefined;
    // fireEvent(this, "dialog-closed", { dialog: this.localName });
  }

  protected render(): TemplateResult {
    if (!this._params) {
      return html``;
    }

    return html`
      <ha-dialog
        open
        hideActions
        .heading=${createCloseHeading(
          this.hass,
          "Dodaj nowe Multimedia do biblioteki"
        )}
        @closed=${this.closeDialog}
      >
        ${this._loading
          ? html`<ha-circular-progress active></ha-circular-progress>`
          : html`<p>
                ${this._isAudioPlaying() && !this._loading
                  ? html`
                  <span class="aisUrl">
                    Odtwarzasz z URL, <ha-icon icon="mdi:web"></ha-icon>:
                    <b></b>${this.hass.states["media_player.wbudowany_glosnik"].attributes.media_content_id}</b>
                    <br/>ten adres został wypełniony automatycznie - sprawdź czy się zgadza.
                    </span
                  >
                  `
                  : html`
                      Obecnie na wbudowanym odtwarzaczu nie odtwarzasz żadnych
                      mediów. Sugerujemy sprawdzenie działania mediów na
                      odtwarzaczu przed ich dodaniem.
                    `}
              </p>

              <label>
                Typ audio:
              </label>
              <paper-radio-group selected="radio" id="media_type">
                <paper-radio-button name="radio">
                  <ha-icon icon="mdi:radio"></ha-icon>
                </paper-radio-button>

                <paper-radio-button name="podcast">
                  <ha-icon icon="mdi:podcast"></ha-icon>
                </paper-radio-button>
                <paper-radio-button name="audiobook">
                  <ha-icon icon="mdi:book-music"></ha-icon>
                </paper-radio-button>
                <paper-radio-button name="music">
                  <ha-icon icon="mdi:music"></ha-icon>
                </paper-radio-button>
                <paper-radio-button name="video">
                  <ha-icon icon="mdi:file-video"></ha-icon>
                </paper-radio-button>
              </paper-radio-group>
              <br />
              <paper-input
                placeholder="Nazwa (komenda: Włącz radio nazwa)"
                type="text"
                id="audio_name"
                @value-changed=${this._canSourceBeAdded}
              >
                <ha-icon icon="mdi:account-voice" slot="suffix"></ha-icon>
              </paper-input>

              <paper-input
                placeholder="Typ radia"
                type="text"
                .value=${this.radioType}
                id="audio_category"
                @value-changed=${this._canSourceBeAdded}
              >
                <ha-icon
                  icon="mdi:format-list-bulleted-type"
                  slot="suffix"
                ></ha-icon>
              </paper-input>
              <ha-chips
                @chip-clicked=${this._pickRadioType}
                .items=${this.hass.states[
                  "input_select.radio_type"
                ].attributes.options.map((radioType) => radioType)}
              >
              </ha-chips>
              <paper-input
                placeholder="Adres URL Strumienia"
                type="text"
                id="audio_url"
                @value-changed=${this._canSourceBeAdded}
              >
                <ha-icon icon="mdi:play-network" slot="suffix"></ha-icon>
              </paper-input>

              <paper-input
                placeholder="Adres URL Okładki"
                type="text"
                id="audio_img_url"
                @value-changed=${this._canSourceBeAdded}
              >
                <ha-icon icon="mdi:image-edit" slot="suffix"></ha-icon>
              </paper-input>
              <br />
              <div style="text-align:center;">
                <ha-icon icon="mdi:share-variant"></ha-icon>
                <ha-switch
                  .checked=${this.shareAudio}
                  @change=${this._shareAudioChanged}
                >
                </ha-switch>
                Udostępnij dla wszystkich (po sprawdzeniu w AIS)
                <br />
                <br />
                <ha-icon icon="mdi:cards-heart"></ha-icon> Dodajesz nowe audio
                dla wszystkich <ha-icon icon="mdi:cards-heart"></ha-icon>
                <br /><br />
              </div>
              ${this._canSourceBeAdded()
                ? html` <div class="sourceCheckButton">
                      <mwc-button raised @click=${this._handleAddMedia}>
                        <ha-icon icon="hass:music-note-plus"></ha-icon>
                        &nbsp; Dodaj do swojej biblioteki
                      </mwc-button>
                    </div>
                    <br />`
                : html`
                    <div style="text-align: center;">
                      <h2>
                        Wypełnij wszsytkie wymagane pola.
                      </h2>
                    </div>
                    <br />
                  `} `}
      </ha-dialog>
    `;
  }

  private _isAudioPlaying(): boolean {
    if (this._aisMediaInfo?.attributes.media_content_id) {
      return true;
    }
    return false;
  }

  private _canSourceBeAdded(): boolean {
    return true;
  }

  private _pickRadioType(ev): void {
    const newIdx = ev.detail.index;
    const newType = this.hass.states["input_select.radio_type"].attributes
      .options[newIdx];
    if (newType !== this.radioType) {
      this.radioType = newType;
    }
  }

  private _shareAudioChanged(ev): void {
    const newVal = ev.target.checked;
    if (newVal !== this.shareAudio) {
      this.shareAudio = newVal;
    }
  }

  private _audioNameChanged(ev): void {
    const newVal = ev.target.checked;
    if (newVal !== this.shareAudio) {
      this.audioName = newVal;
    }
  }

  private _handleAddMedia(): void {
    console.log("xxx");
  }

  static get styles(): CSSResult[] {
    return [
      haStyleDialog,
      css`
        ha-dialog {
          --dialog-content-padding: 0 24px 20px;
        }
        div.sourceCheckButton {
          text-align: center;
        }
        div.img404 {
          text-align: center;
        }
        img {
          max-width: 500px;
          max-height: 300px;
        }
        span.aisUrl {
          word-wrap: break-word;
        }
        ha-circular-progress {
          --mdc-theme-primary: var(--primary-color);
          display: flex;
          justify-content: center;
          margin-top: 40px;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hui-dialog-add-media-source-ais": HuiDialogAddMediaSourceAis;
  }
}
