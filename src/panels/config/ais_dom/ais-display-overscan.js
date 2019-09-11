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
        .buttons {
          position: relative;
          width: 200px;
          height: 200px;
        }

        .button {
          position: absolute;
          width: 50px;
          height: 50px;
        }

        .arrow {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .arrow-up {
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
          border-bottom: 16px solid black;
        }

        .arrow-right {
          border-top: 12px solid transparent;
          border-bottom: 12px solid transparent;
          border-left: 16px solid black;
        }

        .arrow-left {
          border-top: 12px solid transparent;
          border-bottom: 12px solid transparent;
          border-right: 16px solid black;
        }

        .arrow-down {
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
          border-top: 16px solid black;
        }

        .down {
          bottom: 0;
          left: 75px;
        }

        .left {
          top: 75px;
          left: 0;
        }

        .right {
          top: 75px;
          right: 0;
        }

        .up {
          top: 0;
          left: 75px;
        }
      </style>
      <ha-card header="Ustawienia ekranu">
        <div class="card-content">
          <div class="card-content" style="display: inline-block;">
            <div style="text-align: center;">
              <svg style="width:60px;height:60px" viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  d="M9,6H5V10H7V8H9M19,10H17V12H15V14H19M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2"
                />
              </svg>
            </div>
            <div style="text-align: left; margin:8px;">
              Jeżeli obraz na monitorze lub telewizorze podłączonym do bramki za
              pomocą złącza HDMI jest ucięty lub przesunięty, to w tym miejscu
              możesz dostosować obraz do rozmiaru ekranu.
            </div>
          </div>
          <div class="card-content" style="text-align: center;">
            <div style="display: inline-block;">
              <p>Powiększanie</p>
              <div
                class="buttons"
                style="margin: 0 auto; display: table; border:solid 1px;"
              >
                <button
                  class="button up"
                  data-value="top"
                  on-click="wmOverscan"
                >
                  <span class="arrow-up arrow"></span>
                </button>
                <button
                  class="button down"
                  data-value="bottom"
                  on-click="wmOverscan"
                >
                  <span class="arrow-down arrow"></span>
                </button>
                <button
                  class="button right"
                  data-value="right"
                  on-click="wmOverscan"
                >
                  <span class="arrow-right arrow"></span>
                </button>
                <button
                  class="button left"
                  data-value="left"
                  on-click="wmOverscan"
                >
                  <span class="arrow-left arrow"></span>
                </button>
              </div>
            </div>
            <div
              style="text-align: center; display: inline-block; margin: 30px;"
            >
              <p>Zmniejszanie</p>
              <div class="buttons" style="margin: 0 auto; display: table;">
                <button
                  class="button up"
                  data-value="-top"
                  on-click="wmOverscan"
                >
                  <span class="arrow-down arrow"></span>
                </button>
                <div
                  style="margin: 0 auto; height: 98px; width:98px; margin-top: 50px; margin-left: 50px; display: flex; border:solid 1px;"
                ></div>
                <button
                  class="button down"
                  data-value="-bottom"
                  on-click="wmOverscan"
                >
                  <span class="arrow-up arrow"></span>
                </button>
                <button
                  class="button right"
                  data-value="-right"
                  on-click="wmOverscan"
                >
                  <span class="arrow-left arrow"></span>
                </button>
                <button
                  class="button left"
                  data-value="-left"
                  on-click="wmOverscan"
                >
                  <span class="arrow-right arrow"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="card-actions" style="margin-top: 30px;">
            <div>
              <paper-icon-button
                class="user-button"
                icon="mdi:restore"
                on-click="wmRestoreSettings"
              ></paper-icon-button
              ><mwc-button on-click="wmOverscan" data-value="reset"
                >Reset ekranu do ustawień domyślnych</mwc-button
              >
            </div>
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
    // TODO
  }

  wmOverscan(event) {
    this.hass.callService("ais_shell_command", "change_wm_overscan", {
      value: event.currentTarget.getAttribute("data-value"),
    });
  }
}

customElements.define("ais-display-overscan", DisplayOverscan);
