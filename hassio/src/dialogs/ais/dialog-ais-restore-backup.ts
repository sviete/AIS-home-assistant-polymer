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
import { fireEvent } from "../../../../src/common/dom/fire_event";
import "../../../../src/components/ha-header-bar";
import { HassDialog } from "../../../../src/dialogs/make-dialog-manager";
import { haStyleDialog } from "../../../../src/resources/styles";
import type { HomeAssistant } from "../../../../src/types";
import "../../components/hassio-upload-snapshot";
import { AisRestoreBackupDialogParams } from "./show-ais-dialog-restore-backup";
import { LocalizeFunc } from "../../../../src/common/translations/localize";
import { PolymerChangedEvent } from "../../../../src/polymer-types";

@customElement("dialog-ais-restore-backup")
export class DialogAisRestoreBackup extends LitElement
  implements HassDialog<AisRestoreBackupDialogParams> {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() public localize!: LocalizeFunc;

  @property() private _backup_password = "";

  @internalProperty() private _params?: AisRestoreBackupDialogParams;

  public async showDialog(params: AisRestoreBackupDialogParams): Promise<void> {
    this._params = params;
    await this.updateComplete;
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
              Restore Backup from AI-Speaker
            </span>
            <mwc-icon-button slot="actionItems" dialogAction="cancel">
              <ha-svg-icon .path=${mdiClose}></ha-svg-icon>
            </mwc-icon-button>
          </ha-header-bar>
        </div>
        <p>
          Jeśli zabezpieczyłeś kopie hasłem to je podaj:
        </p>
        <paper-input
          name="backup_password"
          label="Password"
          value=${this._backup_password}
          @value-changed=${this._handleValueChanged}
          type="password"
        ></paper-input>
      </ha-dialog>
    `;
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
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dialog-ais-restore-backup": DialogAisRestoreBackup;
  }
}
