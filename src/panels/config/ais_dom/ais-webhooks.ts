import { html, LitElement, PropertyDeclarations, property } from "lit-element";
import "@polymer/paper-item/paper-item";
import "@polymer/paper-item/paper-item-body";
import "@polymer/paper-spinner/paper-spinner";
import "../../../components/ha-card";

import { HomeAssistant } from "../../../types";
import { Webhook, fetchWebhooks } from "../../../data/webhook";

import { showManageCloudhookDialog } from "./dialog-manage-ais-cloudhook/show-dialog-manage-ais-cloudhook";

export class AisWebhooks extends LitElement {
  @property() public hass?: HomeAssistant;

  @property() private _localHooks?: Webhook[];

  static get properties(): PropertyDeclarations {
    return {
      hass: {},
      _localHooks: {},
    };
  }

  public connectedCallback() {
    super.connectedCallback();
    this._fetchData();
  }

  protected render() {
    return html`
      ${this.renderStyle()}
      <ha-card header="Wywołania zwrotne HTTP">
        <div class="card-content">
          Wywołania zwrotne HTTP (Webhook) używane są do udostępniania
          powiadomień o zdarzeniach. Wszystko, co jest skonfigurowane do
          uruchamiania przez wywołanie zwrotne, ma publicznie dostępny unikalny
          adres URL, aby umożliwić wysyłanie danych do Asystenta domowego z
          dowolnego miejsca. ${this._renderBody()}

          <div class="footer">
            <a href="https://www.ai-speaker.com/" target="_blank">
              Dowiedz się więcej o zwrotnym wywołaniu HTTP.
            </a>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _renderBody() {
    if (!this._localHooks) {
      return html` <div class="body-text">Pobieranie…</div> `;
    }

    if (this._localHooks.length === 1) {
      return html`
        <div class="body-text">
          Wygląda na to, że nie masz jeszcze zdefiniowanych żadnych wywołań
          zwrotnych. Rozpocznij od skonfigurowania
          <a href="/config/integrations">
            integracji opartej na wywołaniu zwrotnym
          </a>
          lub przez tworzenie
          <a href="/config/automation/new"> automatyzacji typu webhook </a>.
        </div>
      `;
    }

    return this._localHooks.map(
      (entry) => html`
        ${entry.webhook_id === "aisdomprocesscommandfromframe"
          ? html` <div></div> `
          : html`
              <div class="webhook" .entry="${entry}">
                <paper-item-body two-line>
                  <div>
                    ${entry.name}
                    ${entry.domain === entry.name.toLowerCase()
                      ? ""
                      : ` (${entry.domain})`}
                  </div>
                  <div secondary>${entry.webhook_id}</div>
                </paper-item-body>
                <mwc-button @click="${this._handleManageButton}">
                  Pokaż
                </mwc-button>
              </div>
            `}
      `
    );
  }

  private _showDialog(webhookId: string) {
    const webhook = this._localHooks!.find(
      (ent) => ent.webhook_id === webhookId
    )!;
    showManageCloudhookDialog(this, { webhook });
  }

  private _handleManageButton(ev: MouseEvent) {
    const entry = (ev.currentTarget as any).parentElement.entry as Webhook;
    this._showDialog(entry.webhook_id);
  }

  private async _fetchData() {
    this._localHooks = await fetchWebhooks(this.hass!);
  }

  private renderStyle() {
    return html`
      <style>
        .body-text {
          padding: 8px 0;
        }
        .webhook {
          display: flex;
          padding: 4px 0;
        }
        .progress {
          margin-right: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .footer {
          padding-top: 16px;
        }
        .body-text a,
        .footer a {
          color: var(--primary-color);
        }
      </style>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ais-webhooks": AisWebhooks;
  }
}

customElements.define("ais-webhooks", AisWebhooks);
