import { navigate } from "../common/navigate";
import { HomeAssistant } from "../types";

export const defaultRadiusColor = "#FF9800";
export const homeRadiusColor = "#ff9800";
export const passiveRadiusColor = "#9b9b9b";

export interface Zone {
  id: string;
  name: string;
  icon?: string;
  latitude: number;
  longitude: number;
  passive?: boolean;
  radius?: number;
}

export interface ZoneMutableParams {
  icon: string;
  latitude: number;
  longitude: number;
  name: string;
  passive: boolean;
  radius: number;
}

export const fetchZones = (hass: HomeAssistant) =>
  hass.callWS<Zone[]>({ type: "zone/list" });

export const createZone = (hass: HomeAssistant, values: ZoneMutableParams) =>
  hass.callWS<Zone>({
    type: "zone/create",
    ...values,
  });

export const updateZone = (
  hass: HomeAssistant,
  zoneId: string,
  updates: Partial<ZoneMutableParams>
) =>
  hass.callWS<Zone>({
    type: "zone/update",
    zone_id: zoneId,
    ...updates,
  });

export const deleteZone = (hass: HomeAssistant, zoneId: string) =>
  hass.callWS({
    type: "zone/delete",
    zone_id: zoneId,
  });

let inititialZoneEditorData: Partial<ZoneMutableParams> | undefined;

export const showZoneEditor = (
  el: HTMLElement,
  data?: Partial<ZoneMutableParams>
) => {
  inititialZoneEditorData = data;
  navigate(el, "/config/zone/new");
};

export const getZoneEditorInitData = () => {
  const data = inititialZoneEditorData;
  inititialZoneEditorData = undefined;
  return data;
};
