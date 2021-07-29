import { LovelaceCardConfig } from "../../../data/lovelace";
import "../cards/hui-ais-easy-picker-card";
import "../cards/hui-ais-button-card";
import "../cards/hui-ais-files-list-card";
import "../cards/hui-button-card";
import "../cards/hui-calendar-card";
import "../cards/hui-entities-card";
import "../cards/hui-entity-button-card";
import "../cards/hui-entity-card";
import "../cards/hui-glance-card";
import "../cards/hui-horizontal-stack-card";
import "../cards/hui-light-card";
import "../cards/hui-sensor-card";
import "../cards/hui-thermostat-card";
import "../cards/hui-vertical-stack-card";
import "../cards/hui-weather-forecast-card";
import "../cards/hui-ais-zigbee2mqtt-card";
import "../cards/hui-ais-mini-media-player-card";
import "../cards/hui-ais-expansion-panel-card";
import {
  createLovelaceElement,
  getLovelaceElementClass,
  tryCreateLovelaceElement,
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
  "horizontal-stack",
  "light",
  "sensor",
  "thermostat",
  "vertical-stack",
  "weather-forecast",
  "ais-zigbee2mqtt",
  "ais-mini-media-player",
  "ais-expansion-panel",
]);

const LAZY_LOAD_TYPES = {
  "alarm-panel": () => import("../cards/hui-alarm-panel-card"),
  error: () => import("../cards/hui-error-card"),
  "empty-state": () => import("../cards/hui-empty-state-card"),
  "energy-summary": () => import("../cards/hui-energy-summary-card"),
  "energy-summary-graph": () =>
    import("../cards/hui-energy-summary-graph-card"),
  "energy-solar-graph": () => import("../cards/hui-energy-solar-graph-card"),
  "energy-devices-graph": () =>
    import("../cards/hui-energy-devices-graph-card"),
  "energy-costs-table": () => import("../cards/hui-energy-costs-table-card"),
  "energy-usage": () => import("../cards/hui-energy-usage-card"),
  "energy-solar-consumed-gauge": () =>
    import("../cards/hui-energy-solar-consumed-gauge-card"),
  "energy-carbon-consumed-gauge": () =>
    import("../cards/hui-energy-carbon-consumed-gauge-card"),
  grid: () => import("../cards/hui-grid-card"),
  starting: () => import("../cards/hui-starting-card"),
  "entity-filter": () => import("../cards/hui-entity-filter-card"),
  humidifier: () => import("../cards/hui-humidifier-card"),
  "media-control": () => import("../cards/hui-media-control-card"),
  "picture-elements": () => import("../cards/hui-picture-elements-card"),
  "picture-entity": () => import("../cards/hui-picture-entity-card"),
  "picture-glance": () => import("../cards/hui-picture-glance-card"),
  "plant-status": () => import("../cards/hui-plant-status-card"),
  "safe-mode": () => import("../cards/hui-safe-mode-card"),
  "shopping-list": () => import("../cards/hui-shopping-list-card"),
  conditional: () => import("../cards/hui-conditional-card"),
  gauge: () => import("../cards/hui-gauge-card"),
  "history-graph": () => import("../cards/hui-history-graph-card"),
  "statistics-graph": () => import("../cards/hui-statistics-graph-card"),
  iframe: () => import("../cards/hui-iframe-card"),
  map: () => import("../cards/hui-map-card"),
  markdown: () => import("../cards/hui-markdown-card"),
  picture: () => import("../cards/hui-picture-card"),
  "ais-list": () => import("../cards/hui-ais-list-card"),
  "ais-auto-entities": () => import("../cards/hui-ais-auto-entities-card"),
  "ais-monster": () => import("../cards/hui-ais-monster-card"),
  "ais-fold-entity-row": () => import("../cards/hui-ais-fold-entity-row-card"),
  "ais-now-playing-poster": () =>
    import("../cards/hui-ais-now-playing-poster-card"),
  "ais-light": () => import("../cards/hui-ais-light-card"),
  "ais-videoring": () => import("../cards/hui-ais-videoring-card"),
  calendar: () => import("../cards/hui-calendar-card"),
  logbook: () => import("../cards/hui-logbook-card"),
};

// This will not return an error card but will throw the error
export const tryCreateCardElement = (config: LovelaceCardConfig) =>
  tryCreateLovelaceElement(
    "card",
    config,
    ALWAYS_LOADED_TYPES,
    LAZY_LOAD_TYPES,
    undefined,
    undefined
  );

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
