import "@material/mwc-button/mwc-button";
import "@material/mwc-list/mwc-list";
import "@material/mwc-list/mwc-list-item";
import "@polymer/paper-item/paper-item";
import "@polymer/paper-radio-group/paper-radio-group";
import "@polymer/paper-radio-button/paper-radio-button";
import "@polymer/paper-input/paper-input";
import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators";
import "../ha-circular-progress";
import "../ha-chip-set";
import "../ha-switch";
import { createCloseHeading } from "../ha-dialog";
import { haStyleDialog } from "../../resources/styles";
import type { HomeAssistant } from "../../types";
import { HassEntity } from "home-assistant-js-websocket";
import {
  showAlertDialog,
  showConfirmationDialog,
} from "../../dialogs/generic/show-dialog-box";
import { fireEvent } from "../../common/dom/fire_event";

export interface AisAnswer {
  message: string;
  error: boolean;
}

export const AddMediaSourceAisWs = (
  hass: HomeAssistant,
  mediaCategory: string,
  mediaName: string,
  mediaType: string,
  mediaStreamUrl: string,
  mediaImageUrl: string,
  mediaShare: boolean
): Promise<AisAnswer> =>
  hass.callWS<AisAnswer>({
    type: "ais_cloud/add_ais_media_source",
    mediaCategory,
    mediaName,
    mediaType,
    mediaStreamUrl,
    mediaImageUrl,
    mediaShare,
  });

