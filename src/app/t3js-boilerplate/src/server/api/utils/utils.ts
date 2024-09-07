import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

export const sendMail = (toEmail: string, subject: string, mailContent: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		try {
			const transporter = nodemailer.createTransport({
				host: process.env.MAIL_HOST as string,
				port: parseInt(process.env.MAIL_PORT as string, 10),
				auth: {
					user: process.env.MAIL_USERNAME as string,
					pass: process.env.MAIL_PASSWORD as string,
				},
			});
			const mailOptions = {
				from: process.env.MAIL_FROM_ID as string,
				to: toEmail,
				subject: subject,
				html: mailContent,
			};
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) reject(error);
				resolve(info);
			});
		} catch (error) {
			reject(error);
		}
	});
};

export const successResponse = (message: any, data?: any) => {
	return {
		data: data || [],
		message: message,
	}
};

export const errorResponse = (message: any, data?: any) => {
	let newMessage = '';
	if (process.env.APP_DEBUG === 'true') {
		newMessage = message?.message || message;
	} else {
		if (message.message) {
			newMessage = 'Something went wrong. Please try again later.';
		} else {
			newMessage = message;
		}
	}

	throw new Error(newMessage);
};

export const hashPassword = async (password: string): Promise<string> => {
	return bcrypt.hash(password, 10);
};
