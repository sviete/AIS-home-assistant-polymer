class AisEasyPicker extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  setConfig(config) {
    const root = this.shadowRoot;
    if (root.lastChild) root.removeChild(root.lastChild);
    const cardConfig = Object.assign({}, config);
    const card = document.createElement("ha-card");
    card.header = config.title;
    const content = document.createElement("div");
    const style = document.createElement("style");
    style.textContent = `
      div.tags {
        width: 100%;
        padding-bottom: 10px;
        padding-top: 10px;
        text-align: left;
          vertical-align: top;
        margin: 0px;
        cursor: pointer;
        text-align: center;
        background-color: var(--primary-background-color);
      }
      div.tag {
        display: inline-block;
        line-height: 30px;
        word-break: break-word;
        text-overflow: ellipsis;
        vertical-align: middle;
        color: var(--paper-grey-500);
        width: 120px;
        height: 30px;
        margin: 4px;
        padding: 4px;
        position: relative; 
        background-color: var(--paper-card-background-color);
        text-decoration: none;
        white-space: nowrap;
        overflow: hidden;
      }
      div.clicked{
        color: var(--primary-color);
        font-weight: bolder;
      }
    `;
    content.innerHTML = `
      <div id='options' class='tags'>
      </div>
      `;
    card.appendChild(style);
    card.appendChild(content);
    root.appendChild(card);
    this._config = cardConfig;
  }

  _updateContent(element, options, state) {
    var a = "";
    var c = "";
    options.map((option) => {
      if (state === option) {
        c = "clicked";
      } else {
        c = "";
      }
      a += `<div class="tag ${c}" data-option="${option}"> ${option} </div>`;
    });
    element.innerHTML = `${a}`;
  }

  set hass(hass) {
    const config = this._config;
    const root = this.shadowRoot;
    const state = hass.states[config.entity].state;
    const options = hass.states[config.entity].attributes.options;
    this._updateContent(root.getElementById("options"), options, state);

    const selectOptions = root.querySelectorAll("div.tag");
    selectOptions.forEach((option) => {
      option.addEventListener("click", () => {
        hass.callService("input_select", "select_option", {
          option: option.getAttribute("data-option"),
          entity_id: config.entity,
        });
        option.classList.add("clicked");
      });
    });
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("hui-ais-easy-picker-card", AisEasyPicker);
