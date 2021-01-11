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
        <div class="content">
          <ha-code-editor
            mode="text"
            autofocus
            .value="${fileBody}"
            .hass=${this.hass}
            @editor-save="${this._handleSave}"
          ></ha-code-editor>
        </div>
        <div class="saveButton">
          <mwc-button @click=${this._handleSave}>
            SAVE
          </mwc-button>
        </div>
      </ha-dialog>
    `;
  }

  private get configEditor(): HaCodeEditor {
    return this.shadowRoot!.querySelector("ha-code-editor")! as HaCodeEditor;
  }

  private _handleSave(ev) {
    const fileBody = this.configEditor.value;
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
        :host {
          --code-mirror-height: 100%;
        }
        div.saveButton {
          float: right;
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
