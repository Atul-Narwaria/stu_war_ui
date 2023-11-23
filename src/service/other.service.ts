import instance from "./instance";

export const getIpV4 = async () => {
  try {
    const get = await instance.get("/auth/ip");
    return {
      code: 200,
      message: get.data.message,
      status: get?.data?.status,
    };
  } catch (e: any) {
    return { code: 400, message: e.message };
  }
};
