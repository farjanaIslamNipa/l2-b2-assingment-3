import {z} from "zod";

const registerUserValidationSchema = z.object({
  body: z.object({
    username: z.string({required_error: 'username field is required'}),
    email: z.string({required_error: 'username field is required'}),
    password: z.string({required_error: 'Password is required'}),
  })
})

export const AuthValidation = {
  registerUserValidationSchema
}