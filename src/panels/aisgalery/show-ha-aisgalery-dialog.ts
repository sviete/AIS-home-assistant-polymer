import { fireEvent } from "../../common/dom/fire_event";

export const loadAisgalerydDialog = () =>
  import(/* webpackChunkName: "ha-dialog-aisgalery" */ "./ha-dialog-aisgalery");

export const showAisgaleryDialog = (element: HTMLElement): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "ha-dialog-aisgalery",
    dialogImport: loadAisgalerydDialog,
    dialogParams: {},
  });
};
