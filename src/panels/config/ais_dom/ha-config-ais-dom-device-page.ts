import {
  property,
  LitElement,
  html,
  customElement,
  css,
  CSSResult,
} from "lit-element";

import memoizeOne from "memoize-one";

import "../../../layouts/hass-subpage";
import "../../../layouts/hass-error-screen";
import "../ha-config-section";
import { navigate } from "../../../../src/common/navigate";
import "../devices/device-detail/ha-device-info-card";
import "../devices/device-detail/ha-device-triggers-card";
import "../devices/device-detail/ha-device-conditions-card";
import "../devices/device-detail/ha-device-actions-card";
import "./ais_dom_devices/ha-ais-dom-device-entities-card";
import "./ais_dom_devices/ha-ais-dom-rf433-config-card";
import "./ais_dom_devices/ha-ais-dom-iframe";
import { HomeAssistant } from "../../../types";
import { ConfigEntry } from "../../../data/config_entries";
import {
  EntityRegistryEntry,
  updateEntityRegistryEntry,
} from "../../../data/entity_registry";
import {
  DeviceRegistryEntry,
  updateDeviceRegistryEntry,
} from "../../../data/device_registry";
import { AreaRegistryEntry } from "../../../data/area_registry";
import {
  loadDeviceRegistryDetailDialog,
  showDeviceRegistryDetailDialog,
} from "../../../dialogs/device-registry-detail/show-dialog-device-registry-detail";
import { showConfirmationDialog } from "../../../dialogs/generic/show-dialog-box";

import {
  DeviceTrigger,
  DeviceAction,
  DeviceCondition,
  fetchDeviceTriggers,
  fetchDeviceConditions,
  fetchDeviceActions,
} from "../../../data/device_automation";
import { compare } from "../../../common/string/compare";
import { computeStateName } from "../../../common/entity/compute_state_name";
import { createValidEntityId } from "../../../common/entity/valid_entity_id";

export interface EntityRegistryStateEntry extends EntityRegistryEntry {
  stateName?: string;
}

@customElement("ha-config-ais-dom-device-page")
export class HaConfigDevicePage extends LitElement {
  @property() public hass!: HomeAssistant;
  @property() public devices!: DeviceRegistryEntry[];
  @property() public entries!: ConfigEntry[];
  @property() public entities!: EntityRegistryEntry[];
  @property() public areas!: AreaRegistryEntry[];
  @property() public deviceId!: string;
  @property() public narrow!: boolean;
  @property() public showAdvanced!: boolean;
  @property() private _triggers: DeviceTrigger[] = [];
  @property() private _conditions: DeviceCondition[] = [];
  @property() private _actions: DeviceAction[] = [];

  private _device = memoizeOne(
    (
      deviceId: string,
      devices: DeviceRegistryEntry[]
    ): DeviceRegistryEntry | undefined =>
      devices ? devices.find((device) => device.id === deviceId) : undefined
  );

  private _integrations = memoizeOne(
    (device: DeviceRegistryEntry, entries: ConfigEntry[]): string[] =>
      entries
        .filter((entry) => device.config_entries.includes(entry.entry_id))
        .map((entry) => entry.domain)
  );

  private _entities = memoizeOne(
    (
      deviceId: string,
      entities: EntityRegistryEntry[]
    ): EntityRegistryStateEntry[] =>
      entities
        .filter((entity) => entity.device_id === deviceId)
        .map((entity) => {
          return { ...entity, stateName: this._computeEntityName(entity) };
        })
        .sort((ent1, ent2) =>
          compare(
            ent1.stateName || `zzz${ent1.entity_id}`,
            ent2.stateName || `zzz${ent2.entity_id}`
          )
        )
  );

  protected firstUpdated(changedProps) {
    super.firstUpdated(changedProps);
    loadDeviceRegistryDetailDialog();
  }

  protected updated(changedProps): void {
    super.updated(changedProps);

    if (changedProps.has("deviceId")) {
      if (this.deviceId) {
        fetchDeviceTriggers(this.hass, this.deviceId).then(
          (triggers) => (this._triggers = triggers)
        );
        fetchDeviceConditions(this.hass, this.deviceId).then(
          (conditions) => (this._conditions = conditions)
        );
        fetchDeviceActions(this.hass, this.deviceId).then(
          (actions) => (this._actions = actions)
        );
      } else {
        this._triggers = [];
        this._conditions = [];
        this._actions = [];
      }
    }
  }

