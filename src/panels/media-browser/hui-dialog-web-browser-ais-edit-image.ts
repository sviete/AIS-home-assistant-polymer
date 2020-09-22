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

  // eslint-disable-next-line no-template-curly-in-string
  @internalProperty() private codeValue =
    "type: picture-elements\nimage: '/local/img/${this._params.title}'\ntitle: ''\nelements: []";

  @internalProperty() private selectedElementType = "";

  @internalProperty() private selectedEntityId = "";

  @internalProperty() private pictureElements: AisPictureElements[] = [];

  @property({ attribute: false })
  private _params?: WebBrowserPlayMediaDialogParams;

  public showDialog(params: WebBrowserPlayMediaDialogParams): void {
    this._params = params;
  }

  public closeDialog() {
    this._params = undefined;
    fireEvent(this, "dialog-closed", { dialog: this.localName });
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
    // this.pictureElements.forEach(element => {
    //   this.codeValue += "  - type: " + element.elementType + "\n"
    //   this.codeValue += "    entity: " + element.entityId + "\n"
    //   this.codeValue += "    style:\n"
    //   element.elementCss.forEach(attr => {
    //     this.codeValue += "      " + attr.attrName + ":'" + attr.attrValue +"'\n"
    //   });
    // });
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
          this._params.title ||
            this.hass.localize("ui.components.media-browser.media_player")
        )}
        @closed=${this.closeDialog}
      >
        <img src=${this._params.sourceUrl} />
        <h2>Konfiguracja karty</h2>
        <ha-paper-dropdown-menu dynamic-align label-float label="type">
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
        <mwc-button @click=${this._handleAddElement}>
          <ha-svg-icon .path=${mdiPlus}></ha-svg-icon>
          Dodaj element do obrazu
        </mwc-button>
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
        @media (min-width: 800px) {
          ha-dialog {
            --mdc-dialog-max-width: 800px;
            --mdc-dialog-min-width: 400px;
            width: 100%;
          }
        }
        video,
        audio,
        img {
          outline: none;
          width: 100%;
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
