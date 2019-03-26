/* eslint-disable guard-for-in */
class FilesCard extends HTMLElement {
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
            tr.fileSelected td{
              background-color:#ffc94773;
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
    // const card = root.lastChild;
    this.myHass = hass;

    if (hass.states[config.entity]) {
      const feed = hass.states[config.entity].attributes.files;
      const path = hass.states[config.entity].state;
      this.style.display = "block";
      const rowLimit = config.row_limit
        ? config.row_limit
        : Object.keys(feed).length;
      let rows = 0;

      if (feed !== undefined && Object.keys(feed).length > 0) {
        let iconHome;
        if (path.length > 0) {
          iconHome = '<ha-icon icon="mdi:home"></ha-icon>';
        } else {
          iconHome = "";
        }
        let cardContent =
          '<table><tr><th width="10%">' +
          iconHome +
          '</th><th width="80%">' +
          path +
          '</th><th width="10%"></th></tr><tbody>';
        let iconStatus = "";
        let classStatus = "";
        for (let entry in feed) {
          if (rows >= rowLimit) break;
          if (feed.hasOwnProperty(entry)) {
            if (path.length > 0 && feed[entry]["path"].endsWith(path)) {
              iconStatus = '<ha-icon icon="mdi:play"></ha-icon>';
              classStatus = "fileSelected";
            } else {
              iconStatus = "";
              classStatus = "";
            }
            cardContent +=
              `<tr class="fileRow ` +
              classStatus +
              `" data-path="${feed[entry]["path"]}">`;
            cardContent += `<td><ha-icon icon="mdi:${
              feed[entry]["icon"]
            }"></ha-icon></td>`;
            cardContent += `<td>${feed[entry]["name"]}</td>`;
            cardContent += `<td>` + iconStatus + `</td>`;
            cardContent += `</tr>`;
            ++rows;
          }
        }

        // add new remote
        if (path === "dyski-zdalne:") {
          cardContent += `<tr>`;
          cardContent += `<td colspan="3" style="text-align:right;"><a style="color:#FF9800;" href="/config/integrations/dashboard">Dodaj nowy dysk zdalny</a></td></td>`;
          cardContent += `</tr>`;
        }

        root.lastChild.hass = hass;
        cardContent += `</tbody></table>`;
        root.getElementById("container").innerHTML = cardContent;
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

customElements.define("files-card", FilesCard);
