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

    const cardConfig = Object.assign({}, config);
    const card = document.createElement("ha-card");
    const content = document.createElement("div");
    const style = document.createElement("style");
    style.textContent = `
            ha-card {
              /* sample css */
            }
            table {
              width: 100%;
              padding: 0 16px 16px 16px;
              cursor: pointer;
            }
            tr:hover td{
              background-color:#ffc94761;
            }
            tbody tr:nth-child(odd) {
              background-color: var(--paper-card-background-color);
            }
            tbody tr:nth-child(even) {
              background-color: var(--secondary-background-color);
            }
            tr th{
              text-align: left;
              font-weight: normal;
            }
            ha-icon {
              display: flex;
              width: auto;
            }
            tr.clicked {
              font-size: 1.2em;
              color: #ff5722;
            }
          `;

    content.id = "container";
    cardConfig.title ? (card.header = cardConfig.title) : null;
    card.appendChild(content);
    card.appendChild(style);
    root.appendChild(card);
    this._config = cardConfig;
  }

  set hass(hass) {
    const config = this._config;
    const root = this.shadowRoot;
    const card = root.lastChild;
    this.myHass = hass;

    if (hass.states[config.entity]) {
      const feed = hass.states[config.entity].attributes;
      const path = hass.states[config.entity].state;
      this.style.display = "block";
      const rowLimit = config.row_limit
        ? config.row_limit
        : Object.keys(feed).length;
      let rows = 0;

      if (feed !== undefined && Object.keys(feed).length > 0) {
        let card_content =
          '<table><tr><th width="10%"></th><th width="90%">' +
          path +
          "</th></tr><tbody>";

        for (let entry in feed) {
          if (rows >= rowLimit) break;

          if (feed.hasOwnProperty(entry)) {
            card_content += `<tr class="fileRow" data-path="${
              feed[entry]["path"]
            }">`;
            card_content += `<td><ha-icon style="width: 20; height: 20;" icon="mdi:${
              feed[entry]["icon"]
            }"></ha-icon></td>`;
            card_content += `<td>${feed[entry]["name"]}</td>`;
            card_content += `</tr>`;
            ++rows;
          }
        }

        root.lastChild.hass = hass;
        card_content += `</tbody></table>`;
        root.getElementById("container").innerHTML = card_content;
      } else {
        this.style.display = "none";
      }
    } else {
      this.style.display = "none";
    }
    //
    const files = root.querySelectorAll("tr.fileRow");
    // const container = root.querySelector('#container');
    files.forEach((file) => {
      file.addEventListener("click", (event) => {
        hass.callService("ais_drives_service", "browse_path", {
          path: file.getAttribute("data-path"),
        });
        file.classList.add("clicked");
      });
    });
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("list-card", ListCard);
