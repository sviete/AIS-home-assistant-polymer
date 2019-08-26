import "@material/mwc-button";
import "@polymer/paper-input/paper-input";
import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";

import "../../components/ha-card";
import "../../resources/ha-style";
import "../states/ha-panel-states";
import "../config/ha-config-section";

class HaPanelAishelp extends PolymerElement {
  static get template() {
    return html`
      <style include="iron-flex ha-style">
        .center-container {
          @apply --layout-vertical;
          @apply --layout-center-center;
          height: 70px;
        }
        a {
          color: var(--primary-color);
        }
        ha-card > paper-toggle-button {
          margin: -4px 0;
          position: absolute;
          right: 8px;
          top: 32px;
        }
        .card-actions {
          display: flex;
        }
        .card-actions a {
          text-decoration: none;
        }
        .spacer {
          flex-grow: 1;
        }
        .content {
          background-color: var(--primary-background-color);
          width: 100%;
          min-height: 100%;
        }
      </style>
      <app-toolbar>
        <ha-menu-button hass="[[hass]]" narrow="[[narrow]]"></ha-menu-button>
        <div main-title>[[panel.title]]</div>
      </app-toolbar>
      <div class="content">
      <has-subpage>
        <ha-config-section class="content" is-wide="[[isWide]]">
          <span slot="header">Przydatne Linki</span>
          <span slot="introduction"
            >W tej sekcji znajdziesz przydatne linki dotyczące twojej bramki</span
          >
          <ha-card header="Aplikacja w przeglądarce">
            <div class="card-content">
              <svg style="width:36px;height:36px" viewBox="0 0 24 24">
                <path fill="#ffffff" d="M3,4H21A1,1 0 0,1 22,5V16A1,1 0 0,1 21,17H22L24,20V21H0V20L2,17H3A1,1 0 0,1 2,16V5A1,1 0 0,1 3,4M4,6V15H20V6H4Z" />
              </svg>
              Aplikacja dostępna jest w sieci lokalnej pod adresem:
              <a
                href="http://[[ sensor.internal_ip_address.state ]]:8180"
                target="_blank"
                >http://[[ sensor.internal_ip_address.state ]]:8180</a
              >
            </div>
          </ha-card>
          <ha-card header="Serwer FTP">
            <div class="card-content">
              <svg style="width:36px;height:36px" viewBox="0 0 24 24">
                <path fill="#ffffff" d="M13,19H14A1,1 0 0,1 15,20H22V22H15A1,1 0 0,1 14,23H10A1,1 0 0,1 9,22H2V20H9A1,1 0 0,1 10,19H11V17H4A1,1 0 0,1 3,16V12A1,1 0 0,1 4,11H20A1,1 0 0,1 21,12V16A1,1 0 0,1 20,17H13V19M4,3H20A1,1 0 0,1 21,4V8A1,1 0 0,1 20,9H4A1,1 0 0,1 3,8V4A1,1 0 0,1 4,3M9,7H10V5H9V7M9,15H10V13H9V15M5,5V7H7V5H5M5,13V15H7V13H5Z" />
              </svg>
              Na urządzeniu działa serwer ftp dostępny pod adresem:
              <a
                href="ftp://[[ sensor.internal_ip_address.state ]]:1024"
                target="_blank"
                >ftp://[[ sensor.internal_ip_address.state ]]:1024</a
              >
            </div>
          </ha-card>
          <ha-card header="Zdalne logowanie SSH">
            <div class="card-content">
              <svg style="width:36px;height:36px" viewBox="0 0 24 24">
                <path fill="#ffffff" d="M20,19V7H4V19H20M20,3A2,2 0 0,1 22,5V19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19V5C2,3.89 2.9,3 4,3H20M13,17V15H18V17H13M9.58,13L5.57,9H8.4L11.7,12.3C12.09,12.69 12.09,13.33 11.7,13.72L8.42,17H5.59L9.58,13Z" />
              </svg>
              pobierz
              <a href="/local/id_rsa_ais?v=1" target="_blank"
                >autoryzowany klucz ssh</a
              > połącz się ze swojej konsoli, poleceniem: <br>ssh [[ sensor.internal_ip_address.state ]] -p 8022 -i <ścieżka do klucza ssh>
            </div>
          </ha-card>
          <ha-card header="Dostęp z Internetu">
            <div class="card-content">
              <svg style="width:36px;height:36px" viewBox="0 0 24 24">
                <path fill="#ffffff" d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
              </svg>
              Gdy włączysz dostęp z Internetu** to aplikacja będzie osiągalna pod
              adresem
              <a
                href="https://[[ sensor.ais_secure_android_id_dom.state ]].paczka.pro"
                target="_blank"
                >https://[[ sensor.ais_secure_android_id_dom.state
                ]].paczka.pro</a
              >
            </div>
          </ha-card>
          <ha-card header="Konfiguracja treści i usług">
            <div class="card-content">
            <svg style="width:36px;height:36px" viewBox="0 0 24 24">
              <path fill="#ffffff" d="M2,5V18H11V16H4V7H17V11H19V5H2M9,9V14L12.5,11.5L9,9M21.04,11.67L16.09,16.62L13.96,14.5L12.55,15.91L16.09,19.45L22.45,13.09L21.04,11.67Z" />
            </svg>
              W tym miejscu można dodawać własne stacje radiowe, podcasty oraz
              konfigurować inne składowe systemu
              <a href="https://ai-speaker.com/ords/f?p=100" target="_blank"
                >Przejdz do konfiguracji</a
              >
            </div>
          </ha-card>
          <ha-card header="Logi aktualizacji">
            <div class="card-content">
              <svg style="width:36px;height:36px" viewBox="0 0 24 24">
                <path fill="#ffffff" d="M5,3C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3H5M5,5H19V19H5V5M7,7V9H17V7H7M7,11V13H17V11H7M7,15V17H14V15H7Z" />
              </svg>
              Pobierz
              <a href="/local/upgrade_log.txt" target="_blank"
                >logi aktualizacji</a
              >
            </div>
          </ha-card>
        </ha-config-section>
      </hss-subpage>
      </div>
    `;
  }

  static get properties() {
    return {
      hass: Object,
      narrow: Boolean,
      panel: Object,
    };
  }
}

customElements.define("ha-panel-aishelp", HaPanelAishelp);
