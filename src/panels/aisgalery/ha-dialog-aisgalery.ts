import "@polymer/paper-input/paper-input";
import "../../components/ha-icon-button";
import "@material/mwc-button";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "../../components/dialog/ha-paper-dialog";
import { createCloseHeading } from "../../components/ha-dialog";
import {
  LitElement,
  html,
  property,
  internalProperty,
  CSSResult,
  css,
  TemplateResult,
} from "lit-element";
import { HomeAssistant } from "../../types";
import { haStyleDialog } from "../../resources/styles";

import { PolymerChangedEvent } from "../../polymer-types";

import "../../components/ha-picture-upload";
import type { HaPictureUpload } from "../../components/ha-picture-upload";
import { CropOptions } from "../../dialogs/image-cropper-dialog/show-image-cropper-dialog";
import { AisGaleryDialogParams } from "./show-ha-aisgalery-dialog";

const cropOptions: CropOptions = {
  round: false,
  type: "image/jpeg",
  quality: 0.75,
  aspectRatio: NaN,
};

export class HaDialogAisgalery extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false })
  private _params?: AisGaleryDialogParams;

  @internalProperty() private _name!: string;

  @internalProperty() private _picture!: string | null;

  @internalProperty() private _picture_last_value!: string | null;

  @internalProperty() private _error?: string;

  @internalProperty() private _submitting = false;

  @internalProperty() private _closeDialog = false;

  public async showDialog(params: AisGaleryDialogParams): Promise<void> {
    this._params = params;
    this._error = undefined;
    this._picture = null;
    this._name = "";
    this._closeDialog = false;
  }

  protected render(): TemplateResult {
    if (this._closeDialog) {
      return html``;
    }
    const nameInvalid = this._name.trim() === "";
    const pictureInvalid = this._picture == null;
    return html`
      <ha-dialog
        open
        @closed=${this._close}
        scrimClickAction
        escapeKeyAction
        .heading=${createCloseHeading(this.hass, "Nowe zdjęcie")}     
      >
      <div>
          ${this._error ? html` <div class="error">${this._error}</div> ` : ""}
          <div class="form">
            <paper-input
                dialogInitialFocus
                .value=${this._name}
                @value-changed=${this._nameChanged}
                label="Nazwa"
                error-message="Nazwa jest wymagana"
                required
                auto-validate
              ></paper-input>
            <ha-picture-upload
                  .hass=${this.hass}
                  .value=${this._picture}
                  crop
                  .cropOptions=${cropOptions}
                  required
                  auto-validate
                  error-message="Zdjęcie jest wymagane"
                  @change=${this._pictureChanged}
                ></ha-picture-upload>
          </div>
      </div>
        <mwc-button
            slot="primaryAction"
            @click="${this._addPicture}"
            .disabled=${nameInvalid || pictureInvalid || this._submitting}
          > Dodaj
          </mwc-button>
        </ha-dialog>
      </ha-dialog>
    `;
  }

  private _pictureChanged(ev: PolymerChangedEvent<string | null>) {
    this._error = undefined;
    this._picture = (ev.target as HaPictureUpload).value;
    if (this._name.trim() === "") {
      this._name = (ev.target as HaPictureUpload).fileName || "";
      this._name = this._name.split(".")[0];
    }
    if (this._picture == null) {
      this._deletePicture();
    } else {
      this._picture_last_value = this._picture;
    }
  }

  private async _deletePicture() {
    if (this._picture_last_value) {
      await this.hass.callService("ais_files", "remove_file", {
        path: this._picture_last_value,
      });
    }
  }

  private async _savePicture() {
    await this.hass.callService("ais_files", "transfer_file", {
      path: this._picture_last_value,
      name: this._name,
    });
    this._picture_last_value = null;
    // refresh...
    this._params?.jsCallback();
  }

  private _nameChanged(ev: PolymerChangedEvent<string>) {
    this._error = undefined;
    this._name = ev.detail.value;
  }

  private async _addPicture() {
    this._submitting = true;
    try {
      this._savePicture();
      this._closeDialog = true;
    } catch (err) {
      this._error = err ? err.message : "Unknown error";
    } finally {
      this._submitting = false;
    }
  }

  private _close(): void {
    this._closeDialog = true;
    this._deletePicture();
  }

  static get styles(): CSSResult[] {
    return [
      haStyleDialog,
      css`
        .form {
          padding-bottom: 24px;
        }
        ha-picture-upload {
          display: block;
        }
        ha-user-picker {
          margin-top: 16px;
        }
        a {
          color: var(--primary-color);
        }
        p {
          color: var(--primary-text-color);
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-dialog-aisgalery": HaDialogAisgalery;
  }
}

customElements.define("ha-dialog-aisgalery", HaDialogAisgalery);
