import "@polymer/paper-input/paper-textarea";
import "@polymer/paper-spinner/paper-spinner";
import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";

import "../../../resources/ha-style";

class HaPanelDevConsole extends PolymerElement {
  static get template() {
    return html`
      <style>
        .content {
          position: absolute;
          left: 50%;
          top: 50%;
          -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
        }
        a,
        svg.a {
          color: var(--primary-color);
        }
        .icon,
        .text {
          vertical-align: middle;
          display: inline-block;
        }
      </style>
      <template is="dom-if" if="[[localConection]]">
        <iframe src="[[url]]" style="width: 100%; height: 100%;"></iframe>
      </template>
      <template is="dom-if" if="[[!localConection]]">
        <div style="width: 100%; height: 100%;">
          <div class="content">
            <p style="text-align: center;">
              <span class="text"><b>TWOJE POŁĄCZENIE JEST ZDALNE</b></span>
              <span class="icon"
                ><svg
                  class="a"
                  style="width:24px;height:24px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M6,7L6.69,7.06C7.32,4.72 9.46,3 12,3A5.5,5.5 0 0,1 17.5,8.5L17.42,9.45C17.88,9.16 18.42,9 19,9A3,3 0 0,1 22,12A3,3 0 0,1 19,15H6A4,4 0 0,1 2,11A4,4 0 0,1 6,7M6,9A2,2 0 0,0 4,11A2,2 0 0,0 6,13H19A1,1 0 0,0 20,12A1,1 0 0,0 19,11H15.5V8.5A3.5,3.5 0 0,0 12,5A3.5,3.5 0 0,0 8.5,8.5V9H6M22,19L19,22V20H2V18H19V16L22,19"
                  /></svg
              ></span>
              <br />
            </p>
            <svg
              style="width:84px;height:84px;display:block;margin:auto;"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20,19V7H4V19H20M20,3A2,2 0 0,1 22,5V19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19V5C2,3.89 2.9,3 4,3H20M13,17V15H18V17H13M9.58,13L5.57,9H8.4L11.7,12.3C12.09,12.69 12.09,13.33 11.7,13.72L8.42,17H5.59L9.58,13Z"
              />
            </svg>
            <p style="text-align: center;">
              <span class="text"
                ><b>KONSOLA DOSTĘPNA JEST TYLKO LOKALNIE</b></span
              >
              <span class="icon"
                ><svg
                  class="a"
                  style="width:24px;height:24px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M15 13L11 9V12H2V14H11V17M22 12H20V21H4V16H6V19H18V11L12 5L7 10H4L12 2L22 12Z"
                  /></svg
              ></span>
              <br />
              <br />
              Lokalny adres aplikacji w Twojej sieci:
              <a href="http://[[aisLocalIP]]">http://[[aisLocalIP]]</a>
            </p>
          </div>
        </div>
      </template>
    `;
  }

  static get properties() {
    return {
      hass: Object,
      showConfig: Boolean,
      url: String,
      localConection: Boolean,
      aisLocalIP: {
        type: String,
        computed: "_computeAisLocalIP(hass)",
      },
    };
  }

  ready() {
    super.ready();
    this.url =
      window.location.protocol + "//" + window.location.hostname + ":8888";
    this.localConection = true;
    if (window.location.hostname.startsWith("dom-")) {
      this.localConection = false;
    }
  }

  _computeAisLocalIP(hass) {
    return hass.states["sensor.internal_ip_address"].state;
  }
}

customElements.define("developer-tools-console", HaPanelDevConsole);
