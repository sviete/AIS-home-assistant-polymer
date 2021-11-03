import "../../layouts/ha-app-layout";
import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "../../components/ha-icon-button";
import "@polymer/paper-item/paper-icon-item";
import "@polymer/paper-item/paper-item";
import "@polymer/paper-item/paper-item-body";
import "@polymer/paper-listbox/paper-listbox";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu-light";
import "@material/mwc-list/mwc-list-item";
import "@polymer/paper-input/paper-textarea";
import "@polymer/paper-radio-button/paper-radio-button";
import "@polymer/paper-radio-group/paper-radio-group";
import "../../components/ha-button-menu";
import "../../components/ha-card";
import "../../components/ha-menu-button";
import "../../components/ha-slider";
import "../../components/ha-expansion-panel";
import "../../components/ha-checkbox";
import { PaperInputElement } from "@polymer/paper-input/paper-input";
import { UnsubscribeFunc } from "home-assistant-js-websocket";
import { mdiDrag } from "@mdi/js";
import { css, html, LitElement, PropertyValues } from "lit";
import { property, customElement, query } from "lit/decorators";
import { repeat } from "lit/directives/repeat";
import { guard } from "lit/directives/guard";
import {
  addItem,
  clearItems,
  fetchItems,
  AisTtsItem,
  updateItem,
  reorderItems,
} from "./aistts";
import { showConfirmationDialog } from "../../dialogs/generic/show-dialog-box";
import { navigate } from "../../common/navigate";
import { haStyle } from "../../resources/styles";
import { HomeAssistant } from "../../types";

interface Voice {
  key: string;
  name: string;
  lang: string;
}

let voices: Voice[] = [];

const allVoices: Voice[] = [
  {
    key: "jola",
    name: "Jola",
    lang: "pl_PL",
  },
  {
    key: "celina",
    name: "Celina",
    lang: "pl_PL",
  },
  {
    key: "anżela",
    name: "Anżela",
    lang: "pl_PL",
  },
  {
    key: "asia",
    name: "Asia",
    lang: "pl_PL",
  },
  {
    key: "sebastian",
    name: "Sebastian",
    lang: "pl_PL",
  },
  {
    key: "bartek",
    name: "Bartek",
    lang: "pl_PL",
  },
  {
    key: "andrzej",
    name: "Andrzej",
    lang: "pl_PL",
  },
  {
    key: "mariya",
    name: "Mariya",
    lang: "uk_UA",
  },
  {
    key: "allison",
    name: "Allison",
    lang: "en_GB",
  },
  {
    key: "jon",
    name: "Jon",
    lang: "en_GB",
  },
  {
    key: "sophia",
    name: "Sophia",
    lang: "en_GB",
  },
  {
    key: "sam",
    name: "Sam",
    lang: "en_GB",
  },
];

let Sortable;

@customElement("ha-panel-aistts")
export class HaPanelAisTts extends LitElement {
  @property() hass!: HomeAssistant;

  @property() public narrow!: boolean;

  @property() private _uncheckedItems?: AisTtsItem[];

  @property() private _checkedItems?: AisTtsItem[];

  @property() private _textValue = "";

  @property() private _selectedLanguage = "pl_PL";

  @property() private _selectedVoice = "pl-pl-x-oda-local";

  @property() private _speedValue = 1;

  @property() private _pitchValue = 1;

  @property() private _delayValue = 0;

  @property() private _counterValue = 0;

  @property() private _play_counting = false;

  @property() private _fileNameValue = "";

  @property() private _reordering = false;

  @property() private _renderEmptySortable = false;

  private _sortable?;

  @query("#sortable-tts", true) private _sortableEl?: HTMLElement;

  protected firstUpdated(changedProps: PropertyValues): void {
    super.firstUpdated(changedProps);
    if (this.hass.user!.is_admin) {
      this.hassSubscribeListUpdate();
      this.hassSubscribeSayText();
    }

    this._fetchData();
  }

