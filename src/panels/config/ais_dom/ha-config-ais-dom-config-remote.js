import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "@polymer/paper-icon-button/paper-icon-button";
import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";

import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";

import "./ha-config-ais-dom-navigation";
import { fireEvent } from "../../../common/dom/fire_event";
import "./ais-webhooks";
import "../../../components/ha-switch";

/*
 *
 */
class HaConfigAisDomControl extends PolymerElement {
  static get template() {
    return html`
      <style include="iron-flex ha-style">
        .content {
          padding-bottom: 32px;
        }
        a {
          color: var(--primary-color);
        }
        .border {
          margin: 32px auto 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
          max-width: 1040px;
        }
        .narrow .border {
          max-width: 640px;
        }
        .center-container {
          @apply --layout-vertical;
          @apply --layout-center-center;
          height: 70px;
        }
        ha-card > div#ha-switch-id {
          margin: -4px 0;
          position: absolute;
          right: 8px;
          top: 32px;
        }
        .card-actions a {
          text-decoration: none;
        }
      </style>

      <hass-subpage header="Konfiguracja bramki AIS dom">
        <div class$="[[computeClasses(isWide)]]">
          <ha-config-section is-wide="[[isWide]]">
            <span slot="header">Zdalny dostęp</span>
            <span slot="introduction"
              >W tej sekcji możesz skonfigurować zdalny dostęp do bramki</span
            >
            <ha-card header="Szyfrowany tunel">
              <div id="ha-switch-id">
                <ha-switch
                  checked="{{remoteConnected}}"
                  on-change="changeRemote"
                ></ha-switch>
              </div>
              <div class="card-content">
                Tunel zapewnia bezpieczne zdalne połączenie z Twoim urządzeniem
                kiedy jesteś z dala od domu. Twoja bramka dostępna
                [[remoteInfo]] z Internetu pod adresem
                <a href="[[remoteDomain]]" target="_blank">[[remoteDomain]]</a>.
                <div class="center-container" style="height: 320px;">
                  <div
                    style="text-align: center; margin-top: 10px;"
                    on-click="showBarcodeInfo"
                  >
                    <img src="/local/dom_access_code.png" />
                  </div>
                  Zeskanuj kod QR za pomocą aplikacji na telefonie.
                </div>
              </div>
              <div class="card-actions">
                <a
                  href="https://sviete.github.io/AIS-docs/docs/en/ais_bramka_remote_www_index.html"
                  target="_blank"
                >
                  <mwc-button>Dowiedz się jak to działa</mwc-button>
                </a>
              </div>
            </ha-card>

            <ais-webhooks hass="[[hass]]"></ais-webhooks>
          </ha-config-section>
        </div>
      </hass-subpage>
    `;
  }

  static get properties() {
    return {
      hass: Object,
      isWide: Boolean,
      showAdvanced: Boolean,
      remoteInfo: {
        type: String,
        value: "jest",
      },

      remoteDomain: {
        type: String,
        computed: "_computeRemoteDomain(hass)",
      },

      remoteConnected: {
        type: Boolean,
        computed: "_computeRremoteConnected(hass)",
      },
    };
  }

  _computeRemoteDomain(hass) {
    return (
      "https://" +
      hass.states["sensor.ais_secure_android_id_dom"].state +
      ".paczka.pro"
    );
  }

  _computeRremoteConnected(hass) {
    if (hass.states["input_boolean.ais_remote_access"].state === "on") {
      this.remoteInfo = "jest";
      return true;
    }
    this.remoteInfo = "będzie";
    return false;
  }

  changeRemote() {
    this.hass.callService("input_boolean", "toggle", {
      entity_id: "input_boolean.ais_remote_access",
    });
  }

  showBarcodeInfo() {
    fireEvent(this, "hass-more-info", { entityId: "camera.remote_access" });
  }
}

customElements.define("ha-config-ais-dom-config-remote", HaConfigAisDomControl);
