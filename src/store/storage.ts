export function loadLocalState<T>(key: string): T | undefined {
	try {
		const jsonState = localStorage.getItem(key);
		if (!jsonState) {
			return undefined;
		}
		return JSON.parse(jsonState);
	} catch (e) {
		console.error(e);
		return undefined;
	}
}

export function saveLocalState<T>(state: T, key: string) {
	const stringState = JSON.stringify(state);
	localStorage.setItem(key, stringState);
}

export function deleteLocalState(key: string) {
	localStorage.removeItem(key);
}
