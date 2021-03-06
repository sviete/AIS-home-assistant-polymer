import { loadCSS, loadJS, loadModule } from "../../../common/dom/load_resource";
import { LovelaceResource } from "../../../data/lovelace";

// CSS and JS should only be imported once. Modules and HTML are safe.
const CSS_CACHE = {};
const JS_CACHE = {};

export const loadLovelaceResources = (
  resources: NonNullable<LovelaceResource[]>,
  hassUrl: string
) => {
  resources.forEach((resource) => {
    const normalizedUrl = new URL(resource.url, hassUrl).toString();
    switch (resource.type) {
      case "css":
        if (normalizedUrl in CSS_CACHE) {
          break;
        }
        CSS_CACHE[normalizedUrl] = loadCSS(normalizedUrl);
        break;

      case "js":
        if (normalizedUrl in JS_CACHE) {
          break;
        }
        JS_CACHE[normalizedUrl] = loadJS(normalizedUrl);
        break;

      case "module":
        loadModule(normalizedUrl);
        break;

      default:
        // eslint-disable-next-line
        console.warn(`Unknown resource type specified: ${resource.type}`);
    }
  });
  // AIS DOM
  // tslint:disable-next-line
  const aisJs = [
    "/static/ais_dom/cards/card-tools.js?v=20201012",
    "/static/ais_dom/cards/ais-tts.js",
    "/static/ais_dom/cards/lovelace-swipe-navigation.js?v=20201101",
  ];
  aisJs.forEach((resource) => {
    const normalizedUrl = new URL(resource, hassUrl).toString();
    if (!(normalizedUrl in JS_CACHE)) {
      JS_CACHE[normalizedUrl] = loadJS(normalizedUrl);
    }
  });
  const aisModules = ["/static/ais_dom/cards/card-mod.js?v=20201012"];
  aisModules.forEach((resource) => {
    loadModule(new URL(resource, hassUrl).toString());
  });
};
