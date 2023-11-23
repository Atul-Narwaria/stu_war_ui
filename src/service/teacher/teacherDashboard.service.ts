import instance from "../instance";
import Swal from "sweetalert2";

export const teacherTotalbatch = async () => {
  try {
    const get = await instance.get("/institute/batch-teacher/get/batch/count");
    return get.data;
  } catch (e: any) {
    if (e.response.status === 401) {
      Swal.fire({
        icon: "error",
        title: "Session time out",
        showCancelButton: true,
        confirmButtonText: "ok",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location.href = "/";
        } else if (result.isDenied) {
          window.location.href = "/";
        }
      });
    }
    return { code: 500, message: e.message };
  }
};
export const teacherbatch = async () => {
  try {
    const get = await instance.get(
      "/institute/batch-teacher/get/batch/remaning/count"
    );
    return get.data;
  } catch (e: any) {
    if (e.response.status === 401) {
      Swal.fire({
        icon: "error",
        title: "Session time out",
        showCancelButton: true,
        confirmButtonText: "ok",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location.href = "/";
        } else if (result.isDenied) {
          window.location.href = "/";
        }
      });
    }
    return { code: 500, message: e.message };
  }
};
export const teacherbatchStatus = async () => {
  try {
    const get = await instance.get("/institute/batch-teacher/get/batch/");
    return get.data;
  } catch (e: any) {
    if (e.response.status === 401) {
      Swal.fire({
        icon: "error",
        title: "Session time out",
        showCancelButton: true,
        confirmButtonText: "ok",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location.href = "/";
        } else if (result.isDenied) {
          window.location.href = "/";
        }
      });
    }
    return { code: 500, message: e.message };
  }
};

export const teacherTotalStudents = async () => {
  try {
    const get = await instance.get(
      "/institute/batch-teacher/get/batch/student/counts"
    );
    return get.data;
  } catch (e: any) {
    if (e.response.status === 401) {
      Swal.fire({
        icon: "error",
        title: "Session time out",
        showCancelButton: true,
        confirmButtonText: "ok",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location.href = "/";
        } else if (result.isDenied) {
          window.location.href = "/";
        }
      });
    }
    return { code: 500, message: e.message };
  }
};

export const TeacherEvents = async () => {
  try {
    const get = await instance.get("/events/get/update/event");
    return get.data;
  } catch (e: any) {
    if (e.response.status === 401) {
      Swal.fire({
        icon: "error",
        title: "Session time out",
        showCancelButton: true,
        confirmButtonText: "ok",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location.href = "/";
        } else if (result.isDenied) {
          window.location.href = "/";
        }
      });
    }
    return { code: 500, message: e.message };
  }
};
