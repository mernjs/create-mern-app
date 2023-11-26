import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { errorResponse, successResponse, hashPassword } from "~/server/api/utils/utils";
import { validateEmail, validateResetPasswordInput, validateSignupInput } from "../validations/user";

export const userRouter = createTRPCRouter({

	signup: publicProcedure.input(validateSignupInput).mutation(async ({ input }: any) => {
		try {
			const user = await db.user.findFirst({ where: { email: input.email } });
			if (user) return errorResponse("Email is already registered.")
			const hashedPassword = await hashPassword(input.password);
			const savedUser = await db.user.create({
				data: {
					name: input.name,
					email: input.email,
					password: hashedPassword
				}
			});
			if (!savedUser) return errorResponse("User registering failed.")
			return successResponse("User registered successfully", { 'id': savedUser.id, 'email': savedUser.email });
		} catch (error) {
			return errorResponse(error)
		}
	}),

	forgotPassword: publicProcedure.input(validateEmail).mutation(async ({ input }: any) => {
		try {
			const user = await db.user.findFirst({ where: { email: input.email } });
			if (!user) return errorResponse("User not found.");
			return successResponse('Success');
		} catch (error) {
			return errorResponse(error)
		}
	}),

	resetPassword: publicProcedure.input(validateResetPasswordInput).mutation(async ({ input }: any) => {
		try {
			const user = await db.user.findFirst({ where: { email: input.email } });
			if (!user) return errorResponse('User not found.');
			const hashedPassword = await hashPassword(input.password);
			const updatedUser = await db.user.update({ where: { id: user.id }, data: { password: hashedPassword } });
			if (!updatedUser) return errorResponse('Failed to update password.');
			return successResponse('Password changed successfully');
		} catch (error) {
			return errorResponse(error)
		}
	}),

});
