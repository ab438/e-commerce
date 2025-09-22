import * as z from "zod";
export const loginschema = z.object({
    email : z.email().nonempty("this field cant be empty"),
    password : z.string().nonempty("this field cant be empty").min(6, "min length is 6 chars"),
})
export type loginschemaType = z.infer<typeof loginschema >