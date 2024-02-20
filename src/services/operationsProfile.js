import ApiService from "./ApiService";
import BaseService from "./BaseService";

export async function apiGetAccountProfiles() {
  return BaseService.get(`/account_profiles`);
}
