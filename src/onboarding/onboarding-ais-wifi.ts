import "@material/mwc-button/mwc-button";
import "@polymer/paper-input/paper-input";
import "@polymer/paper-item/paper-item";
import "@polymer/paper-item/paper-item-body";
import { showConfigFlowDialog } from "../dialogs/config-flow/show-dialog-config-flow";
import "../components/ha-icon";
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
import type { HomeAssistant } from "../types";

@customElement("onboarding-ais-wifi")
class OnboardingAisWifi extends LitElement {
  @property() public hass!: HomeAssistant;

  @property() public localize!: LocalizeFunc;

  protected render(): TemplateResult {
    return html`
      <br />
      <div class="row">
        <div>
          <ha-icon icon="hass:wifi"></ha-icon>
          ${this.localize(
            "ui.panel.page-onboarding.ais-wifi.intro_ais_enable_wifi_1"
          )}
        </div>
        <mwc-button @click=${this._connectWifi}>
          ${this.localize(
            "ui.panel.page-onboarding.ais-wifi.intro_ais_enable_wifi_2"
          )}
        </mwc-button>
      </div>
      <br />
    `;
  }

  protected firstUpdated(changedProps: PropertyValues) {
    super.firstUpdated(changedProps);
  }

  private async _connectWifi() {
    this.hass
      .callApi("POST", "config/config_entries/flow", {
        handler: "ais_wifi_service",
      })
      .then((result: any) => {
        this._continueFlow(result.flow_id);
      });
  }

  private _continueFlow(flowId) {
    showConfigFlowDialog(this, {
      continueFlowId: flowId,
      dialogClosedCallback: () => {
        return;
      },
    });
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
      .row {
        display: flex;
        flex-direction: row;
        margin: 0 -8px;
        align-items: center;
      }

      .secondary {
        color: var(--secondary-text-color);
      }

      .flex {
        flex: 1;
      }

      .middle-text {
        margin: 24px 0;
      }

      .row > * {
        margin: 0 8px;
      }
      .footer {
        margin-top: 16px;
        text-align: right;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "onboarding-ais-wifi": OnboardingAisWifi;
  }
}
