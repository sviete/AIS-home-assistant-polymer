import "@polymer/paper-item/paper-item-body";
import "@polymer/paper-item/paper-item";

import "../../../components/ha-card";
import "../../../components/ha-icon-next";
import { PageNavigation } from "../../../layouts/hass-tabs-subpage";
import "../../../components/ha-icon";
import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import "../dashboard/ha-config-navigation";
import {
  mdiCloudSyncOutline,
  mdiWifi,
  mdiMonitorEdit,
  mdiAccountTieVoice,
  mdiWeatherNight,
  mdiWeb,
  mdiDatabaseSettings,
  mdiRestart,
  mdiUsb,
} from "@mdi/js";
import { HomeAssistant } from "../../../types";

const aisGateConfigSections: { [name: string]: PageNavigation[] } = {
  integrations: [
    {
      component: "ais_dom_config_update",
      path: "/config/ais_dom_config_update",
      translationKey: "ais_dom_config_update",
      iconPath: mdiCloudSyncOutline,
      iconColor: "#43a047",
      core: true,
    },
    {
      component: "ais_dom_config_wifi",
      path: "/config/ais_dom_config_wifi",
      translationKey: "ais_dom_config_wifi",
      iconPath: mdiWifi,
      iconColor: "#e48629",
      core: true,
    },
    {
      component: "ais_dom_config_display",
      path: "/config/ais_dom_config_display",
      translationKey: "ais_dom_config_display",
      iconPath: mdiMonitorEdit,
      iconColor: "#00bcd4",
      core: true,
    },
    {
      component: "ais_dom_config_tts",
      path: "/config/ais_dom_config_tts",
      translationKey: "ais_dom_config_tts",
      iconPath: mdiAccountTieVoice,
      iconColor: "#518c43",
      core: true,
    },
    {
      component: "ais_dom_config_night",
      path: "/config/ais_dom_config_night",
      translationKey: "ais_dom_config_night",
      iconPath: mdiWeatherNight,
      iconColor: "#0D47A1",
      core: true,
    },
    {
      component: "ais_dom_config_remote",
      path: "/config/ais_dom_config_remote",
      translationKey: "ais_dom_config_remote",
      iconPath: mdiWeb,
      iconColor: "#4d2ea4",
      core: true,
    },
    {
      component: "ais_dom_config_logs",
      path: "/config/ais_dom_config_logs",
      translationKey: "ais_dom_config_logs",
      iconPath: mdiDatabaseSettings,
      iconColor: "#b1345c",
      core: true,
    },
    {
      component: "ais_dom_config_usb",
      path: "/config/ais_dom_config_usb",
      translationKey: "ais_dom_config_usb",
      iconPath: mdiUsb,
      iconColor: "#616161",
      core: true,
    },
    {
      component: "ais_dom_config_power",
      path: "/config/ais_dom_config_power",
      translationKey: "ais_dom_config_power",
      iconPath: mdiRestart,
      iconColor: "#ff5722",
      core: true,
    },
  ],
};

@customElement("ha-config-ais-dom-navigation")
class HaConfigAisDomNavigation extends LitElement {
  @property() public hass!: HomeAssistant;

  @property({ type: Boolean, reflect: true })
  public narrow!: boolean;

  @property() public showAdvanced!: boolean;

  protected render(): TemplateResult | void {
    return html`
      <ha-card>
        ${Object.values(aisGateConfigSections).map(
          (section) => html`
          <ha-config-navigation
                    .hass=${this.hass}
                    .narrow=${this.narrow}
                    .showAdvanced=${this.showAdvanced}
                    .pages=${section}
          ></ha-config-navigation>
      </ha-card>
        `
        )}
      </ha-card>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      a {
        text-decoration: none;
        color: var(--primary-text-color);
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-config-ais-dom-navigation": HaConfigAisDomNavigation;
  }
}
