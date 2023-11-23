import instance from "../instance"

export const InstituteCreateCourselink = async (fk_course_id:string, subCourse:any) => {
    try {
        const get = await instance.post('/institute/course-link/create', {
           fk_course_id,
           subCourse
        })
        return { code: 200, message: get.data.message }


    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const InstituteCreateCourseStundet = async (fk_course_id:string, stundetList:any,course_type:number) => {
    try {
        const get = await instance.post('/institute/course-link/create/studentCourse', {
           fk_course_id,
           stundetList,
           course_type
        })
        return { code: 200, message: get.data.message, status: get.data.status}


    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const deleteInstituteCourselink = async (id: string) => {
    try {
        const get = await instance.delete(`/institute/course-link/delete/${id}`)
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const deleteInstituteStudentCourse = async (id: string) => {
    try {
        const get = await instance.delete(`/institute/course-link/get/student/course/delete/${id}`)
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}

export const getSubCourseStudents = async(id:any)=>{
    try {
        const get = await instance.get(`/institute/course-link/get/student/sub-course/${id}`)
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const getCourseStudents = async(id:any)=>{
    try {
        const get = await instance.get(`/institute/course-link/get/student/course/${id}`)
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}

