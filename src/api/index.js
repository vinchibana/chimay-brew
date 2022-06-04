import requests from "@/api/ajax";
import mockRequests from "./mock";
export const reqCategoryList = () =>
  requests({ url: "/product/getBaseCategoryList", method: "get" });

export const reqSearchList = (params) =>
  requests({ url: "/list", method: "post", data: params });

export const reqSkuInfo = (skuId) =>
  requests({ url: `/item/${skuId}`, method: "get" });

export const reqUpdateCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

export const reqCartList = () =>
  requests({ url: "/cart/cartList", method: "get" });

export const reqBannerList = () =>
  mockRequests({ url: "/banner", method: "get" });

export const reqFloorList = () =>
  mockRequests({ url: "/floor", method: "get" });

export const reqUpdateStatus = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });

export const reqDeleteCartById = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });
