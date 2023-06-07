import "@material/mwc-button";
import { mdiContentCopy, mdiOpenInNew } from "@mdi/js";
import { css, CSSResultGroup, html, LitElement, nothing } from "lit";
import { query, state } from "lit/decorators";
import { fireEvent } from "../../../../common/dom/fire_event";
import { copyToClipboard } from "../../../../common/util/copy-clipboard";
import { createCloseHeading } from "../../../../components/ha-dialog";
import "../../../../components/ha-textfield";
import type { HaTextField } from "../../../../components/ha-textfield";
import { haStyle, haStyleDialog } from "../../../../resources/styles";
import { HomeAssistant } from "../../../../types";
import { documentationUrl } from "../../../../util/documentation-url";
import { showToast } from "../../../../util/toast";
import { WebhookDialogParams } from "./show-dialog-manage-ais-cloudhook";



export class DialogManageCloudhook extends LitElement {
  protected hass?: HomeAssistant;

  @state() private _params?: WebhookDialogParams;

  

  @query("ha-textfield") _input!: HaTextField;

  public showDialog(params: WebhookDialogParams) {
    this._params = params;
  }

  public closeDialog() {
    this._params = undefined;
    fireEvent(this, "dialog-closed", { dialog: this.localName });
  }

  protected render() {
    if (!this._params) {
      return nothing;
    }
    const { webhook } = this._params;
    const docsUrl = documentationUrl(this.hass!, "/docs/automation/trigger/#webhook-trigger");
    const gateId = this.hass!.states["sensor.ais_secure_android_id_dom"].state;
    const webhookUrl = "https://" + gateId + ".paczka.pro/api/webhook/" + webhook.webhook_id;

    return html`
      <ha-dialog
        open
        hideActions
        @closed=${this.closeDialog}
        .heading=${createCloseHeading(
          this.hass!,
          this.hass!.localize(
            "ui.panel.config.cloud.dialog_cloudhook.webhook_for",
            { name: webhook.name }
          )
        )}
      >
        <div>
          <p>
          Ten webhook został stworzony automatycznie w wyzwalaczu automatyzacji, szczegóły w dokumentacji:
            <a href=${docsUrl} target="_blank" rel="noreferrer">
              ${this.hass!.localize(
                "ui.panel.config.cloud.dialog_cloudhook.view_documentation"
              )}
              <ha-svg-icon .path=${mdiOpenInNew}></ha-svg-icon>
            </a>
          </p>
          <ha-textfield
            label="Adres publiczny (gdy tunel jest włączony)"
            .value=${webhookUrl}
            iconTrailing
            readOnly
            @click=${this.focusInput}
          >
            <ha-icon-button
              @click=${this._copyUrl}
              slot="trailingIcon"
              .path=${mdiContentCopy}
            ></ha-icon-button>
          </ha-textfield>
        </div>

        <a
          href=${docsUrl}
          target="_blank"
          rel="noreferrer"
          slot="secondaryAction"
        >
          <mwc-button>
            ${this.hass!.localize(
              "ui.panel.config.cloud.dialog_cloudhook.view_documentation"
            )}
          </mwc-button>
        </a>
        <mwc-button @click=${this.closeDialog} slot="primaryAction">
          ${this.hass!.localize("ui.panel.config.cloud.dialog_cloudhook.close")}
        </mwc-button>
      </ha-dialog>
    `;
  }

  private focusInput(ev) {
    const inputElement = ev.currentTarget as HaTextField;
    inputElement.select();
  }

  private async _copyUrl(ev): Promise<void> {
    if (!this.hass) return;
    ev.stopPropagation();
    const inputElement = ev.target.parentElement as HaTextField;
    inputElement.select();
    const url = this.hass.hassUrl(inputElement.value);

    await copyToClipboard(url);
    showToast(this, {
      message: this.hass.localize("ui.common.copied_clipboard"),
    });
  }

  static get styles(): CSSResultGroup {
    return [
      haStyle,
      haStyleDialog,
      css`
        ha-dialog {
          width: 650px;
        }
        ha-textfield {
          display: block;
        }
        ha-textfield > ha-icon-button {
          --mdc-icon-button-size: 24px;
          --mdc-icon-size: 18px;
        }
        button.link {
          color: var(--primary-color);
          text-decoration: none;
        }
        a {
          text-decoration: none;
        }
        a ha-svg-icon {
          --mdc-icon-size: 16px;
        }
        p {
          margin-top: 0;
          margin-bottom: 16px;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dialog-manage-ais-cloudhook": DialogManageCloudhook;
  }
}

customElements.define("dialog-manage-ais-cloudhook", DialogManageCloudhook);
