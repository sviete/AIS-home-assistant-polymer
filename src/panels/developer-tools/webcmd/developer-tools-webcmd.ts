import { css, CSSResultGroup, html, LitElement } from "lit";
import { property } from "lit/decorators";
import { haStyle } from "../../../resources/styles";
import { HomeAssistant } from "../../../types";

class HaPanelDevWebCmd extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public narrow!: boolean;

  @property({ type: String }) public url = "";

  @property({ type: Boolean }) public localConection = true;

  protected firstUpdated(params) {
    super.firstUpdated(params);

    this.url =
      window.location.protocol + "//" + window.location.hostname + ":8888";
    this.localConection = true;
    if (
      window.location.hostname.startsWith("dom-") ||
      window.location.hostname.startsWith("demo.")
    ) {
      this.localConection = false;
    }
  }

  protected render() {
    return html` ${this.localConection
      ? html`
          <iframe src=${this.url} style="width: 100%; height: 100%;"></iframe>
        `
      : html`
          <div
            style="width: 100%; height: 100%; display: flex; align-items: center;"
          >
            <div style="width: 100%;">
              <p style="text-align: center;">
                <span class="text"><b>TWOJE POŁĄCZENIE JEST ZDALNE</b></span>
                <span class="icon">
                  <svg
                    class="a"
                    style="width:36px;height:36px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M6,7L6.69,7.06C7.32,4.72 9.46,3 12,3A5.5,5.5 0 0,1 17.5,8.5L17.42,9.45C17.88,9.16 18.42,9 19,9A3,3 0 0,1 22,12A3,3 0 0,1 19,15H6A4,4 0 0,1 2,11A4,4 0 0,1 6,7M6,9A2,2 0 0,0 4,11A2,2 0 0,0 6,13H19A1,1 0 0,0 20,12A1,1 0 0,0 19,11H15.5V8.5A3.5,3.5 0 0,0 12,5A3.5,3.5 0 0,0 8.5,8.5V9H6M22,19L19,22V20H2V18H19V16L22,19"
                    />
                  </svg>
                </span>
                <br />
              </p>
              <svg
                style="width:84px;height:84px;display:block;margin:auto;"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6 2C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H12V20H6V4H13V9H18V12H20V8L14 2M18 14C17.87 14 17.76 14.09 17.74 14.21L17.55 15.53C17.25 15.66 16.96 15.82 16.7 16L15.46 15.5C15.35 15.5 15.22 15.5 15.15 15.63L14.15 17.36C14.09 17.47 14.11 17.6 14.21 17.68L15.27 18.5C15.25 18.67 15.24 18.83 15.24 19C15.24 19.17 15.25 19.33 15.27 19.5L14.21 20.32C14.12 20.4 14.09 20.53 14.15 20.64L15.15 22.37C15.21 22.5 15.34 22.5 15.46 22.5L16.7 22C16.96 22.18 17.24 22.35 17.55 22.47L17.74 23.79C17.76 23.91 17.86 24 18 24H20C20.11 24 20.22 23.91 20.24 23.79L20.43 22.47C20.73 22.34 21 22.18 21.27 22L22.5 22.5C22.63 22.5 22.76 22.5 22.83 22.37L23.83 20.64C23.89 20.53 23.86 20.4 23.77 20.32L22.7 19.5C22.72 19.33 22.74 19.17 22.74 19C22.74 18.83 22.73 18.67 22.7 18.5L23.76 17.68C23.85 17.6 23.88 17.47 23.82 17.36L22.82 15.63C22.76 15.5 22.63 15.5 22.5 15.5L21.27 16C21 15.82 20.73 15.65 20.42 15.53L20.23 14.21C20.22 14.09 20.11 14 20 14M19 17.5C19.83 17.5 20.5 18.17 20.5 19C20.5 19.83 19.83 20.5 19 20.5C18.16 20.5 17.5 19.83 17.5 19C17.5 18.17 18.17 17.5 19 17.5Z"
                />
              </svg>
              <p style="text-align: center;">
                <span class="text"
                  ><b>MANAGER PLIKÓW DOSTĘPNY JEST TYLKO LOKALNIE</b></span
                >
                <span class="icon">
                  <svg
                    class="a"
                    style="width:36px;height:36px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M15 13L11 9V12H2V14H11V17M22 12H20V21H4V16H6V19H18V11L12 5L7 10H4L12 2L22 12Z"
                    />
                  </svg>
                </span>
                <br />
                <br />
                Adres aplikacji w lokalanej sieci:
                <a
                  target="_blank"
                  style="color: var(--accent-color);"
                  href="http://${this.hass.states["sensor.internal_ip_address"]
                    .state}:8888"
                  >http://${this.hass.states["sensor.internal_ip_address"]
                    .state}:8888</a
                >
              </p>
            </div>
          </div>
        `}`;
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

customElements.define("developer-tools-webcmd", HaPanelDevWebCmd);

declare global {
  interface HTMLElementTagNameMap {
    "developer-tools-webcmd": HaPanelDevWebCmd;
  }
}
