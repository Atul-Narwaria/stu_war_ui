import instance from "../instance"

export const createInstituteTeacher = async (
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    dob: Date,
    gender: string,
    country: string,
    state: string,
    city: string,
    address: string,
    pin: string
) => {
    try {
        const get = await instance.post('/institute/teacher/create', {
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
        return { code: e.response.status, message: e.message, status: "error" }
    }
}

export const createInstituteBulkTeacher = async (data: any) => {
    try {
        const get = await instance.post('/institute/teacher/create/bulk', {

            data

        },
        )
        return { code: 200, message: get.data.message, status: get?.data?.status }
    } catch (e: any) {
        return { code: e.response.status, message: e.message, status: "error" }
    }
}

export const getInstituteTeacher = async (page?: number) => {
    try {
        let pg = 1;
        if (page) {
            pg = page
        }
        const get = await instance.get(`/institute/teacher/get/all?page=${pg}`)
        return get.data
    } catch (e: any) {
        return { code: e.response.status, message: e.message }
    }
}
export const getInstituteTeacherSearch = async (query: any, page?: number) => {
    try {
        let pg = 1;
        if (page) {
            pg = page
        }
        const get = await instance.get(`/institute/teacher/get/search?page=${pg}&query=${query}`)
        return get.data
    } catch (e: any) {
        return { code: e.response.status, message: e.message }
    }
}

export const updateInstitueTeacherStatus = async (id: string, status: boolean) => {
    try {
        const get = await instance.put(`/institute/teacher/update/${id}`, {
            status: status
        })
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const deleteInstituteTeacher = async (id: string) => {
    try {
        const get = await instance.delete(`/institute/teacher/delete/${id}`)
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const editInstitueTeacherStatus = async (id: string|any, firstname: string,
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
        const get = await instance.put(`/institute/teacher/edit/${id}`, {
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
export const getInstituteTeacherById = async (userid: any) => {
    try {
        const get = await instance.get(`/institute/teacher/get/student/${userid}`)
        return get.data
    } catch (e: any) {
        return { code: e.response.status, message: e.message }
    }
}