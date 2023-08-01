import instance from "../instance"


export const AdminRegister =async (name:string,email:string,phone:string,password:string,confirmPassword:string) => {
    try{
        const get = await instance.post('/auth/admin/registration',{
            name,
            email,
            phone,
            password,
            confirmPassword
        })
        return {code:200,message:get.data}
    }catch(e:any){
        return {code:500,message:e.message}
    }
}

export const AdminLogin =async (email:string,password:string) => {
    try{
        const get = await instance.post('/auth/admin/login',{
            email,
            password
        })
        return {code:get.status,message:get.data.message,status:get.data.status,token:get.data.token,role:get.data.role}
        

    }catch(e:any){
        return {code:400,message:e.message}
    }
}