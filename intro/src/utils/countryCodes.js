import { getCode } from "country-list";

const overrides = {
  "USA": "US",
  "United States": "US",
  "United States of America": "US",
  "Gambia": "GM",
  "The Gambia": "GM",
  "UK": "GB",
  "England": "GB",
  "South Korea": "KR",
  "North Korea": "KP",
  "Russia": "RU",
  "Czechia": "CZ",
};

export function normalizeCountryCode(countryName) {
  if (!countryName) return null;

  // Check overrides first
  const upperName = countryName.trim();
  if (overrides[upperName]) {
    return overrides[upperName];
  }

  // Fallback to country-list
  return getCode(upperName) || null;
}
export default normalizeCountryCode;