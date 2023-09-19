import instance from "../instance"


export const InstituteBatch = async (fk_course_id:string,name:string) => {
    try {
        const get = await instance.post('/institute/course/create', {
           fk_course_id,
           name
        })
        return { code: 200, message: get.data.message }
    } catch (e: any) {
        return { code: 500, message: e.message }
    }
}