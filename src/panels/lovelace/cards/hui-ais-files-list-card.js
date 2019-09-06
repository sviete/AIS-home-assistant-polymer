import { showConfigFlowDialog } from "../../../dialogs/config-flow/show-dialog-config-flow";

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
            tr{
              height: 3em;
            }
            table {
              width: 100%;
              padding: 0 16px 16px 16px;
              border-spacing: 0px;
            }
            tr.fileRow:hover td{
              background-color:#ffc94761;
              cursor: pointer;
            }
            tbody tr.fileRow:nth-child(odd) {
              background-color: var(--paper-card-background-color);
            }
            tbody tr.fileRow:nth-child(even) {
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
            tr.fileSelected td{
              background-color:#ffc94773;
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
          '<table><tr style="height:0px"><th width="10%">' +
          iconHome +
          '</th><th width="80%">' +
          path +
          '</th><th width="10%"></th></tr><tbody>';
        let iconStatus = "";
        let classStatus = "";
        for (var i = 0; i < feed.length; i++) {
          if (rows >= rowLimit) break;
          if (path.length > 0 && feed[i].path.endsWith(path)) {
            iconStatus = '<ha-icon icon="mdi:play"></ha-icon>';
            classStatus = "fileSelected";
          } else {
            iconStatus = "";
            classStatus = "";
          }
          cardContent +=
            `<tr class="fileRow ` +
            classStatus +
            `" data-path="${feed[i].path}">`;
          cardContent += `<td><ha-icon icon="mdi:${
            feed[i].icon
          }"></ha-icon></td>`;
          cardContent += `<td>${feed[i].name}</td>`;
          cardContent += `<td>` + iconStatus + `</td>`;
          cardContent += `</tr>`;
          ++rows;
        }

        // add new remote
        if (path === "dyski-zdalne:") {
          cardContent += `<tr style="height:1em">`;
          cardContent += `<td colspan="3" style="text-align:right;"><mwc-button id="addNewDrive" style="float:right">+ DYSK ZDALNY</mwc-button></td>`;
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
      file.addEventListener("click", () => {
        hass.callService("ais_drives_service", "browse_path", {
          path: file.getAttribute("data-path"),
        });
        file.classList.add("fileSelected");
      });
    });

    function continueFlow(flowId) {
      showConfigFlowDialog(document.querySelector("home-assistant"), {
        continueFlowId: flowId,
        dialogClosedCallback: () => {},
      });
    }

    const addNewDrive = root.getElementById("addNewDrive");
    addNewDrive.addEventListener("click", function() {
      hass
        .callApi("POST", "config/config_entries/flow", {
          handler: "ais_drives_service",
        })
        .then((result) => {
          continueFlow(result.flow_id);
        });
    });
  }

  getCardSize() {
    return 4;
  }
}

customElements.define("hui-ais-files-list-card", FilesCard);
