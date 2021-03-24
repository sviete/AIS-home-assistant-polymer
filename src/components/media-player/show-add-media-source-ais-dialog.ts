import { fireEvent } from "../../common/dom/fire_event";

export interface AddMediaSourceAisDialogParams {
  selectedOptionCallback: (entityId: string) => void;
}

export const showAddMediaSourceAisDialog = (
  element: HTMLElement,
  addMediaSourceAisDialogParams: AddMediaSourceAisDialogParams
): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "hui-dialog-add-media-source-ais",
    dialogImport: () =>
      import(
        /* webpackChunkName: "hui-dialog-add-media-source-ais" */ "./hui-dialog-add-media-source-ais"
      ),
    dialogParams: addMediaSourceAisDialogParams,
  });
};
