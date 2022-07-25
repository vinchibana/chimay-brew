// uuid 生成用户 token
import { v4 as uuidv4 } from "uuid";
export const getUUID = () => {

  // 从 localStorage 中存取 token
  let uuid_token = localStorage.getItem("UUID_TOKEN");
  if (!uuid_token) {
    uuid_token = uuidv4();
    localStorage.setItem("UUID_TOKEN", uuid_token);
  }
  return uuid_token;
};
