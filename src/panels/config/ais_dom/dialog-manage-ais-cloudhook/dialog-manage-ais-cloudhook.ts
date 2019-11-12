import {
  html,
  LitElement,
  PropertyDeclarations,
  css,
  CSSResult,
  property,
} from "lit-element";

import "@material/mwc-button";
import "@polymer/paper-input/paper-input";
import "@polymer/paper-dialog-scrollable/paper-dialog-scrollable";
import "../../../../components/dialog/ha-paper-dialog";
// This is not a duplicate import, one is for types, one is for element.
// tslint:disable-next-line
import { HaPaperDialog } from "../../../../components/dialog/ha-paper-dialog";
// tslint:disable-next-line
import { PaperInputElement } from "@polymer/paper-input/paper-input";

import { HomeAssistant } from "../../../../types";
import { haStyle } from "../../../../resources/styles";
import { WebhookDialogParams } from "./show-dialog-manage-ais-cloudhook";

const inputLabel =
  "Publiczny unikalny adres URL – kliknij, aby skopiować do schowka.";

export class DialogManageAisCloudhook extends LitElement {
  public hass!: HomeAssistant;
  @property() private _params?: WebhookDialogParams;

  static get properties(): PropertyDeclarations {
    return {
      _params: {},
      hass: {},
    };
  }

  public async showDialog(params: WebhookDialogParams) {
    this._params = params;
    // Wait till dialog is rendered.
    await this.updateComplete;
    this._dialog.open();
  }

  protected render() {
    if (!this._params) {
      return html``;
    }
    const { webhook } = this._params;
    const gateId = this.hass.states["sensor.ais_secure_android_id_dom"].state;
    const webhookUrl =
      "https://" + gateId + ".paczka.pro/api/webhook/" + webhook.webhook_id;
    return html`
      <ha-paper-dialog with-backdrop>
        <h2>Wywołanie zwrotne dla ${webhook.name}</h2>
        <div>
          <p>
            Wywołanie zwrotne HTTP (Webhook) jest dostępny pod następującym
            adresem URL:
          </p>
          <paper-input
            label="${inputLabel}"
            value="${webhookUrl}"
            @click="${this._copyClipboard}"
            @blur="${this._restoreLabel}"
          ></paper-input>
        </div>

        <div class="paper-dialog-buttons">
          <mwc-button @click="${this._closeDialog}">ZAMKNIJ</mwc-button>
        </div>
      </ha-paper-dialog>
    `;
  }

  private get _dialog(): HaPaperDialog {
    return this.shadowRoot!.querySelector("ha-paper-dialog")!;
  }

  private get _paperInput(): PaperInputElement {
    return this.shadowRoot!.querySelector("paper-input")!;
  }

  private _closeDialog() {
    this._dialog.close();
  }

  private _copyClipboard(ev: FocusEvent) {
    // paper-input -> iron-input -> input
    const paperInput = ev.currentTarget as PaperInputElement;
    const input = (paperInput.inputElement as any)
      .inputElement as HTMLInputElement;
    input.setSelectionRange(0, input.value.length);
    try {
      document.execCommand("kopiuj");
      paperInput.label = "SKOPIOWANO DO SCHOWKA";
    } catch (err) {
      // Copying failed. Oh no
    }
  }

  private _restoreLabel() {
    this._paperInput.label = inputLabel;
  }

  static get styles(): CSSResult[] {
    return [
      haStyle,
      css`
        ha-paper-dialog {
          width: 650px;
        }
        paper-input {
          margin-top: -8px;
        }
        button.link {
          color: var(--primary-color);
        }
        .paper-dialog-buttons a {
          text-decoration: none;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dialog-manage-ais-cloudhook": DialogManageAisCloudhook;
  }
}

customElements.define("dialog-manage-ais-cloudhook", DialogManageAisCloudhook);
