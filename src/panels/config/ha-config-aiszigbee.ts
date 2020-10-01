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

import "../../layouts/hass-loading-screen";
import "../../layouts/hass-subpage";
import { HomeAssistant, Route } from "../../types";

@customElement("ha-config-aiszigbee")
class ConfigAisZigbee extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() public route!: Route;

  @property({ type: Boolean })
  public narrow = false;

  protected render(): TemplateResult {
    const iframe = html`<iframe src="/api/zigbee2mqtt/" style=""></iframe>`;

    return html`<hass-subpage header="Zigbee2Mqtt" .narrow=${this.narrow}>
      ${iframe}
    </hass-subpage>`;
  }

  protected updated(changedProps: PropertyValues) {
    super.updated(changedProps);
  }

  static get styles(): CSSResult {
    return css`
      iframe {
        display: block;
        width: 100%;
        height: 100%;
        border: 0;
      }

      .header + iframe {
        height: calc(100% - 40px);
      }

      .header {
        display: flex;
        align-items: center;
        font-size: 16px;
        height: 40px;
        padding: 0 16px;
        pointer-events: none;
        background-color: var(--app-header-background-color);
        font-weight: 400;
        color: var(--app-header-text-color, white);
        border-bottom: var(--app-header-border-bottom, none);
        box-sizing: border-box;
        --mdc-icon-size: 20px;
      }

      .main-title {
        margin: 0 0 0 24px;
        line-height: 20px;
        flex-grow: 1;
      }

      mwc-icon-button {
        pointer-events: auto;
      }

      hass-subpage {
        --app-header-background-color: var(--sidebar-background-color);
        --app-header-text-color: var(--sidebar-text-color);
        --app-header-border-bottom: 1px solid var(--divider-color);
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-config-aiszigbee": ConfigAisZigbee;
  }
}
