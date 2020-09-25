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
import {
  showAlertDialog,
  showConfirmationDialog,
} from "../../dialogs/generic/show-dialog-box";

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
        ${this._isAudioPlaying()
          ? html`<h3>
                Obecnie odtwarzasz
                ${this._aisMediaInfo?.attributes["media_title"]}, z
                ${this._aisMediaInfo?.attributes["source"]}
              </h3>
              <span class="aisUrl"
                ><ha-icon icon="mdi:web"></ha-icon> Adres URL:
                ${this._aisMediaInfo?.attributes["media_content_id"]}</span
              >`
          : html`<p>
                Tu możesz sprawdzić, czy jest dostępne bardziej aktualne źródło
                dla odtwarzanych mediów.
              </p>
              <p>
                Obecnie na wbudowanym odtwarzaczu nie odtwarzasz żadnych mediów,
                dlatego sprawdzanie nie jest dostępne.
              </p>`}
        ${this._canSourceBeChecked()
          ? html`
                  <p>Jeżeli jest problem z tym zasobem, to możesz automatycznie sprawdzić, czy jest dostępne bardziej aktualne źródło:</p>
                  <div class="sourceCheckButton">
                    <mwc-button raised @click=${this._handleSourceCheck}>
                              <ha-icon icon="hass:robot"></ha-icon>
                              &nbsp; Uruchom Automatyczne Sprawdzanie
                    </mwc-button>
                  </div> 
                <p></p>Jeżeli automatyczne sprawdzenie nie pomoże, to będzie można wysłać informację o nie działającym zasobie do AI-Speaker.</p>`
          : html`
              <p>
                Tu będzie można sprawdzić, czy jest dostępne bardziej aktualne
                źródło dla odtwarzanych mediów.
              </p>
              <p>
                Obecnie sprawdzamy tylko stacje radiowe - w kolejnych wersjach
                dodamy sprawdzenie innych zasobów.
              </p>
            `}
      </ha-dialog>
    `;
  }

  private async _handleSourceCheck(): Promise<void> {
    //
    await showAlertDialog(this, {
      title: "AIS",
      text: "Funkcjonalność w przygotowaniu...",
    });
    // this.closeDialog();
  }

  private _isAudioPlaying(): boolean {
    if (
      this._aisMediaInfo?.attributes["media_title"] &&
      this._aisMediaInfo?.attributes["media_content_id"]
    ) {
      return true;
    }
    return false;
  }

  private _canSourceBeChecked(): boolean {
    if (
      this._aisMediaInfo?.attributes["media_title"] &&
      this._aisMediaInfo?.attributes["media_content_id"] &&
      this._aisMediaInfo?.attributes["source"] === "Radio"
    ) {
      return true;
    }
    return false;
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
        span.aisUrl {
          word-wrap: break-word;
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
