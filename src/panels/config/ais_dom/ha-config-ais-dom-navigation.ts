import "@polymer/paper-item/paper-item-body";
import "@polymer/paper-item/paper-item";

import "../../../components/ha-card";
import "../../../components/ha-icon-next";
import { PageNavigation } from "../../../layouts/hass-tabs-subpage";
import "../../../components/ha-icon";
import {
  LitElement,
  html,
  TemplateResult,
  property,
  customElement,
  CSSResult,
  css,
} from "lit-element";
import { HomeAssistant } from "../../../types";
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
} from "@mdi/js";

const aisGateConfigSections: { [name: string]: PageNavigation[] } = {
  integrations: [
    {
      component: "ais_dom_config_update",
      path: "/config/ais_dom_config_update",
      translationKey: "ui.panel.config.ais_dom_config_update.caption",
      iconPath: mdiCloudSyncOutline,
      core: true,
    },
    {
      component: "ais_dom_config_wifi",
      path: "/config/ais_dom_config_wifi",
      translationKey: "ui.panel.config.ais_dom_config_wifi.caption",
      iconPath: mdiWifi,
      core: true,
    },
    {
      component: "ais_dom_config_display",
      path: "/config/ais_dom_config_display",
      translationKey: "ui.panel.config.ais_dom_config_display.caption",
      iconPath: mdiMonitorEdit,
      core: true,
    },
    {
      component: "ais_dom_config_tts",
      path: "/config/ais_dom_config_tts",
      translationKey: "ui.panel.config.ais_dom_config_tts.caption",
      iconPath: mdiAccountTieVoice,
      core: true,
    },
    {
      component: "ais_dom_config_night",
      path: "/config/ais_dom_config_night",
      translationKey: "ui.panel.config.ais_dom_config_night.caption",
      iconPath: mdiWeatherNight,
      core: true,
    },
    {
      component: "ais_dom_config_remote",
      path: "/config/ais_dom_config_remote",
      translationKey: "ui.panel.config.ais_dom_config_remote.caption",
      iconPath: mdiWeb,
      core: true,
    },
    {
      component: "ais_dom_config_logs",
      path: "/config/ais_dom_config_logs",
      translationKey: "ui.panel.config.ais_dom_config_logs.caption",
      iconPath: mdiDatabaseSettings,
      core: true,
    },
    {
      component: "ais_dom_config_power",
      path: "/config/ais_dom_config_power",
      translationKey: "ui.panel.config.ais_dom_config_power.caption",
      iconPath: mdiRestart,
      core: true,
    },
  ],
};

@customElement("ha-config-ais-dom-navigation")
class HaConfigAisDomNavigation extends LitElement {
  @property() public hass!: HomeAssistant;
  @property() public showAdvanced!: boolean;

  protected render(): TemplateResult | void {
    return html`
      ${Object.values(aisGateConfigSections).map(
        (section) => html`
          <ha-card>
            <ha-config-navigation
              .hass=${this.hass}
              .showAdvanced=${this.showAdvanced}
              .pages=${section}
            ></ha-config-navigation>
          </ha-card>
        `
      )}
    `;
  }

  static get styles(): CSSResult {
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
