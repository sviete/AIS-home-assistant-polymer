import { fireEvent } from "../../../../common/dom/fire_event";
import { Webhook } from "../../../../data/webhook";
import { CloudWebhook } from "../../../../data/cloud";

export interface WebhookDialogParams {
  webhook: Webhook;
}

export const showManageCloudhookDialog = (
  element: HTMLElement,
  webhookDialogParams: WebhookDialogParams
): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "dialog-manage-cloudhook",
    dialogImport: () =>
      import(/* webpackChunkName: "ais-webhook-manage-dialog" */ "./dialog-manage-cloudhook"),
    dialogParams: webhookDialogParams,
  });
};
