import React, { useEffect, useState, useRef, useCallback } from "react";
import loading from "./loading";
import ErrorModal from "./error-modal";

export const useHTTP = () => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState({ message: "", status: false });

	const activeHttpRequests = useRef([]);

	const getData = useCallback(async (url, method, body, headers) => {
		const httpAbortCtrl = new AbortController();
		activeHttpRequests.current.push(httpAbortCtrl);

		let data;
		setLoading(true);

		try {
			const response = await fetch(url, {
				method,
				body,
				headers,
			});

			data = await response.json();

			if (!response.ok) {
				throw new Error(data.message);
			}
			setLoading(false);
		} catch (e) {
			setLoading(false);
			setError({ message: e.message || "Unknown error occured", status: true });
			throw e;
		}

		//console.log((data));
		return data;
	}, []);

	useEffect(() => {
		return () => {
			activeHttpRequests.current.forEach((e) => e.abort());
		};
	}, []);

	return [getData, isLoading, isError, setError];
};
