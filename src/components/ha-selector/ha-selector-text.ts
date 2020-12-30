import {
  css,
  CSSResult,
  customElement,
  html,
  LitElement,
  property,
} from "lit-element";
import { HomeAssistant } from "../../types";
import { TextSelector } from "../../data/selector";
import "@polymer/paper-input/paper-input";
import "../ha-slider";
import { fireEvent } from "../../common/dom/fire_event";

@customElement("ha-selector-text")
export class HaTextSelector extends LitElement {
  @property() public hass!: HomeAssistant;

  @property() public selector!: TextSelector;

  @property() public value?: string;

  @property() public label?: string;

  protected render() {
    return html`${this.label}
      <paper-input
        .label=${this.label}
        .value=${this._value}
        type="text"
        auto-validate
        @value-changed=${this._handleInputChange}
      >
      </paper-input>`;
  }

  private get _value() {
    return this.value || 0;
  }

  private _handleInputChange(ev) {
    const value = ev.detail.value;
    if (this._value === value) {
      return;
    }
    fireEvent(this, "value-changed", { value });
  }

  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-selector-text": HaTextSelector;
  }
}
