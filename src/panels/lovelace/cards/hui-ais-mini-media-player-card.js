(function() {
  "use strict";
  function a() {
    const b = ya(["<span class=", ">", "</span>"]);
    return (
      (a = function() {
        return b;
      }),
      b
    );
  }
  function b() {
    const a = ya(["<span class=", ">", "</span>"]);
    return (
      (b = function() {
        return a;
      }),
      a
    );
  }
  function c() {
    const a = ya([
      "\n          <div>\n            <div class='marquee'>\n              ",
      "\n            </div>\n          </div>",
    ]);
    return (
      (c = function() {
        return a;
      }),
      a
    );
  }
  function d() {
    const a = ya([
      "\n      <div class='entity__info__media'\n        ?short=",
      "\n        ?short-scroll=",
      "\n        ?scroll=",
      "\n        style='animation-duration: ",
      "s;'>\n        ",
      "\n        ",
      "\n      </div>",
    ]);
    return (
      (d = function() {
        return a;
      }),
      a
    );
  }
  function e() {
    const a = ya([
      "\n      <div class='entity__info__name'>\n        ",
      " ",
      "\n      </div>",
    ]);
    return (
      (e = function() {
        return a;
      }),
      a
    );
  }
  function f() {
    const a = ya([
      "\n      <div class='entity__icon'>\n        <ha-icon .icon=",
      "></ha-icon>\n      </div>",
    ]);
    return (
      (f = function() {
        return a;
      }),
      a
    );
  }
  function g() {
    const a = ya([
      "\n        <div class='entity__artwork'\n          style='background-image: ",
      ";'\n          ?border=",
      "\n          state=",
      ">\n        </div>",
    ]);
    return (
      (g = function() {
        return a;
      }),
      a
    );
  }
  function h() {
    const a = ya(["<div class='cover' style='background-image: ", ";'></div>"]);
    return (
      (h = function() {
        return a;
      }),
      a
    );
  }
  function i() {
    const a = ya([
      "\n            <mmp-progress\n              .player=",
      "\n              .showTime=",
      ">\n            </mmp-progress>\n          ",
    ]);
    return (
      (i = function() {
        return a;
      }),
      a
    );
  }
  function j() {
    const a = ya([
      "\n              <mmp-tts\n                .config=",
      "\n                .hass=",
      "\n                .entity=",
      ">\n              </mmp-tts>\n            ",
    ]);
    return (
      (j = function() {
        return a;
      }),
      a
    );
  }
  function k() {
    const a = ya([
      "\n              <mmp-media-controls\n                .player=",
      "\n                .config=",
      "\n                .break=",
      ">\n              </mmp-media-controls>\n            ",
    ]);
    return (
      (k = function() {
        return a;
      }),
      a
    );
  }
  function l() {
    const a = ya([
      "\n      <ha-card\n        @click=",
      "\n        class=",
      "\n        artwork=",
      "\n        content=",
      ">\n        <div class='mmp__bg'>\n          ",
      "\n        </div>\n        <div class='mmp-player'>\n          <div class='mmp-player__core flex' ?inactive=",
      ">\n            ",
      "\n            <div class='entity__info'>\n              ",
      "\n              ",
      "\n            </div>\n            <mmp-powerstrip\n              @toggleGroupList=",
      "\n              .hass=",
      "\n              .player=",
      "\n              .config=",
      "\n              .groupVisible=",
      "\n              .idle=",
      "\n              ?flow=",
      ">\n            </mmp-powerstrip>\n          </div>\n          <div class='mmp-player__adds'>\n            ",
      "\n            <mmp-shortcuts\n              .player=",
      "\n              .shortcuts=",
      ">\n            </mmp-shortcuts>\n            ",
      "\n            <mmp-group-list\n              .visible=",
      "\n              .entities=",
      "\n              .player=",
      ">\n            </mmp-group-list>\n          </div>\n        </div>\n        <div class='mmp__container'>\n          ",
      "\n        </div>\n      </ha-card>\n    ",
    ]);
    return (
      (l = function() {
        return a;
      }),
      a
    );
  }
  function m() {
    const a = ya([
      "\n        :host {\n          display: flex;\n          line-height: 40px;\n          max-height: 40px;\n        }\n        :host([flow]) mmp-media-controls {\n          max-width: unset;\n        }\n        mmp-media-controls {\n          max-width: 200px;\n          line-height: initial;\n        }\n        .group-button {\n          height: 34px;\n          width: 34px;\n          min-width: 34px;\n          margin: 3px;\n        }\n        paper-icon-button {\n          min-width: 40px;\n        }\n      ",
    ]);
    return (
      (m = function() {
        return a;
      }),
      a
    );
  }
  function n() {
    const a = ya([
      "\n        <span class='label ellipsis'>\n          ",
      "\n        </span>\n      ",
    ]);
    return (
      (n = function() {
        return a;
      }),
      a
    );
  }
  function o() {
    const a = ya([
      "\n        <paper-icon-button\n          .icon=",
      "\n          @click=",
      ">\n        </paper-icon-button>",
    ]);
    return (
      (o = function() {
        return a;
      }),
      a
    );
  }
  function p() {
    const a = ya([
      "\n        <paper-icon-button class='power-button'\n          .icon=",
      "\n          @click=",
      "\n          ?color=",
      ">\n        </paper-icon-button>",
    ]);
    return (
      (p = function() {
        return a;
      }),
      a
    );
  }
  function q() {
    const a = ya([
      "\n        <paper-icon-button class='group-button'\n          .icon=",
      "\n          ?inactive=",
      "\n          ?color=",
      "\n          @click=",
      ">\n        </paper-icon-button>",
    ]);
    return (
      (q = function() {
        return a;
      }),
      a
    );
  }
  function r() {
    const a = ya([
      "\n        <mmp-sound-menu\n          .player=",
      "\n          .icon=",
      "\n          ?full=",
      ">\n        </mmp-sound-menu>",
    ]);
    return (
      (r = function() {
        return a;
      }),
      a
    );
  }
  function s() {
    const a = ya([
      "\n        <mmp-source-menu\n          .player=",
      "\n          .icon=",
      "\n          ?full=",
      ">\n        </mmp-source-menu>",
    ]);
    return (
      (s = function() {
        return a;
      }),
      a
    );
  }
  function t() {
    const a = ya([
      "\n        <mmp-media-controls\n          .player=",
      "\n          .config=",
      ">\n        </mmp-media-controls>\n      ",
    ]);
    return (
      (t = function() {
        return a;
      }),
      a
    );
  }
  function u() {
    const a = ya([
      "\n      ",
      "\n      ",
      "\n      ",
      "\n      ",
      "\n      ",
      "\n      ",
      "\n    ",
    ]);
    return (
      (u = function() {
        return a;
      }),
      a
    );
  }
  function v() {
    const a = ya([
      "\n        <span class='label ellipsis'>\n          ",
      "\n        </span>\n      ",
    ]);
    return (
      (v = function() {
        return a;
      }),
      a
    );
  }
  function w() {
    const a = ya([
      "\n        :host {\n          display: flex;\n          width: 100%;\n        }\n        .flex {\n          display: flex;\n          flex: 1;\n          justify-content: space-between;\n        }\n        ha-slider {\n          max-width: none;\n          min-width: 100px;\n          width: 100%;\n        }\n        paper-icon-button {\n          min-width: 40px;\n        }\n        .mmp-media-controls__volume {\n          flex: 100;\n          max-height: 40px;\n        }\n        .mmp-media-controls__volume.--buttons {\n          justify-content: left;\n        }\n        .mmp-media-controls__media {\n          justify-content: flex-end;\n          max-width: calc(40px * 4);\n          margin-right: 0;\n          margin-left: auto;\n        }\n        .mmp-media-controls__media[flow] {\n          max-width: none;\n          justify-content: space-between;\n        }\n        .mmp-media-controls__shuffle {\n          flex: 3;\n          flex-shrink: 200;\n          justify-content: center;\n        }\n        .mmp-media-controls__shuffle paper-icon-button {\n          height: 36px;\n          width: 36px;\n          min-width: 36px;\n          margin: 2px;\n        }\n      ",
    ]);
    return (
      (w = function() {
        return a;
      }),
      a
    );
  }
  function x() {
    const a = ya([""]);
    return (
      (x = function() {
        return a;
      }),
      a
    );
  }
  function y() {
    const a = ya([
      "\n        <paper-icon-button\n          @click=",
      "\n          .icon=",
      ">\n        </paper-icon-button>\n      ",
    ]);
    return (
      (y = function() {
        return a;
      }),
      a
    );
  }
  function z() {
    const a = ya([""]);
    return (
      (z = function() {
        return a;
      }),
      a
    );
  }
  function A() {
    const a = ya([
      "\n        <paper-icon-button\n          @click=",
      "\n          .icon=",
      ">\n        </paper-icon-button>\n      ",
    ]);
    return (
      (A = function() {
        return a;
      }),
      a
    );
  }
  function B() {
    const a = ya(["\n      ", "\n      ", "\n    "]);
    return (
      (B = function() {
        return a;
      }),
      a
    );
  }
  function C() {
    const a = ya([
      "\n          <paper-icon-button\n            @click=",
      "\n            .icon=",
      ">\n          </paper-icon-button>\n        ",
    ]);
    return (
      (C = function() {
        return a;
      }),
      a
    );
  }
  function D() {
    const a = ya([
      "\n          <paper-icon-button\n            @click=",
      "\n            .icon=",
      ">\n          </paper-icon-button>\n        ",
    ]);
    return (
      (D = function() {
        return a;
      }),
      a
    );
  }
  function E() {
    const a = ya([
      "\n          <paper-icon-button\n            @click=",
      "\n            .icon=",
      ">\n          </paper-icon-button>\n        ",
    ]);
    return (
      (E = function() {
        return a;
      }),
      a
    );
  }
  function F() {
    const a = ya([
      "\n          <paper-icon-button\n            @click=",
      "\n            .icon=",
      ">\n          </paper-icon-button>\n        ",
    ]);
    return (
      (F = function() {
        return a;
      }),
      a
    );
  }
  function G() {
    const a = ya([
      "\n          <paper-icon-button\n            @click=",
      "\n            .icon=",
      ">\n          </paper-icon-button>\n        ",
    ]);
    return (
      (G = function() {
        return a;
      }),
      a
    );
  }
  function H() {
    const a = ya([
      "\n      <div class='mmp-media-controls__volume --buttons flex'>\n        ",
      "\n        <paper-icon-button\n          @click=",
      "\n          .icon=",
      ">\n        </paper-icon-button>\n        <paper-icon-button\n          @click=",
      "\n          .icon=",
      ">\n        </paper-icon-button>\n      </div>",
    ]);
    return (
      (H = function() {
        return a;
      }),
      a
    );
  }
  function I() {
    const a = ya([
      "\n      <div class='mmp-media-controls__volume --slider flex'>\n        ",
      "\n        <ha-slider\n          @change=",
      "\n          @click=",
      "\n          ?disabled=",
      "\n          min=",
      " max=",
      "\n          value=",
      "\n          dir=",
      "\n          ignore-bar-touch pin>\n        </ha-slider>\n      </div>",
    ]);
    return (
      (I = function() {
        return a;
      }),
      a
    );
  }
  function J() {
    const a = ya([""]);
    return (
      (J = function() {
        return a;
      }),
      a
    );
  }
  function K() {
    const a = ya([
      "\n        <div class='flex mmp-media-controls__media' ?flow=",
      ">\n          <paper-icon-button\n            @click=",
      "\n            .icon=",
      ">\n          </paper-icon-button>\n          ",
      "\n          <paper-icon-button\n            @click=",
      "\n            .icon=",
      ">\n          </paper-icon-button>\n        </div>\n      ",
    ]);
    return (
      (K = function() {
        return a;
      }),
      a
    );
  }
  function L() {
    const a = ya([""]);
    return (
      (L = function() {
        return a;
      }),
      a
    );
  }
  function M() {
    const a = ya([
      "\n        <div class='flex mmp-media-controls__shuffle'>\n          <paper-icon-button\n            class='shuffle-button'\n            @click=",
      "\n            .icon=",
      "\n            ?color=",
      ">\n          </paper-icon-button>\n        </div>\n      ",
    ]);
    return (
      (M = function() {
        return a;
      }),
      a
    );
  }
  function N() {
    const a = ya([""]);
    return (
      (N = function() {
        return a;
      }),
      a
    );
  }
  function O() {
    const a = ya(["\n      ", "\n      ", "\n      ", "\n    "]);
    return (
      (O = function() {
        return a;
      }),
      a
    );
  }
  function P() {
    const a = ya([
      "\n      :host {\n        max-width: 120px;\n        min-width: 40px;\n      }\n      :host([full]) {\n        max-width: none;\n      }\n    ",
    ]);
    return (
      (P = function() {
        return a;
      }),
      a
    );
  }
  function Q() {
    const a = ya([
      "\n      <mmp-dropdown\n        @change=",
      "\n        .items=",
      "\n        .label=",
      "\n        .selected=",
      "\n        .icon=",
      "\n      />\n    ",
    ]);
    return (
      (Q = function() {
        return a;
      }),
      a
    );
  }
  function R() {
    const a = ya([
      "\n      :host {\n        max-width: 120px;\n        min-width: 40px;\n      }\n      :host([full]) {\n        max-width: none;\n      }\n    ",
    ]);
    return (
      (R = function() {
        return a;
      }),
      a
    );
  }
  function S() {
    const a = ya([
      "\n      <mmp-dropdown\n        @change=",
      "\n        .items=",
      "\n        .label=",
      "\n        .selected=",
      "\n        .icon=",
      "\n      />\n    ",
    ]);
    return (
      (S = function() {
        return a;
      }),
      a
    );
  }
  function T() {
    const a = ya([
      "\n      .mmp-progress {\n        cursor: pointer;\n        left: 0; right: 0; bottom: 0;\n        position: absolute;\n        pointer-events: auto;\n        min-height: calc(var(--mmp-progress-height) + 10px);\n      }\n      .mmp-progress__duration {\n        left: calc(var(--ha-card-border-radius, 4px) / 2);\n        right: calc(var(--ha-card-border-radius, 4px) / 2);\n        bottom: calc(var(--mmp-progress-height) + 6px);\n        position: absolute;\n        display: flex;\n        justify-content: space-between;\n        font-size: .8em;\n        padding: 0 6px;\n        z-index: 2\n      }\n      paper-progress {\n        height: var(--mmp-progress-height);\n        --paper-progress-height: var(--mmp-progress-height);\n        bottom: 0;\n        position: absolute;\n        width: 100%;\n        transition: height 0;\n        z-index: 1;\n        --paper-progress-active-color: var(--mmp-accent-color);\n        --paper-progress-container-color: rgba(100,100,100,.15);\n        --paper-progress-transition-duration: 1s;\n        --paper-progress-transition-timing-function: linear;\n        --paper-progress-transition-delay: 0s;\n      }\n      paper-progress.seeking {\n        transition: height .15s ease-out;\n        height: calc(var(--mmp-progress-height) + 4px);\n        --paper-progress-height: calc(var(--mmp-progress-height) + 4px);\n      }\n      .mmp-progress[paused] paper-progress {\n        --paper-progress-active-color: var(--disabled-text-color, rgba(150,150,150,.5));\n      }\n    ",
    ]);
    return (
      (T = function() {
        return a;
      }),
      a
    );
  }
  function U() {
    const a = ya([
      "\n          <div class='mmp-progress__duration'>\n            <span>",
      "</span>\n            <span>",
      "</span>\n          </div>\n        ",
    ]);
    return (
      (U = function() {
        return a;
      }),
      a
    );
  }
  function V() {
    const a = ya([
      "\n      <div class='mmp-progress'\n        @touchstart=",
      "\n        @touchend=",
      "\n        @mousedown=",
      "\n        @mouseup=",
      "\n        @mouseleave=",
      "\n        @click=",
      "\n        ?paused=",
      ">\n        ",
      "\n        <paper-progress class=",
      "\n          value=",
      "\n          max=",
      ">\n        </paper-progress>\n      </div>\n    ",
    ]);
    return (
      (V = function() {
        return a;
      }),
      a
    );
  }
  function W() {
    const a = ya([
      "\n      :host {\n        align-items: center;\n        margin-left: 8px;\n        display: flex;\n      }\n      .mmp-tts__input {\n        cursor: text;\n        flex: 1;\n        margin-right: 8px;\n        --paper-input-container-input: {\n          font-size: 1em;\n        };\n      }\n      ha-card[rtl] .mmp-tts__input {\n        margin-right: auto;\n        margin-left: 8px;\n      }\n      .mmp-tts__button {\n        margin: 0;\n        height: 30px;\n        padding: 0 .4em;\n      }\n      paper-input {\n        opacity: .75;\n        --paper-input-container-color: var(--mmp-text-color);\n        --paper-input-container-focus-color: var(--mmp-text-color);\n        --paper-input-container: {\n          padding: 0;\n        };\n      }\n      paper-input[focused] {\n        opacity: 1;\n      }\n\n      ha-card[artwork*='cover'][has-artwork] paper-input {\n        --paper-input-container-focus-color: #FFFFFF;\n      }\n      ha-card[artwork*='cover'][has-artwork] paper-input {\n        --paper-input-container-color: #FFFFFF;\n        --paper-input-container-input-color: #FFFFFF;\n      }\n    ",
    ]);
    return (
      (W = function() {
        return a;
      }),
      a
    );
  }
  function X() {
    const a = ya([
      "\n      <paper-input id=\"tts-input\" class='mmp-tts__input'\n        no-label-float\n        placeholder=",
      "...\n        @click=",
      ">\n      </paper-input>\n      <mmp-button class='mmp-tts__button' @click=",
      ">\n        <span>SEND</span>\n      </mmp-button>\n    ",
    ]);
    return (
      (X = function() {
        return a;
      }),
      a
    );
  }
  function Y() {
    const a = ya([
      "\n        .mmp-shortcuts__buttons {\n          box-sizing: border-box;\n          display: flex;\n          flex-wrap: wrap;\n          margin-top: 8px;\n        }\n        .mmp-shortcuts__button {\n          min-width: calc(50% - 8px);\n          flex: 1;\n        }\n        .mmp-shortcuts__button > div {\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          width: 100%;\n        }\n        .mmp-shortcuts__button > div[align='left'] {\n          justify-content: flex-start;\n        }\n        .mmp-shortcuts__button > div[align='right'] {\n          justify-content: flex-end;\n        }\n        .mmp-shortcuts__button[columns='1'] {\n          min-width: calc(100% - 8px);\n        }\n        .mmp-shortcuts__button[columns='3'] {\n          min-width: calc(33.33% - 8px);\n        }\n        .mmp-shortcuts__button[columns='4'] {\n          min-width: calc(25% - 8px);\n        }\n        .mmp-shortcuts__button[columns='5'] {\n          min-width: calc(20% - 8px);\n        }\n        .mmp-shortcuts__button[columns='6'] {\n          min-width: calc(16.66% - 8px);\n        }\n        .mmp-shortcuts__button > div > span {\n          line-height: 24px;\n          text-transform: initial;\n        }\n        .mmp-shortcuts__button > div > *:nth-child(2) {\n          margin-left: 4px;\n        }\n      ",
    ]);
    return (
      (Y = function() {
        return a;
      }),
      a
    );
  }
  function Z() {
    const a = ya(["\n      ", "\n      ", "\n    "]);
    return (
      (Z = function() {
        return a;
      }),
      a
    );
  }
  function $() {
    const a = ya(['<span class="ellipsis">', "</span>"]);
    return (
      ($ = function() {
        return a;
      }),
      a
    );
  }
  function _() {
    const a = ya(["<iron-icon .icon=", "></iron-icon>"]);
    return (
      (_ = function() {
        return a;
      }),
      a
    );
  }
  function aa() {
    const a = ya([
      "\n          <mmp-button\n            style=",
      "\n            raised\n            columns=",
      "\n            ?color=",
      "\n            class='mmp-shortcuts__button'\n            @click=",
      ">\n            <div align=",
      ">\n              ",
      "\n              ",
      "\n            </div>\n          </mmp-button>",
    ]);
    return (
      (aa = function() {
        return a;
      }),
      a
    );
  }
  function ba() {
    const a = ya([
      "\n      <div class='mmp-shortcuts__buttons'>\n        ",
      "\n      </div>\n    ",
    ]);
    return (
      (ba = function() {
        return a;
      }),
      a
    );
  }
  function ca() {
    const a = ya([
      "\n      <mmp-dropdown class='mmp-shortcuts__dropdown'\n        @change=",
      "\n        .items=",
      "\n        .label=",
      "\n        .selected=",
      ">\n      </mmp-dropdown>\n    ",
    ]);
    return (
      (ca = function() {
        return a;
      }),
      a
    );
  }
  function da() {
    const a = ya([""]);
    return (
      (da = function() {
        return a;
      }),
      a
    );
  }
  function ea() {
    const a = ya([
      "\n        :host {\n          display: block;\n        }\n        :host([faded]) {\n          opacity: .75;\n        }\n        :host[small] .mmp-dropdown__label {\n          max-width: 60px;\n          display: block;\n          position: relative;\n          width: auto;\n          text-transform: initial;\n        }\n        :host[full] .mmp-dropdown__label {\n          max-width: none;\n        }\n        .mmp-dropdown {\n          padding: 0;\n          display: block;\n        }\n        .mmp-dropdown__button {\n          display: flex;\n          font-size: 1em;\n          justify-content: space-between;\n          align-items: center;\n          height: 36px;\n          margin: 2px 0;\n        }\n        .mmp-dropdown__button.icon {\n          height: 40px;\n          margin: 0;\n        }\n        .mmp-dropdown__button > div {\n          display: flex;\n          flex: 1;\n          justify-content: space-between;\n          align-items: center;\n          height: 36px;\n          max-width: 100%;\n        }\n        .mmp-dropdown__label {\n          text-align: left;\n          text-transform: none;\n        }\n        .mmp-dropdown__icon {\n          height: 24px;\n          width: 24px;\n          min-width: 24px;\n        }\n        paper-item > *:nth-child(2) {\n          margin-left: 4px;\n        }\n        paper-menu-button[focused] mmp-button iron-icon {\n          color: var(--mmp-accent-color);\n          transform: rotate(180deg);\n        }\n        paper-menu-button[focused] paper-icon-button {\n          color: var(--mmp-accent-color);\n          transform: rotate(180deg);\n        }\n        paper-menu-button[focused] paper-icon-button[focused] {\n          color: var(--mmp-text-color);\n          transform: rotate(0deg);\n        }\n      ",
    ]);
    return (
      (ea = function() {
        return a;
      }),
      a
    );
  }
  function fa() {
    const a = ya(["<span class='mmp-dropdown__item__label'>", "</span>"]);
    return (
      (fa = function() {
        return a;
      }),
      a
    );
  }
  function ga() {
    const a = ya(["<iron-icon .icon=", "></iron-icon>"]);
    return (
      (ga = function() {
        return a;
      }),
      a
    );
  }
  function ha() {
    const a = ya([
      "\n            <paper-item\n              value=",
      "\n              @click=",
      ">\n              ",
      "\n              ",
      "\n            </paper-item>",
    ]);
    return (
      (ha = function() {
        return a;
      }),
      a
    );
  }
  function ia() {
    const a = ya([
      "\n          <mmp-button class='mmp-dropdown__button' slot='dropdown-trigger'>\n            <div>\n              <span class='mmp-dropdown__label ellipsis'>\n                ",
      "\n              </span>\n              <iron-icon class='mmp-dropdown__icon' .icon=",
      "></iron-icon>\n            </div>\n          </mmp-button>\n        ",
    ]);
    return (
      (ia = function() {
        return a;
      }),
      a
    );
  }
  function ja() {
    const a = ya([
      "\n          <paper-icon-button\n            class='mmp-dropdown__button icon'\n            slot='dropdown-trigger'\n            .icon=",
      ">\n          </paper-icon-button>\n        ",
    ]);
    return (
      (ja = function() {
        return a;
      }),
      a
    );
  }
  function ka() {
    const a = ya([
      "\n      <paper-menu-button\n        class='mmp-dropdown'\n        noink no-animations\n        .horizontalAlign=",
      "\n        .verticalAlign=",
      "\n        .verticalOffset=",
      "\n        @click=",
      ">\n        ",
      '\n        <paper-listbox slot="dropdown-content" selected=',
      ">\n          ",
      "\n        </paper-listbox>\n      </paper-menu-button>\n    ",
    ]);
    return (
      (ka = function() {
        return a;
      }),
      a
    );
  }
  function la() {
    const a = ya([
      "\n  .ellipsis {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .label {\n    margin: 0 8px;\n  }\n  paper-icon-button {\n    color: var(--mmp-text-color);\n    transition: color .25s;\n  }\n  paper-icon-button[color] {\n    color: var(--mmp-accent-color) !important;\n    opacity: 1 !important;\n  }\n  paper-icon-button[inactive] {\n    opacity: .5;\n  }\n",
    ]);
    return (
      (la = function() {
        return a;
      }),
      a
    );
  }
  function ma() {
    const a = ya([
      "\n      .mmp-group-list {\n        display: flex;\n        flex-direction: column;\n        margin-left: 8px;\n        margin-bottom: 8px;\n      }\n      .mmp-group-list__title {\n        font-weight: 500;\n        letter-spacing: .1em;\n        margin: 8px 0 4px;\n        text-transform: uppercase;\n      }\n      .mmp-group-list__buttons {\n        display: flex;\n      }\n      .mmp-group-list__button {\n        margin: 8px 8px 0 0;\n        min-width: 0;\n        text-transform: uppercase;\n        text-align: center;\n        width: 50%;\n        --mdc-theme-primary: transparent;\n        background: rgba(255,255,255,0.25);\n      }\n    ",
    ]);
    return (
      (ma = function() {
        return a;
      }),
      a
    );
  }
  function na() {
    const a = ya([""]);
    return (
      (na = function() {
        return a;
      }),
      a
    );
  }
  function oa() {
    const a = ya(["Leave"]);
    return (
      (oa = function() {
        return a;
      }),
      a
    );
  }
  function pa() {
    const a = ya(["Ungroup"]);
    return (
      (pa = function() {
        return a;
      }),
      a
    );
  }
  function qa() {
    const a = ya([
      "\n          <mmp-group-item\n            @change=",
      "\n            .item=",
      "\n            .checked=",
      "\n            .disabled=",
      "\n            .master=",
      "\n          />",
    ]);
    return (
      (qa = function() {
        return a;
      }),
      a
    );
  }
  function ra() {
    const a = ya([
      "\n      <div class='mmp-group-list' ?visible=",
      ">\n        <span class='mmp-group-list__title'>Group speakers</span>\n        ",
      "\n        <div class='mmp-group-list__buttons'>\n          <mmp-button\n            class='mmp-group-list__button'\n            raised\n            ?disabled=",
      "\n            @click=",
      ">\n            <span>",
      "</span>\n          </mmp-button>\n          <mmp-button\n            class='mmp-group-list__button'\n            raised\n            ?disabled=",
      "\n            @click=",
      ">\n            <span>Group all</span>\n          </mmp-button>\n        </div>\n      </div>\n    ",
    ]);
    return (
      (ra = function() {
        return a;
      }),
      a
    );
  }
  function sa() {
    const a = ya([
      "\n      :host {\n        position: relative;\n        box-sizing: border-box;\n        margin: 4px;\n        min-width: 0;\n        overflow: hidden;\n        transition: background .5s;\n      }\n      :host([raised]) {\n        background: rgba(255,255,255,0.25);\n        min-height: 36px;\n        box-shadow:\n          0px 3px 1px -2px rgba(0, 0, 0, 0.2),\n          0px 2px 2px 0px rgba(0, 0, 0, 0.14),\n          0px 1px 5px 0px rgba(0,0,0,.12);\n      }\n      :host([color]) {\n        background: var(--mmp-active-color);\n        transition: background .25s;\n        opacity: 1;\n      }\n      :host([faded]) {\n        opacity: .75;\n      }\n      .container {\n        height: 100%;\n        width: 100%;\n      }\n      .slot-container {\n        height: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        margin: 0 8px;\n        width: auto;\n      }\n      paper-ripple {\n        position: absolute;\n        left: 0;\n        right: 0;\n        top: 0;\n        bottom: 0;\n      }\n    ",
    ]);
    return (
      (sa = function() {
        return a;
      }),
      a
    );
  }
  function ta() {
    const a = ya([
      '\n      <div class="container">\n        <div class="slot-container">\n          <slot></slot>\n        </div>\n        <paper-ripple></paper-ripple>\n      </div>\n    ',
    ]);
    return (
      (ta = function() {
        return a;
      }),
      a
    );
  }
  function ua() {
    const a = ya([
      "\n      paper-checkbox {\n        padding: 8px 0;\n      }\n      paper-checkbox > span {\n        font-weight: 600;\n      }\n\n      ha-card[artwork*='cover'][has-artwork] paper-checkbox[disabled] {\n        --paper-checkbox-checkmark-color: rgba(0,0,0,.5);\n      }\n      ha-card[artwork*='cover'][has-artwork] paper-checkbox {\n        --paper-checkbox-unchecked-color: #FFFFFF;\n        --paper-checkbox-label-color: #FFFFFF;\n      }\n    ",
    ]);
    return (
      (ua = function() {
        return a;
      }),
      a
    );
  }
  function va() {
    const a = ya(["<span>(master)</span>"]);
    return (
      (va = function() {
        return a;
      }),
      a
    );
  }
  function wa() {
    const a = ya([
      "\n      <paper-checkbox\n        ?checked=",
      "\n        ?disabled=",
      "\n        @change='",
      "'\n        @click='",
      "'>\n        ",
      "\n        ",
      "\n      </paper-checkbox>\n    ",
    ]);
    return (
      (wa = function() {
        return a;
      }),
      a
    );
  }
  function xa() {
    const a = ya([
      "\n  :host {\n    overflow: visible !important;\n    display: block;\n    --mmp-accent-color: var(--mini-media-player-accent-color, var(--accent-color, #f39c12));\n    --mmp-base-color: var(--mini-media-player-base-color, var(--primary-text-color, #000));\n    --mmp-overlay-color: var(--mini-media-player-overlay-color, rgba(0,0,0,0.5));\n    --mmp-overlay-color-stop: var(--mini-media-player-overlay-color-stop, 25%);\n    --mmp-overlay-base-color: var(--mini-media-player-overlay-base-color, #fff);\n    --mmp-overlay-accent-color: var(--mini-media-player-overlay-accent-color, --mmp-accent-color);\n    --mmp-text-color: var(--mini-media-player-base-color, var(--primary-text-color, #000));\n    --mmp-media-cover-info-color: var(--mini-media-player-media-cover-info-color, --mmp-text-color);\n    --mmp-text-color-inverted: var(--disabled-text-color);\n    --mmp-active-color: var(--mmp-accent-color);\n    --mmp-icon-color:\n      var(--mini-media-player-icon-color,\n        var(--mini-media-player-base-color,\n          var(--paper-item-icon-colo, #44739e)));\n    --mmp-info-opacity: 1;\n    --mmp-artwork-opacity: var(--mini-media-player-artwork-opacity, 1);\n    --mmp-progress-height: var(--mini-media-player-progress-height, 6px);\n    --mdc-theme-primary: var(--mmp-text-color);\n    --mdc-theme-on-primary: var(--mmp-text-color);\n    --paper-checkbox-unchecked-color: var(--mmp-text-color);\n    --paper-checkbox-label-color: var(--mmp-text-color);\n    color: var(--mmp-text-color);\n  }\n  ha-card.--bg {\n    --mmp-info-opacity: .75;\n  }\n  ha-card.--has-artwork[artwork*='cover'] {\n    --mmp-accent-color: var(--mini-media-player-overlay-accent-color, var(--mini-media-player-accent-color, var(--accent-color, #f39c12)));\n    --mmp-text-color: var(--mmp-overlay-base-color);\n    --mmp-text-color-inverted: #000;\n    --mmp-active-color: rgba(255,255,255,.5);\n    --mmp-icon-color: var(--mmp-text-color);\n    --mmp-info-opacity: .75;\n    --paper-slider-container-color: var(--mini-media-player-overlay-color, rgba(255,255,255,.75));\n    --mdc-theme-primary: var(--mmp-text-color);\n    --mdc-theme-on-primary: var(--mmp-text-color);\n    --paper-checkbox-unchecked-color: var(--mmp-text-color);\n    --paper-checkbox-label-color: var(--mmp-text-color);\n    color: var(--mmp-text-color);\n  }\n  ha-card {\n    cursor: default;\n    display: flex;\n    background: transparent;\n    overflow: hidden;\n    padding: 0;\n    position: relative;\n    color: inherit;\n  }\n  ha-card.--group {\n    box-shadow: none;\n    --mmp-progress-height: var(--mini-media-player-progress-height, 4px);\n  }\n  ha-card.--more-info {\n    cursor: pointer;\n  }\n  .mmp__bg, .mmp__player, .mmp__container {\n    border-radius: var(--ha-card-border-radius, 0);\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n  }\n  .mmp__container {\n    overflow: hidden;\n    height: 100%;\n    width: 100%;\n    position: absolute;\n    pointer-events: none;\n  }\n  ha-card:before {\n    content: '';\n    padding-top: 0px;\n    transition: padding-top .5s cubic-bezier(.21,.61,.35,1);\n    will-change: padding-top;\n  }\n  ha-card.--initial .entity__artwork,\n  ha-card.--initial .entity__icon {\n    animation-duration: .001s;\n  }\n  ha-card.--initial:before,\n  ha-card.--initial .mmp-player {\n    transition: none;\n  }\n  header {\n    display: none;\n  }\n  ha-card[artwork='full-cover'].--has-artwork:before {\n    padding-top: 56%;\n  }\n  ha-card[artwork='full-cover'].--has-artwork[content='music']:before,\n  ha-card[artwork='full-cover-fit'].--has-artwork:before {\n    padding-top: 100%;\n  }\n  .mmp__bg {\n    background: var(--ha-card-background, var(--paper-card-background-color, white));\n    position: absolute;\n    top: 0; right: 0; bottom: 0; left: 0;\n    overflow: hidden;\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n  }\n  ha-card[artwork*='cover'].--has-artwork .mmp__bg {\n    opacity: var(--mmp-artwork-opacity);\n    background: transparent;\n  }\n  ha-card.--group .mmp__bg {\n    background: transparent;\n  }\n  .cover,\n  .cover:before {\n    display: block;\n    opacity: 0;\n    position: absolute;\n    top: 0; right: 0; bottom: 0; left: 0;\n    transition: opacity .75s cubic-bezier(.21,.61,.35,1);\n    will-change: opacity;\n  }\n  .cover {\n    animation: fade-in .5s cubic-bezier(.21,.61,.35,1);\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-position: center center;\n  }\n  .cover:before {\n    background: var(--mmp-overlay-color);\n    content: '';\n  }\n  ha-card[artwork*='full-cover'].--has-artwork .mmp-player {\n    background: linear-gradient(to top, var(--mmp-overlay-color) var(--mmp-overlay-color-stop), transparent 100%);\n    border-bottom-left-radius: var(--ha-card-border-radius, 0);\n    border-bottom-right-radius: var(--ha-card-border-radius, 0);\n  }\n  ha-card.--has-artwork .cover,\n  ha-card.--has-artwork[artwork='cover'] .cover:before,\n  ha-card.--bg .cover {\n    opacity: .999;\n  }\n  ha-card[artwork='default'] .cover {\n    display: none;\n  }\n  ha-card.--bg .cover {\n    display: block;\n  }\n  ha-card[artwork='full-cover-fit'].--has-artwork .cover {\n    background-color: black;\n    background-size: contain;\n  }\n  .mmp-player {\n    align-self: flex-end;\n    box-sizing: border-box;\n    position: relative;\n    padding: 16px;\n    transition: padding .25s ease-out;\n    width: 100%;\n    will-change: padding;\n  }\n  ha-card.--group .mmp-player {\n    padding: 10px 0;\n  }\n  .flex {\n    display: flex;\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    flex-direction: row;\n  }\n  .mmp-player__core {\n    position: relative;\n  }\n  .entity__info {\n    justify-content: center;\n    display: flex;\n    flex-direction: column;\n    margin-left: 8px;\n    position: relative;\n    overflow: hidden;\n    user-select: none;\n  }\n  ha-card.--rtl .entity__info {\n    margin-left: auto;\n    margin-right: 8px;\n  }\n  ha-card[content='movie'] .attr__media_season,\n  ha-card[content='movie'] .attr__media_episode {\n    display: none;\n  }\n  .entity__icon {\n    color: var(--mmp-icon-color);\n  }\n  .entity__artwork, .entity__icon {\n    animation: fade-in .25s ease-out;\n    background-position: center center;\n    background-repeat: no-repeat;\n    background-size: cover;\n    border-radius: 100%;\n    height: 40px;\n    width: 40px;\n    min-width: 40px;\n    line-height: 40px;\n    margin-right: 8px;\n    position: relative;\n    text-align: center;\n    will-change: border-color;\n    transition: border-color .25s ease-out;\n  }\n  ha-card.--rtl .entity__artwork,\n  ha-card.--rtl .entity__icon {\n    margin-right: auto;\n  }\n  .entity__artwork[border] {\n    border: 2px solid var(--primary-text-color);\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n  }\n  .entity__artwork[border][state='playing'] {\n    border-color: var(--mmp-accent-color);\n  }\n  .entity__info__name,\n  .entity__info__media[short] {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .entity__info__name {\n    line-height: 20px;\n    color: var(--mmp-text-color);\n  }\n  .entity__info__media {\n    color: var(--secondary-text-color);\n    max-height: 6em;\n    word-break: break-word;\n    opacity: var(--mmp-info-opacity);\n    transition: color .5s;\n  }\n  .entity__info__media[short] {\n    max-height: 20px;\n    overflow: hidden;\n  }\n  .attr__app_name {\n    display: none;\n  }\n  .attr__app_name:first-child,\n  .attr__app_name:first-of-type {\n    display: inline;\n  }\n  .mmp-player__core[inactive] .entity__info__media {\n    color: var(--mmp-text-color);\n    max-width: 200px;\n    opacity: .5;\n  }\n  .entity__info__media[short-scroll] {\n    max-height: 20px;\n    white-space: nowrap;\n  }\n  .entity__info__media[scroll] > span {\n    visibility: hidden;\n  }\n  .entity__info__media[scroll] > div {\n    animation: move linear infinite;\n  }\n  .entity__info__media[scroll] .marquee {\n    animation: slide linear infinite;\n  }\n  .entity__info__media[scroll] .marquee,\n  .entity__info__media[scroll] > div {\n    animation-duration: inherit;\n    visibility: visible;\n  }\n  .entity__info__media[scroll] {\n    animation-duration: 10s;\n    mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);\n    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);\n  }\n  .marquee {\n    visibility: hidden;\n    position: absolute;\n    white-space: nowrap;\n  }\n  ha-card[artwork*='cover'].--has-artwork .entity__info__media,\n  ha-card.--bg .entity__info__media {\n    color: var(--mmp-media-cover-info-color);\n  }\n  .entity__info__media span:before {\n    content: ' - ';\n  }\n  .entity__info__media span:first-of-type:before {\n    content: '';\n  }\n  .entity__info__media span:empty {\n    display: none;\n  }\n  .mmp-player__adds {\n    margin-left: 48px;\n    position: relative;\n  }\n  ha-card.--rtl .mmp-player__adds {\n    margin-left: auto;\n    margin-right: 48px;\n  }\n  .mmp-player__adds > *:nth-child(2) {\n    margin-top: 0px;\n  }\n  mmp-powerstrip {\n    flex: 1;\n    justify-content: flex-end;\n    margin-right: 0;\n    margin-left: auto;\n    width: auto;\n    max-width: 100%;\n  }\n  mmp-media-controls {\n    flex-wrap: wrap;\n    justify-content: center;\n  }\n  ha-card.--flow mmp-powerstrip {\n    justify-content: space-between;\n    margin-left: auto;\n  }\n  ha-card.--flow.--rtl mmp-powerstrip {\n    margin-right: auto;\n  }\n  ha-card.--flow .entity__info {\n    display: none;\n  }\n  ha-card.--responsive .mmp-player__adds {\n    margin-left: 0;\n  }\n  ha-card.--responsive.--rtl .mmp-player__adds {\n    margin-right: 0;\n  }\n  ha-card.--responsive .mmp-player__adds > mmp-media-controls {\n    padding: 0;\n  }\n  ha-card.--progress .mmp-player {\n    padding-bottom: calc(16px + calc(var(--mini-media-player-progress-height, 6px) - 6px));\n  }\n  ha-card.--progress.--group .mmp-player {\n    padding-bottom: calc(10px + calc(var(--mini-media-player-progress-height, 6px) - 6px));\n  }\n  ha-card.--runtime .mmp-player {\n    padding-bottom: calc(16px + 16px + var(--mini-media-player-progress-height, 0px));\n  }\n  ha-card.--runtime.--group .mmp-player {\n    padding-bottom: calc(16px + 12px + var(--mini-media-player-progress-height, 0px));\n  }\n  ha-card.--inactive .mmp-player {\n    padding: 16px;\n  }\n  ha-card.--inactive.--group .mmp-player {\n    padding: 10px 0;\n  }\n  .mmp-player div:empty {\n    display: none;\n  }\n  @keyframes slide {\n    100% { transform: translateX(-100%); }\n  }\n  @keyframes move {\n    from { transform: translateX(100%); }\n    to { transform: translateX(0); }\n  }\n  @keyframes fade-in {\n    from { opacity: 0; }\n    to { opacity: 1; }\n  }\n",
    ]);
    return (
      (xa = function() {
        return a;
      }),
      a
    );
  }
  function ya(a, b) {
    return (
      b || (b = a.slice(0)),
      Object.freeze(
        Object.defineProperties(a, { raw: { value: Object.freeze(b) } })
      )
    );
  }
  function za(a, b) {
    return Ca(a) || Ba(a, b) || Aa();
  }
  function Aa() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
  function Ba(a, b) {
    var c = [],
      d = !0,
      e = !1,
      f = void 0;
    try {
      for (
        var g, h = a[Symbol.iterator]();
        !(d = (g = h.next()).done) && (c.push(g.value), !(b && c.length === b));
        d = !0
      );
    } catch (a) {
      (e = !0), (f = a);
    } finally {
      try {
        d || null == h["return"] || h["return"]();
      } finally {
        if (e) throw f;
      }
    }
    return c;
  }
  function Ca(a) {
    if (Array.isArray(a)) return a;
  }
  function Da(a) {
    for (var b = 1; b < arguments.length; b++) {
      var c = null == arguments[b] ? {} : arguments[b],
        d = Object.keys(c);
      "function" == typeof Object.getOwnPropertySymbols &&
        (d = d.concat(
          Object.getOwnPropertySymbols(c).filter(function(a) {
            return Object.getOwnPropertyDescriptor(c, a).enumerable;
          })
        )),
        d.forEach(function(b) {
          Ea(a, b, c[b]);
        });
    }
    return a;
  }
  function Ea(a, b, c) {
    return (
      b in a
        ? Object.defineProperty(a, b, {
            value: c,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (a[b] = c),
      a
    );
  }
  function Fa(a, b, c, d, e, f, g) {
    try {
      var h = a[f](g),
        i = h.value;
    } catch (a) {
      return void c(a);
    }
    h.done ? b(i) : Promise.resolve(i).then(d, e);
  }
  function Ga(a) {
    return function() {
      var b = this,
        c = arguments;
      return new Promise(function(d, e) {
        function f(a) {
          Fa(h, d, e, f, g, "next", a);
        }
        function g(a) {
          Fa(h, d, e, f, g, "throw", a);
        }
        var h = a.apply(b, c);
        f(void 0);
      });
    };
  }
  (function(a, b) {
    "object" == typeof exports && "undefined" != typeof module
      ? b()
      : "function" == typeof define && define.amd
      ? define(b)
      : b();
  })(this, function() {
    function ya(a) {
      let b = qb.get(a.type);
      void 0 === b &&
        ((b = { stringsArray: new WeakMap(), keyString: new Map() }),
        qb.set(a.type, b));
      let c = b.stringsArray.get(a.strings);
      if (void 0 !== c) return c;
      const d = a.strings.join(Va);
      return (
        (c = b.keyString.get(d)),
        void 0 === c &&
          ((c = new Za(a, a.getTemplateElement())), b.keyString.set(d, c)),
        b.stringsArray.set(a.strings, c),
        c
      );
    }
    function Aa(a, b) {
      const c = a.element.content,
        d = a.parts,
        e = document.createTreeWalker(c, ub, null, !1);
      let f = wb(d),
        g = d[f],
        h = -1,
        i = 0;
      const j = [];
      for (let c = null; e.nextNode(); ) {
        h++;
        const a = e.currentNode;
        for (
          a.previousSibling === c && (c = null),
            b.has(a) && (j.push(a), null === c && (c = a)),
            null !== c && i++;
          g !== void 0 && g.index === h;

        )
          (g.index = null === c ? g.index - i : -1), (f = wb(d, f)), (g = d[f]);
      }
      j.forEach((a) => a.parentNode.removeChild(a));
    }
    function Ba(a, b) {
      let c =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      const d = a.element.content,
        e = a.parts;
      if (null === c || void 0 === c) return void d.appendChild(b);
      const f = document.createTreeWalker(d, ub, null, !1);
      let g = wb(e),
        h = 0,
        i = -1;
      for (; f.nextNode(); ) {
        i++;
        const a = f.currentNode;
        for (
          a === c && ((h = vb(b)), c.parentNode.insertBefore(b, c));
          -1 !== g && e[g].index === i;

        ) {
          if (0 < h) {
            for (; -1 !== g; ) (e[g].index += h), (g = wb(e, g));
            return;
          }
          g = wb(e, g);
        }
      }
    }
    function Ca(a) {
      let b =
        1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : [];
      for (let c = 0, d = a.length; c < d; c++) {
        const d = a[c];
        Array.isArray(d) ? Ca(d, b) : b.push(d);
      }
      return b;
    }
    function Ea(a, b) {
      function c() {
        f && ((f = !1), a()), g && e();
      }
      function d() {
        _b(c);
      }
      function e() {
        var a = Date.now();
        if (f) {
          if (a - h < 2) return;
          g = !0;
        } else (f = !0), (g = !1), setTimeout(d, b);
        h = a;
      }
      var f = !1,
        g = !1,
        h = 0;
      return e;
    }
    function Fa(a) {
      return parseFloat(a) || 0;
    }
    function Ha(a) {
      for (var b = [], c = 1; c < arguments.length; c++)
        b[c - 1] = arguments[c];
      return b.reduce(function(b, c) {
        var d = a["border-" + c + "-width"];
        return b + Fa(d);
      }, 0);
    }
    function Ia(a) {
      for (
        var b = ["top", "right", "bottom", "left"], c = {}, d = 0, e = b;
        d < e.length;
        d++
      ) {
        var f = e[d],
          g = a["padding-" + f];
        c[f] = Fa(g);
      }
      return c;
    }
    function Ja(a) {
      var b = a.getBBox();
      return Oa(0, 0, b.width, b.height);
    }
    function Ka(a) {
      var b = Math.abs,
        c = Math.round,
        d = a.clientWidth,
        e = a.clientHeight;
      if (!d && !e) return fc;
      var f = ec(a).getComputedStyle(a),
        g = Ia(f),
        h = g.left + g.right,
        i = g.top + g.bottom,
        j = Fa(f.width),
        k = Fa(f.height);
      if (
        ("border-box" === f.boxSizing &&
          (c(j + h) !== d && (j -= Ha(f, "left", "right") + h),
          c(k + i) !== e && (k -= Ha(f, "top", "bottom") + i)),
        !La(a))
      ) {
        var l = c(j + h) - d,
          m = c(k + i) - e;
        1 !== b(l) && (j -= l), 1 !== b(m) && (k -= m);
      }
      return Oa(g.left, g.top, j, k);
    }
    function La(a) {
      return a === ec(a).document.documentElement;
    }
    function Ma(a) {
      return Zb ? (gc(a) ? Ja(a) : Ka(a)) : fc;
    }
    function Na(a) {
      var b = a.x,
        c = a.y,
        d = a.width,
        e = a.height,
        f = "undefined" == typeof DOMRectReadOnly ? Object : DOMRectReadOnly,
        g = Object.create(f.prototype);
      return (
        dc(g, {
          x: b,
          y: c,
          width: d,
          height: e,
          top: c,
          right: b + d,
          bottom: e + c,
          left: b,
        }),
        g
      );
    }
    function Oa(a, b, c, d) {
      return { x: a, y: b, width: c, height: d };
    }
    const Pa = new WeakMap(),
      Qa = (a) => "function" == typeof a && Pa.has(a),
      Ra =
        window.customElements !== void 0 &&
        window.customElements.polyfillWrapFlushCallback !== void 0,
      Sa = function(a, b) {
        for (
          let c =
            2 < arguments.length && void 0 !== arguments[2]
              ? arguments[2]
              : null;
          b !== c;

        ) {
          const c = b.nextSibling;
          a.removeChild(b), (b = c);
        }
      },
      Ta = {},
      Ua = {},
      Va = "{{lit-".concat((Math.random() + "").slice(2), "}}"),
      Wa = "<!--".concat(Va, "-->"),
      Xa = new RegExp("".concat(Va, "|").concat(Wa)),
      Ya = "$lit$";
    class Za {
      constructor(a, b) {
        (this.parts = []), (this.element = b);
        const c = [],
          d = [],
          e = document.createTreeWalker(b.content, 133, null, !1);
        let f = 0,
          g = -1,
          h = 0;
        for (const i = a.strings, j = a.values.length; h < j; ) {
          const a = e.nextNode();
          if (null === a) {
            e.currentNode = d.pop();
            continue;
          }
          if ((g++, 1 === a.nodeType)) {
            if (a.hasAttributes()) {
              const b = a.attributes,
                c = b.length;
              let d = 0;
              for (let a = 0; a < c; a++) $a(b[a].name, Ya) && d++;
              for (; 0 < d--; ) {
                const b = i[h],
                  c = bb.exec(b)[2],
                  d = c.toLowerCase() + Ya,
                  e = a.getAttribute(d);
                a.removeAttribute(d);
                const f = e.split(Xa);
                this.parts.push({
                  type: "attribute",
                  index: g,
                  name: c,
                  strings: f,
                }),
                  (h += f.length - 1);
              }
            }
            "TEMPLATE" === a.tagName &&
              (d.push(a), (e.currentNode = a.content));
          } else if (3 === a.nodeType) {
            const b = a.data;
            if (0 <= b.indexOf(Va)) {
              const d = a.parentNode,
                e = b.split(Xa),
                f = e.length - 1;
              for (let b = 0; b < f; b++) {
                let c,
                  f = e[b];
                if ("" === f) c = ab();
                else {
                  const a = bb.exec(f);
                  null !== a &&
                    $a(a[2], Ya) &&
                    (f =
                      f.slice(0, a.index) +
                      a[1] +
                      a[2].slice(0, -Ya.length) +
                      a[3]),
                    (c = document.createTextNode(f));
                }
                d.insertBefore(c, a),
                  this.parts.push({ type: "node", index: ++g });
              }
              "" === e[f]
                ? (d.insertBefore(ab(), a), c.push(a))
                : (a.data = e[f]),
                (h += f);
            }
          } else if (8 === a.nodeType)
            if (a.data === Va) {
              const b = a.parentNode;
              (null === a.previousSibling || g == f) &&
                (g++, b.insertBefore(ab(), a)),
                (f = g),
                this.parts.push({ type: "node", index: g }),
                null === a.nextSibling ? (a.data = "") : (c.push(a), g--),
                h++;
            } else
              for (let b = -1; -1 !== (b = a.data.indexOf(Va, b + 1)); )
                this.parts.push({ type: "node", index: -1 }), h++;
        }
        for (const d of c) d.parentNode.removeChild(d);
      }
    }
    const $a = (a, b) => {
        const c = a.length - b.length;
        return 0 <= c && a.slice(c) === b;
      },
      _a = (a) => -1 !== a.index,
      ab = () => document.createComment(""),
      bb = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
    class cb {
      constructor(a, b, c) {
        (this.__parts = []),
          (this.template = a),
          (this.processor = b),
          (this.options = c);
      }
      update(a) {
        let b = 0;
        for (const c of this.__parts) void 0 !== c && c.setValue(a[b]), b++;
        for (const b of this.__parts) void 0 !== b && b.commit();
      }
      _clone() {
        const a = Ra
            ? this.template.element.content.cloneNode(!0)
            : document.importNode(this.template.element.content, !0),
          b = [],
          c = this.template.parts,
          d = document.createTreeWalker(a, 133, null, !1);
        let e,
          f = 0,
          g = 0,
          h = d.nextNode();
        for (; f < c.length; ) {
          if (((e = c[f]), !_a(e))) {
            this.__parts.push(void 0), f++;
            continue;
          }
          for (; g < e.index; )
            g++,
              "TEMPLATE" === h.nodeName &&
                (b.push(h), (d.currentNode = h.content)),
              null === (h = d.nextNode()) &&
                ((d.currentNode = b.pop()), (h = d.nextNode()));
          if ("node" === e.type) {
            const a = this.processor.handleTextExpression(this.options);
            a.insertAfterNode(h.previousSibling), this.__parts.push(a);
          } else
            this.__parts.push(
              ...this.processor.handleAttributeExpressions(
                h,
                e.name,
                e.strings,
                this.options
              )
            );
          f++;
        }
        return Ra && (document.adoptNode(a), customElements.upgrade(a)), a;
      }
    }
    class db {
      constructor(a, b, c, d) {
        (this.strings = a),
          (this.values = b),
          (this.type = c),
          (this.processor = d);
      }
      getHTML() {
        const a = this.strings.length - 1;
        let b = "",
          c = !1;
        for (let d = 0; d < a; d++) {
          const a = this.strings[d],
            e = a.lastIndexOf("<!--");
          c = (-1 < e || c) && -1 === a.indexOf("-->", e + 1);
          const f = bb.exec(a);
          b +=
            null === f
              ? a + (c ? Va : Wa)
              : a.substr(0, f.index) + f[1] + f[2] + Ya + f[3] + Va;
        }
        return (b += this.strings[a]), b;
      }
      getTemplateElement() {
        const a = document.createElement("template");
        return (a.innerHTML = this.getHTML()), a;
      }
    }
    const eb = (a) =>
        null === a || ("object" != typeof a && "function" != typeof a),
      fb = (a) => Array.isArray(a) || !!(a && a[Symbol.iterator]);
    class gb {
      constructor(a, b, c) {
        (this.dirty = !0),
          (this.element = a),
          (this.name = b),
          (this.strings = c),
          (this.parts = []);
        for (let d = 0; d < c.length - 1; d++)
          this.parts[d] = this._createPart();
      }
      _createPart() {
        return new hb(this);
      }
      _getValue() {
        const a = this.strings,
          b = a.length - 1;
        let c = "";
        for (let d = 0; d < b; d++) {
          c += a[d];
          const b = this.parts[d];
          if (void 0 !== b) {
            const a = b.value;
            if (eb(a) || !fb(a)) c += "string" == typeof a ? a : a + "";
            else for (const b of a) c += "string" == typeof b ? b : b + "";
          }
        }
        return (c += a[b]), c;
      }
      commit() {
        this.dirty &&
          ((this.dirty = !1),
          this.element.setAttribute(this.name, this._getValue()));
      }
    }
    class hb {
      constructor(a) {
        (this.value = void 0), (this.committer = a);
      }
      setValue(a) {
        a === Ta ||
          (eb(a) && a === this.value) ||
          ((this.value = a), !Qa(a) && (this.committer.dirty = !0));
      }
      commit() {
        for (; Qa(this.value); ) {
          const a = this.value;
          (this.value = Ta), a(this);
        }
        this.value === Ta || this.committer.commit();
      }
    }
    class ib {
      constructor(a) {
        (this.value = void 0),
          (this.__pendingValue = void 0),
          (this.options = a);
      }
      appendInto(a) {
        (this.startNode = a.appendChild(ab())),
          (this.endNode = a.appendChild(ab()));
      }
      insertAfterNode(a) {
        (this.startNode = a), (this.endNode = a.nextSibling);
      }
      appendIntoPart(a) {
        a.__insert((this.startNode = ab())), a.__insert((this.endNode = ab()));
      }
      insertAfterPart(a) {
        a.__insert((this.startNode = ab())),
          (this.endNode = a.endNode),
          (a.endNode = this.startNode);
      }
      setValue(a) {
        this.__pendingValue = a;
      }
      commit() {
        for (; Qa(this.__pendingValue); ) {
          const a = this.__pendingValue;
          (this.__pendingValue = Ta), a(this);
        }
        const a = this.__pendingValue;
        a === Ta ||
          (eb(a)
            ? a !== this.value && this.__commitText(a)
            : a instanceof db
            ? this.__commitTemplateResult(a)
            : a instanceof Node
            ? this.__commitNode(a)
            : fb(a)
            ? this.__commitIterable(a)
            : a === Ua
            ? ((this.value = Ua), this.clear())
            : this.__commitText(a));
      }
      __insert(a) {
        this.endNode.parentNode.insertBefore(a, this.endNode);
      }
      __commitNode(a) {
        this.value === a || (this.clear(), this.__insert(a), (this.value = a));
      }
      __commitText(a) {
        const b = this.startNode.nextSibling;
        (a = null == a ? "" : a),
          b === this.endNode.previousSibling && 3 === b.nodeType
            ? (b.data = a)
            : this.__commitNode(
                document.createTextNode("string" == typeof a ? a : a + "")
              ),
          (this.value = a);
      }
      __commitTemplateResult(a) {
        const b = this.options.templateFactory(a);
        if (this.value instanceof cb && this.value.template === b)
          this.value.update(a.values);
        else {
          const c = new cb(b, a.processor, this.options),
            d = c._clone();
          c.update(a.values), this.__commitNode(d), (this.value = c);
        }
      }
      __commitIterable(a) {
        Array.isArray(this.value) || ((this.value = []), this.clear());
        const b = this.value;
        let c,
          d = 0;
        for (const e of a)
          (c = b[d]),
            void 0 === c &&
              ((c = new ib(this.options)),
              b.push(c),
              0 == d ? c.appendIntoPart(this) : c.insertAfterPart(b[d - 1])),
            c.setValue(e),
            c.commit(),
            d++;
        d < b.length && ((b.length = d), this.clear(c && c.endNode));
      }
      clear() {
        let a =
          0 < arguments.length && arguments[0] !== void 0
            ? arguments[0]
            : this.startNode;
        Sa(this.startNode.parentNode, a.nextSibling, this.endNode);
      }
    }
    class jb {
      constructor(a, b, c) {
        if (
          ((this.value = void 0),
          (this.__pendingValue = void 0),
          2 !== c.length || "" !== c[0] || "" !== c[1])
        )
          throw new Error(
            "Boolean attributes can only contain a single expression"
          );
        (this.element = a), (this.name = b), (this.strings = c);
      }
      setValue(a) {
        this.__pendingValue = a;
      }
      commit() {
        for (; Qa(this.__pendingValue); ) {
          const a = this.__pendingValue;
          (this.__pendingValue = Ta), a(this);
        }
        if (this.__pendingValue !== Ta) {
          const a = !!this.__pendingValue;
          this.value !== a &&
            (a
              ? this.element.setAttribute(this.name, "")
              : this.element.removeAttribute(this.name),
            (this.value = a)),
            (this.__pendingValue = Ta);
        }
      }
    }
    class kb extends gb {
      constructor(a, b, c) {
        super(a, b, c),
          (this.single = 2 === c.length && "" === c[0] && "" === c[1]);
      }
      _createPart() {
        return new lb(this);
      }
      _getValue() {
        return this.single ? this.parts[0].value : super._getValue();
      }
      commit() {
        this.dirty &&
          ((this.dirty = !1), (this.element[this.name] = this._getValue()));
      }
    }
    class lb extends hb {}
    let mb = !1;
    try {
      const a = {
        get capture() {
          return (mb = !0), !1;
        },
      };
      window.addEventListener("test", a, a),
        window.removeEventListener("test", a, a);
    } catch (a) {}
    class nb {
      constructor(a, b, c) {
        (this.value = void 0),
          (this.__pendingValue = void 0),
          (this.element = a),
          (this.eventName = b),
          (this.eventContext = c),
          (this.__boundHandleEvent = (a) => this.handleEvent(a));
      }
      setValue(a) {
        this.__pendingValue = a;
      }
      commit() {
        for (; Qa(this.__pendingValue); ) {
          const a = this.__pendingValue;
          (this.__pendingValue = Ta), a(this);
        }
        if (this.__pendingValue === Ta) return;
        const a = this.__pendingValue,
          b = this.value,
          c =
            null == a ||
            (null != b &&
              (a.capture !== b.capture ||
                a.once !== b.once ||
                a.passive !== b.passive));
        c &&
          this.element.removeEventListener(
            this.eventName,
            this.__boundHandleEvent,
            this.__options
          ),
          null != a &&
            (null == b || c) &&
            ((this.__options = ob(a)),
            this.element.addEventListener(
              this.eventName,
              this.__boundHandleEvent,
              this.__options
            )),
          (this.value = a),
          (this.__pendingValue = Ta);
      }
      handleEvent(a) {
        "function" == typeof this.value
          ? this.value.call(this.eventContext || this.element, a)
          : this.value.handleEvent(a);
      }
    }
    const ob = (a) =>
      a &&
      (mb
        ? { capture: a.capture, passive: a.passive, once: a.once }
        : a.capture);
    const pb = new class {
        handleAttributeExpressions(a, b, c, d) {
          const e = b[0];
          if ("." === e) {
            const d = new kb(a, b.slice(1), c);
            return d.parts;
          }
          if ("@" === e) return [new nb(a, b.slice(1), d.eventContext)];
          if ("?" === e) return [new jb(a, b.slice(1), c)];
          const f = new gb(a, b, c);
          return f.parts;
        }
        handleTextExpression(a) {
          return new ib(a);
        }
      }(),
      qb = new Map(),
      rb = new WeakMap(),
      sb = (a, b, c) => {
        let d = rb.get(b);
        d === void 0 &&
          (Sa(b, b.firstChild),
          rb.set(b, (d = new ib(Object.assign({ templateFactory: ya }, c)))),
          d.appendInto(b)),
          d.setValue(a),
          d.commit();
      };
    (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.0.0");
    const tb = function(a) {
        for (
          var b = arguments.length, c = Array(1 < b ? b - 1 : 0), d = 1;
          d < b;
          d++
        )
          c[d - 1] = arguments[d];
        return new db(a, c, "html", pb);
      },
      ub = 133,
      vb = (a) => {
        let b = 11 === a.nodeType ? 0 : 1;
        for (
          const c = document.createTreeWalker(a, ub, null, !1);
          c.nextNode();

        )
          b++;
        return b;
      },
      wb = function(a) {
        let b =
          1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : -1;
        for (let c = b + 1; c < a.length; c++) {
          const b = a[c];
          if (_a(b)) return c;
        }
        return -1;
      },
      xb = (a, b) => "".concat(a, "--").concat(b);
    let yb = !0;
    "undefined" == typeof window.ShadyCSS
      ? (yb = !1)
      : "undefined" == typeof window.ShadyCSS.prepareTemplateDom &&
        (console.warn(
          "Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."
        ),
        (yb = !1));
    const zb = (a) => (b) => {
        const c = xb(b.type, a);
        let d = qb.get(c);
        void 0 === d &&
          ((d = { stringsArray: new WeakMap(), keyString: new Map() }),
          qb.set(c, d));
        let e = d.stringsArray.get(b.strings);
        if (void 0 !== e) return e;
        const f = b.strings.join(Va);
        if (((e = d.keyString.get(f)), void 0 === e)) {
          const c = b.getTemplateElement();
          yb && window.ShadyCSS.prepareTemplateDom(c, a),
            (e = new Za(b, c)),
            d.keyString.set(f, e);
        }
        return d.stringsArray.set(b.strings, e), e;
      },
      Ab = ["html", "svg"],
      Bb = (a) => {
        Ab.forEach((b) => {
          const c = qb.get(xb(b, a));
          c !== void 0 &&
            c.keyString.forEach((a) => {
              const b = a.element.content,
                c = new Set();
              Array.from(b.querySelectorAll("style")).forEach((a) => {
                c.add(a);
              }),
                Aa(a, c);
            });
        });
      },
      Cb = new Set(),
      Db = (a, b, c) => {
        Cb.add(c);
        const d = a.querySelectorAll("style"),
          e = d.length;
        if (0 === e)
          return void window.ShadyCSS.prepareTemplateStyles(b.element, c);
        const f = document.createElement("style");
        for (let g = 0; g < e; g++) {
          const a = d[g];
          a.parentNode.removeChild(a), (f.textContent += a.textContent);
        }
        Bb(c);
        const g = b.element.content;
        Ba(b, f, g.firstChild),
          window.ShadyCSS.prepareTemplateStyles(b.element, c);
        const h = g.querySelector("style");
        if (window.ShadyCSS.nativeShadow && null !== h)
          a.insertBefore(h.cloneNode(!0), a.firstChild);
        else {
          g.insertBefore(f, g.firstChild);
          const a = new Set();
          a.add(f), Aa(b, a);
        }
      },
      Eb = (a, b, c) => {
        const d = c.scopeName,
          e = rb.has(b),
          f = yb && 11 === b.nodeType && !!b.host && a instanceof db,
          g = f && !Cb.has(d),
          h = g ? document.createDocumentFragment() : b;
        if ((sb(a, h, Object.assign({ templateFactory: zb(d) }, c)), g)) {
          const a = rb.get(h);
          rb.delete(h),
            a.value instanceof cb && Db(h, a.value.template, d),
            Sa(b, b.firstChild),
            b.appendChild(h),
            rb.set(b, a);
        }
        !e && f && window.ShadyCSS.styleElement(b.host);
      };
    window.JSCompiler_renameProperty = (a) => a;
    const Fb = {
        toAttribute(a, b) {
          return b === Boolean
            ? a
              ? ""
              : null
            : b === Object || b === Array
            ? null == a
              ? a
              : JSON.stringify(a)
            : a;
        },
        fromAttribute(a, b) {
          return b === Boolean
            ? null !== a
            : b === Number
            ? null === a
              ? null
              : +a
            : b === Object || b === Array
            ? JSON.parse(a)
            : a;
        },
      },
      Gb = (a, b) => b !== a && (b === b || a === a),
      Hb = {
        attribute: !0,
        type: String,
        converter: Fb,
        reflect: !1,
        hasChanged: Gb,
      },
      Ib = Promise.resolve(!0),
      Jb = 1,
      Kb = 4,
      Lb = 8,
      Mb = 16,
      Nb = 32;
    class Ob extends HTMLElement {
      constructor() {
        super(),
          (this._updateState = 0),
          (this._instanceProperties = void 0),
          (this._updatePromise = Ib),
          (this._hasConnectedResolver = void 0),
          (this._changedProperties = new Map()),
          (this._reflectingProperties = void 0),
          this.initialize();
      }
      static get observedAttributes() {
        this.finalize();
        const a = [];
        return (
          this._classProperties.forEach((b, c) => {
            const d = this._attributeNameForProperty(c, b);
            void 0 !== d && (this._attributeToPropertyMap.set(d, c), a.push(d));
          }),
          a
        );
      }
      static _ensureClassProperties() {
        if (
          !this.hasOwnProperty(
            JSCompiler_renameProperty("_classProperties", this)
          )
        ) {
          this._classProperties = new Map();
          const a = Object.getPrototypeOf(this)._classProperties;
          a !== void 0 && a.forEach((a, b) => this._classProperties.set(b, a));
        }
      }
      static createProperty(a) {
        let b =
          1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : Hb;
        if (
          (this._ensureClassProperties(),
          this._classProperties.set(a, b),
          b.noAccessor || this.prototype.hasOwnProperty(a))
        )
          return;
        const c = "symbol" == typeof a ? Symbol() : "__".concat(a);
        Object.defineProperty(this.prototype, a, {
          get() {
            return this[c];
          },
          set(b) {
            const d = this[a];
            (this[c] = b), this._requestUpdate(a, d);
          },
          configurable: !0,
          enumerable: !0,
        });
      }
      static finalize() {
        if (
          !(
            this.hasOwnProperty(JSCompiler_renameProperty("finalized", this)) &&
            this.finalized
          )
        ) {
          const a = Object.getPrototypeOf(this);
          if (
            ("function" == typeof a.finalize && a.finalize(),
            (this.finalized = !0),
            this._ensureClassProperties(),
            (this._attributeToPropertyMap = new Map()),
            this.hasOwnProperty(JSCompiler_renameProperty("properties", this)))
          ) {
            const a = this.properties,
              b = [
                ...Object.getOwnPropertyNames(a),
                ...("function" == typeof Object.getOwnPropertySymbols
                  ? Object.getOwnPropertySymbols(a)
                  : []),
              ];
            for (const c of b) this.createProperty(c, a[c]);
          }
        }
      }
      static _attributeNameForProperty(a, b) {
        const c = b.attribute;
        return !1 === c
          ? void 0
          : "string" == typeof c
          ? c
          : "string" == typeof a
          ? a.toLowerCase()
          : void 0;
      }
      static _valueHasChanged(a, b) {
        let c =
          2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : Gb;
        return c(a, b);
      }
      static _propertyValueFromAttribute(a, b) {
        const c = b.type,
          d = b.converter || Fb,
          e = "function" == typeof d ? d : d.fromAttribute;
        return e ? e(a, c) : a;
      }
      static _propertyValueToAttribute(a, b) {
        if (void 0 === b.reflect) return;
        const c = b.type,
          d = b.converter,
          e = (d && d.toAttribute) || Fb.toAttribute;
        return e(a, c);
      }
      initialize() {
        this._saveInstanceProperties(), this._requestUpdate();
      }
      _saveInstanceProperties() {
        this.constructor._classProperties.forEach((a, b) => {
          if (this.hasOwnProperty(b)) {
            const a = this[b];
            delete this[b],
              this._instanceProperties ||
                (this._instanceProperties = new Map()),
              this._instanceProperties.set(b, a);
          }
        });
      }
      _applyInstanceProperties() {
        this._instanceProperties.forEach((a, b) => (this[b] = a)),
          (this._instanceProperties = void 0);
      }
      connectedCallback() {
        (this._updateState |= Nb),
          this._hasConnectedResolver &&
            (this._hasConnectedResolver(),
            (this._hasConnectedResolver = void 0));
      }
      disconnectedCallback() {}
      attributeChangedCallback(a, b, c) {
        b !== c && this._attributeToProperty(a, c);
      }
      _propertyToAttribute(a, b) {
        let c =
          2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : Hb;
        const d = this.constructor,
          e = d._attributeNameForProperty(a, c);
        if (e !== void 0) {
          const a = d._propertyValueToAttribute(b, c);
          if (a === void 0) return;
          (this._updateState |= Lb),
            null == a ? this.removeAttribute(e) : this.setAttribute(e, a),
            (this._updateState &= ~Lb);
        }
      }
      _attributeToProperty(a, b) {
        if (this._updateState & Lb) return;
        const c = this.constructor,
          d = c._attributeToPropertyMap.get(a);
        if (d !== void 0) {
          const a = c._classProperties.get(d) || Hb;
          (this._updateState |= Mb),
            (this[d] = c._propertyValueFromAttribute(b, a)),
            (this._updateState &= ~Mb);
        }
      }
      _requestUpdate(a, b) {
        let c = !0;
        if (a !== void 0) {
          const d = this.constructor,
            e = d._classProperties.get(a) || Hb;
          d._valueHasChanged(this[a], b, e.hasChanged)
            ? (!this._changedProperties.has(a) &&
                this._changedProperties.set(a, b),
              !0 === e.reflect &&
                !(this._updateState & Mb) &&
                (this._reflectingProperties === void 0 &&
                  (this._reflectingProperties = new Map()),
                this._reflectingProperties.set(a, e)))
            : (c = !1);
        }
        !this._hasRequestedUpdate && c && this._enqueueUpdate();
      }
      requestUpdate(a, b) {
        return this._requestUpdate(a, b), this.updateComplete;
      }
      _enqueueUpdate() {
        var a = this;
        return Ga(function*() {
          a._updateState |= Kb;
          let b, c;
          const d = a._updatePromise;
          a._updatePromise = new Promise((a, d) => {
            (b = a), (c = d);
          });
          try {
            yield d;
          } catch (a) {}
          a._hasConnected ||
            (yield new Promise((b) => (a._hasConnectedResolver = b)));
          try {
            const b = a.performUpdate();
            null != b && (yield b);
          } catch (a) {
            c(a);
          }
          b(!a._hasRequestedUpdate);
        })();
      }
      get _hasConnected() {
        return this._updateState & Nb;
      }
      get _hasRequestedUpdate() {
        return this._updateState & Kb;
      }
      get hasUpdated() {
        return this._updateState & Jb;
      }
      performUpdate() {
        this._instanceProperties && this._applyInstanceProperties();
        let a = !1;
        const b = this._changedProperties;
        try {
          (a = this.shouldUpdate(b)), a && this.update(b);
        } catch (b) {
          throw ((a = !1), b);
        } finally {
          this._markUpdated();
        }
        a &&
          (!(this._updateState & Jb) &&
            ((this._updateState |= Jb), this.firstUpdated(b)),
          this.updated(b));
      }
      _markUpdated() {
        (this._changedProperties = new Map()), (this._updateState &= ~Kb);
      }
      get updateComplete() {
        return this._updatePromise;
      }
      shouldUpdate(a) {
        return !0;
      }
      update(a) {
        this._reflectingProperties !== void 0 &&
          0 < this._reflectingProperties.size &&
          (this._reflectingProperties.forEach((a, b) =>
            this._propertyToAttribute(b, this[b], a)
          ),
          (this._reflectingProperties = void 0));
      }
      updated(a) {}
      firstUpdated(a) {}
    }
    Ob.finalized = !0;
    const Pb =
        "adoptedStyleSheets" in Document.prototype &&
        "replace" in CSSStyleSheet.prototype,
      Qb = Symbol();
    class Rb {
      constructor(a, b) {
        if (b !== Qb)
          throw new Error(
            "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
          );
        this.cssText = a;
      }
      get styleSheet() {
        return (
          void 0 === this._styleSheet &&
            (Pb
              ? ((this._styleSheet = new CSSStyleSheet()),
                this._styleSheet.replaceSync(this.cssText))
              : (this._styleSheet = null)),
          this._styleSheet
        );
      }
      toString() {
        return this.cssText;
      }
    }
    const Sb = (a) => {
        if (a instanceof Rb) return a.cssText;
        if ("number" == typeof a) return a;
        throw new Error(
          "Value passed to 'css' function must be a 'css' function result: ".concat(
            a,
            ". Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security."
          )
        );
      },
      Tb = function(a) {
        for (
          var b = arguments.length, c = Array(1 < b ? b - 1 : 0), d = 1;
          d < b;
          d++
        )
          c[d - 1] = arguments[d];
        const e = c.reduce((b, c, d) => b + Sb(c) + a[d + 1], a[0]);
        return new Rb(e, Qb);
      };
    (window.litElementVersions || (window.litElementVersions = [])).push(
      "2.2.0"
    );
    const Ub = (a) => (a.flat ? a.flat(1 / 0) : Ca(a));
    class Vb extends Ob {
      static finalize() {
        super.finalize(),
          (this._styles = this.hasOwnProperty(
            JSCompiler_renameProperty("styles", this)
          )
            ? this._getUniqueStyles()
            : this._styles || []);
      }
      static _getUniqueStyles() {
        const a = this.styles,
          b = [];
        if (Array.isArray(a)) {
          const c = Ub(a),
            d = c.reduceRight((a, b) => (a.add(b), a), new Set());
          d.forEach((a) => b.unshift(a));
        } else a && b.push(a);
        return b;
      }
      initialize() {
        super.initialize(),
          (this.renderRoot = this.createRenderRoot()),
          window.ShadowRoot &&
            this.renderRoot instanceof window.ShadowRoot &&
            this.adoptStyles();
      }
      createRenderRoot() {
        return this.attachShadow({ mode: "open" });
      }
      adoptStyles() {
        const a = this.constructor._styles;
        0 === a.length ||
          (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow
            ? Pb
              ? (this.renderRoot.adoptedStyleSheets = a.map(
                  (a) => a.styleSheet
                ))
              : (this._needsShimAdoptedStyleSheets = !0)
            : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(
                a.map((a) => a.cssText),
                this.localName
              ));
      }
      connectedCallback() {
        super.connectedCallback(),
          this.hasUpdated &&
            window.ShadyCSS !== void 0 &&
            window.ShadyCSS.styleElement(this);
      }
      update(a) {
        super.update(a);
        const b = this.render();
        b instanceof db &&
          this.constructor.render(b, this.renderRoot, {
            scopeName: this.localName,
            eventContext: this,
          }),
          this._needsShimAdoptedStyleSheets &&
            ((this._needsShimAdoptedStyleSheets = !1),
            this.constructor._styles.forEach((a) => {
              const b = document.createElement("style");
              (b.textContent = a.cssText), this.renderRoot.appendChild(b);
            }));
      }
      render() {}
    }
    (Vb.finalized = !0), (Vb.render = Eb);
    const Wb = new WeakMap(),
      Xb = ((a) =>
        function() {
          const b = a(...arguments);
          return Pa.set(b, !0), b;
        })((a) => (b) => {
        if (
          !(b instanceof hb) ||
          b instanceof lb ||
          "class" !== b.committer.name ||
          1 < b.committer.parts.length
        )
          throw new Error(
            "The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute."
          );
        const c = b.committer,
          d = c.element;
        Wb.has(b) || (d.className = c.strings.join(" "));
        const e = d.classList,
          f = Wb.get(b);
        for (const c in f) c in a || e.remove(c);
        for (const c in a) {
          const b = a[c];
          if (!f || b !== f[c]) {
            const a = b ? "add" : "remove";
            e[a](c);
          }
        }
        Wb.set(b, a);
      });
    var Yb = (function() {
        function a(a, b) {
          var c = -1;
          return (
            a.some(function(a, d) {
              return a[0] === b && ((c = d), !0);
            }),
            c
          );
        }
        return "undefined" == typeof Map
          ? (function() {
              function b() {
                this.__entries__ = [];
              }
              return (
                Object.defineProperty(b.prototype, "size", {
                  get: function() {
                    return this.__entries__.length;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                (b.prototype.get = function(b) {
                  var c = a(this.__entries__, b),
                    d = this.__entries__[c];
                  return d && d[1];
                }),
                (b.prototype.set = function(b, c) {
                  var d = a(this.__entries__, b);
                  ~d
                    ? (this.__entries__[d][1] = c)
                    : this.__entries__.push([b, c]);
                }),
                (b.prototype.delete = function(b) {
                  var c = this.__entries__,
                    d = a(c, b);
                  ~d && c.splice(d, 1);
                }),
                (b.prototype.has = function(b) {
                  return !!~a(this.__entries__, b);
                }),
                (b.prototype.clear = function() {
                  this.__entries__.splice(0);
                }),
                (b.prototype.forEach = function(a, b) {
                  void 0 === b && (b = null);
                  for (var c, d = 0, e = this.__entries__; d < e.length; d++)
                    (c = e[d]), a.call(b, c[1], c[0]);
                }),
                b
              );
            })()
          : Map;
      })(),
      Zb =
        "undefined" != typeof window &&
        "undefined" != typeof document &&
        window.document === document,
      $b = (function() {
        return "undefined" != typeof global && global.Math === Math
          ? global
          : "undefined" != typeof self && self.Math === Math
          ? self
          : "undefined" != typeof window && window.Math === Math
          ? window
          : Function("return this")();
      })(),
      _b = (function() {
        return "function" == typeof requestAnimationFrame
          ? requestAnimationFrame.bind($b)
          : function(a) {
              return setTimeout(function() {
                return a(Date.now());
              }, 1e3 / 60);
            };
      })(),
      ac = [
        "top",
        "right",
        "bottom",
        "left",
        "width",
        "height",
        "size",
        "weight",
      ],
      bc = "undefined" != typeof MutationObserver,
      cc = (function() {
        function a() {
          (this.connected_ = !1),
            (this.mutationEventsAdded_ = !1),
            (this.mutationsObserver_ = null),
            (this.observers_ = []),
            (this.onTransitionEnd_ = this.onTransitionEnd_.bind(this)),
            (this.refresh = Ea(this.refresh.bind(this), 20));
        }
        return (
          (a.prototype.addObserver = function(a) {
            ~this.observers_.indexOf(a) || this.observers_.push(a),
              this.connected_ || this.connect_();
          }),
          (a.prototype.removeObserver = function(a) {
            var b = this.observers_,
              c = b.indexOf(a);
            ~c && b.splice(c, 1),
              !b.length && this.connected_ && this.disconnect_();
          }),
          (a.prototype.refresh = function() {
            var a = this.updateObservers_();
            a && this.refresh();
          }),
          (a.prototype.updateObservers_ = function() {
            var a = this.observers_.filter(function(a) {
              return a.gatherActive(), a.hasActive();
            });
            return (
              a.forEach(function(a) {
                return a.broadcastActive();
              }),
              0 < a.length
            );
          }),
          (a.prototype.connect_ = function() {
            !Zb ||
              this.connected_ ||
              (document.addEventListener(
                "transitionend",
                this.onTransitionEnd_
              ),
              window.addEventListener("resize", this.refresh),
              bc
                ? ((this.mutationsObserver_ = new MutationObserver(
                    this.refresh
                  )),
                  this.mutationsObserver_.observe(document, {
                    attributes: !0,
                    childList: !0,
                    characterData: !0,
                    subtree: !0,
                  }))
                : (document.addEventListener(
                    "DOMSubtreeModified",
                    this.refresh
                  ),
                  (this.mutationEventsAdded_ = !0)),
              (this.connected_ = !0));
          }),
          (a.prototype.disconnect_ = function() {
            Zb &&
              this.connected_ &&
              (document.removeEventListener(
                "transitionend",
                this.onTransitionEnd_
              ),
              window.removeEventListener("resize", this.refresh),
              this.mutationsObserver_ && this.mutationsObserver_.disconnect(),
              this.mutationEventsAdded_ &&
                document.removeEventListener(
                  "DOMSubtreeModified",
                  this.refresh
                ),
              (this.mutationsObserver_ = null),
              (this.mutationEventsAdded_ = !1),
              (this.connected_ = !1));
          }),
          (a.prototype.onTransitionEnd_ = function(a) {
            var b = a.propertyName,
              c = void 0 === b ? "" : b,
              d = ac.some(function(a) {
                return !!~c.indexOf(a);
              });
            d && this.refresh();
          }),
          (a.getInstance = function() {
            return this.instance_ || (this.instance_ = new a()), this.instance_;
          }),
          (a.instance_ = null),
          a
        );
      })(),
      dc = function(a, b) {
        for (var c, d = 0, e = Object.keys(b); d < e.length; d++)
          (c = e[d]),
            Object.defineProperty(a, c, {
              value: b[c],
              enumerable: !1,
              writable: !1,
              configurable: !0,
            });
        return a;
      },
      ec = function(a) {
        var b = a && a.ownerDocument && a.ownerDocument.defaultView;
        return b || $b;
      },
      fc = Oa(0, 0, 0, 0),
      gc = (function() {
        return "undefined" == typeof SVGGraphicsElement
          ? function(a) {
              return (
                a instanceof ec(a).SVGElement && "function" == typeof a.getBBox
              );
            }
          : function(a) {
              return a instanceof ec(a).SVGGraphicsElement;
            };
      })(),
      hc = (function() {
        function a(a) {
          (this.broadcastWidth = 0),
            (this.broadcastHeight = 0),
            (this.contentRect_ = Oa(0, 0, 0, 0)),
            (this.target = a);
        }
        return (
          (a.prototype.isActive = function() {
            var a = Ma(this.target);
            return (
              (this.contentRect_ = a),
              a.width !== this.broadcastWidth ||
                a.height !== this.broadcastHeight
            );
          }),
          (a.prototype.broadcastRect = function() {
            var a = this.contentRect_;
            return (
              (this.broadcastWidth = a.width),
              (this.broadcastHeight = a.height),
              a
            );
          }),
          a
        );
      })(),
      ic = (function() {
        return function(a, b) {
          var c = Na(b);
          dc(this, { target: a, contentRect: c });
        };
      })(),
      jc = (function() {
        function a(a, b, c) {
          if (
            ((this.activeObservations_ = []),
            (this.observations_ = new Yb()),
            "function" != typeof a)
          )
            throw new TypeError(
              "The callback provided as parameter 1 is not a function."
            );
          (this.callback_ = a), (this.controller_ = b), (this.callbackCtx_ = c);
        }
        return (
          (a.prototype.observe = function(a) {
            if (!arguments.length)
              throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
              if (!(a instanceof ec(a).Element))
                throw new TypeError('parameter 1 is not of type "Element".');
              var b = this.observations_;
              b.has(a) ||
                (b.set(a, new hc(a)),
                this.controller_.addObserver(this),
                this.controller_.refresh());
            }
          }),
          (a.prototype.unobserve = function(a) {
            if (!arguments.length)
              throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
              if (!(a instanceof ec(a).Element))
                throw new TypeError('parameter 1 is not of type "Element".');
              var b = this.observations_;
              b.has(a) &&
                (b.delete(a), !b.size && this.controller_.removeObserver(this));
            }
          }),
          (a.prototype.disconnect = function() {
            this.clearActive(),
              this.observations_.clear(),
              this.controller_.removeObserver(this);
          }),
          (a.prototype.gatherActive = function() {
            var a = this;
            this.clearActive(),
              this.observations_.forEach(function(b) {
                b.isActive() && a.activeObservations_.push(b);
              });
          }),
          (a.prototype.broadcastActive = function() {
            if (this.hasActive()) {
              var a = this.callbackCtx_,
                b = this.activeObservations_.map(function(a) {
                  return new ic(a.target, a.broadcastRect());
                });
              this.callback_.call(a, b, a), this.clearActive();
            }
          }),
          (a.prototype.clearActive = function() {
            this.activeObservations_.splice(0);
          }),
          (a.prototype.hasActive = function() {
            return 0 < this.activeObservations_.length;
          }),
          a
        );
      })(),
      kc = "undefined" == typeof WeakMap ? new Yb() : new WeakMap(),
      lc = (function() {
        function a(b) {
          if (!(this instanceof a))
            throw new TypeError("Cannot call a class as a function.");
          if (!arguments.length)
            throw new TypeError("1 argument required, but only 0 present.");
          var c = cc.getInstance(),
            d = new jc(b, c, this);
          kc.set(this, d);
        }
        return a;
      })();
    ["observe", "unobserve", "disconnect"].forEach(function(a) {
      lc.prototype[a] = function() {
        var b;
        return (b = kc.get(this))[a].apply(b, arguments);
      };
    });
    var mc = (function() {
      return "undefined" == typeof $b.ResizeObserver ? lc : $b.ResizeObserver;
    })();
    const nc = {
        shuffle: !0,
        power_state: !0,
        artwork_border: !0,
        icon_state: !0,
        sound_mode: !0,
        runtime: !0,
        volume: !1,
        controls: !1,
        play_pause: !1,
        play_stop: !0,
      },
      oc = {
        DEFAULT: "mdi:cast",
        DROPDOWN: "mdi:chevron-down",
        GROUP: "mdi:speaker-multiple",
        MENU: "mdi:menu-down",
        MUTE: { true: "mdi:volume-off", false: "mdi:volume-high" },
        NEXT: "mdi:skip-next",
        PLAY: { true: "mdi:pause", false: "mdi:play" },
        POWER: "mdi:power",
        PREV: "mdi:skip-previous",
        SEND: "mdi:send",
        SHUFFLE: "mdi:shuffle",
        STOP: { true: "mdi:stop", false: "mdi:play" },
        VOL_DOWN: "mdi:volume-minus",
        VOL_UP: "mdi:volume-plus",
      },
      pc = ["entity", "_overflow", "break", "thumbnail", "edit", "idle"],
      qc = ["media_duration", "media_position", "media_position_updated_at"],
      rc = [
        { attr: "media_title" },
        { attr: "media_artist" },
        { attr: "media_series_title" },
        { attr: "media_season", prefix: "S" },
        { attr: "media_episode", prefix: "E" },
        { attr: "app_name" },
      ];
    class sc {
      constructor(a, b, c) {
        (this.hass = a || {}),
          (this.config = b || {}),
          (this.entity = c || {}),
          (this.state = c.state),
          (this.attr = c.attributes),
          (this.idle = !!b.idle_view && this.idleView),
          (this.active = this.isActive);
      }
      get id() {
        return this.entity.entity_id;
      }
      get icon() {
        return this.attr.icon;
      }
      get isPaused() {
        return "paused" === this.state;
      }
      get isPlaying() {
        return "playing" === this.state;
      }
      get isIdle() {
        return "idle" === this.state;
      }
      get isStandby() {
        return "standby" === this.state;
      }
      get isUnavailable() {
        return "unavailable" === this.state;
      }
      get isOff() {
        return "off" === this.state;
      }
      get isActive() {
        return (!this.isOff && !this.isUnavailable && !this.idle) || !1;
      }
      get shuffle() {
        return this.attr.shuffle || !1;
      }
      get content() {
        return this.attr.media_content_type || "none";
      }
      get mediaDuration() {
        return this.attr.media_duration || 0;
      }
      get updatedAt() {
        return this.attr.media_position_updated_at || 0;
      }
      get position() {
        return this.attr.media_position || 0;
      }
      get name() {
        return this.attr.friendly_name || "";
      }
      get groupCount() {
        return this.group.length;
      }
      get isGrouped() {
        return 1 < this.group.length;
      }
      get group() {
        const a = "".concat(this.config.speaker_group.platform, "_group");
        return this.attr[a] || [];
      }
      get master() {
        return this.group[0] || this.config.entity;
      }
      get isMaster() {
        return this.master === this.config.entity;
      }
      get sources() {
        return this.attr.source_list || [];
      }
      get source() {
        return this.attr.source || "";
      }
      get soundModes() {
        return this.attr.sound_mode_list || [];
      }
      get soundMode() {
        return this.attr.sound_mode || "";
      }
      get muted() {
        return this.attr.is_volume_muted || !1;
      }
      get vol() {
        return this.attr.volume_level || 0;
      }
      get picture() {
        return this.attr.entity_picture;
      }
      get hasArtwork() {
        return (
          this.picture &&
          "none" !== this.config.artwork &&
          this.active &&
          !this.idle
        );
      }
      get mediaInfo() {
        return rc
          .map((a) => Da({ text: this.attr[a.attr], prefix: "" }, a))
          .filter((a) => a.text);
      }
      get hasProgress() {
        return (
          !this.config.hide.progress &&
          !this.idle &&
          qc.every((a) => a in this.attr)
        );
      }
      get progress() {
        return (
          this.position +
          (Date.now() - new Date(this.updatedAt).getTime()) / 1e3
        );
      }
      get idleView() {
        const a = this.config.idle_view;
        return (
          !!(
            (a.when_idle && this.isIdle) ||
            (a.when_standby && this.isStandby) ||
            (a.when_paused && this.isPaused)
          ) ||
          (!!(this.updatedAt && a.after && !this.isPlaying) &&
            this.checkIdleAfter(a.after))
        );
      }
      get trackIdle() {
        return (
          this.active &&
          !this.isPlaying &&
          this.updatedAt &&
          this.config.idle_view &&
          this.config.idle_view.after
        );
      }
      checkIdleAfter(a) {
        const b = (Date.now() - new Date(this.updatedAt).getTime()) / 1e3;
        return (
          (this.idle = b > 60 * a), (this.active = this.isActive), this.idle
        );
      }
      get supportsShuffle() {
        return "undefined" != typeof this.attr.shuffle;
      }
      get supportsMute() {
        return "undefined" != typeof this.attr.is_volume_muted;
      }
      getAttribute(a) {
        return this.attr[a] || "";
      }
      fetchThumbnail() {
        var a = this;
        return Ga(function*() {
          try {
            const b = yield a.hass.callWS({
                type: "media_player_thumbnail",
                entity_id: a.config.entity,
              }),
              c = b.content_type,
              d = b.content;
            return "url(data:".concat(c, ";base64,").concat(d, ")");
          } catch (a) {
            return (
              console.error("mini-media-player: Failed fetching thumbnail"), !1
            );
          }
        })();
      }
      toggle(a) {
        return this.config.toggle_power
          ? this.callService(a, "toggle")
          : this.isOff
          ? this.callService(a, "turn_on")
          : void this.callService(a, "turn_off");
      }
      toggleMute(a) {
        this.callService(a, "volume_mute", { is_volume_muted: !this.muted });
      }
      toggleShuffle(a) {
        this.callService(a, "shuffle_set", { shuffle: !this.shuffle });
      }
      setSource(a, b) {
        this.callService(a, "select_source", { source: b });
      }
      setMedia(a, b) {
        this.callService(a, "play_media", Da({}, b));
      }
      playPause(a) {
        this.callService(a, "media_play_pause");
      }
      playStop(a) {
        this.isPlaying
          ? this.callService(a, "media_stop")
          : this.callService(a, "media_play");
      }
      setSoundMode(a, b) {
        this.callService(a, "select_sound_mode", { sound_mode: b });
      }
      next(a) {
        this.callService(a, "media_next_track");
      }
      prev(a) {
        this.callService(a, "media_previous_track");
      }
      stop(a) {
        this.callService(a, "media_stop");
      }
      volumeUp(a) {
        this.callService(a, "volume_up");
      }
      volumeDown(a) {
        this.callService(a, "volume_down");
      }
      seek(a, b) {
        this.callService(a, "media_seek", { seek_position: b });
      }
      setVolume(a, b) {
        this.config.speaker_group.sync_volume
          ? this.group.forEach((c) => {
              const d =
                this.config.speaker_group.entities.find(
                  (a) => a.entity_id === c
                ) || {};
              let e = b;
              d.volume_offset &&
                ((e += d.volume_offset / 100),
                1 < e && (e = 1),
                0 > e && (e = 0)),
                this.callService(a, "volume_set", {
                  entity_id: c,
                  volume_level: e,
                });
            })
          : this.callService(a, "volume_set", {
              entity_id: this.config.entity,
              volume_level: b,
            });
      }
      handleGroupChange(a, b, c) {
        const d = this.config.speaker_group.platform,
          e = { entity_id: b };
        if (c) {
          if (((e.master = this.config.entity), "bluesound" === d))
            return this.callService(a, "".concat(d, "_JOIN"), e);
          this.callService(a, "join", e, d);
        } else {
          if ("bluesound" === d)
            return this.callService(a, "".concat(d, "_UNJOIN"), e);
          this.callService(a, "unjoin", e, d);
        }
      }
      toggleScript(a, b) {
        let c =
          2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : {};
        this.callService(a, b.split(".").pop(), Da({}, c), "script");
      }
      toggleService(a, b) {
        let c =
          2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : {};
        a.stopPropagation();
        const d = b.split("."),
          e = za(d, 2),
          f = e[0],
          g = e[1];
        this.hass.callService(f, g, Da({}, c));
      }
      callService(a, b, c) {
        let d =
          3 < arguments.length && arguments[3] !== void 0
            ? arguments[3]
            : "media_player";
        a.stopPropagation(),
          this.hass.callService(d, b, Da({ entity_id: this.config.entity }, c));
      }
    }
    const tc = Tb(xa());
    class uc extends Vb {
      static get properties() {
        return {
          item: {},
          checked: Boolean,
          disabled: Boolean,
          master: Boolean,
        };
      }
      render() {
        return tb(
          wa(),
          this.checked,
          this.disabled,
          (a) => a.stopPropagation(),
          this.handleClick,
          this.item.name,
          this.master ? tb(va()) : ""
        );
      }
      handleClick(a) {
        a.stopPropagation(),
          this.dispatchEvent(
            new CustomEvent("change", {
              detail: { entity: this.item.entity_id, checked: !this.checked },
            })
          );
      }
      static get styles() {
        return Tb(ua());
      }
    }
    customElements.define("mmp-group-item", uc);
    class vc extends Vb {
      render() {
        return tb(ta());
      }
      static get styles() {
        return Tb(sa());
      }
    }
    customElements.define("mmp-button", vc);
    class wc extends Vb {
      static get properties() {
        return { entities: {}, player: {}, visible: Boolean };
      }
      get group() {
        return this.player.group;
      }
      get master() {
        return this.player.master;
      }
      get isMaster() {
        return this.player.isMaster;
      }
      handleGroupChange(a) {
        const b = a.detail,
          c = b.entity,
          d = b.checked;
        this.player.handleGroupChange(a, c, d);
      }
      render() {
        let a =
            0 < arguments.length && arguments[0] !== void 0
              ? arguments[0]
              : this,
          b = a.group,
          c = a.master,
          d = a.isMaster;
        return this.visible
          ? tb(
              ra(),
              this.visible,
              this.entities.map((a) =>
                tb(
                  qa(),
                  this.handleGroupChange,
                  a,
                  a.entity_id === this.player.id || b.includes(a.entity_id),
                  a.entity_id === this.player.id || c !== this.player.id,
                  a.entity_id === c
                )
              ),
              2 > b.length,
              (a) =>
                this.player.handleGroupChange(
                  a,
                  d ? b : this.player.entity_id,
                  !1
                ),
              d ? tb(pa()) : tb(oa()),
              !d,
              (a) =>
                this.player.handleGroupChange(
                  a,
                  this.entities.map((a) => a.entity_id),
                  !0
                )
            )
          : tb(na());
      }
      static get styles() {
        return Tb(ma());
      }
    }
    customElements.define("mmp-group-list", wc);
    const xc = Tb(la());
    class yc extends Vb {
      static get properties() {
        return { items: [], label: String, selected: String };
      }
      get selectedId() {
        return this.items.map((a) => a.id).indexOf(this.selected);
      }
      onChange(a) {
        this.dispatchEvent(new CustomEvent("change", { detail: a }));
      }
      render() {
        return tb(
          ka(),
          "right",
          "top",
          44,
          (a) => a.stopPropagation(),
          this.icon
            ? tb(ja(), oc.DROPDOWN)
            : tb(ia(), this.selected || this.label, oc.DROPDOWN),
          this.selectedId,
          this.items.map((a) =>
            tb(
              ha(),
              a.id || a.name,
              () => this.onChange(a),
              a.icon ? tb(ga(), a.icon) : "",
              a.name ? tb(fa(), a.name) : ""
            )
          )
        );
      }
      static get styles() {
        return [xc, Tb(ea())];
      }
    }
    customElements.define("mmp-dropdown", yc);
    class zc extends Vb {
      static get properties() {
        return { player: {}, shortcuts: {} };
      }
      get buttons() {
        return this.shortcuts.buttons;
      }
      get list() {
        return this.shortcuts.list;
      }
      get show() {
        return !this.shortcuts.hide_when_off || this.player.active;
      }
      get active() {
        return this.player.getAttribute(this.shortcuts.attribute);
      }
      get height() {
        return this.shortcuts.column_height || 36;
      }
      render() {
        if (!this.show) return tb(da());
        const a = this.active,
          b = this.list
            ? tb(ca(), this.handleShortcut, this.list, this.shortcuts.label, a)
            : "",
          c = this.buttons
            ? tb(
                ba(),
                this.buttons.map((b) =>
                  tb(
                    aa(),
                    "min-height: ".concat(this.height, "px;"),
                    this.shortcuts.columns,
                    b.id === a,
                    (a) => this.handleShortcut(a, b),
                    this.shortcuts.align_text,
                    b.icon ? tb(_(), b.icon) : "",
                    b.name ? tb($(), b.name) : ""
                  )
                )
              )
            : "";
        return tb(Z(), c, b);
      }
      handleShortcut(a, b) {
        const c = b || a.detail,
          d = c.type,
          e = c.id,
          f = c.data;
        if ("source" === d) return this.player.setSource(a, e);
        if ("service" === d) return this.player.toggleService(a, e, f);
        if ("script" === d) return this.player.toggleScript(a, e, f);
        if ("sound_mode" === d) return this.player.setSoundMode(a, e);
        this.player.setMedia(a, { media_content_type: d, media_content_id: e });
      }
      static get styles() {
        return [xc, Tb(Y())];
      }
    }
    customElements.define("mmp-shortcuts", zc);
    const Ac = function(a, b) {
      let c =
        2 < arguments.length && arguments[2] !== void 0
          ? arguments[2]
          : "unknown";
      const d = a.selectedLanguage || a.language,
        e = a.resources[d];
      return e && e[b] ? e[b] : c;
    };
    class Bc extends Vb {
      static get properties() {
        return { hass: {}, config: {} };
      }
      get label() {
        return Ac(this.hass, "ui.card.media_player.text_to_speak", "Say");
      }
      get input() {
        return this.shadowRoot.getElementById("tts-input");
      }
      get message() {
        return this.input.value;
      }
      render() {
        return tb(X(), this.label, (a) => a.stopPropagation(), this.handleTts);
      }
      handleTts(a) {
        const b = this.config,
          c = this.message,
          d = { message: c, entity_id: b.entity_id || this.entity };
        b.language && (d.language = b.language),
          "alexa" === b.platform
            ? this.hass.callService("notify", "alexa_media", {
                message: c,
                data: { type: b.type || "tts" },
                target: d.entity_id,
              })
            : "sonos" === b.platform
            ? this.hass.callService("script", "sonos_say", {
                sonos_entity: d.entity_id,
                volume: b.volume || 0.5,
                message: c,
              })
            : "webos" === b.platform
            ? this.hass.callService(
                "notify",
                d.entity_id.split(".").slice(-1)[0],
                { message: c }
              )
            : "ga" === b.platform
            ? this.hass.callService("notify", "ga_broadcast", { message: c })
            : this.hass.callService("tts", "".concat(b.platform, "_say"), d),
          a.stopPropagation(),
          this.reset();
      }
      reset() {
        this.input.value = "";
      }
      static get styles() {
        return Tb(W());
      }
    }
    customElements.define("mmp-tts", Bc);
    var Cc = (a) => {
      let b = parseInt(a % 60, 10),
        c = parseInt((a / 60) % 60, 10),
        d = parseInt((a / 3600) % 24, 10);
      return (
        (d = 10 > d ? "0".concat(d) : d),
        (c = 10 > c ? "0".concat(c) : c),
        (b = 10 > b ? "0".concat(b) : b),
        ""
          .concat("00" === d ? "" : "".concat(d, ":"))
          .concat(c, ":")
          .concat(b)
      );
    };
    class Dc extends Vb {
      static get properties() {
        return {
          _player: {},
          showTime: Boolean,
          progress: Number,
          duration: Number,
          tracker: {},
          seekProgress: Number,
          seekWidth: Number,
          track: Boolean,
        };
      }
      set player(a) {
        (this._player = a), this.hasProgress && this.trackProgress();
      }
      get duration() {
        return this.player.mediaDuration;
      }
      get player() {
        return this._player;
      }
      get hasProgress() {
        return this.player.hasProgress;
      }
      get width() {
        return this.shadowRoot.querySelector(".mmp-progress").offsetWidth;
      }
      get offset() {
        return this.getBoundingClientRect().left;
      }
      get classes() {
        return Xb({
          transiting: !this.seekProgress,
          seeking: this.seekProgress,
        });
      }
      render() {
        return tb(
          V(),
          this.initSeek,
          this.handleSeek,
          this.initSeek,
          this.handleSeek,
          this.resetSeek,
          (a) => a.stopPropagation(),
          !this.player.isPlaying,
          this.showTime
            ? tb(U(), Cc(this.seekProgress || this.progress), Cc(this.duration))
            : "",
          this.classes,
          this.seekProgress || this.progress,
          this.duration
        );
      }
      trackProgress() {
        (this.progress = this.player.progress),
          this.tracker ||
            (this.tracker = setInterval(() => this.trackProgress(), 1e3)),
          this.player.isPlaying ||
            (clearInterval(this.tracker), (this.tracker = null));
      }
      initSeek(a) {
        const b = a.offsetX || a.touches[0].pageX - this.offset;
        (this.seekWidth = this.width),
          (this.seekProgress = this.calcProgress(b)),
          this.addEventListener("touchmove", this.moveSeek),
          this.addEventListener("mousemove", this.moveSeek);
      }
      resetSeek() {
        (this.seekProgress = null),
          this.removeEventListener("touchmove", this.moveSeek),
          this.removeEventListener("mousemove", this.moveSeek);
      }
      moveSeek(a) {
        a.preventDefault();
        const b = a.offsetX || a.touches[0].pageX - this.offset;
        this.seekProgress = this.calcProgress(b);
      }
      handleSeek(a) {
        this.resetSeek();
        const b = a.offsetX || a.changedTouches[0].pageX - this.offset,
          c = this.calcProgress(b);
        this.player.seek(a, c);
      }
      disconnectedCallback() {
        this.resetSeek(), clearInterval(this.tracker);
      }
      calcProgress(a) {
        const b = (a / this.seekWidth) * this.duration;
        return Math.min(Math.max(b, 0.1), this.duration);
      }
      static get styles() {
        return Tb(T());
      }
    }
    customElements.define("mmp-progress", Dc);
    class Ec extends Vb {
      static get properties() {
        return { player: {}, selected: String, icon: Boolean };
      }
      get source() {
        return this.player.source;
      }
      get sources() {
        return this.player.sources.map((a) => ({
          name: a,
          id: a,
          type: "source",
        }));
      }
      render() {
        return tb(
          S(),
          this.handleSource,
          this.sources,
          this.source,
          this.selected || this.source,
          this.icon
        );
      }
      handleSource(a) {
        const b = a.detail.id;
        this.player.setSource(a, b), (this.selected = b);
      }
      static get styles() {
        return Tb(R());
      }
    }
    customElements.define("mmp-source-menu", Ec);
    class Fc extends Vb {
      static get properties() {
        return { player: {}, selected: String, icon: Boolean };
      }
      get mode() {
        return this.player.soundMode;
      }
      get modes() {
        return this.player.soundModes.map((a) => ({
          name: a,
          id: a,
          type: "soundMode",
        }));
      }
      render() {
        return tb(
          Q(),
          this.handleChange,
          this.modes,
          this.mode,
          this.selected || this.mode,
          this.icon
        );
      }
      handleChange(a) {
        const b = a.detail.id;
        this.player.setSoundMode(a, b), (this.selected = b);
      }
      static get styles() {
        return Tb(P());
      }
    }
    customElements.define("mmp-sound-menu", Fc);
    class Gc extends Vb {
      static get properties() {
        return { player: {}, config: {}, break: Boolean };
      }
      get showShuffle() {
        return !this.config.hide.shuffle && this.player.supportsShuffle;
      }
      get maxVol() {
        return this.config.max_volume || 100;
      }
      get minVol() {
        return this.config.min_volume || 0;
      }
      render() {
        const a = this.config.hide;
        return tb(
          O(),
          a.volume ? tb(N()) : this.renderVolControls(this.player.muted),
          this.showShuffle
            ? tb(
                M(),
                (a) => this.player.toggleShuffle(a),
                oc.SHUFFLE,
                this.player.shuffle
              )
            : tb(L()),
          a.controls
            ? tb(J())
            : tb(
                K(),
                this.config.flow || this.break,
                (a) => this.player.prev(a),
                oc.PREV,
                this.renderPlayButtons(),
                (a) => this.player.next(a),
                oc.NEXT
              )
        );
      }
      renderVolControls(a) {
        return this.config.volume_stateless
          ? this.renderVolButtons(a)
          : this.renderVolSlider(a);
      }
      renderVolSlider(a) {
        return tb(
          I(),
          this.renderMuteButton(a),
          this.handleVolumeChange,
          (a) => a.stopPropagation(),
          a,
          this.minVol,
          this.maxVol,
          100 * this.player.vol,
          "ltr"
        );
      }
      renderVolButtons(a) {
        return tb(
          H(),
          this.renderMuteButton(a),
          (a) => this.player.volumeDown(a),
          oc.VOL_DOWN,
          (a) => this.player.volumeUp(a),
          oc.VOL_UP
        );
      }
      renderMuteButton(a) {
        if (!this.config.hide.mute)
          switch (this.config.replace_mute) {
            case "play":
            case "play_pause":
              return tb(
                G(),
                (a) => this.player.playPause(a),
                oc.PLAY[this.player.isPlaying]
              );
            case "stop":
              return tb(F(), (a) => this.player.stop(a), oc.STOP.true);
            case "play_stop":
              return tb(
                E(),
                (a) => this.player.playStop(a),
                oc.STOP[this.player.isPlaying]
              );
            case "next":
              return tb(D(), (a) => this.player.next(a), oc.NEXT);
            default:
              return this.player.supportsMute
                ? tb(C(), (a) => this.player.toggleMute(a), oc.MUTE[a])
                : void 0;
          }
      }
      renderPlayButtons() {
        const a = this.config.hide;
        return tb(
          B(),
          a.play_pause
            ? tb(z())
            : tb(
                A(),
                (a) => this.player.playPause(a),
                oc.PLAY[this.player.isPlaying]
              ),
          a.play_stop
            ? tb(x())
            : tb(
                y(),
                (a) => this.handleStop(a),
                a.play_pause ? oc.STOP[this.player.isPlaying] : oc.STOP.true
              )
        );
      }
      handleStop(a) {
        return this.config.hide.play_pause
          ? this.player.playStop(a)
          : this.player.stop(a);
      }
      handleVolumeChange(a) {
        const b = parseFloat(a.target.value) / 100;
        this.player.setVolume(a, b);
      }
      static get styles() {
        return [xc, Tb(w())];
      }
    }
    customElements.define("mmp-media-controls", Gc);
    class Hc extends Vb {
      static get properties() {
        return {
          hass: {},
          player: {},
          config: {},
          groupVisible: Boolean,
          idle: Boolean,
        };
      }
      get icon() {
        return this.config.speaker_group.icon || oc.GROUP;
      }
      get showGroupButton() {
        return this.config.speaker_group.entities;
      }
      get showPowerButton() {
        return !this.config.hide.power;
      }
      get powerColor() {
        return this.player.active && !this.config.hide.power_state;
      }
      get sourceSize() {
        return "icon" === this.config.source || this.hasControls || this.idle;
      }
      get soundSize() {
        return (
          "icon" === this.config.sound_mode || this.hasControls || this.idle
        );
      }
      get hasControls() {
        return (
          this.player.active &&
          this.config.hide.controls !== this.config.hide.volume
        );
      }
      get hasSource() {
        return 0 < this.player.sources.length && !this.config.hide.source;
      }
      get hasSoundMode() {
        return (
          0 < this.player.soundModes.length && !this.config.hide.sound_mode
        );
      }
      render() {
        return this.player.isUnavailable
          ? tb(v(), Ac(this.hass, "state.default.unavailable", "Unavailable"))
          : tb(
              u(),
              this.idle ? this.renderIdleView : "",
              this.hasControls ? tb(t(), this.player, this.config) : "",
              this.hasSource
                ? tb(
                    s(),
                    this.player,
                    this.sourceSize,
                    "full" === this.config.source
                  )
                : "",
              this.hasSoundMode
                ? tb(
                    r(),
                    this.player,
                    this.soundSize,
                    "full" === this.config.sound_mode
                  )
                : "",
              this.showGroupButton
                ? tb(
                    q(),
                    this.icon,
                    !this.player.isGrouped,
                    this.groupVisible,
                    this.handleGroupClick
                  )
                : "",
              this.showPowerButton
                ? tb(
                    p(),
                    oc.POWER,
                    (a) => this.player.toggle(a),
                    this.powerColor
                  )
                : ""
            );
      }
      handleGroupClick(a) {
        a.stopPropagation(),
          this.dispatchEvent(new CustomEvent("toggleGroupList"));
      }
      get renderIdleView() {
        return this.player.isPaused
          ? tb(o(), oc.PLAY[this.player.isPlaying], (a) =>
              this.player.playPause(a)
            )
          : tb(n(), Ac(this.hass, "state.media_player.idle", "Idle"));
      }
      static get styles() {
        return [xc, Tb(m())];
      }
    }
    customElements.define("mmp-powerstrip", Hc),
      customElements.get("ha-slider") ||
        customElements.define(
          "ha-slider",
          class extends customElements.get("paper-slider") {}
        );
    class Ic extends Vb {
      constructor() {
        super(),
          (this._overflow = !1),
          (this.initial = !0),
          (this.picture = !1),
          (this.thumbnail = !1),
          (this.edit = !1),
          (this.rtl = !1);
      }
      static get properties() {
        return {
          _hass: {},
          config: {},
          entity: {},
          player: {},
          _overflow: Boolean,
          break: Boolean,
          initial: Boolean,
          picture: String,
          thumbnail: String,
          edit: Boolean,
          rtl: Boolean,
          idle: Boolean,
        };
      }
      static get styles() {
        return tc;
      }
      set hass(a) {
        if (a) {
          const b = a.states[this.config.entity];
          (this._hass = a),
            b &&
              this.entity !== b &&
              ((this.entity = b),
              (this.player = new sc(a, this.config, b)),
              (this.rtl = this.computeRTL(a)),
              (this.idle = this.player.idle),
              this.player.trackIdle && this.updateIdleStatus());
        }
      }
      get hass() {
        return this._hass;
      }
      set overflow(a) {
        this._overflow !== a && (this._overflow = a);
      }
      get overflow() {
        return this._overflow;
      }
      get name() {
        return this.config.name || this.player.name;
      }
      setConfig(a) {
        if (!a.entity || "media_player" !== a.entity.split(".")[0])
          throw new Error(
            "Specify an entity from within the media_player domain."
          );
        const b = Da(
          {
            artwork: "default",
            info: "default",
            more_info: !0,
            source: "default",
            sound_mode: "default",
            toggle_power: !0,
          },
          a,
          {
            hide: Da({}, nc, a.hide),
            speaker_group: Da(
              { show_group_count: !0, platform: "sonos" },
              a.sonos,
              a.speaker_group
            ),
            shortcuts: Da({ label: "Shortcuts..." }, a.shortcuts),
          }
        );
        (b.max_volume = +b.max_volume || 100),
          (b.min_volume = +b.min_volume || 0),
          (b.collapse = b.hide.controls || b.hide.volume),
          (b.info = b.collapse && "scroll" !== b.info ? "short" : b.info),
          (b.flow = b.hide.icon && b.hide.name && b.hide.info),
          (this.config = b);
      }
      shouldUpdate(a) {
        return (
          void 0 === this.break && this.computeRect(this),
          pc.some((b) => a.has(b)) && this.player
        );
      }
      firstUpdated() {
        const a = new mc((a) => {
          a.forEach((a) => {
            window.requestAnimationFrame(() => {
              "scroll" === this.config.info && this.computeOverflow(),
                this._resizeTimer ||
                  (this.computeRect(a),
                  (this._resizeTimer = setTimeout(() => {
                    (this._resizeTimer = null),
                      this.computeRect(this._resizeEntry);
                  }, 250))),
                (this._resizeEntry = a);
            });
          });
        });
        a.observe(this),
          setTimeout(() => (this.initial = !1), 250),
          (this.edit = this.config.speaker_group.expanded || !1);
      }
      updated() {
        "scroll" === this.config.info &&
          setTimeout(() => {
            this.computeOverflow();
          }, 10);
      }
      render() {
        let a =
            0 < arguments.length && arguments[0] !== void 0
              ? arguments[0]
              : this,
          b = a.config;
        const c = this.computeArtwork();
        return tb(
          l(),
          this.handleMoreInfo,
          this.computeClasses(),
          b.artwork,
          this.player.content,
          this.renderArtwork(c),
          this.player.idle,
          this.renderIcon(c),
          this.renderEntityName(),
          this.renderMediaInfo(),
          this.toggleGroupList,
          this.hass,
          this.player,
          b,
          this.edit,
          this.idle,
          b.flow,
          !b.collapse && this.player.active
            ? tb(k(), this.player, b, this.break)
            : "",
          this.player,
          b.shortcuts,
          b.tts ? tb(j(), b.tts, this.hass, this.player.id) : "",
          this.edit,
          b.speaker_group.entities,
          this.player,
          this.player.active && this.player.hasProgress
            ? tb(i(), this.player, !this.config.hide.runtime)
            : ""
        );
      }
      renderArtwork(a) {
        if (this.thumbnail || this.config.background) {
          const b =
            this.config.background && (!a || "default" === this.config.artwork)
              ? "url(".concat(this.config.background, ")")
              : this.thumbnail;
          return tb(h(), b);
        }
      }
      renderIcon(a) {
        return this.config.hide.icon
          ? void 0
          : this.player.active && a && "default" === this.config.artwork
          ? tb(
              g(),
              this.thumbnail,
              !this.config.hide.artwork_border,
              this.player.state
            )
          : tb(f(), this.computeIcon());
      }
      renderEntityName() {
        return this.config.hide.name
          ? void 0
          : tb(e(), this.name, this.speakerCount());
      }
      renderMediaInfo() {
        if (!this.config.hide.info) {
          const e = this.player.mediaInfo;
          return tb(
            d(),
            "short" === this.config.info || !this.player.active,
            "scroll" === this.config.info,
            this.overflow,
            this.overflow,
            "scroll" === this.config.info
              ? tb(
                  c(),
                  e.map((a) =>
                    tb(b(), "attr__".concat(a.attr), a.prefix + a.text)
                  )
                )
              : "",
            e.map((b) => tb(a(), "attr__".concat(b.attr), b.prefix + b.text))
          );
        }
      }
      speakerCount() {
        if (this.config.speaker_group.show_group_count) {
          const a = this.player.groupCount;
          return 1 < a ? " +".concat(a - 1) : "";
        }
      }
      computeClasses() {
        let a =
            0 < arguments.length && arguments[0] !== void 0
              ? arguments[0]
              : this,
          b = a.config;
        return Xb({
          "--responsive": this.break || b.hide.icon,
          "--initial": this.initial,
          "--bg": b.background,
          "--group": b.group,
          "--more-info": b.more_info,
          "--has-artwork": this.player.hasArtwork && this.thumbnail,
          "--flow": b.flow,
          "--collapse": b.collapse,
          "--rtl": this.rtl,
          "--progress": this.player.hasProgress,
          "--runtime": !b.hide.runtime && this.player.hasProgress,
          "--inactive": !this.player.isActive,
        });
      }
      computeArtwork() {
        const a = this.player,
          b = a.picture,
          c = a.hasArtwork;
        return (
          c &&
            b !== this.picture &&
            (this.player.fetchThumbnail().then((a) => {
              this.thumbnail = a;
            }),
            (this.picture = b)),
          !!(c && this.thumbnail)
        );
      }
      computeIcon() {
        return this.config.icon
          ? this.config.icon
          : this.player.icon || oc.DEFAULT;
      }
      computeOverflow() {
        const a = this.shadowRoot.querySelector(".marquee");
        if (a) {
          const b = a.clientWidth > a.parentNode.clientWidth;
          this.overflow =
            !!(b && this.player.active) && 7.5 + a.clientWidth / 50;
        }
      }
      computeRect(a) {
        const b = a.contentRect || a.getBoundingClientRect(),
          c = b.left,
          d = b.width;
        this.break = d + 2 * c < 390;
      }
      computeRTL(a) {
        const b = a.language || "en";
        return (
          !!a.translationMetadata.translations[b] &&
          (a.translationMetadata.translations[b].isRTL || !1)
        );
      }
      toggleGroupList() {
        this.edit = !this.edit;
      }
      handleMoreInfo(a) {
        a.stopPropagation(),
          this.config.more_info &&
            this.fire("hass-more-info", { entityId: this.config.entity });
      }
      fire(a, b, c) {
        const d = c || {},
          f = null === b || void 0 === b ? {} : b,
          g = new Event(a, {
            bubbles: void 0 === d.bubbles || d.bubbles,
            cancelable: !!d.cancelable,
            composed: void 0 === d.composed || d.composed,
          });
        return (g.detail = f), this.dispatchEvent(g), g;
      }
      updateIdleStatus() {
        this._idleTracker && clearTimeout(this._idleTracker);
        const a =
          (Date.now() - new Date(this.player.updatedAt).getTime()) / 1e3;
        this._idleTracker = setTimeout(() => {
          (this.idle = this.player.checkIdleAfter(this.config.idle_view.after)),
            (this.player.idle = this.idle),
            (this._idleTracker = null);
        }, 1e3 * (60 * this.config.idle_view.after - a));
      }
      getCardSize() {
        return this.config.collapse ? 1 : 2;
      }
    }
    customElements.define("hui-ais-mini-media-player-card", Ic);
  });
})();
