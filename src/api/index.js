import requests from "@/api/request";

export const reqCategoryList = () =>
  requests({ url: "/product/getBaseCategoryList", method: "get" });
