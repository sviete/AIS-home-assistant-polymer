class ListCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Please define an entity");
    }

    const root = this.shadowRoot;
    if (root.lastChild) root.removeChild(root.lastChild);

    const cardConfig = config;
    const card = document.createElement("ha-card");
    const content = document.createElement("div");
    const style = document.createElement("style");
    const iconColor = cardConfig.icon_color || "white";
    const delIconHide =
      cardConfig.show_delete_icon === true ? "" : "display:none;";
    const flagColor = "var(--primary-color)";
    const accent = "var(--paper-card-background-color)";
    const accentSelected = "var(--primary-color)";
    style.textContent = `
        .fanart_view {
          width:100%;
          overflow:hidden;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 5px;
          background-repeat:no-repeat;
          background-size:auto 100%;
          position:relative;
        }
        .fanart_svg_view {
          overflow:visible;
          width:55%;
          margin-top:1%;
          margin-left:2.5%;
          alignment-baseline:text-after-edge;
        }
        .fanart_fan_view {
          width:100%;
          background:linear-gradient(to right, ${accent} 48%,
          transparent 70%,${accent} 100%);
          margin:auto;
        }
        .fanart_fan_view_selected {
          width:100%;
          background:linear-gradient(to right, ${accentSelected} 48%,
          transparent 70%,${accentSelected} 100%);
          margin:auto;
        }
        .fanart_flag_view {
          z-index: 1;
          height: 100%;
          width: 100%;
          position: absolute;
          margin-top: 1px;
          margin-right: 1px;
          right: 0;
          fill:${flagColor};
        }
        .fanart_flag_view svg{
          float:right;
          width: 90%;
          height: 100%;
          margin:0;
          filter: drop-shadow( -1px 1px 1px rgba(0,0,0,.5));
          cursor: pointer;
        }
        div.delete {
          width: 20px;
          height: 20px;
          position: fixed;
          padding-left: 4px;
          z-index: 99999;
        }
        div.delete ha-icon {
          ${delIconHide};
          cursor: pointer;
          width: 12px;
        }
        div.delete:hover ha-icon{
          color: red;
        }
        ha-svg-icon {
          width: 6px;
        }
        div#container{
          background: var(--primary-background-color);
        }
      `;

    content.id = "container";
    card.header = cardConfig.title;
    card.appendChild(content);
    card.appendChild(style);
    root.appendChild(card);
    this._config = cardConfig;
  }

  set hass(hass) {
    const config = this._config;
    const root = this.shadowRoot;
    const selectedId = hass.states[config.entity].state;
    if (hass.states[config.entity]) {
      const feed = hass.states[config.entity].attributes;
      this.style.display = "block";
      const rowLimit = config.row_limit
        ? config.row_limit
        : Object.keys(feed).length;
      let rows = 0;
      const mediaSource = config.media_source;

      if (feed !== undefined && Object.keys(feed).length > 0) {
        let cardContent = "";
        for (const entry in feed) {
          if (entry in feed) {
            if (rows >= rowLimit) break;
            const mediaSourceInfo = feed[entry].audio_type || mediaSource;
            let selectedClass = "";
            if (Number(selectedId) === rows) {
              selectedClass = "_selected";
            }
            cardContent +=
              `
            <div class="fanart_view playItem"
              style="margin-top: 0px; background-size: 54% auto;background-position:100% 35%; background-image:url(
                ${feed[entry].thumbnail}
              )">
              <div class="fanart_fan_view` +
              selectedClass +
              `">
                  <div class="fanart_flag_view">
                    <svg class="play" preserveAspectRatio="none" viewBox="0 0 100 100" data-id="${rows}" data-media-source="${mediaSource}">
                       
                    </svg>
                  </div>
                  <div class="delete" data-id="${rows}" data-media-source="${mediaSource}" style="cursor: pointer; "><ha-icon class="delete" icon="mdi:close"></ha-icon></div>
                  <svg class="fanart_svg_view" viewBox="0 -20 200 100">
                    <foreignObject width="200" height="80" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility">
                        <span xmlns="http://www.w3.org/1999/xhtml">${feed[entry].title}</span>
                    </foreignObject>
                    <foreignObject width="200" height="80" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility">
                        <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:smaller; bottom: 5px; position: absolute;">
                        <span>${mediaSourceInfo}</span>
                        </div>
                    </foreignObject>
                  </svg>
              </div>
            </div>
          `;
            ++rows;
          }
        }

        root.lastChild.hass = hass;
        root.getElementById("container").innerHTML = cardContent;
      } else {
        this.style.display = "none";
      }
    } else {
      this.style.display = "none";
    }
    //
    const playTracks = root.querySelectorAll(".play");
    const delTracks = root.querySelectorAll("div.delete");
    playTracks.forEach((track) => {
      track.addEventListener("click", () => {
        hass.callService("ais_cloud", "play_audio", {
          id: track.getAttribute("data-id"),
          media_source: track.getAttribute("data-media-source"),
        });
        // track.classList.add("clicked");
      });
    });

    delTracks.forEach((track) => {
      track.addEventListener("click", () => {
        hass.callService("ais_cloud", "delete_audio", {
          id: track.getAttribute("data-id"),
          media_source: track.getAttribute("data-media-source"),
        });
      });
    });
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("hui-ais-list-card", ListCard);
