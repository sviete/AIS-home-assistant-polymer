import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";

import "../states/ha-panel-states";

class HaPanelAishelp extends PolymerElement {
  static get template() {
    return html`
      ok
    `;
  }

  static get properties() {
    return {
      hass: Object,
      route: Object,
    };
  }
}

customElements.define("ha-panel-aishelp", HaPanelAishelp);
