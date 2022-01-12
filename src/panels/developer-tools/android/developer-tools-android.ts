import { css, CSSResultGroup, html, LitElement } from "lit";
import { property } from "lit/decorators";
import { haStyle } from "../../../resources/styles";
import { HomeAssistant } from "../../../types";

class HaPanelDevAndroid extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public narrow!: boolean;

  @property({ type: String }) public url = "";

  @property({ type: Boolean }) public localConection = true;

  protected firstUpdated(params) {
    super.firstUpdated(params);

    this.url =
      window.location.protocol + "//" + window.location.hostname + ":9966";
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
              <p
                style="text-align: center; display: flex; justify-content: center; flex-wrap: nowrap; align-items: center; line-height: 1; font-size: 1.5em;"
              >
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
                <span class="text"><b>TWOJE POŁĄCZENIE JEST ZDALNE</b></span>
                <img src="/static/icons/favicon-50x50.png" height="40" />
                <br />
              </p>
              <svg
                style="width:84px;height:84px;display:block;margin:auto;"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#008000"
                  d="M16.61 15.15C16.15 15.15 15.77 14.78 15.77 14.32S16.15 13.5 16.61 13.5H16.61C17.07 13.5 17.45 13.86 17.45 14.32C17.45 14.78 17.07 15.15 16.61 15.15M7.41 15.15C6.95 15.15 6.57 14.78 6.57 14.32C6.57 13.86 6.95 13.5 7.41 13.5H7.41C7.87 13.5 8.24 13.86 8.24 14.32C8.24 14.78 7.87 15.15 7.41 15.15M16.91 10.14L18.58 7.26C18.67 7.09 18.61 6.88 18.45 6.79C18.28 6.69 18.07 6.75 18 6.92L16.29 9.83C14.95 9.22 13.5 8.9 12 8.91C10.47 8.91 9 9.24 7.73 9.82L6.04 6.91C5.95 6.74 5.74 6.68 5.57 6.78C5.4 6.87 5.35 7.08 5.44 7.25L7.1 10.13C4.25 11.69 2.29 14.58 2 18H22C21.72 14.59 19.77 11.7 16.91 10.14H16.91Z"
                />
              </svg>
              <p style="text-align: center;">
                <span
                  class="text"
                  style="display: flex; justify-content: center; flex-wrap: nowrap; align-items: center; line-height: 1;"
                >
                  <span class="text"
                    ><b
                      >APLIKACJA ANDROID DEVICE SCREEN, DOSTĘPNA JEST
                      LOKALNIE</b
                    ></span
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
                </span>
                Dokumentacja:
                <a
                  target="_blank"
                  style="color: var(--accent-color);"
                  href="https://ai-speaker.com/docs/ais_app_integration_manager"
                  >www.ai-speaker.com/</a
                >
                <br />
                <br />
                Adres aplikacji w Twojej lokalanej sieci:
                <a
                  target="_blank"
                  style="color: var(--accent-color);"
                  href="http://${this.hass.states["sensor.internal_ip_address"]
                    .state}:9966"
                  >http://${this.hass.states["sensor.internal_ip_address"]
                    .state}:9966</a
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

customElements.define("developer-tools-android", HaPanelDevAndroid);

declare global {
  interface HTMLElementTagNameMap {
    "developer-tools-android": HaPanelDevAndroid;
  }
}
