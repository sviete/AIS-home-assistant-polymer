import "@material/mwc-list/mwc-list-item";
import "../../components/ha-button-menu";
import {
  css,
  CSSResultArray,
  html,
  LitElement,
  PropertyValues,
  TemplateResult,
} from "lit";
import { customElement, property } from "lit/decorators";
import { mdiDotsVertical, mdiHelpCircle } from "@mdi/js";
import { loadTokens } from "../../common/auth/token_storage";
import "../../layouts/hass-loading-screen";
import "../../layouts/hass-subpage";
import "../../components/ha-circular-progress";
import { haStyle } from "../../resources/styles";
import { HomeAssistant, Route } from "../../types";
import "../../components/ha-icon-button";
import { showAlertDialog } from "../../dialogs/generic/show-dialog-box";
import { fireEvent } from "../../common/dom/fire_event";

@customElement("ha-config-aiszwave")
class ConfigAisZwave extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() public route!: Route;

  @property({ type: Boolean })
  public narrow = false;

  @property() private _access_token = "";

  protected render(): TemplateResult {
    const zwave2mqtt =
      this.hass.states["sensor.status_serwisu_zwavejs2mqtt"].state;
    if (zwave2mqtt === "True") {
      const tokens = loadTokens();
      this._access_token = tokens?.access_token || "";
      const iframe = html` <iframe
        src="/api/zwave2mqtt/${this._access_token}/"
      ></iframe>`;
      return html` <hass-subpage header="ZWaveJs2Mqtt" .narrow=${this.narrow}>
        <mwc-icon-button slot="toolbar-icon" @click=${this._showHelp}>
          <ha-svg-icon .path=${mdiHelpCircle}></ha-svg-icon>
        </mwc-icon-button>
        <ha-button-menu corner="BOTTOM_START" slot="toolbar-icon">
          <mwc-icon-button slot="trigger" alt="menu">
            <ha-svg-icon .path=${mdiDotsVertical}></ha-svg-icon>
          </mwc-icon-button>
          <mwc-list-item @click=${this._restartZwaveService}>
            Restart zwave sevice
          </mwc-list-item>
        </ha-button-menu>
        ${iframe}
      </hass-subpage>`;
    }

    return html`<hass-subpage header="ZWaveJs2Mqtt" .narrow=${this.narrow}>
      <mwc-icon-button slot="toolbar-icon" @click=${this._showHelp}>
        <ha-svg-icon .path=${mdiHelpCircle}></ha-svg-icon>
      </mwc-icon-button>
      <ha-button-menu corner="BOTTOM_START" slot="toolbar-icon">
        <mwc-icon-button slot="trigger" alt="menu">
          <ha-svg-icon .path=${mdiDotsVertical}></ha-svg-icon>
        </mwc-icon-button>
        <mwc-list-item @click=${this._restartZwaveService}>
          Restart zwave sevice
        </mwc-list-item>
      </ha-button-menu>
      <div
        style="width: 100%; height: 100%; display: flex; align-items: center;"
      >
        <div style="width: 100%;">
          <p style="text-align: center;">
            <span class="text"><b>BRAK POŁĄCZENIA Z ZWAVEJS2MQTT</b></span>
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
              d="M16.3,10.58C13.14,10.58 10.6,13.13 10.6,16.28C10.6,19.43 13.15,22 16.3,22C19.45,22 22,19.43 22,16.28C22,13.13 19.45,10.58 16.3,10.58M18,19.08H13.19L15.81,15H13.31L14.4,13.23H19.18L16.63,17.28H19.18L18,19.08M16.3,3.93V2C8.41,2 2,8.42 2,16.31H3.92C3.94,9.46 9.5,3.93 16.3,3.93M16.3,7.74V5.82C10.5,5.82 5.81,10.53 5.81,16.31H7.73C7.75,11.58 11.59,7.74 16.3,7.74"
            />
          </svg>
          <p style="text-align: center;">
            <span class="text"
              >🌊 nie ma 🌊 nie ma 🌊 nie ma 🌊 nie ma 🌊 nie ma 🌊🌊🌊...</span
            >
            <br />
            <span class="text"
              ><b>czekam na połączenie, to może potrwać kilka minut...</b></span
            >
            <span
              .onclick="${this.showZwaveStatus}"
              style="text-decoration: underline; cursor: pointer;"
            >
              <br /><a> status usługi </a>
            </span>

            <br /><br />
            <ha-circular-progress active></ha-circular-progress>
            <br />
            <br />
            W razie problemów sprawdz logi, wpisując w
            <a href="/developer-tools/console">konsoli</a> komendę:
            <b>pm2 logs</b><br />
            Szczegóły w dokumentacji:
            <a
              href="https://www.ai-speaker.com/docs/ais_app_integration_zwave"
              target="_blank"
              >Integracja ZwaveJs2MQTT</a
            >
          </p>
        </div>
      </div>
    </hass-subpage>`;
  }

  protected updated(changedProps: PropertyValues) {
    super.updated(changedProps);
  }

  private showZwaveStatus() {
    fireEvent(this, "hass-more-info", {
      entityId: "sensor.status_serwisu_zwavejs2mqtt",
    });
  }

  private _showHelp() {
    showAlertDialog(this, {
      title: "Zwave",
      text: html`
        Na bramkach DEV uruchomienie integracji Zwave wymaga wykonania ręczej
        instalacji.
        <p>
          <a
            href="https://ai-speaker.com/docs/ais_app_integration_zwave"
            target="_blank"
            rel="noreferrer"
          >
            Dowiedz się więcej o integracji zwave
          </a>
        </p>
      `,
    });
  }

  private async _restartZwaveService() {
    this.hass.callService("ais_shell_command", "restart_pm2_service", {
      service: "zwave",
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
    "ha-config-aiszwave": ConfigAisZwave;
  }
}
