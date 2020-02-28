import { LocalizeFunc } from "../common/translations/localize";

function getIntegrationDocsUrl(domain: string) {
  if (domain.startsWith("ais_")) {
    return `https://sviete.github.io/AIS-docs/`;
  }
  return `https://www.home-assistant.io/integrations/${domain}`;
}

function getIntegrationIssuesUrl(domain: string) {
  if (domain.startsWith("ais_")) {
    return `https://github.com/sviete/AIS-home-assistant/issues`;
  }
  return `https://github.com/home-assistant/home-assistant/issues?q=is%3Aissue+is%3Aopen+label%3A%22integration%3A+${domain}%22`;
}

export const integrationDocsUrl = (domain: string) =>
  getIntegrationDocsUrl(domain);

export const integrationIssuesUrl = (domain: string) =>
  getIntegrationIssuesUrl(domain);

export const domainToName = (localize: LocalizeFunc, domain: string) =>
  localize(`domain.${domain}`) || domain;
