import { HomeAssistant } from "../types";
import { handleFetchPromise } from "../util/hass-call-api";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OnboardingCoreConfigStepResponse {}

export interface OnboardingUserStepResponse {
  auth_code: string;
}

export interface OnboardingAisGateInfoResponse {
  result: string;
  error: string;
  gates: Array<{
    gate_id: string;
    gate_name: string;
    gate_desc: string;
    gate_backup_ha: string;
    gate_backup_zigbee: string;
  }>;
}

export interface OnboardingAisRestoreBackupResponse {
  result: string;
  message: string;
}

export interface OnboardingIntegrationStepResponse {
  auth_code: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OnboardingMobIntegrationStepResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OnboardingAisRestoreBackupStepResponse {}

export interface OnboardingResponses {
  user: OnboardingUserStepResponse;
  core_config: OnboardingCoreConfigStepResponse;
  integration: OnboardingIntegrationStepResponse;
  mob_integration: OnboardingMobIntegrationStepResponse;
}

export type ValidOnboardingStep = keyof OnboardingResponses;

export interface OnboardingStep {
  step: ValidOnboardingStep;
  done: boolean;
}

export const fetchOnboardingOverview = () =>
  fetch("/api/onboarding", { credentials: "same-origin" });

export const onboardUserStep = (params: {
  client_id: string;
  name: string;
  username: string;
  password: string;
  language: string;
}) =>
  handleFetchPromise<OnboardingUserStepResponse>(
    fetch("/api/onboarding/users", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify(params),
    })
  );

export const onboardAisCloudLoginStep = (params: {
  username: string;
  password: string;
  language: string;
}) =>
  handleFetchPromise<OnboardingAisGateInfoResponse>(
    fetch("/api/onboarding/ais_gates_info", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify(params),
    })
  );

export const onboardCoreConfigStep = (hass: HomeAssistant) =>
  hass.callApi<OnboardingCoreConfigStepResponse>(
    "POST",
    "onboarding/core_config"
  );

export const onboardMobIntegrationStep = (hass: HomeAssistant) =>
  hass.callApi<OnboardingMobIntegrationStepResponse>(
    "POST",
    "onboarding/mob_integration"
  );

export const onboardIntegrationStep = (
  hass: HomeAssistant,
  params: { client_id: string; redirect_uri: string }
) =>
  hass.callApi<OnboardingIntegrationStepResponse>(
    "POST",
    "onboarding/integration",
    params
  );
