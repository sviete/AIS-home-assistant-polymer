import "@material/mwc-button/mwc-button";
import { css, CSSResultGroup, html, LitElement } from "lit";
import { property } from "lit/decorators";
import { haStyle } from "../../../resources/styles";
import { HomeAssistant } from "../../../types";

class HaPanelDevCode extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public narrow!: boolean;

  @property({ type: String }) public url = "";

  @property({ type: Boolean }) public localConection = true;

  protected firstUpdated(params) {
    super.firstUpdated(params);

    this.url =
      window.location.protocol + "//" + window.location.hostname + ":8080";
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
          <iframe title="code" src=${this.url} style="width: 100%; height: 100%;"></iframe>
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
                <img alt="icon" src="/static/icons/favicon-50x50.png" height="40" />
                <br />
              </p>
              <svg
                style="width:84px;height:84px;display:block;margin:auto;"
                viewBox="0 0 24 24"
              >
                <path
                  fill="black"
                  d="M17,16.47V7.39L11,11.93M2.22,9.19C1.92,8.87 1.91,8.37 2.2,8.04L3.4,6.93C3.6,6.75 4.09,6.67 4.45,6.93L7.87,9.54L15.8,2.29C16.12,1.97 16.67,1.84 17.3,2.17L21.3,4.08C21.66,4.29 22,4.62 22,5.23V18.73C22,19.13 21.71,19.56 21.4,19.73L17,21.83C16.68,21.96 16.08,21.84 15.87,21.63L7.85,14.33L4.45,16.93C4.07,17.19 3.6,17.12 3.4,16.93L2.2,15.83C1.88,15.5 1.92,14.96 2.25,14.63L5.25,11.93"
                />
              </svg>
              <p style="text-align: center;">
                <span
                  class="text"
                  style="display: flex; justify-content: center; flex-wrap: nowrap; align-items: center; line-height: 1;"
                  ><b>APLIKACJA CODE DOSTĘPNA JEST LOKALNIE</b>
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
                  href="https://ai-speaker.com/docs/ais_app_integration_code"
                  >www.ai-speaker.com/docs/code</a
                >
                <br />
                <br />
                Adres aplikacji w Twojej lokalanej sieci:
                <a
                  target="_blank"
                  style="color: var(--accent-color);"
                  href="http://${this.hass.states["sensor.internal_ip_address"]
                    .state}:8080"
                  >http://${this.hass.states["sensor.internal_ip_address"]
                    .state}:8080</a
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

customElements.define("developer-tools-code", HaPanelDevCode);

declare global {
  interface HTMLElementTagNameMap {
    "developer-tools-code": HaPanelDevCode;
  }
}
