import axios from "axios";

const BEEM_API_URL = "https://apisms.beem.africa/v1";

export class BeemClient {
	private _apiKey: string;
	private _secretKey: string;

	constructor(config: { apiKey: string; secretKey: string }) {
		this._apiKey = config.apiKey;
		this._secretKey = config.secretKey;
	}

	get apiKey() {
		return this._apiKey;
	}

	get url() {
		return BEEM_API_URL;
	}

	axios() {
		return axios.create({
			baseURL: this.url,
			auth: {
				username: this.apiKey,
				password: this._secretKey,
			},
			responseType: "json",
		});
	}
}