  protected render() {
    const device = this._device(this.deviceId, this.devices);

    if (!device) {
      return html`
        <hass-error-screen error="AIS Device not found."></hass-error-screen>
      `;
    }
    const integrations = this._integrations(device, this.entries);
    const entities = this._entities(this.deviceId, this.entities);
    // ${device.model === "Sonoff Bridge"
    return html`
      <hass-subpage .header=${device.name_by_user || device.name}>
        <paper-icon-button
          slot="toolbar-icon"
          icon="hass:settings"
          @click=${this._showSettings}
        ></paper-icon-button>
        <paper-icon-button
          slot="toolbar-icon"
          icon="hass:delete"
          title="Usuwanie"
          @click=${this._confirmRemoveDevice}
        ></paper-icon-button>
        <ha-config-section .isWide=${!this.narrow}>
          <span slot="header">Urządzenie AIS dom</span>
          <span slot="introduction">
            Na tej stronie możesz konfigurować swoje urządzenia AIS dom.
          </span>
          <ha-device-info-card
            .hass=${this.hass}
            .areas=${this.areas}
            .devices=${this.devices}
            .device=${device}
          >
            ${integrations.includes("mqtt")
              ? html`
                  <ha-device-card-mqtt
                    .hass=${this.hass}
                    .device=${device}
                  ></ha-device-card-mqtt>
                `
              : html``}
          </ha-device-info-card>

          ${device.model === "Sonoff Bridge"
            ? html`
                <div class="header">Konfiguracja Bramki RF 433</div>
                <ha-ais-dom-rf433-config-card
                  .hass=${this.hass}
                  .entities=${entities}
                  .deviceId=${this.deviceId}
                >
                </ha-ais-dom-rf433-config-card>
              `
            : html``}
          ${entities.length
            ? html`
                <div class="header">Encje</div>
                <ha-ais-dom-device-entities-card
                  .hass=${this.hass}
                  .entities=${entities}
                >
                </ha-ais-dom-device-entities-card>
              `
            : html``}
          ${window.location.protocol === "http:" &&
          device?.sw_version !== "Rclone"
            ? html`
                <div class="header">Strona urządzenia</div>
                <ais-dom-iframe-view
                  .hass=${this.hass}
                  .entities=${entities}
                ></ais-dom-iframe-view>
              `
            : html``}
          ${(this._triggers.length ||
            this._conditions.length ||
            this._actions.length) &&
          device?.sw_version !== "Rclone"
            ? html`
                <div class="header">Automatyzacje</div>
                ${this._triggers.length
                  ? html`
                      <ha-device-triggers-card
                        .hass=${this.hass}
                        .automations=${this._triggers}
                      ></ha-device-triggers-card>
                    `
                  : ""}
                ${this._conditions.length
                  ? html`
                      <ha-device-conditions-card
                        .hass=${this.hass}
                        .automations=${this._conditions}
                      ></ha-device-conditions-card>
                    `
                  : ""}
                ${this._actions.length
                  ? html`
                      <ha-device-actions-card
                        .hass=${this.hass}
                        .automations=${this._actions}
                      ></ha-device-actions-card>
                    `
                  : ""}
              `
            : html``}
        </ha-config-section>
      </hass-subpage>
    `;
  }

  private _confirmRemoveDevice() {
    showConfirmationDialog(this, {
      text: "Czy napewno usunąć to urządzenie?",
      confirm: () => this._removeDevice(),
    });
  }

  private _removeDevice() {
    this.hass.callService("ais_dom_device", "remove_ais_dom_device", {
      device_id: this.deviceId,
    });
    navigate(this, "/config/ais_dom_devices/dashboard", true);
  }

  private _computeEntityName(entity) {
    if (entity.name) {
      return entity.name;
    }
    const state = this.hass.states[entity.entity_id];
    return state ? computeStateName(state) : null;
  }

  private async _showSettings() {
    const device = this._device(this.deviceId, this.devices)!;
    showDeviceRegistryDetailDialog(this, {
      device,
      updateEntry: async (updates) => {
        const oldDeviceName = device.name_by_user || device.name;
        const newDeviceName = updates.name_by_user;
        await updateDeviceRegistryEntry(this.hass, this.deviceId, updates);

        if (
          !oldDeviceName ||
          !newDeviceName ||
          oldDeviceName === newDeviceName
        ) {
          return;
        }
        const entities = this._entities(this.deviceId, this.entities);

        const renameEntityid =
          this.showAdvanced &&
          confirm(
            "Do you also want to rename the entity id's of your entities?"
          );

        const updateProms = entities.map((entity) => {
          const name = entity.name || entity.stateName;
          let newEntityId: string | null = null;
          let newName: string | null = null;

          if (name && name.includes(oldDeviceName)) {
            newName = name.replace(oldDeviceName, newDeviceName);
          }

          if (renameEntityid) {
            const oldSearch = createValidEntityId(oldDeviceName);
            if (entity.entity_id.includes(oldSearch)) {
              newEntityId = entity.entity_id.replace(
                oldSearch,
                createValidEntityId(newDeviceName)
              );
            }
          }

          if (!newName && !newEntityId) {
            return new Promise((resolve) => resolve());
          }

          return updateEntityRegistryEntry(this.hass!, entity.entity_id, {
            name: newName || name,
            disabled_by: entity.disabled_by,
            new_entity_id: newEntityId || entity.entity_id,
          });
        });
        await Promise.all(updateProms);
      },
    });
  }

  static get styles(): CSSResult {
    return css`
      .header {
        font-family: var(--paper-font-display1_-_font-family);
        -webkit-font-smoothing: var(
          --paper-font-display1_-_-webkit-font-smoothing
        );
        font-size: var(--paper-font-display1_-_font-size);
        font-weight: var(--paper-font-display1_-_font-weight);
        letter-spacing: var(--paper-font-display1_-_letter-spacing);
        line-height: var(--paper-font-display1_-_line-height);
        opacity: var(--dark-primary-opacity);
      }

      ha-config-section *:last-child {
        padding-bottom: 24px;
      }
    `;
  }
}
