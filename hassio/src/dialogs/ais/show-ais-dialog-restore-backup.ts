import { fireEvent } from "../../../../src/common/dom/fire_event";
import "./dialog-ais-restore-backup";

export interface AisRestoreBackupDialogParams {
  gateId: string;
}

export const showAisRestoreBackupDialog = (
  element: HTMLElement,
  dialogParams: AisRestoreBackupDialogParams
): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "dialog-ais-restore-backup",
    dialogImport: () => import("./dialog-ais-restore-backup"),
    dialogParams,
  });
};
