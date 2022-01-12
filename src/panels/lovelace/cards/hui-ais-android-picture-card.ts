import "../components/hui-warning";
import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  PropertyValues,
  TemplateResult,
} from "lit";
import { customElement, property, state } from "lit/decorators";
import Hammer from "hammerjs";
import { computeDomain } from "../../../common/entity/compute_domain";
import "../../../components/ha-card";
import { ActionHandlerEvent } from "../../../data/lovelace";
import { HomeAssistant } from "../../../types";
import { findEntities } from "../common/find-entities";
import { hasConfigOrEntityChanged } from "../common/has-changed";
import "../components/hui-image";
import { LovelaceCard } from "../types";
import { PictureEntityCardConfig } from "./types";

@customElement("hui-ais-android-picture-card")
class HuiAisAndroidPictureCard extends LitElement implements LovelaceCard {
  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ): PictureEntityCardConfig {
    const maxEntities = 1;
    const foundEntities = findEntities(
      hass,
      maxEntities,
      entities,
      entitiesFallback,
      ["light", "switch"]
    );

    return {
      type: "ais-android-picture",
      entity: foundEntities[0] || "",
      image: "http://localhost:9966/stream.mjpeg",
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: PictureEntityCardConfig;

  @state() private aisPanEnd = {};

  @state() private aisPanStart = {};

  public getCardSize(): number {
    return 3;
  }

  public setConfig(config: PictureEntityCardConfig): void {
    if (!config || !config.entity) {
      throw new Error("Entity must be specified");
    }

    if (
      computeDomain(config.entity) !== "camera" &&
      !config.image &&
      !config.state_image &&
      !config.camera_image
    ) {
      throw new Error("No image source configured");
    }

    this._config = { show_name: true, show_state: true, ...config };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    return hasConfigOrEntityChanged(this, changedProps);
  }

  protected firstUpdated(changedProps: PropertyValues): void {
    super.firstUpdated(changedProps);

    const streamElement = this.shadowRoot!.getElementById(
      this._config?.element_id
    );
    const divElement = this.shadowRoot!.getElementById(
      this._config?.element_id + "_div"
    );
    const hammertime = new Hammer(streamElement);
    hammertime.get("pan").set({ direction: Hammer.DIRECTION_VERTICAL });

    hammertime.on("panup", (ev) => {
      // console.debug("panup");
    });

    hammertime.on("pandown", (ev) => {
      // console.debug("pandown");
    });

    hammertime.on("panstart", (ev) => {
      this.aisPanStart = ev;
    });
    hammertime.on("panend", (ev) => {
      ev.preventDefault();
      this.aisPanEnd = ev;
      const bcrStreamElement = ev.target.getBoundingClientRect();
      const sX = this.aisPanStart.center.x;
      const sY = this.aisPanStart.center.y;
      const eX = this.aisPanEnd.center.x;
      const eY = this.aisPanEnd.center.y;

      const aisSX = Math.floor(
        ((sX - bcrStreamElement.left) / bcrStreamElement.width) * 100
      );
      const aisSY = Math.floor(
        ((sY - bcrStreamElement.top) / bcrStreamElement.height) * 100
      );
      const aisEX = Math.floor(
        ((eX - bcrStreamElement.left) / bcrStreamElement.width) * 100
      );
      const aisEY = Math.floor(
        ((eY - bcrStreamElement.top) / bcrStreamElement.height) * 100
      );

      this._handleServiceCall("pan", aisSX, aisSY, aisEX, aisEY);
    });

    hammertime.on("tap", (ev) => {
      ev.preventDefault();
      const bcrStreamElement = ev.target.getBoundingClientRect();
      console.log("1" + ev);
      console.log(ev);
      console.log("2" + ev);
      console.log(ev.target);
      console.log("3" + ev);
      console.log(bcrStreamElement);
      const ripple = document.createElement("div");
      ripple.className = "ripple2";
      ripple.style.left = `${ev.center.x - bcrStreamElement.x}px`;
      ripple.style.top = `${ev.center.y}px`;
      divElement.appendChild(ripple);

      const aisX = Math.floor(
        ((ev.center.x - bcrStreamElement.x) / bcrStreamElement.width) * 100
      );
      const aisY = Math.floor(
        ((ev.center.y - bcrStreamElement.y) / bcrStreamElement.height) * 100
      );
      ripple.style.animation = "ripple-effect 0.4s  linear";
      ripple.onanimationend = () => divElement.removeChild(ripple);

      this._handleServiceCall("tap", aisX, aisY, 0, 0);
    });
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html``;
    }

    const stateObj = this.hass.states[this._config.entity];

    if (!stateObj) {
      return html`
        <hui-warning> Nie moża połączyć z ekranem systemu Android </hui-warning>
      `;
    }

    return html`
      <ha-card
        @contextmenu=${this._handleBack}
        @mousemove=${this._handleMouseMove}
        .id=${this._config.element_id}
      >
        <div .id=${this._config.element_id + "_div"}></div>
        <hui-image
          .hass=${this.hass}
          .image=${this._config.image}
          .stateImage=${this._config.state_image}
          .cameraImage=${computeDomain(this._config.entity) === "camera"
            ? this._config.entity
            : this._config.camera_image}
          .cameraView=${this._config.camera_view}
          .entity=${this._config.entity}
          .aspectRatio=${this._config.aspect_ratio}
        ></hui-image>
      </ha-card>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      ha-card {
        min-height: 75px;
        overflow: hidden;
        position: relative;
        height: 100%;
        box-sizing: border-box;
      }

      hui-image {
        cursor: pointer;
      }

      .both {
        display: flex;
        justify-content: space-between;
      }

      .single {
        text-align: center;
      }

      .ripple {
        width: 10px;
        height: 10px;
        background-color: transparent;
        position: fixed !important;
        border-radius: 50%;
        border: 1.5px solid #00a5ffcc;
      }

      .ripple2 {
        width: 10px;
        height: 10px;
        background-color: transparent;
        position: fixed !important;
        border-radius: 50%;
        border: 2px solid #e7711eb8;
      }

      @keyframes ripple-effect {
        to {
          transform: scale(5);
          opacity: 0.01;
        }
      }
    `;
  }

  private _handleMouseMove(ev: ActionHandlerEvent) {
    ev.preventDefault();
  }

  private _handleBack(ev) {
    ev.preventDefault();
    if (ev.target.className === "ripple") {
      return;
    }

    const bcrStreamElement = ev.target.getBoundingClientRect();
    const ripple = document.createElement("div");
    ripple.className = "ripple";

    ripple.style.left = `${ev.clientX - bcrStreamElement.left}px`;
    ripple.style.top = `${ev.clientY}px`;

    const divElement = this.shadowRoot!.getElementById(
      this._config?.element_id + "_div"
    );
    divElement.appendChild(ripple);

    ripple.style.animation = "ripple-effect 0.4s  linear";
    ripple.onanimationend = () => divElement.removeChild(ripple);

    this._handleServiceCall("back", 0, 0, 0, 0);
  }

  private _handleServiceCall(
    name: string,
    sX: number,
    sY: number,
    eX: number,
    eY: number
  ) {
    this.hass.callService("ais_shell_command", "screen_stream_command", {
      name: name,
      sX: sX,
      sY: sY,
      eX: eX,
      eY: eY,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hui-ais-android-picture-card": HuiAisAndroidPictureCard;
  }
}
