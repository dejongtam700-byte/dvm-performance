/** Laat het contactformulier een dienst alvast aanvinken wanneer iemand op een dienst klikt. */
export const SELECT_SERVICE_EVENT = "dvm:select-service";

export const preselectService = (title: string) =>
  window.dispatchEvent(new CustomEvent<string>(SELECT_SERVICE_EVENT, { detail: title }));
