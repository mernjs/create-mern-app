import { toast } from 'react-toastify';

const config: any = {
	position: "top-right",
	autoClose: 2000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "light",
}

export const showToast = (message: string, type: string) => {
	if (type === 'success') toast.success(message, config);
	if (type === 'error') toast.error(message, config);
}

export const setItem = (key: string, data: any) => {
	typeof window !== 'undefined' && localStorage.setItem(key, JSON.stringify(data))
}

export const getItem = (key: string) => {
	const data = typeof window !== 'undefined' && localStorage.getItem(key) || ""
	return data ? JSON.parse(data) : ""
}

export const removeItem = (key: string) => {
	typeof window !== 'undefined' && localStorage.removeItem(key)
}