import {
  css,
  CSSResult,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
  internalProperty,
} from "lit-element";
import { fireEvent } from "../../common/dom/fire_event";
import { createCloseHeading } from "../../components/ha-dialog";
import "../../components/ha-hls-player";
import type { HomeAssistant } from "../../types";
import { haStyleDialog } from "../../resources/styles";
import { WebBrowserPlayMediaDialogParams } from "./show-media-player-dialog";
import "../../components/ha-code-editor";
import "../../components/ha-radio";
import "../../components/ha-formfield";

@customElement("hui-dialog-web-browser-ais-edit-image")
export class HuiDialogWebBrowserAisEditImage extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @internalProperty() private elementType?: string;

  @property({ attribute: false })
  private _params?: WebBrowserPlayMediaDialogParams;

  public showDialog(params: WebBrowserPlayMediaDialogParams): void {
    this._params = params;
  }

  public closeDialog() {
    this._params = undefined;
    fireEvent(this, "dialog-closed", { dialog: this.localName });
  }

  private _handleElementChanged() {}

  protected render(): TemplateResult {
    if (!this._params || !this._params.sourceType || !this._params.sourceUrl) {
      return html``;
    }
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
        <img src=${this._params.sourceUrl} />
        <h2>Konfiguracja karty Obraz w Obrazie</h2>
        <ha-formfield label="Element Audio">
          <ha-radio
            @change=${this._handleElementChanged}
            name="mode"
            value="value"
            ?checked=${this.elementType === "audio"}
          ></ha-radio>
        </ha-formfield>
        <ha-formfield label="Element Light">
          <ha-radio
            @change=${this._handleElementChanged}
            name="mode"
            value="input"
            ?checked=${this.elementType === "light"}
          ></ha-radio>
        </ha-formfield>
        <ha-code-editor
          mode="yaml"
          readonly
          .value="type: picture
image: '/local/img/${this._params.title}'"
        ></ha-code-editor>
      </ha-dialog>
    `;
  }

  static get styles(): CSSResult[] {
    return [
      haStyleDialog,
      css`
        @media (min-width: 800px) {
          ha-dialog {
            --mdc-dialog-max-width: 800px;
            --mdc-dialog-min-width: 400px;
            width: 100%;
          }
        }
        video,
        audio,
        img {
          outline: none;
          width: 100%;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hui-dialog-web-browser-ais-edit-image": HuiDialogWebBrowserAisEditImage;
  }
}
