import "@material/mwc-button/mwc-button";
import {
  css,
  CSSResult,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from "lit-element";
import { fireEvent } from "../common/dom/fire_event";
import { LocalizeFunc } from "../common/translations/localize";
import { HomeAssistant } from "../types";
import { onboardMobIntegrationStep } from "../data/onboarding";

import "./action-badge";
import "./integration-badge";

@customElement("onboarding-mob-integrations")
class OnboardingMobIntegrations extends LitElement {
  @property() public hass!: HomeAssistant;

  @property() public onboardingLocalize!: LocalizeFunc;

  public connectedCallback() {
    super.connectedCallback();
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected render(): TemplateResult {
    return html`
      <h2>
        ${this.onboardingLocalize(
          "ui.panel.page-onboarding.mob-integration.h1"
        )}
      </h2>
      <p>
        ${this.onboardingLocalize(
          "ui.panel.page-onboarding.mob-integration.intro"
        )}
      </p>
      <div class="scanCode">
        <a href="https://play.google.com/store/apps/details?id=pl.sviete.dom">
          <img src="/static/ais_dom/link-to-mob-app.png" style="width:50%" />
        </a>
      </div>
      <p>
        ${this.onboardingLocalize(
          "ui.panel.page-onboarding.mob-integration.other_mob_apps"
        )}
      </p>
      <div class="row">
        <div class="column">
          <a
            href="https://apps.apple.com/us/app/home-assistant/id1099568401?mt=8"
          >
            <img
              src="/static/ais_dom/download_on_the_app_store.png"
              alt="Apple App Store"
              style="width:100%"
            />
          </a>
        </div>
        <div class="column">
          <a
            href="https://play.google.com/store/apps/details?id=io.homeassistant.companion.android"
          >
            <img
              src="/static/ais_dom/get_it_on_google_play.png"
              alt="Google Play"
              style="width:100%"
            />
          </a>
        </div>
      </div>

      <div class="footer">
        <mwc-button @click=${this._finish}>
          ${this.onboardingLocalize(
            "ui.panel.page-onboarding.mob-integration.finish"
          )}
        </mwc-button>
      </div>
    `;
  }

  private async _finish(ev) {
    ev.preventDefault();
    try {
      const result = await onboardMobIntegrationStep(this.hass);
      fireEvent(this, "onboarding-step", {
        type: "mob_integration",
        result,
      });
    } catch (err) {
      alert(`Failed to save: ${err.message}`);
    }
  }

  static get styles(): CSSResult {
    return css`
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
      div.scanCode {
        display: flex;
        text-align: center;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "onboarding-mob-integrations": OnboardingMobIntegrations;
  }
}
