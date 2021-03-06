/* eslint-disable  */
export const ApiConnection = async (url: String): Promise<Boolean> => {
	try {
		const result = await fetch(url + `/rbac/roles`);
		if (result.status === 200) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		// user maybe mixed up url, so that fetch would crash --> could be done cleaner
		return false;
	}
};
