import "../../lovelace/cards/hui-ais-android-picture-card";
import { css, CSSResultGroup, html, LitElement } from "lit";
import { property } from "lit/decorators";
import { haStyle } from "../../../resources/styles";
import { HomeAssistant } from "../../../types";
import { lovelace } from "../../lovelace/types";
class HaPanelDevAndroid extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public narrow!: boolean;

  @property({ type: String }) public url = "";

  @property({ type: Boolean }) public localConection = true;

  protected firstUpdated(params) {
    super.firstUpdated(params);

    this.url =
      window.location.protocol + "//" + window.location.hostname + ":8000";
    this.localConection = true;
    if (
      window.location.hostname.startsWith("dom-") ||
      window.location.hostname.startsWith("demo.")
    ) {
      this.localConection = false;
    }
  }

  protected render() {
    return `
          <hui-ais-android-picture-card
          .hass=${this.hass}
          .lovelace=${lovelace}
          camera_view="live"
          entity="camera.cam1"
          element_id="ais_123"
      ></hui-ais-android-picture-card>
      `;
  }

  static get styles(): CSSResultGroup {
    return [
      haStyle,
      css`
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
      `,
    ];
  }
}

customElements.define("developer-tools-webcmd", HaPanelDevAndroid);

declare global {
  interface HTMLElementTagNameMap {
    "developer-tools-android": HaPanelDevAndroid;
  }
}
