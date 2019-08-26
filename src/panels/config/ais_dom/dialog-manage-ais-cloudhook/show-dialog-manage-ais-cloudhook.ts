import { fireEvent } from "../../../../common/dom/fire_event";
import { Webhook } from "../../../../data/webhook";

export interface WebhookDialogParams {
  webhook: Webhook;
}

export const showManageCloudhookDialog = (
  element: HTMLElement,
  webhookDialogParams: WebhookDialogParams
): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "dialog-manage-ais-cloudhook",
    dialogImport: () =>
      import(/* webpackChunkName: "ais-webhook-manage-dialog" */ "./dialog-manage-ais-cloudhook"),
    dialogParams: webhookDialogParams,
  });
};
