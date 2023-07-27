import "../../../components/ha-yaml-editor";
import "../../../components/ha-code-editor";
import "../../../components/ha-expansion-panel";
import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  PropertyValues,
  TemplateResult,
} from "lit";
import { customElement, property } from "lit/decorators";
import { load } from "js-yaml";
import { HomeAssistant } from "../../../types";
import "../../../layouts/hass-subpage";
import "../../../resources/ha-style";
import "./ha-config-ais-dom-dashboard";
import "../../../components/ha-switch";
import "@material/mwc-select";
import "@material/mwc-list/mwc-list-item";
import "../../../components/buttons/ha-call-service-button";
import "../../../components/ha-icon";
import "../../../components/ha-circular-progress";
import { handleFetchPromise } from "../../../util/hass-call-api";
import { haStyle } from "../../../resources/styles";

export interface aisSaveDbSettingsResponse {
  info: string;
  error: string;
}

export const aisSaveDbSettings = (params: {
  dbEngine: string;
  dbDrive: string;
  dbUser: string;
  dbPassword: string;
  dbServerIp: string;
  dbServerName: string;
  dbKeepDays: number;
  dbShowLogbook: boolean;
  dbShowHistory: boolean;
  dbInclude: any;
  dbExclude: any;
}) =>
  handleFetchPromise<aisSaveDbSettingsResponse>(
    fetch("/api/ais_file/ais_db_view", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify(params),
    })
  );

