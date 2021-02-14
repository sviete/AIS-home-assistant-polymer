import "@material/mwc-button";
import "@polymer/paper-input/paper-input";
import "@polymer/paper-item/paper-item";
import "@polymer/paper-item/paper-item-body";
import "../components/ha-icon";
import "../components/ha-expansion-panel";
import { makeDialogManager } from "../dialogs/make-dialog-manager";
import { ProvideHassLitMixin } from "../mixins/provide-hass-lit-mixin";
import {
  css,
  CSSResult,
  customElement,
  html,
  LitElement,
  property,
  PropertyValues,
  TemplateResult,
} from "lit-element";
import { LocalizeFunc } from "../common/translations/localize";
import {
  onboardAisCloudLoginStep,
  onboardAisRestoreBackupStep,
} from "../data/onboarding";
import { PolymerChangedEvent } from "../polymer-types";
import type { HomeAssistant } from "../types";
import { showAisRestoreBackupDialog } from "../../hassio/src/dialogs/ais/show-ais-dialog-restore-backup";

@customElement("onboarding-ais-restore-backup")
class OnboardingAisRestoreBackup extends ProvideHassLitMixin(LitElement) {
  @property() public localize!: LocalizeFunc;

  @property() public hass!: HomeAssistant;

  @property() public language!: string;

  @property() private _username = "";

  @property() private _password = "";

  @property() private _loading = false;

  @property() private _errorMsg?: string = undefined;

  @property() private _aisGates: Array<{
    gate_id: string;
    gate_name: string;
    gate_desc: string;
    gate_backup_ha: string;
    gate_backup_zigbee: string;
  }> = [];

  @property() private _aisLogged = false;

  @property() private _infoMsg?: string = undefined;