  protected render() {
    return html`
      <ha-app-layout>
        <app-header slot="header" fixed>
          <app-toolbar>
            <ha-menu-button
              .hass=${this.hass}
              .narrow=${this.narrow}
            ></ha-menu-button>
            <div main-title>TTS Ręczny</div>
            <ha-icon-button
              label="Dodaj"
              icon="hass:music-box-multiple-outline"
              @click=${this._showBrowseMedia}
            ></ha-icon-button>
          </app-toolbar>
        </app-header>

        <div class="content">
          <ha-card>
            <paper-radio-group
              name="selectedLanguage"
              .selected=${this._selectedLanguage}
              @selected-changed=${this._setLanguage}
            >
              <paper-radio-button
                name="pl_PL"
                lang="pl_PL"
                .disabled=${this._play_counting}
              >
                <img
                  style="width: 50px;"
                  src="/static/ais_dom/Flag_of_Poland.svg"
                />
                Polski
              </paper-radio-button>
              <paper-radio-button
                name="en_GB"
                lang="en_GB"
                .disabled=${this._play_counting}
              >
                <img
                  style="width: 50px;"
                  src="/static/ais_dom/Flag_of_the_United_Kingdom.svg"
                />
                English
              </paper-radio-button>
              <paper-radio-button
                name="uk_UA"
                lang="uk_UA"
                .disabled=${this._play_counting}
              >
                <img
                  style="width: 50px;"
                  src="/static/ais_dom/Flag_of_Ukraine.svg"
                />
                Український
              </paper-radio-button>
            </paper-radio-group>
            <paper-icon-item>
              <paper-item-body>
                <paper-textarea
                  class="addBox"
                  label="Tekst do przeczytania"
                  placeholder="wpisz nowy tekst do przeczytania"
                  name="description"
                  maxRows="1"
                  .disabled=${this._play_counting}
                  .value="${this._textValue}"
                  @change="${this._textValueChanged}"
                ></paper-textarea>
                ${this.hass.user!.is_admin
                  ? html`
                      <div class="AisTtsLang">
                        <paper-dropdown-menu-light
                          label="Głos"
                          style="margin-left: 30px; width:250px;"
                          .disabled=${this._play_counting}
                        >
                          <paper-listbox
                            slot="dropdown-content"
                            attr-for-selected="voice"
                            .selected=${this._selectedVoice}
                            @iron-select=${this._setVoice}
                          >
                            ${voices.map(
                              (voice) => html`
                                <paper-item voice=${voice.key}
                                  >${voice.name}</paper-item
                                >
                              `
                            )}
                          </paper-listbox>
                        </paper-dropdown-menu-light>
                        <label
                          class="label-is-floating"
                          style=" font-size: 12px; color: var(--primary-color);"
                          >Prędkość</label
                        >
                        <ha-slider
                          editable
                          pin
                          step="0.1"
                          min="0.3"
                          max="4"
                          .value="${Number(this._speedValue)}"
                          @change="${this._speedValueChanged}"
                          .disabled=${this._play_counting}
                        ></ha-slider>
                        <label
                          class="label-is-floating"
                          style="margin-left: 30px; font-size: 12px; color: var(--primary-color);"
                          >Ton</label
                        >
                        <ha-slider
                          editable
                          pin
                          step="0.1"
                          min="0.3"
                          max="4"
                          .value="${Number(this._pitchValue)}"
                          @change="${this._pitchValueChanged}"
                          .disabled=${this._play_counting}
                        ></ha-slider>
                      </div>
                      <paper-input
                        label="Nazwa pliku"
                        placeholder="jeśli podasz nazwę pliku to zapiszemy go pod tą nazwą w bibliotece na dysku"
                        type="text"
                        .value=${this._fileNameValue}
                        @change=${this._fileNameValueChanged}
                        maxRows="1"
                        .disabled=${this._play_counting}
                      ></paper-input>
                    `
                  : ``}
                <div class="AisTtsDelay">
                  <div class="AisTtsDelayItems">
                    <paper-input
                      class="AisTtsDelayInput"
                      label="Opóźnienie wysłania komunikatu w sekundach"
                      placeholder="0"
                      type="number"
                      min="0"
                      max="99"
                      .value=${this._delayValue}
                      step="1"
                      @change=${this._delayValueChanged}
                      .disabled=${this._play_counting}
                    ></paper-input>
                  </div>
                </div>
                <div class="AisButtons">
                  ${Number(this._counterValue) > 0
                    ? html` <mwc-button
                        name="Opóźnienie"
                        style="margin-top: 6px;"
                      >
                        Opóźnienie: ${this._counterValue}
                      </mwc-button>`
                    : html``}
                  <ha-icon-button
                    slot="item-icon"
                    icon="hass:play"
                    @click=${this._playItem}
                    .disabled=${this._play_counting}
                  ></ha-icon-button>
                  <ha-icon-button
                    slot="item-icon"
                    icon="hass:stop"
                    @click=${this._stopPlayItem}
                  ></ha-icon-button>
                  ${this.hass.user!.is_admin
                    ? html`
                        <ha-icon-button
                          slot="item-icon"
                          icon="hass:plus"
                          @click=${this._addItem}
                          .disabled=${this._play_counting}
                        ></ha-icon-button>
                      `
                    : ``}
                  <span>&nbsp;</span>
                </div>
              </paper-item-body>
            </paper-icon-item>
          </ha-card>
          ${this.hass.user!.is_admin
            ? html`
                <div class="tip">
                  Wpisz tekst, wybierz język i parametry, a następnie kliknij
                  „Play”, aby usłyszeć czytany tekst.<br />Żeby dodać pozycję do
                  listy naciśnij "Plus".
                </div>
              `
            : html`
                <div class="tip">
                  Wpisz tekst a następnie kliknij „Play”, aby usłyszeć czytany
                  tekst.<br />
                  Możesz też dodać opóźnienie i wybrać tekst z listy.
                </div>
              `}
          ${!this._play_counting
            ? html`<ha-card>
                ${this._reordering
                  ? html`
                      ${guard(
                        [this._uncheckedItems, this._renderEmptySortable],
                        () =>
                          this._renderEmptySortable
                            ? ""
                            : this._renderItems(this._uncheckedItems!)
                      )}
                    `
                  : this._renderItems(this._uncheckedItems!)}
                ${this._checkedItems && this._checkedItems!.length > 0
                  ? html`
                      <div class="divider"></div>
                      <div class="checked">
                        <span> Pozycje zaznaczone </span>
                        <ha-icon
                          class="clearall"
                          tabindex="0"
                          icon="hass:delete"
                          title="Usuń zaznaczone"
                          @click=${this._clearItems}
                        >
                        </ha-icon>
                      </div>
                      ${repeat(
                        this._checkedItems!,
                        (item) => item.id,
                        (item) =>
                          html`
                            <div class="editRow">
                              <ha-checkbox
                                tabindex="0"
                                ?checked=${item.complete}
                                .itemId=${item.id}
                                @click=${this._completeItem}
                              ></ha-checkbox>
                              <paper-input
                                no-label-float
                                .value=${item.name}
                                .itemId=${item.id}
                                @change=${this._saveEdit}
                              ></paper-input>
                            </div>
                          `
                      )}
                    `
                  : ""}
              </ha-card>`
            : html``}
        </div>
      </ha-app-layout>
    `;
  }

