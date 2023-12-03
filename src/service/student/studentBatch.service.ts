import instance from "../instance";

export const StudentBatchAssignmentGet = async (fk_batch_id: any) => {
  try {
    const get = await instance.get(
      `/institute/batch-link/get/batch/assignments/${fk_batch_id}`
    );
    return {
      code: 200,
      message: get.data.message,
      status: get?.data?.status,
      totalPage: get?.data.totalPage,
      totalRow: get?.data.totalRow,
    };
  } catch (e: any) {
    return { code: 400, status: "error", message: e.message };
  }
};
export const StudentBatchAssignmentGetSearch = async (
  fk_batch_id: any,
  query: any,
  page?: number
) => {
  try {
    let pg = 1;
    if (page) {
      pg = page;
    }
    const get = await instance.get(
      `/institute/batch-link/get/batch/assignments/${fk_batch_id}?page=${pg}&query=${query}`
    );
    return {
      code: 200,
      message: get.data.message,
      status: get?.data?.status,
      totalPage: get?.data.totalPage,
      totalRow: get?.data.totalRow,
    };
  } catch (e: any) {
    return { code: 400, status: "error", message: e.message };
  }
};
export const StudentBatchGet = async () => {
  try {
    const get = await instance.get(`/institute/batch-link/get/batches`);
    return {
      code: 200,
      message: get.data.message,
      status: get?.data?.status,
    };
  } catch (e: any) {
    return { code: 400, status: "error", message: e.message };
  }
};
export const StudentBatchDetailById = async (batchId: string) => {
  try {
    const get = await instance.get(
      `/institute/batch-link/get/batche/detail/${batchId}`
    );
    return {
      code: 200,
      message: get.data.message,
      status: get?.data?.status,
    };
  } catch (e: any) {
    return { code: 400, status: "error", message: e.message };
  }
};

export const StudentBatchesDetail = async (batchid: string) => {
  try {
    const get = await instance.get(
      `/institute/batch-link/get/batch/${batchid}`
    );
    return {
      code: 200,
      status: get.data.status,
      message: get.data.message,
    };
  } catch (e: any) {
    return { code: 400, status: "error", message: e.message };
  }
};
export const StudentBatchAssignmentSubmit = async (
  contents: any,
  fk_assignment_id: any,
  media: any
) => {
  try {
    const get = await instance.post(
      "/institute/batch-link/batch/assignment/create",
      {
        contents,
        fk_assignment_id,
        media,
      }
    );
    return {
      code: 200,
      message: get.data.message,
      status: get?.data?.status,
    };
  } catch (e: any) {
    // if (e.response.status === 401) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Oops...',
    //         text: 'Something went wrong!',
    //         footer: '<a href="">Why do I have this issue?</a>'
    //     })
    // }
    return { code: 400, status: "error", message: e.message };
  }
};