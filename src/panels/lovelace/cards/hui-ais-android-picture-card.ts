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

  protected firstUpdated(changedProps: PropertyValues): void {
    super.firstUpdated(changedProps);
  }

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
      <ha-card>
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
          @click=${this._handleClick}
          @contextmenu=${this._handleBack}
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

  private _handleClick(ev: ActionHandlerEvent) {
    // handleAction(this, this.hass!, this._config!, ev.detail.action!);
    console.log(ev);
  }

  private _handleBack(ev) {
    ev.preventDefault();
    const ripple = document.createElement("div");
    ripple.className = "ripple";
    ripple.style.left = `${ev.clientX}px`;
    ripple.style.top = `${ev.clientY}px`;
    ripple.style.position = "fixed";
    ripple.style.width = "10px";
    ripple.style.height = "10px";
    ripple.style.borderRadius = "50%";
    ripple.style.backgroundColor = "transparent";
    ripple.style.border = "1.5px solid #00a5ffcc";
    ripple.style.animation = "ripple-effect 0.6s  linear";
    ripple.onanimationend = () => document.body.removeChild(ripple);
    document.body.appendChild(ripple);

    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", window.location.origin + "/ais-back", true);
    xmlHttp.send(null);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hui-ais-android-picture-card": HuiAisAndroidPictureCard;
  }
}
