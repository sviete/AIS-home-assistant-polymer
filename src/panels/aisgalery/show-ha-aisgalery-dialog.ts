import { fireEvent } from "../../common/dom/fire_event";

export interface AisGaleryDialogParams {
  jsCallback: Function;
}

export const loadAisGalerydDialog = () =>
  import(/* webpackChunkName: "ha-dialog-aisgalery" */ "./ha-dialog-aisgalery");

export const showAisGaleryDialog = (
  element: HTMLElement,
  aisGaleryDialogParams: AisGaleryDialogParams
): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "ha-dialog-aisgalery",
    dialogImport: loadAisGalerydDialog,
    dialogParams: aisGaleryDialogParams,
  });
};
