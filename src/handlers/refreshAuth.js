"use client";

import { getCookie, setCookie, deleteCookie } from 'cookies-next';

import RefreshToken from '@/api/auth/refresh-token';

export async function getNewToken(event) {
  const res = await RefreshToken(getCookie("auth"), getCookie("refreshAuth"));

  if (res.status === "200") {
    setCookie("auth", res.data.token);
    setCookie("refreshAuth", res.data.refreshToken);

    event();

    return;
  } else {
    deleteCookie("auth");
    deleteCookie("refreshAuth");

    location.reload();

    return;
  }
};