import instance from "../instance"

export const createInstituteStudent = async (
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
        const get = await instance.post('/institute/student/create', {
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

export const createInstituteBulkStudent = async (data: any) => {
    try {
        const get = await instance.post('/institute/student/create/bulk', {

            data

        },
        )
        return { code: 200, message: get.data.message, status: get?.data?.status }
    } catch (e: any) {
        return { code: e.response.status, message: e.message, status: "error" }
    }
}

export const getInstituteStudents = async (page?: number) => {
    try {
        let pg = 1;
        if (page) {
            pg = page
        }
        const get = await instance.get(`/institute/student/get/all?page=${pg}`)
        return get.data
    } catch (e: any) {
        return { code: e.response.status, message: e.message }
    }
}
export const getInstituteStudentsActive = async (page?: number) => {
    try {
        let pg = 1;
        if (page) {
            pg = page
        }
        const get = await instance.get(`/institute/student/get/active?page=${pg}`)
        return get.data
    } catch (e: any) {
        return { code: e.response.status, message: e.message }
    }
}
export const getInstituteStudentsSearch = async (query: any, page?: number) => {
    try {
        let pg = 1;
        if (page) {
            pg = page
        }
        const get = await instance.get(`/institute/student/get/search?page=${pg}&query=${query}`)
        return get.data
    } catch (e: any) {
        return { code: e.response.status, message: e.message }
    }
}

export const updateInstitueStundetStatus = async (id: string, status: boolean) => {
    try {
        const get = await instance.put(`/institute/student/update/${id}`, {
            status: status
        })
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const deleteInstituteStudent = async (id: string) => {
    try {
        const get = await instance.delete(`/institute/student/delete/${id}`)
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const editInstitueStundetStatus = async (id: string|any, firstname: string,
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
        const get = await instance.put(`/institute/student/edit/${id}`, {
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
export const getInstituteStudentsById = async (userid: any) => {
    try {
        const get = await instance.get(`/institute/student/get/student/${userid}`)
        return get.data
    } catch (e: any) {
        return { code: e.response.status, message: e.message }
    }
}