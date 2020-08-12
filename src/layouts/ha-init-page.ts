import "@material/mwc-button";
import { css, CSSResult, html, LitElement, property } from "lit-element";
import { removeInitSkeleton } from "../util/init-skeleton";
import "../components/ha-circular-progress";

class HaInitPage extends LitElement {
  @property({ type: Boolean }) public error = false;

  protected render() {
    return html`
      <div>
        <img src="/static/icons/favicon-192x192.png" height="192" />
        ${this.error
          ? html`
              <p>Czekam na połączenie z Asystentem domowym...</p>
              <mwc-button @click=${this._retry}>Ponów</mwc-button>
              ${location.host.includes("ui.nabu.casa")
                ? html`
                    <p>
                      It is possible that you are seeing this screen because
                      your Home Assistant is not currently connected. You can
                      ask it to come online via
                      <a href="https://remote.nabucasa.com/"
                        >the Remote UI portal</a
                      >.
                    </p>
                  `
                : ""}
            `
          : html`
              <ha-circular-progress active></ha-circular-progress>
              <p>Wczytuje dane</p>
            `}
      </div>
    `;
  }

  protected firstUpdated() {
    removeInitSkeleton();
  }

  private _retry() {
    location.reload();
  }

  static get styles(): CSSResult {
    return css`
      div {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      ha-circular-progress {
        margin-top: 9px;
      }
      a {
        color: var(--primary-color);
      }
      p {
        max-width: 350px;
        color: var(--text-primary-color);
      }
    `;
  }
}

customElements.define("ha-init-page", HaInitPage);
