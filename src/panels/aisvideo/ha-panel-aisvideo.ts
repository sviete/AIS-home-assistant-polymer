import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";
import "mp-video/mp-video.html";

import "../states/ha-panel-states";

class HaPanelAisvideo extends PolymerElement {
  static get template() {
    return html`
      <style include="ha-style">
        iframe {
          border: 0;
          width: 100%;
          height: 100%;
        }
      </style>
      <div class="video-container">
        <mp-video youtube video-id="..."></mp-video>
        <mp-video vimeo video-id="..."></mp-video>
        <mp-video html-video html-video-mp4="..."></mp-video>
    </div>
    `;
  }

  static get properties() {
    return {
      hass: Object,
      narrow: Boolean,
      panel: Object,
    };
  }

  public ready() {
    super.ready();
  }
}

customElements.define("ha-panel-aisvideo", HaPanelAisvideo);
