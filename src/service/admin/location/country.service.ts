
import instance from "../../instance"




export const getActiveCountry = async () => {
    try {
        const get = await instance.get('/location/country/get')
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}


export const createCountry = async (name: string) => {
    try {
        const create = await instance.post('/location/country/create', {
            country: name
        })
        return create.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}

export const updateCountryStatus = async (id: string, status: boolean) => {
    try {
        const create = await instance.put('/location/country/update/status', {
            countryId: id,
            status: status
        })
        return create.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const deleteCountry = async (id: string) => {
    try {
        const create = await instance.delete(`/location/country/delete/${id}`)
        return create.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
