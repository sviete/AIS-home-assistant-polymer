import { mdiClose } from "@mdi/js";
import {
  css,
  CSSResult,
  customElement,
  html,
  internalProperty,
  LitElement,
  property,
  TemplateResult,
} from "lit-element";
import "@material/mwc-button";
import { fireEvent } from "../../../../src/common/dom/fire_event";
import "../../../../src/components/ha-header-bar";
import { HassDialog } from "../../../../src/dialogs/make-dialog-manager";
import { haStyleDialog } from "../../../../src/resources/styles";
import type { HomeAssistant } from "../../../../src/types";
import "../../components/hassio-upload-snapshot";
import { AisRestoreBackupDialogParams } from "./show-ais-dialog-restore-backup";
import { LocalizeFunc } from "../../../../src/common/translations/localize";
import { PolymerChangedEvent } from "../../../../src/polymer-types";
import { handleFetchPromise } from "../../../../src/util/hass-call-api";
import "../../../../src/components/ha-expansion-panel";

export interface OnboardingAisRestoreBackupResponse {
  result: string;
  message: string;
  log: string;
}

export const onboardAisRestoreBackupStep = (params: {
  gate_id: string;
  backup_password: string;
}) =>
  handleFetchPromise<OnboardingAisRestoreBackupResponse>(
    fetch("/api/onboarding/ais_restore_backup", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify(params),
    })
  );

@customElement("dialog-ais-restore-backup")
export class DialogAisRestoreBackup extends LitElement
  implements HassDialog<AisRestoreBackupDialogParams> {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() public localize!: LocalizeFunc;

  @property() private _backup_password = "";

  @property() private _loading = false;

  @property() private _infoMsg?: string = undefined;

  @property() private _errorMsg?: string = undefined;

  @property() private _logMsg?: string = undefined;

  @internalProperty() private _params?: AisRestoreBackupDialogParams;

  public async showDialog(params: AisRestoreBackupDialogParams): Promise<void> {
    this._params = params;
    await this.updateComplete;
    this.addEventListener("keypress", (ev) => {
      if (ev.keyCode === 13) {
        this._restoreBakupFromAis(ev);
      }
    });
  }

  public closeDialog(): void {
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
        scrimClickAction
        escapeKeyAction
        hideActions
        .heading=${true}
        @closed=${this.closeDialog}
      >
        <div slot="heading">
          <ha-header-bar>
            <span slot="title">
              Przywróć kopię zapasową konfiguracji z AI-Spekaer
            </span>
            <mwc-icon-button slot="actionItems" dialogAction="cancel">
              <ha-svg-icon .path=${mdiClose}></ha-svg-icon>
            </mwc-icon-button>
          </ha-header-bar>
        </div>
        <p>
          Jeśli zabezpieczyłeś konfigurację hasłem to je podaj:
        </p>
        <paper-input
          name="backup_password"
          label="Password"
          value=${this._backup_password}
          @value-changed=${this._handleValueChanged}
          type="password"
          .disabled=${this._loading}
        ></paper-input>

        ${this._infoMsg
          ? html`
              <p class="info">
                ${this._infoMsg}
              </p>
            `
          : ""}
        ${this._errorMsg
          ? html`
              <p class="error">
                ${this._errorMsg}
              </p>
            `
          : ""}
        ${this._logMsg
          ? html`
              <ha-expansion-panel header="Full log: ">
                <div class="fullLog">
                  ${this._logMsg}
                </div>
              </ha-expansion-panel>
            `
          : ""}

        <p class="action">
          ${!this._infoMsg
            ? html`
                <mwc-button
                  raised
                  @click=${this._restoreBakupFromAis}
                  .disabled=${this._loading}
                >
                  przywróć konfigurację
                </mwc-button>
              `
            : ""}
          ${this._infoMsg
            ? html`
                <mwc-button raised @click=${this._refreshPage}>
                  ok, odśwież stronę
                </mwc-button>
              `
            : ""}
        </p>
      </ha-dialog>
    `;
  }

  private async _refreshPage(ev): Promise<void> {
    location.reload();
  }

  private async _restoreBakupFromAis(ev): Promise<void> {
    ev.preventDefault();
    this._loading = true;
    this._infoMsg = "Pobieram konfigurację bramki: " + this._params?.gateId;

    try {
      const result = await onboardAisRestoreBackupStep({
        gate_id: this._params?.gateId,
        backup_password: this._backup_password,
      });

      this._logMsg = result.log;
      if (result.result === "invalid") {
        this._errorMsg = result.message;
        this._infoMsg = "";
        this._loading = false;
      } else {
        this._errorMsg = "";
        this._infoMsg = result.message;
        this._loading = false;
      }
    } catch (err) {
      // eslint-disable-next-line
      this._infoMsg = "";
      this._loading = false;
      this._errorMsg = err.body.message;
    }
  }

  private _handleValueChanged(ev: PolymerChangedEvent<string>): void {
    const name = (ev.target as any).name;
    this[`_${name}`] = ev.detail.value;
  }

  static get styles(): CSSResult[] {
    return [
      haStyleDialog,
      css`
        ha-header-bar {
          --mdc-theme-on-primary: var(--primary-text-color);
          --mdc-theme-primary: var(--mdc-theme-surface);
          flex-shrink: 0;
        }
        /* overrule the ha-style-dialog max-height on small screens */
        @media all and (max-width: 450px), all and (max-height: 500px) {
          ha-header-bar {
            --mdc-theme-primary: var(--app-header-background-color);
            --mdc-theme-on-primary: var(--app-header-text-color, white);
          }
        }
        .action {
          margin: 32px 0;
          text-align: center;
        }
        button {
          cursor: pointer;
          padding: 0;
          border: 0;
          background: 0;
          font: inherit;
        }
        .error {
          color: red;
        }
        .info {
          color: green;
        }
        .fullLog {
          font-size: small;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dialog-ais-restore-backup": DialogAisRestoreBackup;
  }
}
