/* eslint-disable prettier/prettier */
/* eslint-disable guard-for-in */
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
    const columns = cardConfig.columns;
    const card = document.createElement("ha-card");
    const content = document.createElement("div");
    const style = document.createElement("style");
    style.textContent = `
            table {
              width: 100%;
              padding: 0 16px 16px 16px;
              border-collapse: collapse;
              padding: 0px;
              border-spacing: 0px;
            }
            tr:hover td{
              background-color:#ffc94761;
            }
            tr td.playItem:hover{
              color:#FF9800;
              cursor: pointer;
            }
            tr td.deleteItem:hover ha-icon{
              color:red;
              cursor: pointer;
            }
            thead th {
              text-align: left;
            }
            .button {
              overflow: auto;
              padding: 16px;
            }
            paper-button {
              float: right;
            }
            td a {
              color: var(--primary-text-color);
              text-decoration-line: none;
              font-weight: normal;
            }
            td img{
              display: block;
            } td.icon{
              padding-right: 10px;
            }
            tbody tr.itemSelected td{
              background-color:#ca7d0d;
            }
            tbody tr.itemSelected td.playItem ha-icon{
              color:#ffc94761;
            }
            td.deleteItem {
              padding-right: 15px;
              padding-left: 15px;
            }
          `;

    // Go through columns and add CSS sytling to each column that is defined
    if (columns) {
      for (const column in columns) {
        if (
          columns.hasOwnProperty(column) &&
          columns[column].hasOwnProperty("style")
        ) {
          const styles = columns[column].style;

          style.textContent += `.${columns[column].field} {`;
          for (const index in styles) {
            if (styles.hasOwnProperty(index)) {
              for (const s in styles[index]) {
                style.textContent += `
                  ${s}: ${styles[index][s]};`;
              }
            }
          }

          style.textContent += `}`;
        }
      }
    }

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
    const selectedId = hass.states[config.entity].state;
    if (hass.states[config.entity]) {
      const feed = hass.states[config.entity].attributes;
      const columns = config.columns;
      this.style.display = "block";
      const rowLimit = config.row_limit
        ? config.row_limit
        : Object.keys(feed).length;
      let rows = 0;
      const mediaSource = config.media_source;

      if (feed !== undefined && Object.keys(feed).length > 0) {
        let card_content = "<table><thread><tr>";

        if (!columns) {
          card_content += `<tr>`;

          for (const column in feed[0]) {
            if (feed[0].hasOwnProperty(column)) {
              card_content += `<th>${feed[0][column]}</th>`;
            }
          }
        } else {
          for (const column in columns) {
            if (columns.hasOwnProperty(column)) {
              card_content += `<th class=${columns[column].field}>${
                columns[column].title
              }</th>`;
            }
          }
        }

        card_content += `</tr></thead><tbody>`;

        // eslint-disable-next-line guard-for-in
        let classStatus = "";
        let rowBgColor = "";
        for (const entry in feed) {
          if (rows >= rowLimit) break;

          if (feed.hasOwnProperty(entry)) {
            if (selectedId == rows) {
              classStatus = "itemSelected";
              rowBgColor = 'bgcolor="#ca7d0d"';
            } else {
              classStatus = "";
              rowBgColor = "";
            }

            if (!columns) {
              for (const field in feed[entry]) {
                if (feed[entry].hasOwnProperty(field)) {
                  card_content += `<td>${feed[entry][field]}</td>`;
                }
              }
            } else {
              let has_field = true;

              for (const column in columns) {
                if (!feed[entry].hasOwnProperty(columns[column].field)) {
                  has_field = false;
                  break;
                }
              }

              if (!has_field) continue;
              card_content +=
                `<tr ` +
                rowBgColor +
                ` class="trackRow ` +
                classStatus +
                `" data-id="${rows}" data-media-source="${mediaSource}">`;

              for (const column in columns) {
                if (columns.hasOwnProperty(column)) {
                  if (columns[column].type === "icon") {
                    card_content += `<td align="right" class="${
                      columns[column].field
                    } playItem" data-id="${rows}" data-media-source="${mediaSource}">`;
                  } else if (columns[column].type === "icon_remove") {
                    card_content += `<td align="center" class="${
                      columns[column].field
                    } deleteItem" data-id="${rows}" data-media-source="${mediaSource}">`;
                  } else {
                    card_content += `<td class="${
                      columns[column].field
                    } playItem" data-id="${rows}" data-media-source="${mediaSource}">`;
                  }

                  if (columns[column].hasOwnProperty("add_link")) {
                    card_content += `<a href="${
                      feed[entry][columns[column].add_link]
                    }" target='_blank'>`;
                  }

                  if (columns[column].hasOwnProperty("type")) {
                    if (columns[column].type === "image") {
                      if (
                        feed[entry][columns[column].field][0].hasOwnProperty(
                          "url"
                        )
                      ) {
                        card_content += `<img src="${
                          feed[entry][columns[column].field][0].url
                        }" width="70" height="70">`;
                      } else {
                        card_content += `<img src="${
                          feed[entry][columns[column].field]
                        }" width="70" height="70">`;
                      }
                    } else if (columns[column].type === "icon") {
                      card_content += `<ha-icon icon="${
                        feed[entry][columns[column].field]
                      }"></ha-icon>`;
                    } else if (columns[column].type === "icon_remove") {
                      card_content += `<ha-icon icon="${
                        feed[entry][columns[column].field]
                      }"></ha-icon>`;
                    }
                  } else {
                    let newText = feed[entry][columns[column].field];

                    if (columns[column].hasOwnProperty("regex")) {
                      newText = new RegExp(columns[column].regex).exec(
                        feed[entry][columns[column].field]
                      );
                    } else if (columns[column].hasOwnProperty("prefix")) {
                      newText = columns[column].prefix + newText;
                    } else if (columns[column].hasOwnProperty("postfix")) {
                      newText += columns[column].postfix;
                    }

                    card_content += `${newText}`;
                  }

                  if (columns[column].hasOwnProperty("add_link")) {
                    card_content += `</a>`;
                  }

                  card_content += `</td>`;
                }
              }
            }

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
    const playTracks = root.querySelectorAll("td.playItem");
    const delTracks = root.querySelectorAll("td.deleteItem");
    playTracks.forEach((track) => {
      track.addEventListener("click", (event) => {
        hass.callService("ais_cloud", "play_audio", {
          id: track.getAttribute("data-id"),
          media_source: track.getAttribute("data-media-source"),
        });
        track.classList.add("clicked");
      });
    });
    delTracks.forEach((track) => {
      track.addEventListener("click", (event) => {
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

customElements.define("list-card", ListCard);
