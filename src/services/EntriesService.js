import ApiService from "./ApiService";
import BaseService from "./BaseService";

export async function apiGetEntriesOfAnAcount(
  accountId,
  beforeDate = null,
  afterDate = null
) {
  return BaseService.get(
    `/entries?accountId=${accountId}&date[before]=${beforeDate}&date[after]=${afterDate}&order[date]=asc`
  );
}

export async function apiGetEntriesOfAnAcountWhihoutFilter(accountId) {
  return BaseService.get(`/entries?accountId=${accountId}&order[date]=desc`);
}
