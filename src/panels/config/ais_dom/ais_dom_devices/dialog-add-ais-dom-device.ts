import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { property } from "lit/decorators";
import "@polymer/paper-input/paper-input";
import "@material/mwc-button";

import "../../../../components/ha-dialog";
import "../../../../components/entity/ha-entities-picker";
import "../../../../components/user/ha-user-picker";
import { PolymerChangedEvent } from "../../../../polymer-types";
import { haStyleDialog } from "../../../../resources/styles";
import { HomeAssistant } from "../../../../types";

class DialogPersonDetail extends LitElement {
  @property() public hass!: HomeAssistant;

  @property() private _name!: string;

  @property() private _userId?: string;

  @property() private _deviceTrackers!: string[];

  @property() private _submitting = false;

  public async showDialog(): Promise<void> {
    this._name = "";
    this._userId = undefined;
    this._deviceTrackers = [];
    await this.updateComplete;
  }

  protected render(): TemplateResult | void {
    const nameInvalid = this._name.trim() === "";
    return html`
      <ha-dialog with-backdrop opened @opened-changed="true">
        <h2>Nowy przycisk</h2>
        <ha-dialog>
          <div class="form">
            <paper-input
              .value=${this._name}
              @value-changed=${this._nameChanged}
              label=${this.hass!.localize("ui.panel.config.person.detail.name")}
              error-message=${this.hass!.localize(
                "ui.panel.config.person.detail.name_error_msg"
              )}
              .invalid=${nameInvalid}
            ></paper-input>
            <ha-user-picker
              label=${this.hass!.localize(
                "ui.panel.config.person.detail.linked_user"
              )}
              .hass=${this.hass}
              .value=${this._userId}
              @value-changed=${this._userChanged}
            ></ha-user-picker>
            <p>22222</p>
            <ha-entities-picker
              .hass=${this.hass}
              .value=${this._deviceTrackers}
              domain-filter="device_tracker"
              .pickedEntityLabel=${this.hass.localize(
                "ui.panel.config.person.detail.device_tracker_picked"
              )}
              .pickEntityLabel=${this.hass.localize(
                "ui.panel.config.person.detail.device_tracker_pick"
              )}
              @value-changed=${this._deviceTrackersChanged}
            >
            </ha-entities-picker>
          </div>
        </ha-dialog>
        <div class="paper-dialog-buttons">
          <mwc-button
            @click=${this._updateEntry}
            .disabled=${nameInvalid || this._submitting}
          >
            Dodaj
          </mwc-button>
        </div>
      </ha-dialog>
    `;
  }

  private _nameChanged(ev: PolymerChangedEvent<string>) {
    this._name = ev.detail.value;
  }

  private _userChanged(ev: PolymerChangedEvent<string>) {
    this._userId = ev.detail.value;
  }

  private _deviceTrackersChanged(ev: PolymerChangedEvent<string[]>) {
    this._deviceTrackers = ev.detail.value;
  }

  private async _updateEntry() {
    this._submitting = true;
    try {
      // eslint-disable-next-line no-console
      console.log("update");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } finally {
      this._submitting = false;
    }
  }

  static get styles(): CSSResultGroup[] {
    return [
      haStyleDialog,
      css`
        ha-paper-dialog {
          min-width: 400px;
        }
        .form {
          padding-bottom: 24px;
        }
        ha-user-picker {
          margin-top: 16px;
        }
        mwc-button.warning {
          margin-right: auto;
        }
        .error {
          color: var(--google-red-500);
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dialog-add-ais-dom-device": DialogPersonDetail;
  }
}

customElements.define("dialog-add-ais-dom-device", DialogPersonDetail);
