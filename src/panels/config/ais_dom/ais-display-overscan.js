import "@material/mwc-button";
import "@polymer/paper-item/paper-item-body";
import "@polymer/paper-toggle-button/paper-toggle-button";
import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";

import "../../../components/ha-card";
import "../../../components/buttons/ha-call-api-button";
import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";

/*
 * @appliesMixin EventsMixin
 * @appliesMixin LocalizeMixin
 */
class DisplayOverscan extends PolymerElement {
  static get template() {
    return html`
      <style include="iron-flex ha-style">
        [slot="introduction"] {
          margin: -1em 0;
        }
        [slot="introduction"] a {
          color: var(--primary-color);
        }
        .content {
          padding-bottom: 24px;
          direction: ltr;
        }
        .account-row {
          display: flex;
          padding: 0 16px;
        }
        mwc-button {
          align-self: center;
        }
        .soon {
          font-style: italic;
          margin-top: 24px;
          text-align: center;
        }
        .nowrap {
          white-space: nowrap;
        }
        .wrap {
          white-space: normal;
        }
        .status {
          text-transform: capitalize;
          padding: 16px;
        }
        a {
          color: var(--primary-color);
        }
      </style>
      <ha-card header="Ustawienia ekranu">
        <div class="card-content">
          Jeżeli obraz na monitorze lub telewizorze podłączonym do bramki za
          pomocą złącza HDMI jest ucięty lub przesunięty to w tym miejscu możesz
          go dostosować
          <p>
            TODO
          </p>
          <div>
            <svg style="width:80px;height:80px" viewBox="0 0 24 24">
              <path
                fill="#fff"
                d="M9,6H5V10H7V8H9M19,10H17V12H15V14H19M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2"
              />
            </svg>
          </div>
        </div>
      </ha-card>
    `;
  }

  static get properties() {
    return {
      hass: Object,
      isWide: Boolean,
    };
  }

  ready() {
    super.ready();
    // this._fetchSubscriptionInfo();
  }
}

customElements.define("ais-display-overscan", DisplayOverscan);
