import "@material/mwc-button";
import "@polymer/paper-input/paper-input";
import "@polymer/paper-item/paper-item";
import "@polymer/paper-item/paper-item-body";
import "../components/ha-icon";
import { genClientId } from "home-assistant-js-websocket";
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
import { onboardAisCloudLoginStep } from "../data/onboarding";
import { PolymerChangedEvent } from "../polymer-types";
import type { HomeAssistant } from "../types";

@customElement("onboarding-restore-backup")
class OnboardingRestoreBackup extends LitElement {
  @property() public hass?: HomeAssistant;

  @property() public localize!: LocalizeFunc;

  @property() public language!: string;

  @property() private _username = "";

  @property() private _password = "";

  @property() private _backup_password = "";

  @property() private _loading = false;

  @property() private _errorMsg?: string = undefined;

  @property() private _aisGates: Array<{
    gate_id: string;
    user_name: string;
    my_desc: string;
  }> = [];

  @property() private _aisLogged = false;

  @property() private _infoMsg?: string = undefined;

  protected render(): TemplateResult {
    return html`
    <hr>
    <br>
      <p>
          <b>${this.localize("ui.panel.page-onboarding.ais_restore_intro")}</b>
      </p>
    ${
      this._aisLogged
        ? html`
            <p>
              ${this.localize(
                "ui.panel.page-onboarding.ais_restore_intro_step2"
              )}
            </p>
          `
        : html`
            <p>
              ${this.localize(
                "ui.panel.page-onboarding.ais_restore_intro_step1"
              )}
            </p>
          `
    }

    ${
      this._infoMsg
        ? html`
            <p class="info">
              ${this._errorMsg}
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
        ? html`<paper-input
            name="backup_password"
            label="${this.localize(
              "ui.panel.page-onboarding.user.data.password"
            )}"
            value=${this._backup_password}
            @value-changed=${this._handleValueChanged}
            type="password"
          ></paper-input>`
        : ""
    }

    ${
      this._aisLogged
        ? this._aisGates.map(
            (gate) => html`
              <paper-item class="option">
                <paper-item-body three-line>
                  <div>${gate.gate_id}</div>
                  <div secondary>${gate.user_name}</div>
                  <div secondary>${gate.my_desc}</div>
                </paper-item-body>
                <mwc-button
                  .slug=${gate.gate_id}
                  title="Restore"
                  @click=${this._restoreFromAis}
                  data-gate_id=${gate.gate_id}
                  data-backup_password=${this._backup_password}
                >
                  Restore
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
                ${this.localize("ui.panel.page-onboarding.ais_logout")}
              </mwc-button>
            </p>`
          : html` <p class="action">
              <mwc-button
                raised
                @click=${this._submitForm}
                .disabled=${this._loading}
              >
                ${this.localize("ui.panel.page-onboarding.ais_login")}
              </mwc-button>
            </p>`
      }
    </div>
  </form>
`;
  }

  protected firstUpdated(changedProps: PropertyValues) {
    super.firstUpdated(changedProps);
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
    const backup_password = ev.target.dataset.backup_password;
    console.log(gate_id);
    console.log(backup_password);
    this.hass.callService("ais_cloud", "restore_backup", {
      password: backup_password,
      type: "all",
    });
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
      const clientId = genClientId();

      const result = await onboardAisCloudLoginStep({
        client_id: clientId,
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

      // fireEvent(this, "onboarding-step", {
      //   type: "user",
      //   result,
      // });
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
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "onboarding-restore-backup": OnboardingRestoreBackup;
  }
}
