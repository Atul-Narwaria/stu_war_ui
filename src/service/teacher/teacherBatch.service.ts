import moment from "moment";
import instance from "../instance";

export const TeacherBatchAssignmentSubmit = async (
  name: any,
  contents: any,
  fk_batch_id: any,
  submission_date: any,
  media: any
) => {
  try {
    const get = await instance.post(
      "/institute/batch-teacher/create/assigment",
      {
        name,
        contents,
        fk_batch_id,
        submission_date,
        media,
      }
    );
    return {
      code: 200,
      message: get.data.message,
      status: get?.data?.status,
      token: get.data.token,
      role: get.data.role,
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
export const TeacherBatchAssignmentCount = async (fk_batch_id: any) => {
  try {
    // const date = moment().format()
    const get = await instance.get(
      `institute/batch-teacher/get/assignments/count/${fk_batch_id}/`
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
export const TeacherBatchAssignmentGet = async (fk_batch_id: any) => {
  try {
    const get = await instance.get(
      `/institute/batch-teacher/get/assignments/${fk_batch_id}`
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
export const TeacherBatchAssignmentSearchGet = async (
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
      `/institute/batch-teacher/get/assignments/search/${fk_batch_id}?page=${pg}&query=${query}`
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

export const TeacherAllBatches = async () => {
  try {
    const get = await instance.get(`/institute/batch-teacher/get/all/batches`);
    return {
      code: 200,
      status: get.data.status,
      message: get.data.message,
    };
  } catch (e: any) {
    return { code: 400, status: "error", message: e.message };
  }
};
export const TeacherAllBatchesStudents = async (batchid: string) => {
  try {
    const get = await instance.get(
      `/institute/batch-teacher/get/batch/students/${batchid}`
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

export const TeacherBatchesDetail = async (batchid: string) => {
  try {
    const get = await instance.get(
      `/institute/batch-teacher/get/batch/${batchid}`
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
export const TeacherBatchesAssignmentDelete = async (batchid: string) => {
  try {
    const get = await instance.delete(
      `/institute/batch-teacher/delete/assignment/${batchid}`
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
export const TeacherBatchesAssignmentShow = async (batchid: string) => {
  try {
    const get = await instance.get(
      `/institute/batch-teacher/assignment/${batchid}`
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
