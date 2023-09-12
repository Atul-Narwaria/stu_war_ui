import instance from "../../instance"

export const getAllCountryStateCity = async () => {
    try {
        const get = await instance.get('/location/city/get/all')
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}

export const createCity = async (city: string, stateId: string, countryid: string) => {
    try {
        const create = await instance.post('/location/city/create', {
            countryId: countryid,
            stateId: stateId,
            city: city
        })
        return create.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}

export const getCityByStateCountry = async (countryid: string, stateId: string) => {
    try {
        const create = await instance.get(`/location/city/get/active/${countryid}/${stateId}`)
        return create.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}

export const updateCityStatus = async (cityId: string, status: boolean) => {

    try {
        const create = await instance.put('/location/city/update/status', {
            cityId: cityId,
            status: status
        })
        return create.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const deleteCity = async (id: string) => {
    try {
        const create = await instance.delete(`/location/city/delete/${id}`)
        return create.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const getCitybyId = async (id:any) => {
    try {
        const get = await instance.get(`/location/city/get/city/${id}`);
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}