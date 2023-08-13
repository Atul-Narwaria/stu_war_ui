import Swal from "sweetalert2"
import instance from "../../instance"
import { Redirect } from "../../../components/Redirect"

export const createInstiture = async (
    name: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
    country: string,
    state: string,
    city: string,
    address: string,
    pin: string,
) => {
    try {
        const get = await instance.post('/institute/create', {
            name,
            email,
            phone,
            password,
            confirmPassword,
            country,
            state,
            city,
            address,
            pin
        })
        return get.data
    } catch (e: any) {

        return { code: e.response.status, message: e.message }
    }
}

export const getAllInstitute = async () => {
    try {
        const get = await instance.get('/institute/get')
        return get.data
    } catch (e: any) {

        if (e.response.status == 401) {
            Swal.fire({
                icon: 'error',
                title: 'Session time out',
                showCancelButton: true,
                confirmButtonText: 'ok',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    window.location.href = '/';
                } else if (result.isDenied) {
                    window.location.href = '/';
                }
            })
        }
        return { code: 500, message: e.message }
    }
}
export const updateInstitueStatus = async (id: string, status: boolean) => {
    try {
        const get = await instance.put(`/institute/update/${id}`, {
            status: status
        })
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const deleteInstitute = async (id: string) => {
    try {
        const get = await instance.delete(`/institute/delete/${id}`)
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}