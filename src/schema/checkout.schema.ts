import * as z from "zod";
export const checkoutSchema = z.object({
    details : z.string().nonempty("details cant be empty"),
    phone : z.string().nonempty("phone cant be empty").regex(/^01[1250][0-9]{8}$/, "not valid phone number"),
    city : z.string().nonempty("city cant be empty")
})
export type checkoutSchemaType = z.infer<typeof checkoutSchema >