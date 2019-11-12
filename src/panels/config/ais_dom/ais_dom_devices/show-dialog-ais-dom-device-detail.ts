import { fireEvent } from "../../../../common/dom/fire_event";

export interface AddAisDomDialogParams {
  entityType: string;
}

export const loadAddAisDomDeviceDialog = () =>
  import(/* webpackChunkName: "dialog-add-ais-dom-device" */ "./dialog-add-ais-dom-device");

export const showAddAisDomDeviceDialog = (
  element: HTMLElement,
  dialogParams: AddAisDomDialogParams
): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "dialog-add-ais-dom-device",
    dialogImport: loadAddAisDomDeviceDialog,
    dialogParams,
  });
};
