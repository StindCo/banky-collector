import ApiService from "./ApiService";
import BaseService from "./BaseService";

export async function apiMakeATransfert(data) {
  return BaseService.post(`/operations/remittances`, data);
}
