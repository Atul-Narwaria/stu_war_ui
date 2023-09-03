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