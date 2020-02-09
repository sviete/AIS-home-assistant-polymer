class ColorLite extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement("ha-card");
      this.content = document.createElement("div");
      card.appendChild(this.content);
      card.style =
        "background:none; width: 110px; border-radius: 52.5px; cursor: pointer;";
      this.appendChild(card);
      this.addEventListener("click", function() {
        this._onClick(hass);
      });
    }

    const entityId = this.config.entity;
    const entityClass =
      this.config.class || this.config.entity.replace(".", "_");
    this.setAttribute("class", entityClass);
    const state = hass.states[entityId];
    const imageOn =
      this.config.image_on || "/static/ais_dom/design_tool/light_on.png";
    const imageOff =
      this.config.image_off || "/static/ais_dom/design_tool/light_off.png";
    //  if the light is on
    if (state) {
      if (state.state === "on") {
        var ImURL = imageOn;
        var rgbval = state.attributes.rgb_color;
        var hsval = state.attributes.hs_color;
        var hsar = "";
        if (hsval) {
          if (rgbval !== "255,255,255") {
            hsar = " hue-rotate(" + hsval[0] + "deg)";
          }
        }
        var bbritef = state.attributes.brightness;
        var bbrite = bbritef / 205;

        this.content.innerHTML = `<img src="${ImURL}" style="position: absolute; filter: opacity(${bbrite})${hsar}!important;>`;
      } else {
        this.content.innerHTML = `<img src="${imageOff}" class="${entityClass}"  style="position: absolute;">`;
      }
    } else {
      this.content.innerHTML = `<img src="${imageOff}" class="${entityClass}" style="position: absolute;">`;
    }
  }

  _onClick(hass) {
    const onTap = this.config.tap_action || "toggle";
    hass.callService("light", onTap, {
      entity_id: this.config.entity,
    });
  }

  ready() {
    super.ready();
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = config;
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("hui-ais-light-card", ColorLite);
