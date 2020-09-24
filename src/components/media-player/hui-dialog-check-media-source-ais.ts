import "@material/mwc-button/mwc-button";
import "@material/mwc-list/mwc-list";
import "@material/mwc-list/mwc-list-item";
import "@polymer/paper-item/paper-item";
import "@polymer/paper-listbox/paper-listbox";
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
import { createCloseHeading } from "../ha-dialog";
import { haStyleDialog } from "../../resources/styles";
import type { HomeAssistant } from "../../types";
import { HassEntity } from "home-assistant-js-websocket";
import { CheckMediaSourceAisDialogParams } from "./show-check-media-source-ais-dialog";

@customElement("hui-dialog-check-media-source-ais")
export class HuiDialogCheckMediaSourceAis extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false })
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
    fireEvent(this, "dialog-closed", { dialog: this.localName });
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
          "Sprawdzenie źródła multimediów"
        )}
        @closed=${this.closeDialog}
      >
        <div class="img404">
          <img src="/static/ais_404.png" />
        </div>
        ${this._canSourceBeChecked()
          ? html`<h3>Obecnie odtwarzasz ${this._aisMediaInfo?.attributes["media_title"]}, ze adresu: </h3>
       <ha-icon icon="mdi:web"></ha-icon> ${this._aisMediaInfo?.attributes["media_content_id"]} 
      <p>Jeżeli jest problem z tym zasobem, to możesz automatycznie sprawdzić, czy jest dostępne bardziej aktualne źródło:</p>
        <div class="sourceCheckButton">
          <mwc-button raised @click=${this._handleSourceCheck}>
                    <ha-icon icon="hass:robot"></ha-icon>
                    &nbsp; Uruchom Automatyczne Sprawdzanie
          </mwc-button>
        </div> 
      <p></p>Jeżeli automatyczne sprawdzenie nie pomoże, to będzie można wysłać informację o nie działającym zasobie do AI-Speaker.</p>`
          : html``}
      </ha-dialog>
    `;
  }

  private _handleSourceCheck(): void {
    this.closeDialog();
  }

  private _canSourceBeChecked(): boolean {
    return true;
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
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hui-dialog-check-media-source-ais": HuiDialogCheckMediaSourceAis;
  }
}
