export const getItem = (key) => {
	try {
		return JSON.parse(localStorage.getItem(key));
	} catch (error) {
		console.log("Error getting data from localStorage", error);
		return null;
	}
};

export const setItem = (key, data) => {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch (error) {
		console.log("Error setting data to localStorage", error);
	}
};

export const removeItem = (key) => {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.log("Error removing data from localStorage", error);
	}
};
