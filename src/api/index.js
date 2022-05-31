import requests from "@/api/ajax";
import mockRequests from "./mock";
export const reqCategoryList = () =>
  requests({ url: "/product/getBaseCategoryList", method: "get" });

export const reqBannerList = () =>
  mockRequests({ url: "/banner", method: "get" });
export const reqFloorList = () =>
  mockRequests({ url: "/floor", method: "get" });