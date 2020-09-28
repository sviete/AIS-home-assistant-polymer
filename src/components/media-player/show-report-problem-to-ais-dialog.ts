import { fireEvent } from "../../common/dom/fire_event";

export interface ReportProblemToAisDialogParams {
  selectedOptionCallback: (entityId: string) => void;
}

export const showReportProblemToAisDialog = (
  element: HTMLElement,
  reportProblemToAisDialogParams: ReportProblemToAisDialogParams
): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "hui-dialog-report-problem-to-ais",
    dialogImport: () =>
      import(
        /* webpackChunkName: "hui-dialog-report-problem-to-ais" */ "./hui-dialog-report-problem-to-ais"
      ),
    dialogParams: reportProblemToAisDialogParams,
  });
};
