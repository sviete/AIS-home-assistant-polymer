import {
  css,
  CSSResult,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from "lit-element";
import { fireEvent } from "../../common/dom/fire_event";
import { createCloseHeading } from "../../components/ha-dialog";
import "../../components/ha-hls-player";
import type { HomeAssistant } from "../../types";
import { haStyleDialog } from "../../resources/styles";
import { WebBrowserPlayMediaAisDialogParams } from "./show-media-player-ais-dialog";
import "../../components/ha-code-editor";
import { addEntitiesToLovelaceView } from "../lovelace/editor/add-entities-to-view";
import { showAlertDialog } from "../../dialogs/generic/show-dialog-box";

@customElement("hui-dialog-web-browser-ais-play-media")
export class HuiDialogWebBrowserAisPlayMedia extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() private aisLocalPath?: string;

  @property() private aisLocalUrl?: string;

  @property() private aisRemoteUrl?: string;

  @property() private aisThumbnail?: string;

  @property({ attribute: false })
  private _params?: WebBrowserPlayMediaAisDialogParams;

  public showDialog(params: WebBrowserPlayMediaAisDialogParams): void {
    this._params = params;
    this.aisLocalPath = this._params?.sourceUrl
      .split("?authSig=")[0]
      .replace("/media/galeria/", " /local/img/");
    this.aisLocalUrl =
      "http://" +
      this.hass.states["sensor.internal_ip_address"].state.trim() +
      this.aisLocalPath.trim();
    this.aisRemoteUrl =
      "https://" +
      this.hass.states["sensor.ais_secure_android_id_dom"].state.trim() +
      ".paczka.pro" +
      this.aisLocalPath.trim();
    this.aisThumbnail = this._params?.sourceThumbnail;
  }

  public closeDialog() {
    this._params = undefined;
    fireEvent(this, "dialog-closed", { dialog: this.localName });
  }

  protected render(): TemplateResult {
    if (!this._params || !this._params.sourceType || !this._params.sourceUrl) {
      return html``;
    }

    const mediaType = this._params.sourceType.split("/", 1)[0];

    return html`
      <ha-dialog
        open
        hideActions
        .heading=${createCloseHeading(
          this.hass,
          this._params.title ||
            this.hass.localize("ui.components.media-browser.media_player")
        )}
        @closed=${this.closeDialog}
      >
        ${mediaType === "audio"
          ? html`
              <audio controls autoplay>
                <source
                  src=${this._params.sourceUrl}
                  type=${this._params.sourceType}
                />
                ${this.hass.localize(
                  "ui.components.media-browser.audio_not_supported"
                )}
              </audio>
            `
          : mediaType === "video"
          ? html`
              <video controls autoplay playsinline>
                <source
                  src=${this._params.sourceUrl}
                  type=${this._params.sourceType}
                />
                ${this.hass.localize(
                  "ui.components.media-browser.video_not_supported"
                )}
              </video>
            `
          : this._params.sourceType === "application/x-mpegURL"
          ? html`
              <ha-hls-player
                controls
                autoplay
                playsinline
                .hass=${this.hass}
                .url=${this._params.sourceUrl}
              ></ha-hls-player>
            `
          : mediaType === "image"
          ? html`<img src=${this._params.sourceUrl} />`
          : html`${this.hass.localize(
              "ui.components.media-browser.media_not_supported"
            )}`}
        ${this.get_ais_item_info(mediaType)}
      </ha-dialog>
    `;
  }

  private get_ais_item_info(mediaType: string): TemplateResult {
    // check if we are in AIS gallery folder -> media-source://media_source/galeria/.
    const aisGallery = this._params!.sourceUrl.startsWith("/media/galeria/");
    if (aisGallery && mediaType === "image") {
      return html`<div class="card-actions">
        <br />
        <ha-icon icon="mdi:monitor-dashboard"></ha-icon>
        ${this.aisLocalPath}<br />
        <ha-icon icon="mdi:home-import-outline"></ha-icon>${this.aisLocalUrl}<br />
        <ha-icon icon="mdi:weather-cloudy-arrow-right"><br /> </ha-icon>${this
          .aisRemoteUrl} <br />
        <mwc-button @click=${this._addToLovelaceView}>
          ${this.hass.localize(
            "ui.panel.config.devices.entities.add_entities_lovelace"
          ) || "Dodaj do interfejsu użytkownika"}
        </mwc-button>
      </div> `;
    }
    if (mediaType === "audio") {
      const imgSrc = this.aisThumbnail || "";
      return html`<div class="card-actions">
        <br />
        <ha-icon icon="mdi:web"></ha-icon>${this._params!.sourceUrl}<br />
        <br />
        <img .src=${imgSrc} />
        <br />
        <ha-icon icon="mdi:file-image"></ha-icon>${imgSrc} <br /><br />
        <mwc-button @click=${this._addToAisLib}>
          <ha-icon icon="hass:playlist-plus"></ha-icon>
          Dodaj do mojej biblioteki.
        </mwc-button>
      </div> `;
    }
    return html`<div class="card-actions">
      <br />
      <ha-icon icon="mdi:web"></ha-icon>${this._params!.sourceUrl}<br />
    </div> `;
  }

  private _addToLovelaceView(): void {
    const title = this._params?.title || "title";
    addEntitiesToLovelaceView(
      this,
      this.hass,
      [],
      [
        {
          type: "picture-glance",
          title: title,
          image: this.aisLocalPath,
          entities: [],
        },
      ]
    );
    this.closeDialog();
  }

  private _addToAisLib(): void {
    showAlertDialog(this, {
      title: "AIS",
      text: "TODO",
    });
  }

  static get styles(): CSSResult[] {
    return [
      haStyleDialog,
      css`
        @media (min-width: 800px) {
          ha-dialog {
            --mdc-dialog-max-width: 800px;
            --mdc-dialog-min-width: 400px;
          }
        }

        video,
        audio,
        img {
          outline: none;
          width: 100%;
        }
        ha-dialog {
          /* Place above other dialogs */
          --dialog-z-index: 104;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hui-dialog-web-browser-ais-play-media": HuiDialogWebBrowserAisPlayMedia;
  }
}
