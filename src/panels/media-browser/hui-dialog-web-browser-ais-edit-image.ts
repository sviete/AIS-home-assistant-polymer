import {
  css,
  CSSResult,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
  internalProperty,
} from "lit-element";
import "@polymer/paper-listbox/paper-listbox";
import { mdiPlus } from "@mdi/js";
import { fireEvent } from "../../common/dom/fire_event";
import { createCloseHeading } from "../../components/ha-dialog";
import "../../components/ha-hls-player";
import type { HomeAssistant } from "../../types";
import { haStyleDialog } from "../../resources/styles";
import { WebBrowserPlayMediaDialogParams } from "./show-media-player-dialog";
import { addEntitiesToLovelaceView } from "../lovelace/editor/add-entities-to-view";
import "../../components/ha-code-editor";
import "../../components/entity/ha-entity-picker";
import "../../components/ha-paper-dropdown-menu";

export interface ElemetCssAttr {
  position: string;
  top: string;
  left: string;
}

export interface AisPictureElements {
  type: string;
  entity: string;
  style: ElemetCssAttr;
}

@customElement("hui-dialog-web-browser-ais-edit-image")
export class HuiDialogWebBrowserAisEditImage extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @internalProperty() private codeValue = "";

  @internalProperty() private selectedElementType = "";

  @internalProperty() private selectedEntityId = "";

  @internalProperty() private pictureElements: AisPictureElements[] = [];

  @internalProperty() dragItemStyle;

  @internalProperty() dragActive = false;

  @internalProperty() dragCurrentX = 0;

  @internalProperty() dragCurrentY = 0;

  @internalProperty() dragInitialX = 0;

  @internalProperty() dragInitialY = 0;

  @internalProperty() dragOffsetX = 0;

  @internalProperty() dragOffsetY = 0;

  @property({ attribute: false })
  private _params?: WebBrowserPlayMediaDialogParams;

  public showDialog(params: WebBrowserPlayMediaDialogParams): void {
    this._params = params;
    // eslint-disable-next-line no-template-curly-in-string
    this.codeValue =
      "type: picture-elements\nimage: '/local/img/${this._params.title}'\ntitle: ''\nelements: []";
    this.selectedElementType = "";
    this.selectedEntityId = "";
    this.pictureElements = [];
  }

  public closeDialog() {
    this._params = undefined;
    fireEvent(this, "dialog-closed", { dialog: this.localName });
  }

  private _dragStart(e) {
    if (e.type === "touchstart") {
      this.dragInitialX = e.touches[0].clientX - this.dragOffsetX;
      this.dragInitialY = e.touches[0].clientY - this.dragOffsetY;
    } else {
      this.dragInitialX = e.clientX - this.dragOffsetX;
      this.dragInitialY = e.clientY - this.dragOffsetY;
    }

    // if (e.target === this.dragItem) {
    this.dragActive = true;
    // }
  }

  private _dragEnd(e) {
    this.dragInitialX = this.dragCurrentX;
    this.dragInitialY = this.dragCurrentY;

    this.dragActive = false;
  }

  private _drag(e) {
    if (this.dragActive) {
      e.preventDefault();

      if (e.type === "touchmove") {
        this.dragCurrentX = e.touches[0].clientX - this.dragInitialX;
        this.dragCurrentY = e.touches[0].clientY - this.dragInitialY;
      } else {
        this.dragCurrentX = e.clientX - this.dragInitialX;
        this.dragCurrentY = e.clientY - this.dragInitialY;
      }

      this.dragOffsetX = this.dragCurrentX;
      this.dragOffsetY = this.dragCurrentY;

      this.dragItemStyle =
        "transform: translate3d(" +
        this.dragCurrentX +
        "px, " +
        this.dragCurrentY +
        "px, 0)";
    }
  }

  private _handleAddElement() {
    const cssAttr: ElemetCssAttr = {
      position: "absolute",
      top: "20%",
      left: "40%",
    };
    const element: AisPictureElements = {
      type: this.selectedElementType,
      entity: this.selectedEntityId,
      style: cssAttr,
    };
    this.pictureElements.push(element);
    this.selectedEntityId = "";
    this.selectedElementType = "";
    this._handleCodeChanged();
  }

  private _handleSelectedElementTypeChanged(e: CustomEvent) {
    const itemid = e.detail.item.getAttribute("itemid");
    this.selectedElementType = itemid;
  }

  private _handleSelectedEntityIdChanged(e: CustomEvent) {
    this.selectedEntityId = e.detail.value;
  }

  private entityFilter(stateObj) {
    return !stateObj.entity_id.includes(".ais");
  }

  private _handleCodeChanged() {
    // eslint-disable-next-line no-template-curly-in-string
    this.codeValue =
      "type: picture-elements\nimage: '/local/img/${this._params.title}'\ntitle: ''\nelements: [\n";
    this.pictureElements.forEach((element) => {
      this.codeValue += JSON.stringify(element) + ",\n";
    });
    this.codeValue += "]";
  }

  private _addToLovelaceView(): void {
    const url = this._params?.sourceUrl
      .split("?authSig=")[0]
      .replace("/media/galeria/", " /local/img/");
    addEntitiesToLovelaceView(
      this,
      this.hass,
      [],
      [
        {
          type: "picture-elements",
          title: "",
          image: url,
          elements: this.pictureElements,
        },
      ]
    );
    this.closeDialog();
  }

  protected render(): TemplateResult {
    if (!this._params || !this._params.sourceType || !this._params.sourceUrl) {
      return html``;
    }
    return html`
      <ha-dialog
        open
        hideActions
        .heading=${createCloseHeading(
          this.hass,
          "Konfiguracja elementów obrazu"
        )}
        @closed=${this.closeDialog}
      >
        <div id="outerContainer">
          <div
            id="container"
            @touchstart=${this._dragStart}
            @touchend=${this._dragEnd}
            @touchmove=${this._drag}
            @mousedown=${this._dragStart}
            @mouseup=${this._dragEnd}
            @mousemove=${this._drag}
            style="background-image: url(${this._params
              .sourceUrl}); background-repeat: no-repeat"
          >
            <div id="item" .style=${this.dragItemStyle}></div>
            TODO
          </div>
        </div>
        <h3>Wybierz element do dodania</h3>
        <ha-paper-dropdown-menu dynamic-align label-float label="Typ">
          <paper-listbox
            slot="dropdown-content"
            attr-for-selected="itemId"
            .selected=${this.selectedElementType}
            @iron-select=${this._handleSelectedElementTypeChanged}
          >
            <paper-item itemid="state-badge">State Badge</paper-item>
            <paper-item itemid="state-icon">State Icon</paper-item>
            <paper-item itemid="state-label">State Label</paper-item>
          </paper-listbox>
        </ha-paper-dropdown-menu>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.selectedEntityId}
          @value-changed=${this._handleSelectedEntityIdChanged}
          .configValue=${"entity"}
          .entityFilter=${this.entityFilter}
          allow-custom-entity
        ></ha-entity-picker>
        ${this.selectedEntityId !== "" && this.selectedElementType !== ""
          ? html` <mwc-button @click=${this._handleAddElement}>
              <ha-svg-icon .path=${mdiPlus}></ha-svg-icon>
              Dodaj element do obrazu
            </mwc-button>`
          : ""}
        <br /><br />
        <ha-code-editor mode="yaml" .value=${this.codeValue}></ha-code-editor>
        <div class="card-actions">
          <mwc-button @click=${this._addToLovelaceView}>
            ${this.hass.localize(
              "ui.panel.config.devices.entities.add_entities_lovelace"
            ) || "Dodaj do interfejsu użytkownika"}
          </mwc-button>
        </div>
      </ha-dialog>
    `;
  }

  static get styles(): CSSResult[] {
    return [
      haStyleDialog,
      css`
        /* @media (min-width: 800px) {
          ha-dialog {
            --mdc-dialog-max-width: 800px;
            --mdc-dialog-min-width: 400px;
            width: 100%;
          }
        } */
        /* make dialog fullscreen */
        ha-dialog {
          --mdc-dialog-min-width: calc(
            100vw - env(safe-area-inset-right) - env(safe-area-inset-left)
          );
          --mdc-dialog-max-width: calc(
            100vw - env(safe-area-inset-right) - env(safe-area-inset-left)
          );
          --mdc-dialog-min-height: 100%;
          --mdc-dialog-max-height: 100%;
          --mdc-shape-medium: 0px;
          --vertial-align-dialog: flex-end;
        }
        #outerContainer {
          height: 50vh;
          /* to center
          display: block;
          margin: auto; */
        }
        #container {
          height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 7px;
          touch-action: none;
        }
        #item {
          width: 80px;
          height: 80px;
          background-color: rgb(245, 230, 99);
          border: 10px solid rgba(136, 136, 136, 0.5);
          border-radius: 50%;
          touch-action: none;
          user-select: none;
        }
        #item:active {
          background-color: rgba(168, 218, 220, 1);
        }
        #item:hover {
          cursor: pointer;
          border-width: 20px;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hui-dialog-web-browser-ais-edit-image": HuiDialogWebBrowserAisEditImage;
  }
}
