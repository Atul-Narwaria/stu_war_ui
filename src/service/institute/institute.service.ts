import instance from "../instance"
import Swal from 'sweetalert2'


export const InstituteLogin = async (email: string, password: string) => {
    try {
        const get = await instance.post('/auth/institute/login', {
            email,
            password
        })
        return { code: 200, message: get.data.message, status: get?.data?.status, token: get.data.token, role: get.data.role }


    } catch (e: any) {
        // if (e.response.status === 401) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Oops...',
        //         text: 'Something went wrong!',
        //         footer: '<a href="">Why do I have this issue?</a>'
        //     })
        // }
        return { code: 400, message: e.message }
    }
}