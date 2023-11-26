import { z } from "zod";

export const validateSignupInput = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(6),
})

export const validateEmail = z.object({
	email: z.string().email()
})

export const validateResetPasswordInput = z.object({
	email: z.string().email(),
	password: z.string(),
})