import "@material/mwc-button";
import { css, CSSResultGroup, html, LitElement } from "lit";
import { property, state } from "lit/decorators";

class HaInitPage extends LitElement {
  @property({ type: Boolean }) public error = false;

  @state() showProgressIndicator = false;

  private _showProgressIndicatorTimeout;

  protected render() {
    return this.error
      ? html`
          <p>Czekam na połączenie z Asystentem domowym...</p>
          <mwc-button @click=${this._retry}>Ponów</mwc-button>
          ${location.host.includes("paczka.pro")
            ? html`
                <p>
                  Możliwe, że widzisz ten ekran, ponieważ Twój Asystent domowy
                  nie jest obecnie podłączony przez tunel. Możesz sprawdzić czy
                  tunel jest włączony w usługach bramki.
                </p>
              `
            : ""}
        `
      : html`
          <div id="progress-indicator-wrapper">
            ${this.showProgressIndicator
              ? html`<ha-circular-progress active></ha-circular-progress>`
              : ""}
          </div>
          <div id="loading-text">Loading data</div>
        `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._showProgressIndicatorTimeout);
  }

  protected firstUpdated() {
    this._showProgressIndicatorTimeout = setTimeout(async () => {
      await import("../components/ha-circular-progress");
      this.showProgressIndicator = true;
    }, 5000);
  }

  private _retry() {
    location.reload();
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        flex: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      #progress-indicator-wrapper {
        display: flex;
        align-items: center;
        margin: 25px 0;
        height: 50px;
      }
      a {
        color: var(--primary-color);
      }
      p,
      #loading-text {
        max-width: 350px;
        color: var(--primary-text-color);
      }
    `;
  }
}

customElements.define("ha-init-page", HaInitPage);

declare global {
  interface HTMLElementTagNameMap {
    "ha-init-page": HaInitPage;
  }
}
