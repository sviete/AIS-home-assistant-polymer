import "@polymer/paper-input/paper-textarea";
import "@polymer/paper-spinner/paper-spinner";
import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";

import "../../../resources/ha-style";

class HaPanelDevConsole extends PolymerElement {
  static get template() {
    return html`
      <iframe src="[[url]]" style="width: 100%; height: 100%;"></iframe>
    `;
  }

  ready() {
    super.ready();
    this.url =
      window.location.protocol + "//" + window.location.hostname + ":8888";
  }
}

customElements.define("developer-tools-console", HaPanelDevConsole);