  private _showBrowseMedia(): void {
    navigate("/media-browser");
  }

  public hassSubscribeListUpdate(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [
      this.hass!.connection.subscribeEvents(
        () => this._fetchData(),
        "aistts_list_updated"
      ),
    ];
  }

  public hassSubscribeSayText(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [
      this.hass!.connection.subscribeEvents(
        () => this._playItem(""),
        "aistts_play_item"
      ),
    ];
  }

  private _renderItems(items: AisTtsItem[]) {
    if (items === undefined) {
      return html``;
    }

    return html` ${this.hass.user!.is_admin
        ? html`<div class="AisButtons">
              <ha-icon-button
                slot="item-icon"
                icon="hass:sort"
                @click=${this._toggleReorder}
              ></ha-icon-button>
            </div>
            <div class="divider"></div>`
        : html``}
      <div class="checked">
        <span> Dostępne pozycje </span>
      </div>
      <div id="sortable-tts">
        ${repeat(
          this._uncheckedItems!,
          (item) => item.id,
          (item) =>
            html`
              <div class="editRow" tts-item-id=${item.id}>
                ${this.hass.user!.is_admin
                  ? html`
                      <ha-expansion-panel>
                        <div class="ItemInfo">
                          <span class="ItemInfoLabel">Język</span
                          ><span class="ItemInfoValue">${item.language}</span>
                          <span class="ItemInfoLabel">Prędkość</span
                          ><span class="ItemInfoValue">${item.pitch}</span>
                          <span class="ItemInfoLabel">Ton</span
                          ><span class="ItemInfoValue">${item.rate}</span>
                          <span class="ItemInfoLabel">Głos</span
                          ><span class="ItemInfoValue">${item.voice}</span>
                        </div>
                        <div>
                          <span class="ItemInfoLabel">GET Request: </span>
                          ${this._getItemRow(item, false)}
                        </div>
                      </ha-expansion-panel>
                      <ha-checkbox
                        tabindex="0"
                        ?checked=${item.complete}
                        .itemId=${item.id}
                        @click=${this._completeItem}
                      ></ha-checkbox>
                    `
                  : ``}
                <paper-input
                  no-label-float
                  .value=${item.name}
                  .itemId=${item.id}
                  .disabled=${!this.hass.user!.is_admin}
                  @change=${this._saveEdit}
                ></paper-input>
                <ha-icon-button
                  slot="item-icon"
                  icon="hass:play"
                  .item=${item}
                  @click=${this._playItemRow}
                ></ha-icon-button>
                ${this._reordering
                  ? html`
                      <ha-svg-icon
                        title="Reorder"
                        class="reorderButton"
                        .path=${mdiDrag}
                      >
                      </ha-svg-icon>
                    `
                  : ""}
              </div>
            `
        )}
      </div>`;
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) {
      return;
    }
    const checkedItems: AisTtsItem[] = [];
    const uncheckedItems: AisTtsItem[] = [];
    const items = await fetchItems(this.hass);
    for (const key in items) {
      if (items[key].complete) {
        checkedItems.push(items[key]);
      } else {
        uncheckedItems.push(items[key]);
      }
    }
    this._checkedItems = checkedItems;
    this._uncheckedItems = uncheckedItems;