@customElement("ha-config-ais-dom-config-logs")
class HaConfigAisDomConfiglLogs extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() public isWide?: boolean;

  @property({ type: String }) private logLevel = "";

  @property({ type: String }) private logDrive = "";

  @property({ type: Number }) private logRotating = 1;

  @property({ type: String }) private logModeInfo = "";

  static get styles(): CSSResultGroup[] {
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
        ha-card > div#card-icon {
          margin: -4px 0;
          position: absolute;
          top: 1em;
          right: 1em;
          border-radius: 25px;
        }
        .center-container {
          text-align: center;
          height: 70px;
        }

        .config-invalid {
          color: red;
          text-align: center;
          padding-bottom: 1em;
        }
        .config-valid {
          color: green;
          text-align: center;
          padding-bottom: 1em;
        }
        .inportant-info {
          color: var(--primary-color);
          font-weight: bold;
        }

        @keyframes pulse {
          0% {
            background-color: var(--card-background-color);
          }
          100% {
            background-color: orange;
          }
        }
        @keyframes pulseRed {
          0% {
            background-color: var(--card-background-color);
          }
          100% {
            background-color: red;
          }
        }
      `,
    ];
  }

  private getLogError(logSettingsInfo) {
    let logError = "";
    if (logSettingsInfo.attributes.errorInfo) {
      logError = logSettingsInfo.attributes.errorInfo + " ";
    }
    if (this.logLevel === "debug") {
      logError +=
        "Logowanie w trybie debug generuje duże ilości logów i obciąża system. Używaj go tylko podczas diagnozowania problemu. ";
    }
    return logError;
  }

  private isNotSeleced(option) {
    if (!option) {
      return true;
    }
    if (option === "-") {
      return true;
    }
    if (option === "") {
      return true;
    }

    return false;
  }

  private getLogIconAnimationStyle(_logSettingsInfo) {
    if (!this.isNotSeleced(this.logDrive)) {
      if (this.logLevel === "debug") {
        return "animation: pulseRed 2s infinite;";
      }
      if (this.logLevel === "info") {
        return "animation: pulse 4s infinite;";
      }
      if (this.logLevel === "warning") {
        return "animation: pulse 7s infinite;";
      }
      if (this.logLevel === "error") {
        return "animation: pulse 8s infinite;";
      }
      if (this.logLevel === "critical") {
        return "animation: pulse 10s infinite;";
      }
    }
    return "";
  }


  private _getLogSettings() {
    // LOG
    const connectionInfo = this.hass.states["sensor.ais_logs_settings_info"];
    const connInfoAttr = connectionInfo.attributes;
    this.logDrive = connInfoAttr.logDrive;
    this.logLevel = connInfoAttr.logLevel;
    this.logRotating = connInfoAttr.logRotating;
  }

  protected firstUpdated(changedProps: PropertyValues): void {
    super.firstUpdated(changedProps);
    // LOG
    this._getLogSettings();
  }

  protected render(): TemplateResult {
    return html`
      <hass-subpage header="Konfiguracja bramki AIS dom">
        <ha-config-section .is-wide=${this.isWide}>
          <span slot="header">Ustawienie zapisu logów systemu</span>
          <ha-card header=" Wybór parametrów logowania">
            <div
              id="card-icon"
              .style=${this.getLogIconAnimationStyle(
                this.hass.states["sensor.ais_logs_settings_info"]
              )}
            >
              <ha-icon icon="mdi:content-save-edit"></ha-icon>
            </div>
            <div class="card-content">
              <ha-icon icon="mdi:bug-check"></ha-icon>

              <mwc-select
                label-float="Poziomy logowania"
                label="Poziomy logowania"
                .value=${this.logLevel}
                @selected=${this.logLevelChanged}
              >
                <mwc-list-item value="critical">critical</mwc-list-item>
                <mwc-list-item value="error">error</mwc-list-item>
                <mwc-list-item value="warning">warning</mwc-list-item>
                <mwc-list-item value="info">info</mwc-list-item>
                <mwc-list-item value="debug">debug</mwc-list-item>
              </mwc-select>
              <br />

              Jeśli chcesz zapisywać logi trwale do pliku, wybierz dysk wymienny
              (USB, SD card) na którym będą zapisywane logi: <br />
              <ha-icon icon="mdi:usb-flash-drive"></ha-icon>

              <mwc-select
                label-float="Dysk wymienny"
                label="Dysk wymienny"
                .value=${this.logDrive}
                @selected=${this.logDriveChanged}
              >
                ${this.hass.states[
                  "input_select.ais_usb_flash_drives"
                ].attributes.options!.map(
                  (item: string) =>
                    html`
                      <mwc-list-item .value=${item}> ${item}</mwc-list-item>
                    `
                )}
              </mwc-select>

              <br /><br />
              ${!this.isNotSeleced(this.logDrive)
                ? html`
                    Możesz określić liczbę dni przechowywanych w jednym pliku.
                    Rotacja plików dziennika wykonywna jest o północy.
                    <paper-input
                      type="number"
                      .value=${this.logRotating}
                      @change=${this.logRotatingDaysChanged}
                      maxlength="4"
                      max="9999"
                      min="1"
                      label-float="Liczba dni przechowywanych w jednym pliku loga"
                      label="Liczba dni przechowywanych w jednym pliku loga"
                    >
                      <ha-icon icon="mdi:calendar" slot="suffix"></ha-icon>
                    </paper-input>
                    Zmiana dysku lub zmiana liczby dni przechowywanych będzie
                    zralizowana po restartcie systemu.
                  `
                : html``}
            </div>

            <div class="card-content">
              <div class="config-invalid">
                <span class="text">
                  ${this.getLogError(
                    this.hass.states["sensor.ais_logs_settings_info"]
                  )}
                </span>
              </div>
            </div>
            <div class="card-content">${this.logModeInfo}</div>
          </ha-card>
        </ha-config-section>
        <br />
        <br />
      </hass-subpage>
    `;
  }

  private saveLoggerSettings() {
    this.hass.callService("ais_files", "change_logger_settings", {
      log_drive: this.logDrive,
      log_level: this.logLevel,
      log_rotating: this.logRotating,
    });
  }

  private logDriveChanged(ev) {
    const newValue = ev.target!.selected.value;
    if (newValue !== this.logDrive) {
      this.logDrive = newValue;
      if (!this.isNotSeleced(this.logDrive)) {
        this.logModeInfo =
          "Zapis logów do pliku /dyski-wymienne/" + this.logDrive + "/ais.log";
      } else {
        this.logModeInfo = "Zapis logów do pliku wyłączony ";
      }
      this.saveLoggerSettings();
    }
  }

  private logLevelChanged(ev) {
    const newValue = ev.target!.selected.value;
    if (newValue !== this.logLevel) {
      this.logLevel = newValue;
      this.logModeInfo = "Poziom logowania: " + this.logLevel;
      this.saveLoggerSettings();
    }
  }

  private logRotatingDaysChanged(ev) {
    const newValue = Number(ev.target.value);
    if (this.logRotating !== newValue) {
      this.logRotating = newValue;
      if (this.logRotating === 1) {
        this.logModeInfo = "Rotacja logów codziennie.";
      } else {
        this.logModeInfo = "Rotacja logów co " + this.logRotating + " dni.";
      }
      this.saveLoggerSettings();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-config-ais-dom-config-logs": HaConfigAisDomConfiglLogs;
  }
}
