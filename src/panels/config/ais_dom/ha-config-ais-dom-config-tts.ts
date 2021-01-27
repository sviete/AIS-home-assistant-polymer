import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import {
  css,
  CSSResultArray,
  customElement,
  html,
  LitElement,
  property,
  PropertyValues,
  TemplateResult,
  internalProperty,
} from "lit-element";
import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";

import "./ha-config-ais-dom-dashboard";
import { fireEvent } from "../../../common/dom/fire_event";
import "../../../components/paper-time-input";
import "../../../components/ha-button-menu";
import "@material/mwc-list/mwc-list-item";
import {
  showAisFileDialog,
  HaAisFileDialogParams,
} from "../../../dialogs/ais-files/show-dialog-ais-file";
import { haStyle } from "../../../resources/styles";
import { HomeAssistant } from "../../../types";
/*
 *
 */
@customElement("ha-config-ais-dom-config-tts")
class HaConfigAisDomConfigTts extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() public isWide?: boolean;

  @property({ type: Boolean }) public narrow = false;

  @property({ type: String }) public selectedVoice = "";

  protected firstUpdated() {
    this.selectedVoice = this.hass.states["input_select.assistant_voice"].state;
  }

  protected render(): TemplateResult {
    return html`
      <hass-subpage header="Konfiguracja bramki AIS dom">
        <!-- <ha-button-menu corner="BOTTOM_START" slot="toolbar-icon">
            <ha-icon-button
              icon="hass:dots-vertical"
              label="Menu"
              slot="trigger"
            >
            </ha-icon-button>
            <mwc-list-item>
                Edit ais_welcome.txt
            </mwc-list-item>
        </ha-button-menu> -->
        <div .narrow=${this.narrow}>
          <ha-config-section .isWide=${this.isWide}>
            <span slot="header">Ustawienia głosu Asystenta</span>
            <span slot="introduction"
              >Możesz zmienić głos asystenta i dostosować szybkość i ton mowy
              oraz komunikat mówiony przez asystenta podczas startu
              systemu..</span
            >
            <ha-card header="Wybór głosu Asystenta">
              <div class="card-content">
                <div class="person">
                  <img
                    class=${this.personImgClass(
                      this.selectedVoice,
                      "Jola online"
                    )}
                    data-voice="Jola online"
                    alt="Jola Online"
                    title="Jola Online"
                    @click=${this.switchTtsPerson}
                    src="/static/ais_dom/Ania.jpg"
                  />
                </div>
                <div class="person">
                  <img
                    class=${this.personImgClass(
                      this.selectedVoice,
                      "Jola lokalnie"
                    )}
                    data-voice="Jola lokalnie"
                    alt="Jola Lokalnie"
                    title="Jola Lokalnie"
                    @click=${this.switchTtsPerson}
                    src="/static/ais_dom/Asia.jpg"
                  />
                </div>
                <div class="person">
                  <img
                    class=${this.personImgClass(this.selectedVoice, "Celina")}
                    data-voice="Celina"
                    alt="Celina"
                    title="Celina"
                    @click=${this.switchTtsPerson}
                    src="/static/ais_dom/Celka.jpg"
                  />
                </div>
                <div class="person">
                  <img
                    class=${this.personImgClass(this.selectedVoice, "Anżela")}
                    data-voice="Anżela"
                    alt="Anżela"
                    title="Anżela"
                    @click=${this.switchTtsPerson}
                    src="/static/ais_dom/Anzela.jpg"
                  />
                </div>
                <div class="person">
                  <img
                    class=${this.personImgClass(this.selectedVoice, "Asia")}
                    data-voice="Asia"
                    alt="Asia"
                    title="Asia"
                    @click=${this.switchTtsPerson}
                    src="/static/ais_dom/Kasia.jpg"
                  />
                </div>
                <div class="person">
                  <img
                    class=${this.personImgClass(
                      this.selectedVoice,
                      "Sebastian"
                    )}
                    data-voice="Sebastian"
                    alt="Sebastian"
                    title="Sebastian"
                    @click=${this.switchTtsPerson}
                    src="/static/ais_dom/Sebastian.jpg"
                  />
                </div>
                <div class="person">
                  <img
                    class=${this.personImgClass(this.selectedVoice, "Bartek")}
                    data-voice="Bartek"
                    alt="Bartek"
                    title="Bartek"
                    @click=${this.switchTtsPerson}
                    src="/static/ais_dom/Bartek.jpg"
                  />
                </div>
                <div class="person">
                  <img
                    class=${this.personImgClass(this.selectedVoice, "Andrzej")}
                    data-voice="Andrzej"
                    alt="Andrzej"
                    title="Andrzej"
                    @click=${this.switchTtsPerson}
                    src="/static/ais_dom/Andrzej.jpg"
                  />
                </div>
              </div>
              <div class="card-actions person-actions">
                <div @click=${this.tuneVoiceTone}>
                  <ha-icon-button
                    class="user-button"
                    icon="hass:tune"
                  ></ha-icon-button
                  ><mwc-button>Ton mowy</mwc-button>
                </div>
                <div @click=${this.tuneVoiceSpeed}>
                  <ha-icon-button
                    class="user-button"
                    icon="hass:play-speed"
                  ></ha-icon-button
                  ><mwc-button>Szybkość mowy</mwc-button>
                </div>
                <div @click=${this._openAisWelcomeText}>
                  <ha-icon-button
                    class="user-button"
                    icon="hass:file-document-edit-outline"
                  ></ha-icon-button
                  ><mwc-button>Welcome.txt</mwc-button>
                </div>
              </div>
            </ha-card>
          </ha-config-section>
        </div>
      </hass-subpage>
    `;
  }

  static get styles(): CSSResultArray {
    return [
      haStyle,
      css`
        .content {
          padding-bottom: 32px;
        }

        .border {
          margin: 32px auto 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
          max-width: 1040px;
        }
        .narrow .border {
          max-width: 640px;
        }
        .card-actions {
          display: flex;
        }
        ha-card > paper-toggle-button {
          margin: -4px 0;
          position: absolute;
          top: 32px;
          right: 8px;
        }
        .center-container {
          @apply --layout-vertical;
          @apply --layout-center-center;
          height: 70px;
        }
        div.person {
          display: inline-block;
          margin: 10px;
        }
        img {
          border-radius: 50%;
          width: 100px;
          height: 100px;
          border: 20px;
        }
        img.person-img-selected {
          border: 7px solid var(--primary-color);
          width: 110px;
          height: 110px;
        }
      `,
    ];
  }

  async _openAisWelcomeText() {
    const filePath = "/data/data/pl.sviete.dom/files/home/AIS/ais_welcome.txt";
    const file = await this.hass.callApi<string>("POST", "ais_file/read", {
      filePath: filePath,
    });
    const fileParams: HaAisFileDialogParams = {
      dialogTitle: "Edit ais_welcome.txt",
      filePath: filePath,
      fileBody: file,
      readonly: false,
    };
    showAisFileDialog(this, fileParams);
  }

  computeClasses(isWide) {
    return isWide ? "content" : "content narrow";
  }

  personImgClass(selectedVoice, person) {
    if (selectedVoice === person) {
      return "person-img-selected";
    }
    return "";
  }

  tuneVoiceSpeed() {
    fireEvent(this, "hass-more-info", {
      entityId: "input_number.assistant_rate",
    });
  }

  tuneVoiceTone() {
    fireEvent(this, "hass-more-info", {
      entityId: "input_number.assistant_tone",
    });
  }

  switchTtsPerson(e) {
    this.selectedVoice = e.target.dataset.voice;
    this.hass.callService("input_select", "select_option", {
      entity_id: "input_select.assistant_voice",
      option: e.target.dataset.voice,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-config-ais-dom-config-tts": HaConfigAisDomConfigTts;
  }
}
