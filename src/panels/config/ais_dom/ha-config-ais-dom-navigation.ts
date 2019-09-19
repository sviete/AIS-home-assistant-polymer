import "@polymer/iron-icon/iron-icon";
import "@polymer/paper-item/paper-item-body";
import "@polymer/paper-item/paper-item";

import "../../../components/ha-card";
import "../../../components/ha-icon-next";
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

const PAGES: Array<{
  page: string;
  caption: string;
  description: string;
}> = [
  {
    page: "ais_dom_config_update",
    caption: "Oprogramowanie bramki",
    description:
      "Aktualizacja systemu i synchronizacja bramki z Portalem Integratora",
  },
  {
    page: "ais_dom_config_wifi",
    caption: "Sieć WiFi",
    description: "Ustawienia połączenia z siecią WiFi",
  },
  {
    page: "ais_dom_config_display",
    caption: "Ekran",
    description: "Ustawienia ekranu",
  },
  {
    page: "ais_dom_config_tts",
    caption: "Głos asystenta",
    description: "Ustawienia głosu asystenta",
  },
  {
    page: "ais_dom_config_night",
    caption: "Tryb nocny",
    description: "Ustawienie godzin, w których asystent ma działać ciszej",
  },
  {
    page: "ais_dom_config_remote",
    caption: "Zdalny dostęp",
    description: "Konfiguracja zdalnego dostępu do bramki",
  },
  {
    page: "ais_dom_config_power",
    caption: "Zatrzymanie bramki",
    description: "Restart lub wyłączenie bramki",
  },
];

@customElement("ha-config-ais-dom-navigation")
class HaConfigNavigation extends LitElement {
  @property() public hass!: HomeAssistant;
  @property() public showAdvanced!: boolean;

  protected render(): TemplateResult | void {
    return html`
      <ha-card>
        ${PAGES.map(
          ({ page, caption, description }) =>
            html`
              <a href=${`/config/${page}`}>
                <paper-item>
                  <paper-item-body two-line=""
                    >${`${caption}`}
                    <div secondary>${`${description}`}</div>
                  </paper-item-body>
                  <ha-icon-next></ha-icon-next>
                </paper-item>
              </a>
            `
        )}
      </ha-card>
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
    "ha-config-ais-dom-navigation": HaConfigNavigation;
  }
}
