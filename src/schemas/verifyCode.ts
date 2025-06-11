import {z} from 'zod'

export const verifyCodeSchema = z.object({
    code: z.string().max(6 , "Invalid OTP entered")
})
