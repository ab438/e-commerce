import * as z from "zod";
export const registerschema = z.object({
    name : z.string()
    .nonempty("this field cant be empty")
    .min(2, "min length is 2")
    .max(10, "max length is 10"),
    email : z.email().nonempty("this field cant be empty"),
    password : z.string().nonempty("this field cant be empty").min(6, "min length is 6 chars"),
    rePassword : z.string().nonempty("this field cant be empty"),
    phone : z.string().regex(/^01[0251][0-9]{8}$/)
}).refine((object) => object.password === object.rePassword, {
    path : ["rePassword"],
    error : "password and repassword not match"
})
export type registerschemaType = z.infer<typeof registerschema >