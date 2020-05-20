import {
  LitElement,
  customElement,
  property,
  TemplateResult,
  html,
  CSSResult,
  css,
} from "lit-element";
import { HomeAssistant } from "../../../../types";
import "../../../../layouts/hass-loading-screen";
import "../../../../layouts/hass-subpage";
import { EntityRegistryStateEntry } from "../ha-config-ais-dom-device-page";

@customElement("ais-dom-iframe-view")
class AisDomIframeView extends LitElement {
  @property() public hass!: HomeAssistant;
  @property() public url!: string;
  @property() public entities!: EntityRegistryStateEntry[];

  protected render(): TemplateResult {
    return html`
      <ha-card>
        ${this.entities.length
          ? this.entities.map((entry: EntityRegistryStateEntry) => {
              let devUrl = false;
              try {
                devUrl = this.hass.states[entry.entity_id].attributes.IPAddress;
              } catch {
                devUrl = false;
              }
              return html`
                ${devUrl
                  ? html` <iframe .src="http://${devUrl}"></iframe> `
                  : html``}
              `;
            })
          : html``}
      </ha-card>
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
