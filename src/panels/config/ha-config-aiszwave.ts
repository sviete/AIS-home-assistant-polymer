import "@material/mwc-list/mwc-list-item";
import "../../components/ha-button-menu";
import {css, CSSResultArray, html, LitElement, PropertyValues, TemplateResult} from "lit";
import {customElement, property} from 'lit/decorators';
import { loadTokens } from "../../common/auth/token_storage";
import "../../layouts/hass-loading-screen";
import "../../layouts/hass-subpage";
import "../../components/ha-circular-progress";
import { haStyle } from "../../resources/styles";
import { HomeAssistant, Route } from "../../types";
import "../../components/ha-icon-button";
import { mdiDotsVertical, mdiHelpCircle } from "@mdi/js";
import { showAlertDialog } from "../../dialogs/generic/show-dialog-box";

@customElement("ha-config-aiszwave")
class ConfigAisZwave extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() public route!: Route;

  @property({ type: Boolean })
  public narrow = false;

  @property() private _access_token = "";

  protected render(): TemplateResult {
    const tokens = loadTokens();
    // this._access_token = tokens?.access_token;
    // const iframe = html` <iframe
    //   src="/api/zwave2mqtt/${this._access_token}/"
    // ></iframe>`;
    return html` <hass-subpage
      header="ZWaveJs2Mqtt (alfa)"
      .narrow=${this.narrow}
    >
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
      <iframe
        src="http://${this.hass.states["sensor.internal_ip_address"]
          .state}:8091/"
      ></iframe>
    </hass-subpage>`;
  }

  protected updated(changedProps: PropertyValues) {
    super.updated(changedProps);
  }

  private _showHelp() {
    showAlertDialog(this, {
      title: "Zwave",
      text: html`
        Integracja w przygotowaniu. Obecnie uruchomienie integracji Zwave wymaga
        wykonania ręczej instalacji.
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
