import instance from "../instance";

export const InstituteBatch = async (
  fk_course_id: string,
  name: string,
  start_time: string,
  end_time: string,
  weekdays: any
) => {
  try {
    const get = await instance.post("/institute/batch/create", {
      fk_course_id,
      name,
      start_time,
      end_time,
      weekdays,
    });
    return { code: 200, message: get.data.message, status: get.data.status };
  } catch (e: any) {
    return { code: 500, message: e.message, status: "error" };
  }
};

export const InstituteBatchGetAll = async (page?: number) => {
  try {
    let pg = 1;
    if (page) {
      pg = page;
    }
    const get = await instance.get(`/institute/batch/get/all?page=${pg}`);
    return get.data;
  } catch (e: any) {
    return { code: 500, message: e.message, status: "error" };
  }
};

export const InstituteBatchSearch = async (query: any, page?: number) => {
  try {
    let pg = 1;
    if (page) {
      pg = page;
    }
    const get = await instance.get(
      `/institute/batch/get/search?page=${pg}&query=${query}`
    );
    return get.data;
  } catch (e: any) {
    return { code: e.response.status, message: e.message };
  }
};

export const InstituteBatchStatus = async (id: string, status: boolean) => {
  try {
    const get = await instance.put(`/institute/batch/update/${id}`, {
      status: status,
    });
    return get.data;
  } catch (e: any) {
    return { code: 500, message: e.message };
  }
};
export const deleteInstituteBatch = async (id: string) => {
  try {
    const get = await instance.delete(`/institute/batch/delete/${id}`);
    return get.data;
  } catch (e: any) {
    return { code: 500, message: e.message };
  }
};
export const editInstituteBatch = async (
  id: string | any,
  fk_course_id: string,
  name: string,
  start_time: string,
  end_time: string,
  weekdays: any
) => {
  try {
    const get = await instance.put(`/institute/batch/edit/${id}`, {
      fk_course_id,
      name,
      start_time,
      end_time,
      weekdays,
    });
    return { code: 200, message: get.data.message, status: get?.data?.status };
  } catch (e: any) {
    return { code: 500, message: e.message };
  }
};
export const getInstituteBatchById = async (id: any) => {
  try {
    const get = await instance.get(`/institute/batch/get/batch/${id}`);
    return get.data;
  } catch (e: any) {
    return { code: e.response.status, message: e.message };
  }
};
export const getInstituteBatchActive = async () => {
  try {
    const get = await instance.get(`/institute/batch/get/active`);
    return get.data;
  } catch (e: any) {
    return { code: e.response.status, message: e.message };
  }
};
export const linkBulkStudents = async (data: any) => {
  try {
    const get = await instance.post(`/institute/batch-link/create/bulk`, {
      data: data,
    });
    return { code: 200, message: get.data.message, status: get?.data?.status };
  } catch (e: any) {
    return { code: e.response.status, message: e.message, status: "error" };
  }
};

export const getBatchStudents = async (id: any, page?: number) => {
  try {
    let pg = 1;
    if (page) {
      pg = page;
    }
    const get = await instance.get(
      `/institute/batch-link/get/all/${id}/?page=${pg}`
    );
    return get.data;
  } catch (e: any) {
    return { code: e.response.status, message: e.message, status: "error" };
  }
};
export const getBatchStudentsSearch = async (
  id: any,
  query: any,
  page?: number
) => {
  try {
    let pg = 1;
    if (page) {
      pg = page;
    }
    const get = await instance.get(
      `/institute/batch-link/get/search/${id}/?page=${pg}&query=${query}`
    );
    return get.data;
  } catch (e: any) {
    return { code: e.response.status, message: e.message };
  }
};

export const deleteBatchStudent = async (id: string) => {
  try {
    const get = await instance.delete(`/institute/batch-link/delete/${id}`);
    return get.data;
  } catch (e: any) {
    return { code: 500, message: e.message };
  }
};

export const createBatchTeacher = async (fkTeacherId: any, fkBatchId: any) => {
  try {
    const get = await instance.post(`/institute/batch-teacher/create`, {
      fkTeacherId,
      fkBatchId,
    });
    return { code: 200, message: get.data.message, status: get?.data?.status };
  } catch (e: any) {
    return { code: e.response.status, message: e.message, status: "error" };
  }
};
export const getbatchTeacher = async (id: any) => {
  try {
    const get = await instance.get(
      `/institute/batch-teacher/get/teacher/${id}`
    );
    return get.data;
  } catch (e: any) {
    return { code: e.response.status, message: e.message };
  }
};
export const deleteBatchTeacher = async (id: string) => {
  try {
    const get = await instance.delete(`/institute/batch-teacher/delete/${id}`);
    return get.data;
  } catch (e: any) {
    return { code: 500, message: e.message };
  }
};
export const InstituteBatchLiveClassStatus = async (
  id: string,
  status: boolean
) => {
  try {
    const get = await instance.put(`/institute/batch/update/live-class/${id}`, {
      status: status,
    });
    return get.data;
  } catch (e: any) {
    return { code: 500, message: e.message };
  }
};

export const InstituteLiveClassByBatch = async (id: string) => {
  try {
    const get = await instance.get(`/institute/batch/get/liveClass/${id}`);
    return get.data;
  } catch (e: any) {
    return { code: 500, message: e.message };
  }
};

export const InstituteBatchLiveClassCreate = async (id: string) => {
  try {
    const get = await instance.post(`/institute/zoom/create/batch/class`, {
      batchId: id,
    });
    return get.data;
  } catch (e: any) {
    return { code: 500, message: e.message };
  }
};
