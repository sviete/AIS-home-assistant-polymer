class NowPlayingPoster extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement("ha-card");
      this.content = document.createElement("div");

      // this.content.style = "!important;";

      card.appendChild(this.content);
      card.style = "background: none;";
      this.appendChild(card);
    }

    const offposter = this.config.off_image;
    const entityId = this.config.entity;
    const state = hass.states[entityId];
    const stateStr = state ? state.state : "unavailable";
    const entityClass =
      this.config.class || this.config.entity.replace(".", "_");
    this.setAttribute("class", entityClass);

    if (state) {
      const movposter = state.attributes.entity_picture;

      if (stateStr === "playing") {
        if (!movposter) {
          if (offposter) {
            this.content.innerHTML = `<img src="${offposter}" width=100% align="center" style="">`;
          } else {
            this.content.innerHTML = `<img src="/static/icons/tile-win-310x150.png" width=100% align="center" style="">`;
          }
        } else {
          this.content.innerHTML = `<img src="${movposter}" width=100% height=100%" style="">`;
        }
      } else if (offposter) {
        this.content.innerHTML = `<img src="${offposter}" width=100% align="center" style="">`;
      } else {
        this.content.innerHTML = `<img src="/static/icons/tile-win-310x150.png" width=100% align="center" style="">`;
      }
    } else {
      this.content.innerHTML = `<img src="/static/icons/tile-win-310x150.png" width=100% align="center" style="">`;
    }
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define("hui-ais-now-playing-poster-card", NowPlayingPoster);
