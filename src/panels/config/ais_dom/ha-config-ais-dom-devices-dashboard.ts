import "../../../layouts/hass-subpage";
import "./ais_dom_devices/ha-ais-dom-devices-data-table";

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
import { DeviceRegistryEntry } from "../../../data/device_registry";
import { EntityRegistryEntry } from "../../../data/entity_registry";
import { ConfigEntry } from "../../../data/config_entries";
import { AreaRegistryEntry } from "../../../data/area_registry";
import { showConfigFlowDialog } from "../../../dialogs/config-flow/show-dialog-config-flow";

@customElement("ha-config-ais-dom-devices-dashboard")
export class HaConfigDeviceDashboard extends LitElement {
  static get styles(): CSSResult {
    return css`
      .content {
        padding: 4px;
      }
      ha-ais-dom-devices-data-table {
        width: 100%;
      }
    `;
  }
  @property() public hass!: HomeAssistant;
  @property() public narrow = false;
  @property() public devices!: DeviceRegistryEntry[];
  @property() public entries!: ConfigEntry[];
  @property() public entities!: EntityRegistryEntry[];
  @property() public areas!: AreaRegistryEntry[];
  @property() public domain!: string;

  protected render(): TemplateResult {
    return html`
      <hass-subpage header="Urządzenia AIS dom">
        <paper-icon-button
          slot="toolbar-icon"
          icon="mdi:plus-box"
          @click=${this._addDevice}
        ></paper-icon-button>
        <div class="content">
          <ha-ais-dom-devices-data-table
            .hass=${this.hass}
            .narrow=${this.narrow}
            .devices=${this.devices}
            .entries=${this.entries}
            .entities=${this.entities}
            .areas=${this.areas}
            .domain=${this.domain}
          ></ha-ais-dom-devices-data-table>
        </div>
      </hass-subpage>
    `;
  }

  private _continueFlow(flowId) {
    showConfigFlowDialog(this, {
      continueFlowId: flowId,
      dialogClosedCallback: () => {
        // eslint-disable-next-line no-console
        console.log("OK");
      },
    });
  }

  private _addDevice() {
    this.hass
      .callApi("POST", "config/config_entries/flow", {
        handler: "ais_dom_device",
      })
      .then((result) => {
        // eslint-disable-next-line no-console
        console.log(result);
        this._continueFlow(result.flow_id);
      });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-config-ais-dom-devices-dashboard": HaConfigDeviceDashboard;
  }
}
