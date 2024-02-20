import ApiService from "./ApiService";
import BaseService from "./BaseService";

export async function apiSignIn(data) {
  return ApiService.fetchData({
    url: "/authentication_token",
    method: "post",
    data,
  });
}

export const apiChangePassword = async (customerId, data) => {
  const url = `/users/${customerId}/credentials`
  return await BaseService.put(url, data)
}

export async function apiSignUp(data) {
  return ApiService.fetchData({
    url: "/sign-up",
    method: "post",
    data,
  });
}

export async function apiSignOut(data) {
  return ApiService.fetchData({
    url: "/sign-out",
    method: "post",
    data,
  });
}

export async function apiForgotPassword(data) {
  return ApiService.fetchData({
    url: "/forgot-password",
    method: "post",
    data,
  });
}

export async function apiResetPassword(data) {
  return ApiService.fetchData({
    url: "/reset-password",
    method: "post",
    data,
  });
}

export const apiUserAbout = async (token) => {
  const url = '/users/about'
  return await BaseService.get(url, {
      headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
  })
}
