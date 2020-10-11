import {
  LitElement,
  customElement,
  property,
  TemplateResult,
  html,
  CSSResult,
  css,
  internalProperty,
} from "lit-element";
import { loadTokens } from "../../../../common/auth/token_storage";
import { HomeAssistant } from "../../../../types";
import "../../../../layouts/hass-loading-screen";
import "../../../../layouts/hass-subpage";
import { EntityRegistryStateEntry } from "../ha-config-ais-dom-device-page";

@customElement("ais-dom-iframe-view")
class AisDomIframeView extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() public url!: string;

  @property() public entities!: EntityRegistryStateEntry[];

  @internalProperty() private _access_token = "";

  protected render(): TemplateResult {
    const tokens = loadTokens();
    this._access_token = tokens?.access_token;
    return html`
      <ha-card>
        ${this.entities.length
          ? this.entities.map((entry: EntityRegistryStateEntry) => {
              let devUrl = "";
              try {
                devUrl = this.hass.states[entry.entity_id].attributes.IPAddress;
              } catch {
                devUrl = "";
              }
              let fullUrl = "";
              if (devUrl !== "" && devUrl !== undefined) {
                fullUrl =
                  location.protocol +
                  "//" +
                  window.location.hostname +
                  ":" +
                  window.location.port +
                  "/api/ais_auto_proxy/" +
                  this._access_token +
                  "/" +
                  devUrl +
                  "/80/";
                return html`
                  ${devUrl !== ""
                    ? html` <iframe .src="${fullUrl}"></iframe> `
                    : html``}
                `;
              }
              return html``;
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
