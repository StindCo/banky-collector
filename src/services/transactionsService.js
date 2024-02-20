import ApiService from "./ApiService";
import BaseService from "./BaseService";

export async function apiGetTransactionsOfAnAcount(holderId) {
  return BaseService.get(`/transactions?holderId=${holderId}`);
}
