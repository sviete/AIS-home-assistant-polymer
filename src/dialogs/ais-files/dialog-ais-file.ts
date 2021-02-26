import "@polymer/paper-input/paper-textarea";
import "@material/mwc-button/mwc-button";
import {
  css,
  CSSResultArray,
  customElement,
  html,
  internalProperty,
  LitElement,
  TemplateResult,
} from "lit-element";
import { fireEvent } from "../../common/dom/fire_event";
import { createCloseHeading } from "../../components/ha-dialog";
import "../../components/ha-formfield";
import "../../components/ha-switch";
import { haStyleDialog } from "../../resources/styles";
import { HomeAssistant } from "../../types";
import { HassDialog } from "../make-dialog-manager";
import { HaAisFileDialogParams } from "./show-dialog-ais-file";
import "../../components/ha-code-editor";
import type { HaCodeEditor } from "../../components/ha-code-editor";

@customElement("dialog-ais-file")
class AisFileDialog extends LitElement
  implements HassDialog<HaAisFileDialogParams> {
  public hass!: HomeAssistant;

  @internalProperty() private _params?: HaAisFileDialogParams;

  public showDialog(params: HaAisFileDialogParams): void {
    this._params = params;
  }

  public closeDialog() {
    this._params = undefined;
    fireEvent(this, "dialog-closed", { dialog: this.localName });
  }

  protected render(): TemplateResult {
    if (!this._params) {
      return html``;
    }

    const fileBody = this._params.fileBody;
    let readOnly = "";
    if (this._params.readonly) {
      readOnly = "readonly";
    }

    return html`
      <ha-dialog
        open
        @closed=${this.closeDialog}
        scrimClickAction
        escapeKeyAction
        hideActions
        .heading=${createCloseHeading(this.hass, this._params.dialogTitle)}
      >
        <div class="container">
          <textarea
            spellcheck="false"
            class="lineTextArea"
            .value=${fileBody}
          ></textarea>

          <div class="saveButton">
            <mwc-button @click=${this._handleSave}>
              SAVE
            </mwc-button>
          </div>
        </div>
      </ha-dialog>
    `;
  }

  private _handleSave(ev) {
    const fileBody = this.shadowRoot!.querySelector("textarea.lineTextArea")!
      .value;
    this.hass.callApi<string>("POST", "ais_file/write", {
      filePath: this._params.filePath,
      fileBody: fileBody,
    });
    this.closeDialog();
  }

  static get styles(): CSSResultArray {
    return [
      haStyleDialog,
      css`
        /* :host {
          --code-mirror-height: 100%;
        } */
        div.saveButton {
          float: right;
        }
        /* make dialog fullscreen */
        ha-dialog {
          --mdc-dialog-min-width: calc(
            100vw - env(safe-area-inset-right) - env(safe-area-inset-left)
          );
          --mdc-dialog-max-width: calc(
            100vw - env(safe-area-inset-right) - env(safe-area-inset-left)
          );
          --mdc-dialog-min-height: 100%;
          --mdc-dialog-max-height: 100%;
          --mdc-shape-medium: 0px;
          --vertial-align-dialog: flex-end;
        }
        textarea.lineTextArea {
          background: url(http://i.imgur.com/2cOaJ.png);
          background-attachment: local;
          background-repeat: no-repeat;
          padding-left: 35px;
          padding-top: 10px;
          border-color: #ccc;
          line-height: 16px;
          width: calc(100vw - 75px);
          min-height: 400px;
          height: 80vh;
          color: white;
          font-family: monospace;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dialog-ais-file": AisFileDialog;
  }
}
