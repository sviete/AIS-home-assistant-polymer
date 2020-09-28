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
  internalProperty,
  TemplateResult,
} from "lit-element";
import "../ha-circular-progress";
// import { fireEvent } from "../../common/dom/fire_event";
import { createCloseHeading } from "../ha-dialog";
import { haStyleDialog } from "../../resources/styles";
import type { HomeAssistant } from "../../types";
import { HassEntity } from "home-assistant-js-websocket";
import { CheckMediaSourceAisDialogParams } from "./show-check-media-source-ais-dialog";
import { showReportProblemToAisDialog } from "./show-report-problem-to-ais-dialog";
import {
  showAlertDialog,
  showConfirmationDialog,
} from "../../dialogs/generic/show-dialog-box";

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

@customElement("hui-dialog-check-media-source-ais")
export class HuiDialogCheckMediaSourceAis extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false })
  private _params?: CheckMediaSourceAisDialogParams;

  @internalProperty() private _loading = false;

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
          "Informacja o źródle multimediów"
        )}
        @closed=${this.closeDialog}
      >
        ${this._loading
          ? html`<ha-circular-progress active></ha-circular-progress>`
          : html``}
        ${this._isAudioPlaying() && !this._loading
          ? html`<p>
                Obecnie odtwarzasz ${this._aisMediaInfo?.attributes["source"]},
                <b></b>${this._aisMediaInfo?.attributes["media_title"]}</b>
              <span class="aisUrl">
                <br>z adresu URL <ha-icon icon="mdi:web"></ha-icon>:
                <b></b>${this._aisMediaInfo?.attributes["media_content_id"]}</b>
                </span
              >
              </p>
              <div class="img404"><img src="${
                this._aisMediaInfo?.attributes["media_stream_image"]
              }"/></div>
              ${
                this._canSourceBeChecked()
                  ? html`
                      <p>Jeżeli jest problem z odtwarzaniem z tego zasobu, to możesz automatycznie sprawdzić, czy jest dostępne bardziej aktualne źródło:</p>
                      <div class="sourceCheckButton">
                        <mwc-button raised @click=${this._handleSourceCheck}>
                                  <ha-icon icon="hass:robot"></ha-icon>
                                  &nbsp; Uruchom Automatyczne Sprawdzanie
                        </mwc-button>
                      </div> 
                    <p></p>Jeżeli automatyczne sprawdzenie nie pomoże, to będzie można wysłać informację o tym problemie do AI-Speaker.</p>`
                  : html`
                      <div style="text-align: center;">
                        <h2>
                          Tego typu mediów jeszcze nie sprawdzamy.
                        </h2>
                      </div>
                    `
              } `
          : html` <div class="img404"><img src="/static/ais_404.png" /></div>
              <p>
                ${this._loading
                  ? html`<div style="text-align: center;">
                      <h2>
                        Sprawdzam i przeszukuje cały Internet...
                      </h2>
                    </div>`
                  : html`Obecnie na wbudowanym odtwarzaczu nie odtwarzasz
                    żadnych mediów.`}
              </p>`}
      </ha-dialog>
    `;
  }

  private async _checkSourceInAis(): Promise<AisAnswer> {
    this._loading = true;
    let itemData: AisAnswer = { info: "", error: false, found: false };
    try {
      itemData = (await CheckMediaSourceAisWs(this.hass)) as AisAnswer;
    } catch {
      this._loading = false;
    }

    this._loading = false;
    return itemData;
  }

  private async _handleSourceCheck(): Promise<void> {
    //
    const aisAnswer = await this._checkSourceInAis();
    if (aisAnswer.error) {
      await showAlertDialog(this, {
        title: "AIS",
        text: aisAnswer.info,
      });
      return;
    }

    if (aisAnswer.found) {
      // the new url was found
      const confirmed = await showConfirmationDialog(this, {
        title: "AIS",
        text: aisAnswer.info,
        confirmText: "TAK",
        dismissText: "NIE",
      });

      if (confirmed) {
        this._loading = true;
        const aisAnswer2 = (await ConfirmMediaSourceAisWs(
          this.hass
        )) as AisAnswer;
        this._loading = false;
        if (aisAnswer2.error) {
          await showAlertDialog(this, {
            title: "AIS",
            text: aisAnswer2.info,
          });
        } else {
          await showAlertDialog(this, {
            title: "AIS",
            text: aisAnswer2.info,
          });
        }
        this.closeDialog();
      } else {
        // info to AIS
        const confirmed2 = await showConfirmationDialog(this, {
          title: "AIS",
          text: "Czy chcesz zgłosić problem do AIS?",
          confirmText: "TAK",
          dismissText: "NIE",
        });
        if (confirmed2) {
          this._showReportProblemToAis();
        }
        this.closeDialog();
      }
    } else {
      // not able to found the new url
      const confirmed = await showConfirmationDialog(this, {
        title: "AIS",
        text: aisAnswer.info,
        confirmText: "TAK",
        dismissText: "NIE",
      });

      if (confirmed) {
        // show problem dialog
        this._showReportProblemToAis();
      }
      this.closeDialog();
    }
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
    return true;
    // if (
    //   this._aisMediaInfo?.attributes["media_title"] &&
    //   this._aisMediaInfo?.attributes["media_content_id"] &&
    //   this._aisMediaInfo?.attributes["source"] === "Radio"
    // ) {
    //   return true;
    // }
    // return false;
  }

  private _showReportProblemToAis(): void {
    showReportProblemToAisDialog(this, {
      selectedOptionCallback: (option: string) =>
        console.log("option: " + option),
    });
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
    "hui-dialog-check-media-source-ais": HuiDialogCheckMediaSourceAis;
  }
}
