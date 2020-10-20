import {
  CSSResult,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
  css,
} from "lit-element";
import { DeviceRegistryEntry } from "../../../../../../data/device_registry";
import { showConfirmationDialog } from "../../../../../../dialogs/generic/show-dialog-box";
import { haStyle } from "../../../../../../resources/styles";
import { HomeAssistant } from "../../../../../../types";
import { fireEvent } from "../../../../../../common/dom/fire_event";

@customElement("ha-device-actions-ais-drive")
export class HaDeviceActionsAisDrive extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() public device!: DeviceRegistryEntry;

  protected render(): TemplateResult {
    return html`
      <mwc-button @click=${this._showDriveInfo}>
        Info
      </mwc-button>
      <mwc-button class="warning" @click="${this._confirmDeleteEntry}">
        ${this.hass.localize("ui.panel.config.devices.delete")}
      </mwc-button>
    `;
  }

  private async _confirmDeleteEntry(): Promise<void> {
    const confirmed = await showConfirmationDialog(this, {
      text: this.hass.localize("ui.panel.config.devices.confirm_delete"),
    });

    if (!confirmed) {
      return;
    }

    this.hass.callService("ais_dom_device", "remove_ais_dom_entity", {
      entity_id: this.device.id,
    });
  }

  private async _showDriveInfo(): Promise<void> {
    fireEvent(this, "hass-more-info", { entityId: this.device.id });
  }

  static get styles(): CSSResult[] {
    return [
      haStyle,
      css`
        :host {
          display: flex;
          justify-content: space-between;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-device-actions-ais-drive": HaDeviceActionsAisDrive;
  }
}
