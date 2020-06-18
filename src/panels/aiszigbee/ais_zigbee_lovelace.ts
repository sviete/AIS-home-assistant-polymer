import { LovelaceConfig } from "../../data/lovelace";

export const aisZigbeeLovelace: LovelaceConfig = {
  title: "Asystent domowy",
  views: [
    {
      badges: [],
      cards: [
        {
          entities: [
            {
              entity: "sensor.status_serwisu_zigbee2mqtt",
            },
            {
              entity: "sensor.wersja_zigbee2mqtt",
            },
            {
              entity: "sensor.wersja_kordynatora",
            },
            {
              type: "divider",
            },
            {
              entity: "switch.zigbee_tryb_parowania",
            },
            {
              entity: "timer.zigbee_permit_join",
            },
            {
              type: "divider",
            },
            {
              entity: "input_text.zigbee2mqtt_old_name",
            },
            {
              entity: "input_text.zigbee2mqtt_new_name",
            },
            {
              entity: "script.zigbee2mqtt_rename",
            },
            {
              type: "divider",
            },
            {
              entity: "input_text.zigbee2mqtt_remove",
            },
            {
              entity: "script.zigbee2mqtt_remove",
            },
          ],
          show_header_toggle: false,
          title: "Zigbee",
          type: "entities",
        },
        {
          entity: "sensor.zigbee2mqtt_networkmap",
          type: "ais-zigbee2mqtt",
        },
      ],
      icon: "mdi:zigbee",
      path: "aiszigbee",
      title: "zigbee",
      visible: false,
    },
  ],
};
