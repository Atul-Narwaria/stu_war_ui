import instance from "../instance"


export const InstituteCreateSubCourse = async (name:string,amount:number,image:string,durantion:number,description:string) => {
    try {
        const get = await instance.post('/institute/sub-course/create', {
            name,
            amount,
            image,
            durantion,
            description
        })
        return { code: 200, message: get.data.message, status: get?.data?.status, token: get.data.token, role: get.data.role }


    } catch (e: any) {
        return { code: 400, message: e.message }
    }
}

export const getInstituteSubCourses = async (page?: number) => {
    try {
        let pg = 1;
        if (page) {
            pg = page
        }
        const get = await instance.get(`/institute/sub-course/get/all?page=${pg}`)
        return get.data
    } catch (e: any) {
        return { code: e.response.status, message: e.message }
    }
}

export const getInstituteSubCoursesSearch = async (query: any, page?: number) => {
    try {
        let pg = 1;
        if (page) {
            pg = page
        }
        const get = await instance.get(`/institute/sub-course/get/search?page=${pg}&query=${query}`)
        return get.data
    } catch (e: any) {
        return { code: e.response.status, message: e.message }
    }
}

export const updateInstitueSubCourseStatus = async (id: string, status: boolean) => {
    try {
        const get = await instance.put(`/institute/sub-course/update/${id}`, {
            status: status
        })
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const deleteInstituteSubCourse = async (id: string) => {
    try {
        const get = await instance.delete(`/institute/sub-course/delete/${id}`)
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const editInstitueSubCourseStatus = async (id: string|any,  name:string,amount:number,image:string,durantion:number,description:string  ) => {
    try {
        const get = await instance.put(`/institute/sub-course/edit/${id}`, {
            name,
            amount,
            image,
            durantion,
            description  
        },

        )
        return { code: 200, message: get.data.message, status: get?.data?.status }
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const getInstituteSubCoursesById = async (id: any) => {
    try {
        const get = await instance.get(`/institute/sub-course/get/sub-course/${id}`)
        return get.data
    } catch (e: any) {
        return { code: e.response.status, message: e.message }
    }
}
export const getInstituteSubCoursesActive = async () => {
    try {
        const get = await instance.get(`/institute/sub-course/get/active`)
        return get.data
    } catch (e: any) {
        return { code: e.response.status, message: e.message }
    }
}
