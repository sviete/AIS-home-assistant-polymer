import "@polymer/paper-input/paper-textarea";
import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";
import "../../../resources/ha-style";
import { loadTokens } from "../../../common/auth/token_storage";

class HaPanelDevConsole extends PolymerElement {
  static get template() {
    return html`
      <style include="ha-style">
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
      </style>
      <template is="dom-if" if="[[allowConsole]]">
        <iframe src="[[url]]" style="width: 100%; height: 100%;"></iframe>
      </template>
      <template is="dom-if" if="[[!allowConsole]]">
        <div
          style="width: 100%; height: 100%; display: flex; align-items: center;"
        >
          <div style="width: 100%;">
            <p style="text-align: center; padding:10px;">
              <span style="font-size:8em" class="text"><b>👩‍💻</b></span>
              <br />
            </p>
            <p style="text-align: center;">
              <span class="text"
                ><b>KONSOLA NA BRAMCE DEMO NIE JEST DOSTĘPNA</b></span
              >
            </p>
          </div>
        </div>
      </template>
    `;
  }

  static get properties() {
    return {
      hass: Object,
      access_token: String,
      url: String,
      allowConsole: Boolean,
    };
  }

  ready() {
    super.ready();
    const tokens = loadTokens();
    this.access_token = tokens?.access_token;
    this.url =
      window.location.protocol +
      "//" +
      window.location.hostname +
      ":" +
      window.location.port +
      "/api/ais_auto_proxy/" +
      this.access_token +
      "/localhost/8888/";
    this.allowConsole = true;
    if (
      window.location.hostname.startsWith("dom-demo.") ||
      window.location.hostname.startsWith("demo.")
    ) {
      this.allowConsole = false;
    }
  }
}

customElements.define("developer-tools-console", HaPanelDevConsole);
