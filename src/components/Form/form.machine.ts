import { assign, createMachine } from "xstate";

export { createFormMachine };

export interface FormContext {
  displayName: string;
  email: string;
  quote: string;
}

type FormEvent =
  | { type: "EDIT"; data?: FormContext }
  | { type: "SAVE"; data: FormContext }
  | { type: "CANCEL"; data?: FormContext };

type FormStates = "viewing" | "editing" | "submitting" | "error";

type FormTypestate = { value: FormStates; context: FormContext };

const createFormMachine = (context: FormContext) =>
  createMachine<FormContext, FormEvent, FormTypestate>(
    {
      id: "form",
      initial: "viewing",
      context,
      states: {
        viewing: {
          on: {
            EDIT: "editing",
          },
        },
        editing: {
          on: {
            CANCEL: "viewing",
            SAVE: "submitting",
            // TODO: Demo conditional transitions
            // SAVE: [
            //   {
            //     target: "submitting",
            //     cond: { type: "emailRequired" },
            //   },
            //   {
            //     target: "error",
            //   },
            // ],
          },
        },
        submitting: {
          invoke: {
            src: "saveService",
            onDone: {
              target: "viewing",
              actions: ["updateFormAction"],
            },
            onError: {
              target: "error",
            },
          },
        },
        error: {
          on: {
            EDIT: "editing",
          },
        },
      },
    },
    {
      actions: {
        updateFormAction,
      },
      services: {
        saveService,
      },
      guards: {
        emailRequired,
      },
    }
  );

/**
 * Validate email is not blank
 * @param context
 * @param event
 */
const emailRequired = (context: FormContext, event: FormEvent) =>
  Boolean(event.data?.email?.length);

/**
 * Update context with new values. Fallback to preview values if data missing
 */
const updateFormAction = assign<FormContext, FormEvent>({
  displayName: (context, event) =>
    event.data?.displayName ?? context.displayName,
  email: (context, event) => event.data?.email ?? context.email,
  quote: (context, event) => event.data?.quote ?? context.quote,
});

/**
 * Emulate a service that saves the form data
 * @param context
 * @param event
 */
function saveService(context: FormContext, event: FormEvent) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        event.type === "SAVE"
          ? resolve(event.data)
          : reject(new Error("Invalid event type")),
      1000
    );
  });
}
