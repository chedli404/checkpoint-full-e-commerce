

export interface UserType{
    _id?:string,
    name?:string,
    email:string,
    isAdmin: boolean,
    password?:string,
    

}

export interface UserLoginType{
    email:string,   
    password:string,
}