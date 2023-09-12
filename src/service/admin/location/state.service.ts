import instance from "../../instance"


export const getAllStates = async () => {
    try {
        const get = await instance.get(`/location/state/get/all`)
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const getStatesbyId = async (id:any) => {
    try {
        const get = await instance.get(`/location/state/get/state/${id}`);
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const getActiveStatesByCountry = async (id: string) => {
    try {
        const get = await instance.get(`/location/state/get/active/country/${id}`)
        return get.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}

export const createState = async (countryId: string, state: string) => {
    try {
        const create = await instance.post('/location/state/create', {
            countryId: countryId,
            state: state
        })
        return create.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const updateStateStatus = async (stateId: string, status: boolean) => {

    try {
        const create = await instance.put('/location/state/update/status', {
            stateId: stateId,
            status: status
        })
        return create.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
export const deleteState = async (id: string) => {
    try {
        const create = await instance.delete(`/location/state/delete/${id}`)
        return create.data
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}
