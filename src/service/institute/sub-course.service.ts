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

export const getInstituteCourses = async (page?: number) => {
    try {
        let pg = 1;
        if (page) {
            pg = page
        }
        const get = await instance.get(`/institute/course/get/all?page=${pg}`)
        return get.data
    } catch (e: any) {
        return { code: e.response.status, message: e.message }
    }
}

export const getInstituteCoursesSearch = async (query: any, page?: number) => {
    try {
        let pg = 1;
        if (page) {
            pg = page
        }
        const get = await instance.get(`/institute/course/get/search?page=${pg}&query=${query}`)
        return get.data
    } catch (e: any) {
        return { code: e.response.status, message: e.message }
    }
}

export const updateInstitueCourseStatus = async (id: string, status: boolean) => {
    try {
        const get = await instance.put(`/institute/course/update/${id}`, {
            status: status
        })
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const deleteInstituteCourse = async (id: string) => {
    try {
        const get = await instance.delete(`/institute/course/delete/${id}`)
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const editInstitueCourseStatus = async (id: string|any, firstname: string,
    lastname: string,
    email: string,
    phone: string,
    dob: Date,
    gender: string,
    country: string,
    state: string,
    city: string,
    address: string,
    pin: string) => {
    try {
        const get = await instance.put(`/institute/course/edit/${id}`, {
                firstname,
                lastname,
                email,
                phone,
                dob,
                gender,
                country,
                state,
                city,
                address,
                pin
        },

        )
        return { code: 200, message: get.data.message, status: get?.data?.status }
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const getInstituteCoursesById = async (id: any) => {
    try {
        const get = await instance.get(`/institute/course/get/course/${id}`)
        return get.data
    } catch (e: any) {
        return { code: e.response.status, message: e.message }
    }
}
export const getInstituteCoursesActive = async () => {
    try {
        const get = await instance.get(`/institute/course/get/active`)
        return get.data
    } catch (e: any) {
        return { code: e.response.status, message: e.message }
    }
}
