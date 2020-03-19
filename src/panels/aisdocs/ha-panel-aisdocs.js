import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";

class HaPanelAisdocs extends PolymerElement {
  static get template() {
    return html`
      <style include="ha-style">
        iframe {
          border: 0;
          width: 100%;
          height: 100%;
        }
      </style>
      <iframe
        src="//www.ai-speaker.com/"
        sandbox="allow-forms allow-popups allow-pointer-lock allow-same-origin allow-scripts"
        allowfullscreen="true"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
      ></iframe>
    `;
  }

  static get properties() {
    return {
      hass: Object,
      narrow: Boolean,
      panel: Object,
    };
  }
}

customElements.define("ha-panel-aisdocs", HaPanelAisdocs);
