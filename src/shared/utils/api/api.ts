type ConfigApi = {
	baseUrl: string;
	headers: HeadersInit;
};

export class Api {
	private baseUrl;
	private headers;

	constructor({ baseUrl, headers }: ConfigApi) {
		this.baseUrl = baseUrl;
		this.headers = headers;
	}

	private async onResponse<T>(res: Response): Promise<T> {
		return res.ok
			? res.json()
			: res.json().then((data) => Promise.reject(data));
	}

	private async request<T>(
		endpoint: string,
		options?: RequestInit
	): Promise<T> {
		const res = await fetch(`${this.baseUrl}${endpoint}`, {
			method: 'GET',
			...options,
			headers: { ...this.headers, ...options?.headers },
		});
		return await this.onResponse<T>(res);
	}
}

const config = {
	apiUrl: '',
};

const api = new Api({
	baseUrl: config.apiUrl,
	headers: {
		'content-type': 'application/json',
		// Authorization: `Bearer ${config.apiToken}`,
	},
});

export default api;
