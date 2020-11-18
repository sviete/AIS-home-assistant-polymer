export const brandsUrl = (
  domain: string,
  type: "icon" | "logo",
  useFallback?: boolean
): string => {
  if (domain.startsWith("ais_")) {
    return `https://ai-speaker.com/images/brands/${domain}/${type}.png`;
  }
  return `https://brands.home-assistant.io/_/${
    useFallback ? "" : ""
  }${domain}/${type}.png`;
};