@customElement("hui-dialog-add-media-source-ais")
export class HuiDialogAddMediaSourceAis extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false })
  @property()
  private _loading = false;

  @property() private _opened = false;

  @property() private mediaCategory = "radio";

  @property() private mediaName = "";

  @property() private mediaType = "";

  @property() private mediaStreamUrl = "";

  @property() private mediaImageUrl = "";

  @property() private mediaShare = false;

  @property() private mediaChips: string[] = [];

  @property() private mediaNamePlaceholder =
    "Nazwa (komenda: Włącz radio nazwa)";

  @property() private mediaTypePlaceholder = "Typ radia";

  @property() private mediaUrlPlaceholder = "Adres URL Strumienia";

  private _aisMediaInfo?: HassEntity;

  public showDialog(): void {
    this._opened = true;
    this._aisMediaInfo = this.hass.states[
      "media_player.wbudowany_glosnik"
    ] as HassEntity;
    this.mediaCategory = "radio";
    this.mediaName = "";
    this.mediaType = "";
    if (
      this.hass.states["media_player.wbudowany_glosnik"].attributes
        .media_content_id
    ) {
      this.mediaStreamUrl = this.hass.states[
        "media_player.wbudowany_glosnik"
      ].attributes.media_content_id;
    } else {
      this.mediaStreamUrl = "";
    }
    this.mediaImageUrl = "";
    this.mediaShare = false;

    this.mediaChips = [];
    const options = this.hass.states["input_select.radio_type"].attributes
      .options;
    options.forEach((element: string) => {
      if (!element.startsWith("Moje") && !element.startsWith("Udostępnione")) {
        this.mediaChips.push(element || "");
      }
    });
  }

  public closeDialog() {
    this._opened = false;
    fireEvent(this, "dialog-closed", { dialog: this.localName });
  }

  protected render(): TemplateResult {
    return html`
      <ha-dialog
        .open=${this._opened}
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

              <label> Typ audio: </label>
              <paper-radio-group
                .selected=${this.mediaCategory}
                .value=${this.mediaCategory}
                @selected-changed=${this._mediaCategoryChanged}
              >
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
              </paper-radio-group>
              <br />
              ${this.mediaCategory === "radio" ||
              this.mediaCategory === "podcast"
                ? html`
                    <paper-input
                      .placeholder=${this.mediaNamePlaceholder}
                      type="text"
                      value=${this.mediaName}
                      id="audio_name"
                      @value-changed=${this._mediaNameChanged}
                    >
                      <ha-icon icon="mdi:account-voice" slot="suffix"></ha-icon>
                    </paper-input>

                    <paper-input
                      .placeholder=${this.mediaTypePlaceholder}
                      type="text"
                      value=${this.mediaType}
                      id="audio_category"
                      @value-changed=${this._mediaTypeChanged}
                    >
                      <ha-icon
                        icon="mdi:format-list-bulleted-type"
                        slot="suffix"
                      ></ha-icon>
                    </paper-input>
                    <ha-chip-set
                      @chip-clicked=${this._mediaTypePicket}
                      .items=${this.mediaChips}
                    >
                    </ha-chip-set>
                    <paper-input
                      .placeholder=${this.mediaUrlPlaceholder}
                      type="text"
                      value=${this.mediaStreamUrl}
                      @value-changed=${this._mediaStreamUrlChanged}
                    >
                      <ha-icon icon="mdi:play-network" slot="suffix"></ha-icon>
                    </paper-input>

                    <paper-input
                      placeholder="Adres URL Okładki"
                      type="text"
                      value=${this.mediaImageUrl}
                      @value-changed=${this._mediaImageUrlChanged}
                    >
                      <ha-icon icon="mdi:image-edit" slot="suffix"></ha-icon>
                    </paper-input>
                    <br />
                    <div style="text-align:center;">
                      <ha-icon icon="mdi:share-variant"></ha-icon>
                      <ha-switch
                        .checked=${this.mediaShare}
                        @change=${this._mediaShareChanged}
                      >
                      </ha-switch>
                      Udostępnij dla wszystkich (po sprawdzeniu w AIS)
                      <br /><br />
                    </div>
                    ${this._canSourceBeAdded()
                      ? html` <div class="sourceCheckButton">
                            <mwc-button raised @click=${this._handleAddMedia}>
                              <ha-icon icon="hass:music-note-plus"></ha-icon>
                              ${!this.mediaShare
                                ? html` Dodaj do swojej biblioteki `
                                : html`Dodaj do swojej biblioteki i udostępnij
                                  dla wszystkich`}
                            </mwc-button>
                          </div>
                          <br />`
                      : html`
                          <div style="text-align: center;">
                            <h2>Wypełnij wszsytkie wymagane pola.</h2>
                          </div>
                          <br />
                        `}
                  `
                : html`<div class="WorkInProgress">
                      <img src="/static/ais_work_in_progress.png" />
                    </div>
                    <div class="AisGithub">
                      <a href="https://github.com/sviete" target="_blank"
                        ><ha-icon icon="hass:github"></ha-icon> Join AI-Speaker
                        on Github</a
                      >
                    </div>
                    <br />`} `}
      </ha-dialog>
    `;
  }

  private async _addMediaToAis(): Promise<AisAnswer> {
    this._loading = true;
    let itemData: AisAnswer = { message: "", error: false };
    try {
      itemData = (await AddMediaSourceAisWs(
        this.hass,
        this.mediaCategory,
        this.mediaName,
        this.mediaType,
        this.mediaStreamUrl,
        this.mediaImageUrl,
        this.mediaShare
      )) as AisAnswer;
    } catch {
      this._loading = false;
    }
    this._loading = false;
    return itemData;
  }

  private async _handleAddMedia(): Promise<void> {
    //
    const aisAnswer = await this._addMediaToAis();
    if (aisAnswer.error) {
      await showAlertDialog(this, {
        title: "AIS",
        text: aisAnswer.message,
      });
      return;
    }

    // the new url was found
    const confirmed = await showConfirmationDialog(this, {
      title: "AIS",
      text: aisAnswer.message + " Czy chcesz dodać kolejne media?",
      confirmText: "TAK",
      dismissText: "NIE",
    });

    if (confirmed) {
      // clear
      this.mediaCategory = "radio";
      this.mediaName = "";
      this.mediaType = "";
      this.mediaStreamUrl = "";
      this.mediaImageUrl = "";
      this.mediaShare = false;
    } else {
      // close and exit
      this.closeDialog();
    }
  }

  private _isAudioPlaying(): boolean {
    if (this._aisMediaInfo?.attributes.media_content_id) {
      return true;
    }
    return false;
  }

  private _canSourceBeAdded(): boolean {
    if (this.mediaName.length < 3) {
      return false;
    }
    if (this.mediaType.length < 3) {
      return false;
    }
    if (this.mediaStreamUrl.length < 10) {
      return false;
    }
    return true;
  }

  private _mediaCategoryChanged(ev): void {
    const newVal = ev.detail.value;
    if (newVal !== this.mediaCategory) {
      this.mediaCategory = newVal;
      if (newVal === "radio") {
        this.mediaNamePlaceholder = "Nazwa (komenda: Włącz radio nazwa)";
        this.mediaTypePlaceholder = "Typ radia";
        this.mediaUrlPlaceholder = "Adres URL Strumienia";
        this.mediaChips = [];
        const options = this.hass.states["input_select.radio_type"].attributes
          .options;
        options.forEach((element) => {
          if (
            !element.startsWith("Moje") &&
            !element.startsWith("Udostępnione")
          ) {
            this.mediaChips.push(element);
          }
        });
      } else if (newVal === "podcast") {
        this.mediaNamePlaceholder = "Nazwa (komenda: Włącz podcast nazwa)";
        this.mediaTypePlaceholder = "Typ podcasta";
        this.mediaUrlPlaceholder = "Adres URL Kanału RSS (rss feed)";
        this.mediaChips = [];
        const options = this.hass.states["input_select.podcast_type"].attributes
          .options;
        options.forEach((element) => {
          if (
            !element.startsWith("Moje") &&
            !element.startsWith("Udostępnione")
          ) {
            this.mediaChips.push(element);
          }
        });
      }
    }
  }

  private _mediaTypeChanged(ev): void {
    const newVal = ev.detail.value;
    if (newVal !== this.mediaType) {
      this.mediaType = newVal;
    }
  }

  private _mediaTypePicket(ev): void {
    const newIdx = ev.detail.index;
    const newType = this.mediaChips[newIdx];
    if (newType !== this.mediaType) {
      this.mediaType = newType;
    }
  }

  private _mediaStreamUrlChanged(ev): void {
    const newVal = ev.detail.value;
    if (newVal !== this.mediaStreamUrl) {
      this.mediaStreamUrl = newVal;
    }
  }

  private _mediaImageUrlChanged(ev): void {
    const newVal = ev.detail.value;
    if (newVal !== this.mediaImageUrl) {
      this.mediaImageUrl = newVal;
    }
  }

  private _mediaShareChanged(ev): void {
    const newVal = ev.target.checked;
    if (newVal !== this.mediaShare) {
      this.mediaShare = newVal;
    }
  }

  private _mediaNameChanged(ev): void {
    const newVal = ev.detail.value;
    if (newVal !== this.mediaName) {
      this.mediaName = newVal;
    }
  }

  static get styles(): CSSResultGroup[] {
    return [
      haStyleDialog,
      css`
        ha-dialog {
          --dialog-content-padding: 0 24px 20px;
        }
        div.sourceCheckButton {
          text-align: center;
        }
        div.WorkInProgress {
          text-align: center;
        }
        div.AisGithub {
          text-align: right;
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
