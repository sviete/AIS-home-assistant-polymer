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
      div {
        width: 100%;
        padding-left: 10px;
      }
      div.tag {
        padding-top: 0em;
        text-align: left;
        display: table-cell;
        vertical-align: top;
        font-size: 100%;
        margin: 0px;
        cursor: pointer;
      }
      .tag a {
        display: inline-block;
        margin: .125em 0.75em .125em 0;
        line-height: 1.2em;
        word-break: break-all;
        vertical-align: middle;
      }
      a:hover {
        text-decoration: underline;
      }
      a {
        text-decoration: none;
      }
      .tag .tag0 {
        color: #0748cb;
        font-size: 0.9em;
      }
      .tag .tag1 {
          color: #e86e0b;
          font-size: 1em;
      }
      .tag .tag2 {
          color: #d9b904;
          font-size: 1.1em;
      }
      .tag .tag3 {
          color: #574ece;
          font-size: 1.2em;
      }
      .tag .tag4 {
          color: #47ac33;
          font-size: 1.15em;
      }
      .tag .tag5 {
          color: #3599cd;
          font-size: 1.1875em;
      }
      .tag .tag6 {
          color: #c3365a;
          font-size: 1.25em;
      }
      .tag .tag7 {
          color: #19838c;
          font-size: 1.375em;
      }
      .tag .tag8 {
          color: #a2a097;
          font-size: 1.4375em;
      }
      .tag .tag9 {
          color: #93a558;
          font-size: 1.5em;
      }
      .tag .clicked{
        background: #FF9800;
        padding: 4px;
        color: white;
        font-weight: bolder;
      }
    `;
    content.innerHTML = `
      <div id='options' class='tag'>
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
    options.map((option, index) => {
      if (index < 10) {
        var digit = index.toString()[0];
      } else {
        var digit = index.toString()[1];
      }

      if (state == option) {
        c = "clicked";
      } else {
        c = "";
      }
      a = a + `<a class="tag tag${digit} ${c}">${option}</a>`;
    });
    element.innerHTML = `${a}`;
  }

  set hass(hass) {
    const config = this._config;
    const root = this.shadowRoot;
    let state = hass.states[config.entity].state;
    let options = hass.states[config.entity].attributes.options;
    this._updateContent(root.getElementById("options"), options, state);

    const selectOptions = root.querySelectorAll("a.tag");
    selectOptions.forEach((option) => {
      option.addEventListener("click", (event) => {
        hass.callService("input_select", "select_option", {
          option: option.text,
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

customElements.define("ais-easy-picker", AisEasyPicker);
