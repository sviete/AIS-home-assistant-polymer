import { fireEvent } from "../../common/dom/fire_event";

export interface WebBrowserPlayMediaAisDialogParams {
  sourceUrl: string;
  sourceType: string;
  title?: string;
  sourceThumbnail?: string;
}

export const showWebBrowserPlayMediaAisDialog = (
  element: HTMLElement,
  webBrowserPlayMediaAisDialogParams: WebBrowserPlayMediaAisDialogParams
): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "hui-dialog-web-browser-ais-play-media",
    dialogImport: () =>
      import(
        /* webpackChunkName: "hui-dialog-ais-media-player" */ "./hui-dialog-web-browser-ais-play-media"
      ),
    dialogParams: webBrowserPlayMediaAisDialogParams,
  });
};
