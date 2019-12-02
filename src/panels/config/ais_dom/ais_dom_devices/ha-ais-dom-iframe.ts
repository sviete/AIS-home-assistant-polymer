import {
  LitElement,
  customElement,
  property,
  TemplateResult,
  html,
  CSSResult,
  css,
} from "lit-element";
import { HomeAssistant } from "../../../../../src/types";
import "../../../../../src/layouts/hass-loading-screen";
import "../../../../../src/layouts/hass-subpage";

@customElement("ais-dom-iframe-view")
class AisDomIframeView extends LitElement {
  @property() public hass!: HomeAssistant;
  @property() public url!: string;

  protected render(): TemplateResult | void {
    return html`
      <div .header="OK">
        <iframe src=${this.url}></iframe>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      iframe {
        display: block;
        width: 100%;
        height: 600px;
        border: 0;
      }
      paper-icon-button {
        color: var(--text-primary-color);
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ais-dom-iframe-view": AisDomIframeView;
  }
}