  protected render(): TemplateResult {
    return html`
    <ha-expansion-panel header=${this.localize(
      "ui.panel.page-onboarding.ais-restore-backup.ais_restore_intro"
    )}>
    ${
      this._aisLogged
        ? ""
        : html`
            <p>
              ${this.localize(
                "ui.panel.page-onboarding.ais-restore-backup.ais_restore_intro_step1"
              )}
              <a target="_blank" href="https://powiedz.co/ords/f?p=100"
                >AI-Speaker</a
              >
            </p>
          `
    }

    ${
      this._infoMsg
        ? html`
            <p class="info">
              ${this._infoMsg}
            </p>
          `
        : ""
    }

    ${
      this._errorMsg
        ? html`
            <p class="error">
              ${this.localize(
                `ui.panel.page-onboarding.user.error.${this._errorMsg}`
              ) || this._errorMsg}
            </p>
          `
        : ""
    }

    <form>
    ${
      this._aisLogged
        ? html` <p>
            ${this.localize(
              "ui.panel.page-onboarding.ais-restore-backup.ais_restore_intro_step3"
            )}
          </p>`
        : ""
    }

    ${
      this._aisLogged
        ? this._aisGates.map(
            (gate) => html`
              <paper-item class="option">
                <paper-item-body four-line>
                  <div>${gate.gate_id}</div>
                  <div secondary>
                    ${gate.gate_name} &nbsp; ${gate.gate_desc}
                  </div>
                  <div secondary>
                    <ha-icon icon="mdi:home-assistant"></ha-icon>&nbsp;
                    ${gate.gate_backup_ha}
                  </div>
                  <div secondary>
                    <ha-icon icon="mdi:zigbee"></ha-icon>&nbsp;
                    ${gate.gate_backup_zigbee}
                  </div>
                </paper-item-body>
                <mwc-button
                  .slug=${gate.gate_id}
                  title="Restore"
                  @click=${this._restoreFromAis}
                  .disabled=${this._loading}
                  data-gate_id=${gate.gate_id}
                >
                  ${this.localize(
                    "ui.panel.page-onboarding.ais-restore-backup.ais_restore_button"
                  )}
                </mwc-button>
              </paper-item>
            `
          )
        : html` <paper-input
              name="username"
              label="${this.localize(
                "ui.panel.page-onboarding.user.data.username"
              )}"
              value=${this._username}
              @value-changed=${this._handleValueChanged}
              required
              auto-validate
              autocapitalize="none"
              .errorMessage="${this.localize(
                "ui.panel.page-onboarding.user.required_field"
              )}"
            ></paper-input>

            <paper-input
              name="password"
              label="${this.localize(
                "ui.panel.page-onboarding.user.data.password"
              )}"
              value=${this._password}
              @value-changed=${this._handleValueChanged}
              required
              type="password"
              auto-validate
              .errorMessage="${this.localize(
                "ui.panel.page-onboarding.user.required_field"
              )}"
            ></paper-input>`
    }

      ${
        this._aisLogged
          ? html` <p class="action">
              <mwc-button
                raised
                @click=${this._logoutFromAis}
                .disabled=${this._loading}
              >
                ${this.localize(
                  "ui.panel.page-onboarding.ais-restore-backup.ais_logout"
                )}
              </mwc-button>
            </p>`
          : html` <p class="action">
              <mwc-button
                raised
                @click=${this._submitForm}
                .disabled=${this._loading}
              >
                ${this.localize(
                  "ui.panel.page-onboarding.ais-restore-backup.ais_login"
                )}
              </mwc-button>
            </p>`
      }
    </div>
  </form>
  </ha-expansion-panel>
`;
  }

  protected firstUpdated(changedProps: PropertyValues) {
    super.firstUpdated(changedProps);
    makeDialogManager(this, this.shadowRoot!);
    setTimeout(
      () => this.shadowRoot!.querySelector("paper-input")!.focus(),
      100
    );
    this.addEventListener("keypress", (ev) => {
      if (ev.keyCode === 13) {
        this._submitForm(ev);
      }
    });
  }

  private _handleValueChanged(ev: PolymerChangedEvent<string>): void {
    const name = (ev.target as any).name;
    this[`_${name}`] = ev.detail.value;
  }

  private async _logoutFromAis(ev): Promise<void> {
    ev.preventDefault();
    this._aisLogged = false;
    this._aisGates = [];
    this._username = "";
    this._password = "";
  }

  private async _restoreFromAis(ev): Promise<void> {
    ev.preventDefault();
    const gate_id = ev.target.dataset.gate_id;

    showAisRestoreBackupDialog(this, { gateId: gate_id });

    //   this._loading = true;
    //   this._infoMsg =
    //     this.localize(
    //       "ui.panel.page-onboarding.ais-restore-backup.ais_restore_ok_info_step1"
    //     ) +
    //     " " +
    //     gate_id;

    //   try {
    //     const result = await onboardAisRestoreBackupStep({
    //       gate_id: gate_id,
    //       backup_password: backup_password,
    //     });

    //     if (result.result === "invalid") {
    //       this._errorMsg = result.message;
    //       this._infoMsg = "";
    //       this._loading = false;
    //     } else {
    //       this._errorMsg = "";
    //       this._infoMsg = result.message;
    //       this._loading = false;
    //     }
    //   } catch (err) {
    //     // eslint-disable-next-line
    //     this._infoMsg = "";
    //     this._loading = false;
    //     this._errorMsg = err.body.message;
    //   }
  }

  private async _submitForm(ev): Promise<void> {
    ev.preventDefault();
    if (!this._username || !this._password) {
      this._errorMsg = "required_fields";
      return;
    }

    this._loading = true;
    this._errorMsg = "";

    try {
      const result = await onboardAisCloudLoginStep({
        username: this._username,
        password: this._password,
        language: this.language,
      });

      if (result.result === "invalid") {
        this._errorMsg = result.error;
        this._loading = false;
        this._aisLogged = false;
      } else {
        this._aisLogged = true;
        this._aisGates = result.gates;
        this._loading = false;
      }
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
      this._loading = false;
      this._errorMsg = err.body.message;
    }
  }

  static get styles(): CSSResult {
    return css`
      .error {
        color: red;
      }
      .info {
        color: green;
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
      .footer {
        margin-top: 2em;
        text-align: right;
      }
      .column {
        flex: 50%;
        padding: 5px;
      }
      .row {
        display: flex;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "onboarding-ais-restore-backup": OnboardingAisRestoreBackup;
  }
}
