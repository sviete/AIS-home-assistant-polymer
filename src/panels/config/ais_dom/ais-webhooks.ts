import { css, CSSResultGroup, html, LitElement, PropertyDeclarations } from "lit";
import {property} from 'lit/decorators';
import "@polymer/paper-item/paper-item";
import "@polymer/paper-item/paper-item-body";
import "../../../components/ha-card";

import { HomeAssistant } from "../../../types";
import { Webhook, fetchWebhooks } from "../../../data/webhook";

import { showManageCloudhookDialog } from "./dialog-manage-ais-cloudhook/show-dialog-manage-ais-cloudhook";
import { haStyle } from "../../../resources/styles";
import { isComponentLoaded } from "../../../common/config/is_component_loaded";

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
      <ha-card header="Wywołania zwrotne HTTP">
        <div class="card-content">
          Wywołania zwrotne HTTP (Webhook) używane są do udostępniania
          powiadomień o zdarzeniach. Wszystko, co jest skonfigurowane do
          uruchamiania przez wywołanie zwrotne, ma publicznie dostępny unikalny
          adres URL, aby umożliwić wysyłanie danych do Asystenta domowego z
          dowolnego miejsca. ${this._renderBody()}

          <div class="footer">
            <a href="https://www.home-assistant.io/docs/automation/trigger/#webhook-trigger" target="_blank">
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
          <a href="/config/automation/new"> automatyzacji opartej na wyzwalaczu webhook </a>.
        </div>
      `;
    }

    return this._localHooks.map(
      (entry) => html`
        ${entry.webhook_id === "aisdomprocesscommandfromframe"
          ? html` <div></div> `
          : html`
              <div class="webhook" .entry=${entry}>
                <paper-item-body two-line>
                  <div>
                    ${entry.name}
                    ${entry.domain === entry.name.toLowerCase()
                      ? ""
                      : ` (${entry.domain})`}
                  </div>
                  <div secondary>${entry.webhook_id}</div>
                </paper-item-body>
                <mwc-button @click=${this._handleManageButton}>
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
    showManageCloudhookDialog(this, {
      webhook,
    });
  }

  private _handleManageButton(ev: MouseEvent) {
    const entry = (ev.currentTarget as any).parentElement.entry as Webhook;
    this._showDialog(entry.webhook_id);
  }

  private async _fetchData() {
    if (!isComponentLoaded(this.hass!, "webhook")) {
      this._localHooks = [];
      return;
    }
    const hooks = await fetchWebhooks(this.hass!);
    this._localHooks = hooks.filter(
      (hook) =>
        // Only hooks that are not limited to local requests are relevant
        !hook.local_only &&
        // Deleted webhooks -> nobody cares :)
        (hook.domain !== "mobile_app" || hook.name !== "Deleted Webhook")
    );
  }

  static get styles(): CSSResultGroup {
    return [
      haStyle,
      css`
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
        `,
      ];
    }
}

declare global {
  interface HTMLElementTagNameMap {
    "ais-webhooks": AisWebhooks;
  }
}

customElements.define("ais-webhooks", AisWebhooks);
