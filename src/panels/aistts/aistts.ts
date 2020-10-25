import { HomeAssistant } from "../../types";

export interface AisTtsItem {
  id: number;
  name: string;
  complete: boolean;
}

export const fetchItems = (hass: HomeAssistant): Promise<AisTtsItem[]> =>
  hass.callWS({
    type: "aistts/items",
  });

export const updateItem = (
  hass: HomeAssistant,
  itemId: number,
  item: {
    name?: string;
    complete?: boolean;
  }
): Promise<AisTtsItem> =>
  hass.callWS({
    type: "aistts/items/update",
    item_id: itemId,
    ...item,
  });

export const clearItems = (hass: HomeAssistant): Promise<void> =>
  hass.callWS({
    type: "aistts/items/clear",
  });

export const addItem = (
  hass: HomeAssistant,
  name: string
): Promise<AisTtsItem> =>
  hass.callWS({
    type: "aistts/items/add",
    name,
  });

export const reorderItems = (
  hass: HomeAssistant,
  itemIds: [string]
): Promise<AisTtsItem> =>
  hass.callWS({
    type: "aistts/items/reorder",
    item_ids: itemIds,
  });
