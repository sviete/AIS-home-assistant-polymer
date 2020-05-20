import { LovelaceCardConfig } from "../../../data/lovelace";
import "../cards/hui-ais-easy-picker-card";
import "../cards/hui-ais-button-card";
import "../cards/hui-ais-files-list-card";
import "../cards/hui-button-card";
import "../cards/hui-entities-card";
import "../cards/hui-entity-button-card";
import "../cards/hui-entity-card";
import "../cards/hui-glance-card";
import "../cards/hui-history-graph-card";
import "../cards/hui-horizontal-stack-card";
import "../cards/hui-light-card";
import "../cards/hui-sensor-card";
import "../cards/hui-thermostat-card";
import "../cards/hui-vertical-stack-card";
import "../cards/hui-weather-forecast-card";
import {
  createLovelaceElement,
  getLovelaceElementClass,
} from "./create-element-base";

const ALWAYS_LOADED_TYPES = new Set([
  "ais-easy-picker",
  "ais-button",
  "ais-files-list",
  "entity",
  "entities",
  "button",
  "entity-button",
  "glance",
  "history-graph",
  "horizontal-stack",
  "light",
  "sensor",
  "thermostat",
  "vertical-stack",
  "weather-forecast",
]);

const LAZY_LOAD_TYPES = {
  "alarm-panel": () => import("../cards/hui-alarm-panel-card"),
  error: () => import("../cards/hui-error-card"),
  "empty-state": () => import("../cards/hui-empty-state-card"),
  "entity-filter": () => import("../cards/hui-entity-filter-card"),
  "media-control": () => import("../cards/hui-media-control-card"),
  "picture-elements": () => import("../cards/hui-picture-elements-card"),
  "picture-entity": () => import("../cards/hui-picture-entity-card"),
  "picture-glance": () => import("../cards/hui-picture-glance-card"),
  "plant-status": () => import("../cards/hui-plant-status-card"),
  "safe-mode": () => import("../cards/hui-safe-mode-card"),
  "shopping-list": () => import("../cards/hui-shopping-list-card"),
  conditional: () => import("../cards/hui-conditional-card"),
  gauge: () => import("../cards/hui-gauge-card"),
  iframe: () => import("../cards/hui-iframe-card"),
  map: () => import("../cards/hui-map-card"),
  markdown: () => import("../cards/hui-markdown-card"),
  picture: () => import("../cards/hui-picture-card"),

  "ais-list": () => import("../cards/hui-ais-list-card"),
  "ais-mini-media-player": () =>
    import("../cards/hui-ais-mini-media-player-card"),
  "ais-auto-entities": () => import("../cards/hui-ais-auto-entities-card"),
  "ais-monster": () => import("../cards/hui-ais-monster-card"),
  "ais-fold-entity-row": () => import("../cards/hui-ais-fold-entity-row-card"),
  "ais-zigbee2mqtt": () => import("../cards/hui-ais-zigbee2mqtt-card"),
  "ais-now-playing-poster": () =>
    import("../cards/hui-ais-now-playing-poster-card"),
  "ais-light": () => import("../cards/hui-ais-light-card"),
};

export const createCardElement = (config: LovelaceCardConfig) =>
  createLovelaceElement(
    "card",
    config,
    ALWAYS_LOADED_TYPES,
    LAZY_LOAD_TYPES,
    undefined,
    undefined
  );

export const getCardElementClass = (type: string) =>
  getLovelaceElementClass(type, "card", ALWAYS_LOADED_TYPES, LAZY_LOAD_TYPES);
