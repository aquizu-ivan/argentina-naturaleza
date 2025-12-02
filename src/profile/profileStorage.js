import { safeLoadJSON, safeSaveJSON } from "../utils/storageUtils.js";

const PROFILE_KEY = "naturaleza-profile";

const DEFAULT_PROFILE = {
  fullName: "",
  email: "",
  location: "",
  phone: "",
  notes: ""
};

function isValidProfile(data) {
  if (!data || typeof data !== "object") return false;
  if (typeof data.fullName !== "string") return false;
  if (typeof data.email !== "string") return false;
  if (data.location !== undefined && typeof data.location !== "string") return false;
  if (data.phone !== undefined && typeof data.phone !== "string") return false;
  if (data.notes !== undefined && typeof data.notes !== "string") return false;
  return true;
}

function loadProfile() {
  return safeLoadJSON(PROFILE_KEY, DEFAULT_PROFILE, isValidProfile);
}

export function getProfile() {
  return loadProfile();
}

export function saveProfile(profile) {
  safeSaveJSON(PROFILE_KEY, profile || DEFAULT_PROFILE);
  return profile;
}

export function clearProfile() {
  safeSaveJSON(PROFILE_KEY, DEFAULT_PROFILE);
}
