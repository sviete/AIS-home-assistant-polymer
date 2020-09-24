import { fireEvent } from "../../common/dom/fire_event";

export interface CheckMediaSourceAisDialogParams {
  selectedOptionCallback: (entityId: string) => void;
}

export const showCheckMediaSourceAisDialog = (
  element: HTMLElement,
  checkMediaSourceAisDialogParams: CheckMediaSourceAisDialogParams
): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "hui-dialog-check-media-source-ais",
    dialogImport: () =>
      import(
        /* webpackChunkName: "hui-dialog-check-media-source-ais" */ "./hui-dialog-check-media-source-ais"
      ),
    dialogParams: checkMediaSourceAisDialogParams,
  });
};