    if (this._reordering) {
      this._createSortable();
    }
  }

  private _completeItem(ev): void {
    updateItem(this.hass!, ev.target.itemId, {
      complete: ev.target.checked,
    }).catch(() => this._fetchData());
  }

  private _saveEdit(ev): void {
    updateItem(this.hass!, ev.target.itemId, {
      name: ev.target.value,
    }).catch(() => this._fetchData());

    ev.target.blur();
  }

  private _clearItems() {
    showConfirmationDialog(this, {
      text: "Zaznaczone pozycje zostaną trwale usunięte. Czy jesteś pewny?",
      dismissText: "Anuluj",
      confirmText: "Tak potwierdzam",
      confirm: () => {
        clearItems(this.hass).catch(() => this._fetchData());
      },
    });
  }

  private get _newItem(): PaperInputElement {
    return this.shadowRoot!.querySelector(".addBox") as PaperInputElement;
  }

  private _updateCounterAndPlay(text) {
    this._counterValue -= 1;
    if (this._counterValue > 0 && this._play_counting) {
      setTimeout(() => this._updateCounterAndPlay(text), 1000);
      return;
    }

    // play and unblock
    if (this._play_counting) {
      this._play_counting = false;
      this.hass.callService("ais_ai_service", "say_it", {
        text: text,
        pitch: this._pitchValue,
        rate: this._speedValue,
        language: this._selectedLanguage,
        voice: this._selectedVoice,
        path: this._fileNameValue,
      });
    }
  }

  private _playItem(_ev): void {
    const newItem = this._newItem;
    let text = newItem.value;
    if (text === undefined || text === null || text.length === 0) {
      text = "Wpisz tekst do przeczytania";
      this.hass.callService("ais_ai_service", "say_it", {
        text: text,
      });
    } else {
      this._counterValue = this._delayValue;
      this._play_counting = true;
      this._updateCounterAndPlay(text);
    }
  }

  private _stopPlayItem(_ev): void {
    this._play_counting = false;
    this._counterValue = 0;
    this.hass.callService("ais_tts", "stop_talking", {
      mode: "manual",
    });
  }

  private _getItemRow(item, encode): string {
    const sUrl =
      "http://" +
      this.hass.states["sensor.internal_ip_address"].state.trim() +
      ":8122/text_to_speech?language=" +
      item.language +
      "&voice=" +
      item.voice +
      "&rate=" +
      item.rate +
      "&pitch=" +
      item.pitch +
      "&text=" +
      item.name;
    if (encode) {
      return encodeURI(sUrl);
    }
    return sUrl;
  }

  private _playItemRow(ev): void {
    this._fileNameValue = "";
    this._counterValue = this._delayValue;
    this._pitchValue = ev.target.item.pitch;
    this._speedValue = ev.target.item.rate;
    this._selectedLanguage = ev.target.item.language;
    this._play_counting = true;
    const name = ev.target.item.name;
    this._textValue = name;
    const voice = ev.target.item.voice;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    setTimeout(function () {
      that._selectedVoice = voice;
      that._updateCounterAndPlay(name);
    }, 500);
  }

  private _addItem(ev): void {
    const newItem = this._newItem;

    if (newItem.value!.trim().length > 0) {
      addItem(
        this.hass!,
        newItem.value!,
        String(this._pitchValue),
        String(this._speedValue),
        this._selectedLanguage,
        this._selectedVoice
      ).catch(() => this._fetchData());
    }

    newItem.value = "";
    if (ev) {
      newItem.focus();
    }
  }

  private async _toggleReorder() {
    if (!Sortable) {
      const sortableImport = await import(
        "sortablejs/modular/sortable.core.esm"
      );
      Sortable = sortableImport.Sortable;
    }
    this._reordering = !this._reordering;
    await this.updateComplete;
    if (this._reordering) {
      this._createSortable();
    } else {
      this._sortable?.destroy();
      this._sortable = undefined;
    }
  }

  private _createSortable() {
    if (!this.hass.user!.is_admin) {
      return;
    }
    this._sortable = new Sortable(
      this.shadowRoot!.getElementById("sortable-tts"),
      {
        animation: 150,
        fallbackClass: "sortable-fallback",
        dataIdAttr: "tts-item-id",
        handle: "ha-svg-icon",
        onSort: async (evt) => {
          reorderItems(this.hass!, this._sortable.toArray()).catch(() =>
            this._fetchData()
          );
          this._uncheckedItems!.splice(
            evt.newIndex,
            0,
            this._uncheckedItems!.splice(evt.oldIndex, 1)[0]
          );
          this._renderEmptySortable = true;
          await this.updateComplete;
          while (this._sortableEl?.lastElementChild) {
            this._sortableEl.removeChild(this._sortableEl.lastElementChild);
          }
          this._renderEmptySortable = false;
        },
      }
    );
  }

  private _loadVoices(lang): void {
    voices = allVoices.filter((voice: Voice) => voice.lang === lang);
    this._selectedVoice = voices[0].key;
  }

  private async _setLanguage(ev): Promise<void> {
    const newVal = ev.detail.value;
    this._selectedLanguage = newVal;
    this._loadVoices(newVal);
  }

  private async _setVoice(ev): Promise<void> {
    const voice = ev.detail.item.getAttribute("voice");
    this._selectedVoice = voice;
  }

  private _textValueChanged(ev): void {
    const newVal = ev.target.value;
    this._textValue = newVal;
  }

  private _speedValueChanged(ev): void {
    const newVal = ev.target.value;
    this._speedValue = newVal;
  }

  private _pitchValueChanged(ev): void {
    const newVal = ev.target.value;
    this._pitchValue = newVal;
  }

  private _delayValueChanged(ev): void {
    const newVal = ev.target.value;
    this._delayValue = newVal;
    this._counterValue = newVal;
  }

  private _fileNameValueChanged(ev): void {
    const newVal = ev.target.value;
    this._fileNameValue = newVal;
  }

  static get styles() {
    return [
      haStyle,
      css`
        ha-card {
          padding: 16px;
        }

        .has-header {
          padding-top: 0;
        }

        .editRow,
        .addRow,
        .checked {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .addRow ha-icon {
          color: var(--secondary-text-color);
          --mdc-icon-size: 26px;
        }

        .addButton {
          padding-right: 16px;
          cursor: pointer;
        }

        ha-checkbox {
          padding-left: 4px;
          padding-right: 20px;
          --ha-checkbox-label-spacing: 0px;
        }

        paper-input {
          flex-grow: 1;
        }

        .checked {
          margin: 12px 0;
          justify-content: space-between;
        }

        .checked span {
          color: var(--primary-color);
        }

        .divider {
          height: 1px;
          background-color: var(--divider-color);
          margin: 10px 0;
        }

        .clearall {
          cursor: pointer;
        }
        :host {
          height: 100%;
        }
        app-toolbar paper-listbox {
          width: 150px;
        }
        app-toolbar paper-item {
          cursor: pointer;
        }
        .content {
          padding-bottom: 32px;
          max-width: 96%;
          margin: 0 auto;
        }
        paper-icon-item {
          border-top: 1px solid var(--divider-color);
        }
        paper-icon-item:first-child {
          border-top: 0;
        }
        ha-checkbox {
          padding: 11px;
        }
        paper-input {
          --paper-input-container-underline: {
            display: none;
          }
          --paper-input-container-underline-focus: {
            display: none;
          }
          position: relative;
          top: 1px;
        }
        .tip {
          padding: 24px;
          text-align: center;
          color: var(--secondary-text-color);
        }
        .AisTtsLang {
          display: flex;
        }
        .AisTtsDelay {
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
        }
        .AisTtsDelayItems {
          width: 16em;
        }
        div.AisButtons {
          float: right;
          text-align: right;
          display: ruby;
        }
        div.ItemInfo {
          font-size: 12px;
        }
        span.ItemInfoLabel {
          margin-right: 6px;
          color: var(--primary-color);
        }
        ha-expansion-panel {
          width: 3em;
          height: 1em;
        }
        ha-expansion-panel[expanded] {
          width: 50%;
          height: 10em;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-panel-aistts": HaPanelAisTts;
  }
}
