import { css, CSSResultGroup, LitElement, svg, SVGTemplateResult } from "lit";
import { customElement } from "lit/decorators";

@customElement("ha-logo-svg")
export class HaLogoSvg extends LitElement {
  protected render(): SVGTemplateResult {
    return svg`
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="48.43 66.19 120.58 192.4"><defs><filter id="a" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="0.51 0.5" result="blur"/></filter><filter id="b" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="0.51 0.5" result="blur"/></filter><filter id="c" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="0.51 0.5" result="blur"/></filter><filter id="d" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="0.51 0.5" result="blur"/></filter><filter id="e" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="0.51 0.5" result="blur"/></filter><filter id="f" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="0.51 0.5" result="blur"/></filter></defs><g fill-rule="evenodd" stroke="#fff" stroke-width=".511" stroke-miterlimit="4" stroke-dasharray="0 5.616" stroke-dashoffset="7.56" stroke-opacity="1"><path d="M39.429 22.429C21.226 22.429 6.57 40.774 6.57 63.56v183.153h65.715V63.56c0-22.787-14.654-41.132-32.857-41.132z" transform="translate(46.109 57.663) scale(.39179)" opacity="1" fill="#d04400" fill-opacity=".929" filter="url(#a)"/><path d="M39.429 14.025C21.226 14.025 6.57 32.37 6.57 55.157v98.868h61.354c1.479 0 2.933.089 4.361.246V55.157c0-22.787-14.654-41.132-32.857-41.132z" transform="translate(92.823 93.978) scale(.39179)" opacity="1" fill="#f69562" fill-opacity="1" filter="url(#b)"/><path d="M39.429 8C21.226 8 6.57 26.346 6.57 49.133V88h65.715V49.133C72.286 26.346 57.632 8 39.43 8z" transform="translate(140.432 119.846) scale(.39179)" opacity="1" fill="#ffbd77" fill-opacity="1" filter="url(#c)"/><path d="M39.429 22.429C21.226 22.429 6.57 40.774 6.57 63.56v183.153h65.715V63.56c0-22.787-14.654-41.132-32.857-41.132z" transform="matrix(.39179 0 0 -.39179 46.109 267.13)" opacity="1" fill="#d04400" fill-opacity=".929" filter="url(#d)"/><path d="M39.429 14.025C21.226 14.025 6.57 32.37 6.57 55.157v98.868h61.354c1.479 0 2.933.089 4.361.246V55.157c0-22.787-14.654-41.132-32.857-41.132z" transform="matrix(.39179 0 0 -.39179 92.823 230.716)" opacity="1" fill="#f69562" fill-opacity="1" filter="url(#e)"/><path d="M39.429 8C21.226 8 6.57 26.346 6.57 49.133V88h65.715V49.133C72.286 26.346 57.632 8 39.43 8z" transform="matrix(.39179 0 0 -.39179 140.432 204.472)" opacity="1" fill="#ffbd77" fill-opacity="1" filter="url(#f)"/></g></svg>`;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: var(--ha-icon-display, inline-flex);
        align-items: center;
        justify-content: center;
        position: relative;
        vertical-align: middle;
        fill: currentcolor;
        width: var(--mdc-icon-size, 24px);
        height: var(--mdc-icon-size, 24px);
      }
      svg {
        width: 100%;
        height: 100%;
        pointer-events: none;
        display: block;
      }
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "ha-logo-svg": HaLogoSvg;
  }
}
