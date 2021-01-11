import { fireEvent } from "../../common/dom/fire_event";

export interface HaAisFileDialogParams {
  filePath: string;
  fileBody: string;
  readonly: boolean;
}

export const loadAisFileDialog = () => import("./dialog-ais-file");

export const showAisFileDialog = (
  element: HTMLElement,
  dialogParams: HaAisFileDialogParams
): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "dialog-ais-file",
    dialogImport: loadAisFileDialog,
    dialogParams,
  });
};
