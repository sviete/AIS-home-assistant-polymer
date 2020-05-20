import "@polymer/iron-icon/iron-icon";
import "../../components/dialog/ha-paper-dialog";
import "@vaadin/vaadin-upload";
import { loadTokens } from "../../../src/common/auth/token_storage";
import {
  LitElement,
  html,
  property,
  CSSResult,
  css,
  customElement,
  PropertyValues,
  TemplateResult,
} from "lit-element";
import { HomeAssistant } from "../../types";
import { haStyleDialog } from "../../resources/styles";

@customElement("ha-dialog-aisgalery")
export class HaDialogAisgalery extends LitElement {
  static get styles(): CSSResult[] {
    return [
      haStyleDialog,
      css`
        :host {
          z-index: 103;
        }

        ha-icon-button {
          color: var(--secondary-text-color);
        }

        ha-icon-button[active] {
          color: var(--primary-color);
        }

        ha-paper-dialog {
          width: 450px;
          height: 350px;
        }
        a.button {
          text-decoration: none;
        }
        a.button > mwc-button {
          width: 100%;
        }
        .onboarding {
          padding: 0 24px;
        }
        paper-dialog-scrollable.top-border::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--divider-color);
        }
      `,
    ];
  }
  @property() public hass!: HomeAssistant;
  @property() private _opened = false;

  constructor() {
    super();
    this.loadVaadin();
  }

  public async showDialog(): Promise<void> {
    this._opened = true;
    this.loadVaadin();
  }

  protected render(): TemplateResult {
    return html`
      <style>
        paper-dialog-scrollable {
          --paper-dialog-scrollable: {
            -webkit-overflow-scrolling: auto;
            max-height: 50vh !important;
          }
        }

        paper-dialog-scrollable.can-scroll {
          --paper-dialog-scrollable: {
            -webkit-overflow-scrolling: touch;
            max-height: 50vh !important;
          }
        }

        @media all and (max-width: 450px), all and (max-height: 500px) {
          paper-dialog-scrollable {
            --paper-dialog-scrollable: {
              -webkit-overflow-scrolling: auto;
              max-height: calc(100vh - 175px) !important;
            }
          }

          paper-dialog-scrollable.can-scroll {
            --paper-dialog-scrollable: {
              -webkit-overflow-scrolling: touch;
              max-height: calc(75vh - 175px) !important;
            }
          }
        }
        app-toolbar {
          margin: 0;
          padding: 0 16px;
          color: var(--primary-text-color);
          background-color: var(--secondary-background-color);
        }
        app-toolbar [main-title] {
          margin-left: 16px;
        }
      </style>
      <dom-module id="my-button" theme-for="vaadin-button">
        <template>
          <style>
            :host {
              color: var(--primary-color);
              border: 1px solid;
            }
          </style>
        </template>
      </dom-module>
      <ha-paper-dialog
        with-backdrop
        .opened=${this._opened}
        @opened-changed=${this._openedChanged}
      >
        <app-toolbar>
          <ha-icon-button icon="hass:close" dialog-dismiss=""></ha-icon-button>
          <div main-title="">Dodawanie zdjęć</div>
        </app-toolbar>
        <vaadin-upload
          capture="camera"
          accept="image/*"
          noAuto="false"
          style="text-align: center;"
        >
          <span slot="drop-label" style="color:white;"
            >Możesz przeciągnąć i upuścić tu.</span
          >
        </vaadin-upload>
      </ha-paper-dialog>
    `;
  }

  protected async loadVaadin() {
    customElements.whenDefined("vaadin-upload").then(async () => {
      const upload = this.shadowRoot!.querySelector("vaadin-upload");
      const tokens = loadTokens();
      if (upload !== null) {
        upload.set("i18n.addFiles.many", "Wyślij zdjęcie [plik 5MB max] ...");
        upload.set(
          "i18n.fileIsTooBig",
          "Plik jest za duży. Maksymalnie można przesłać 5MB"
        );
        upload.set("method", "POST");
        upload.set("withCredentials", true);
        upload.set("target", "api/ais_file/upload");
        upload.set("headers", {
          authorization: "Bearer " + tokens.access_token,
        });
        upload.addEventListener("file-reject", function (event) {
          console.log(event.detail.file.name + " error: " + event.detail.error);
        });
      }
    });
  }

  protected firstUpdated(changedProps: PropertyValues) {
    super.updated(changedProps);
  }
  protected updated(changedProps: PropertyValues) {
    super.updated(changedProps);
  }

  private _openedChanged(ev: CustomEvent) {
    this._opened = ev.detail.value;
    this.loadVaadin();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-dialog-aisgalery": HaDialogAisgalery;
  }
}
