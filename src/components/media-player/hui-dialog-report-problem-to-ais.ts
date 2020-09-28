import "@material/mwc-button/mwc-button";
import "@material/mwc-list/mwc-list";
import "@material/mwc-list/mwc-list-item";
import "@polymer/paper-item/paper-item";
import "@polymer/paper-listbox/paper-listbox";
import "@polymer/paper-input/paper-textarea";
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
import { createCloseHeading } from "../ha-dialog";
import { haStyleDialog } from "../../resources/styles";
import type { HomeAssistant } from "../../types";
import { HassEntity } from "home-assistant-js-websocket";
import { CheckMediaSourceAisDialogParams } from "./show-check-media-source-ais-dialog";

export const ReportProblemToAisWs = (
  hass: HomeAssistant,
  problemType: string,
  problemDesc?: string,
  problemData?: string
): Promise<AisAnswer> =>
  hass.callWS<AisAnswer>({
    type: "ais_cloud/report_ais_problem",
    problem_type: problemType,
    problem_desc: problemDesc,
    problem_data: problemData,
  });

export interface AisAnswer {
  message: string;
  email: string;
  report_id: number;
  error: boolean;
}

@customElement("hui-dialog-report-problem-to-ais")
export class HuiDialogReportProblemToAis extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false })
  private _params?: CheckMediaSourceAisDialogParams;

  @internalProperty() private _loading = false;

  @internalProperty() private _problemDescription = "";

  @internalProperty() private _aisAnswer: AisAnswer | undefined;

  private _aisMediaInfo?: HassEntity;

  public showDialog(params: CheckMediaSourceAisDialogParams): void {
    this._params = params;
    this._aisMediaInfo = this.hass.states[
      "media_player.wbudowany_glosnik"
    ] as HassEntity;
    this._aisAnswer = undefined;
    this._problemDescription = "";
  }

  public closeDialog() {
    this._params = undefined;
    this._aisAnswer = undefined;
    this._problemDescription = "";
  }

  protected render(): TemplateResult {
    if (!this._params) {
      return html``;
    }

    return html` <ha-dialog
      open
      hideActions
      .heading=${createCloseHeading(
        this.hass,
        "Zgłoszenie problemu ze źródłem multimediów"
      )}
      @closed=${this.closeDialog}
    >
      ${this._loading
        ? html`<ha-circular-progress active></ha-circular-progress>`
        : html``}
      ${!this._loading
        ? html`<p>
                Problem z odtwarzaniem ${
                  this._aisMediaInfo?.attributes["source"]
                },
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
                !this._aisAnswer
                  ? html` <p>
                        Wyślij zgłoszenie do AI-Speaker. Postaramy się jak
                        najszybciej naprawić ten problem.
                      </p>
                      <paper-textarea
                        label="Dodatkowy opis dla AI-Speaker"
                        placeholder="Tu możesz np. podać nowy adres zasobu, jeżeli go znasz."
                        name="description"
                        .value=${this._problemDescription}
                        @value-changed=${this._handleProblemDescriptionChange}
                      ></paper-textarea>
                      <div class="sendProblemToAisButton">
                        <mwc-button
                          raised
                          @click=${this._handleReportProblemToAis}
                        >
                          <ha-icon icon="hass:email-send"></ha-icon>
                          &nbsp; Wyślij zgłoszenie do AI-Speaker
                        </mwc-button>
                      </div>`
                  : html`
                      <div style="text-align: center;">
                        ${this._aisAnswer.error
                          ? html`
                              <h2>
                                Podczas przesyłania zgłoszenia wystąpił problem
                              </h2>
                              <p>
                                ${this._aisAnswer?.message}
                              </p>
                              <p>
                                Sprawdz połączenie z Internetem i spróbuj
                                ponownie później.
                              </p>
                            `
                          : html`
                              <h2>
                                Przesłano zgłoszenie do AIS, o numerze:
                                ${this._aisAnswer.report_id}
                              </h2>
                              <p>
                                ${this._aisAnswer.message}
                              </p>
                            `}
                      </div>
                      <div class="sendProblemToAisButton">
                        <mwc-button raised @click=${this.closeDialog}>
                          <ha-icon icon="hass:close-thick"></ha-icon>
                          &nbsp; OK
                        </mwc-button>
                      </div>
                    `
              }`
        : html` <p>
            Wysyłam zgłoszenie do AIS
          </p>`}
    </ha-dialog>`;
  }

  private async _reportProblemToAis(): Promise<AisAnswer> {
    this._loading = true;
    let itemData: AisAnswer = {
      message: "",
      email: "",
      report_id: 0,
      error: false,
    };
    try {
      itemData = (await ReportProblemToAisWs(
        this.hass,
        "media_source",
        this._problemDescription,
        this._aisMediaInfo?.attributes["media_title"] +
          " " +
          this._aisMediaInfo?.attributes["media_content_id"]
      )) as AisAnswer;
    } catch (err) {
      itemData.message = err.message;
      itemData.error = true;
      this._loading = false;
    }

    this._loading = false;
    return itemData;
  }

  private async _handleReportProblemToAis(): Promise<void> {
    this._aisAnswer = await this._reportProblemToAis();
  }

  private _handleProblemDescriptionChange(ev: CustomEvent) {
    this._problemDescription = ev.detail.value;
  }

  static get styles(): CSSResult[] {
    return [
      haStyleDialog,
      css`
        ha-dialog {
          --dialog-content-padding: 0 24px 20px;
        }
        div.sendProblemToAisButton {
          text-align: center;
          margin: 10px;
        }
        div.img404 {
          text-align: center;
        }
        img {
          max-width: 500px;
          max-height: 300px;
          -webkit-filter: grayscale(100%);
          filter: grayscale(100%);
        }
        span.aisUrl {
          word-wrap: break-word;
        }
        ha-circular-progress {
          --mdc-theme-primary: var(--primary-color);
          display: flex;
          justify-content: center;
          margin-top: 40px;
          margin-bottom: 20px;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hui-dialog-report-problem-to-ais": HuiDialogReportProblemToAis;
  }
}
