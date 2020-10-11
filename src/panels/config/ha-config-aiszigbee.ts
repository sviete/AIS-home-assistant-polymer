import {
  css,
  CSSResultArray,
  customElement,
  html,
  LitElement,
  property,
  PropertyValues,
  TemplateResult,
  internalProperty,
} from "lit-element";
import { loadTokens } from "../../common/auth/token_storage";
import "../../layouts/hass-loading-screen";
import "../../layouts/hass-subpage";
import "../../components/ha-circular-progress";
import { fireEvent } from "../../common/dom/fire_event";
import { haStyle } from "../../resources/styles";
import { HomeAssistant, Route } from "../../types";

@customElement("ha-config-aiszigbee")
class ConfigAisZigbee extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() public route!: Route;

  @property({ type: Boolean })
  public narrow = false;

  @internalProperty() private _access_token = "";

  protected render(): TemplateResult {
    const tokens = loadTokens();
    this._access_token = tokens?.access_token;
    const zigbee2mqtt = this.hass.states["sensor.status_serwisu_zigbee2mqtt"];
    if (zigbee2mqtt.state === "online") {
      const iframe = html` <iframe
        src="/api/zigbee2mqtt/${this._access_token}/"
      ></iframe>`;
      return html`<hass-subpage header="Zigbee2Mqtt" .narrow=${this.narrow}>
        ${iframe}
      </hass-subpage>`;
    }

    return html`<hass-subpage header="Zigbee2Mqtt" .narrow=${this.narrow}>
      <div
        style="width: 100%; height: 100%; display: flex; align-items: center;"
      >
        <div style="width: 100%;">
          <p style="text-align: center;">
            <span class="text"><b>BRAK POŁĄCZENIA Z ZIGBEE2MQTT</b></span>
            <span class="icon">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M8 2C6.9 2 6 2.9 6 4V12H5V16L9 20V22H15V20L19 16V12H18V4C18 2.9 17.11 2 16 2M8 4H16V12H8M9 7V9H11V7M13 7V9H15V7Z"
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
              d="M11.6 13V12.9L11.3 12.6H11.2L9.6 12C10 11.7 10.4 11.5 10.9 11.5C11.4 11.5 11.9 11.7 12.3 12.1C12.7 12.5 12.9 12.9 12.9 13.4C12.9 13.9 12.8 14.3 12.4 14.7L11.6 13M9.7 19.3C9.4 18.3 9.6 17.1 10.4 15.5L11.6 18.6C11.8 19.2 11.6 19.6 11 19.9C10.4 20.2 10 20 9.7 19.3M4.1 13.1C4.3 12.5 4.7 12.3 5.3 12.5L8.5 13.7C6.9 14.5 5.7 14.7 4.7 14.4C4.1 14.1 3.9 13.7 4.1 13.1M12 8.1H11V9.5H10.6C9.5 9.5 8.6 9.9 7.8 10.7L7.4 11.3L6 10.5C5.7 10.4 5.4 10.4 5 10.4C4.4 10.4 3.8 10.6 3.3 11S2.4 11.8 2.2 12.4C2 13.1 2 13.7 2.2 14.4C2.5 15.1 2.8 15.6 3.3 15.9C2.9 17.4 3.2 18.7 4.3 19.8C5.1 20.6 6 21 7.1 21C7.6 21 7.9 21 8.2 20.9C8.8 21.7 9.6 22.2 10.6 22.2C10.9 22.2 11.3 22.2 11.6 22.1C12.2 21.9 12.6 21.5 13 21C13.4 20.4 13.6 19.9 13.6 19.3C13.6 18.9 13.6 18.6 13.5 18.3L12.9 16.9L13.5 16.5C14.3 15.7 14.7 14.6 14.6 13.4H16V12.4H14.4C14 11.2 13.2 10.4 12 10V8.1M17.3 6.8C17.1 6.6 17 6.3 17 6.1C17 5.8 17.1 5.6 17.3 5.4C17.5 5.2 17.7 5.1 18 5.1S18.5 5.2 18.7 5.4C18.9 5.5 19 5.8 19 6.1C19 6.4 18.9 6.6 18.7 6.8C18.5 7 18.3 7 18 7S17.5 7 17.3 6.8M20.7 4.1H19.6L19.3 3.2C19.1 2.5 18.7 2.2 18 2.2C17.3 2.2 16.8 2.5 16.7 3.2L16.4 4.1H15.3C14.7 4.1 14.3 4.4 14 5C13.8 5.6 14 6.1 14.6 6.5L15.5 7L15.1 8.2C14.9 8.6 15 9 15.2 9.4C15.5 9.8 15.8 10 16.3 10C16.7 10 17 9.9 17.2 9.7L18 9.1L18.8 9.8C19 9.9 19.3 10 19.7 10C20.2 10 20.5 9.8 20.8 9.4C21 9 21.1 8.6 20.9 8.2L20.5 7L21.3 6.5C21.9 6.1 22.1 5.6 21.9 5C21.7 4.3 21.3 4.1 20.7 4.1Z"
            />
          </svg>
          <p style="text-align: center;">
            <span class="text"
              ><b
                >usługa zigbee2mqtt jest
                <span
                  .onclick="${this.showZigbeeStatus}"
                  style="text-decoration: underline; cursor: pointer;"
                >
                  <a> ${zigbee2mqtt.state} </a> </span
                >, czekam na połączenie, to może potrwać kilka minut...</b
              ></span
            >
            <br /><br />
            <ha-circular-progress active></ha-circular-progress>
            <br />
            <br />
            W razie problemów sprawdz logi, wpisując w
            <a href="/developer-tools/console">konsoli</a> komendę:
            <b>pm2 logs</b><br />
            Szczegóły w dokumentacji:
            <a href="https://www.ai-speaker.com/docs/ais_app_integration_zigbee"
              >Integracja Zigbee2MQTT</a
            >
          </p>
        </div>
      </div>
    </hass-subpage>`;
  }

  protected updated(changedProps: PropertyValues) {
    super.updated(changedProps);
  }

  private showZigbeeStatus() {
    fireEvent(this, "hass-more-info", {
      entityId: "sensor.status_serwisu_zigbee2mqtt",
    });
  }

  static get styles(): CSSResultArray {
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

declare global {
  interface HTMLElementTagNameMap {
    "ha-config-aiszigbee": ConfigAisZigbee;
  }
}
