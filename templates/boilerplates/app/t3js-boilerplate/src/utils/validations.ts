
export const validateName = (value: any) => {
	if (!value) {
		return "Name is required";
	}
	if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value)) {
		return "Invalid name";
	}
	return true;
};

export const validateEmail = (value: any) => {
	if (!value) {
		return "Email is required";
	}
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
		return "Invalid email address";
	}
	return true;
};

export const validatePassword = (value: any) => {
	if (!value) {
		return "You must specify a password";
	}
	if (value.length < 8) {
		return "Password must be at least 8 characters long";
	}
	if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
		return "Password must contain at least one special character";
	}
	if (!/[A-Z]/.test(value)) {
		return "Password must contain at least one uppercase letter";
	}
	if (!/[a-z]/.test(value)) {
		return "Password must contain at least one lowercase letter";
	}
	return true;
};

export const validateConfirmPassword = (value: any, password: any) => {
	if (!value) {
		return "You must specify a password";
	}
	if (value !== password) {
		return "The passwords do not match";
	}
	if (value.length < 8) {
		return "Password must be at least 8 characters long";
	}
	if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
		return "Password must contain at least one special character";
	}
	if (!/[A-Z]/.test(value)) {
		return "Password must contain at least one uppercase letter";
	}
	if (!/[a-z]/.test(value)) {
		return "Password must contain at least one lowercase letter";
	}
	return true;
};