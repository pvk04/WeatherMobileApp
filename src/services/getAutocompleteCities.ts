import { API_KEY } from "../config";

export const getAutocompleteCities = async (city: string) => {
	const suggestions = await fetch(
		`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${city}&language=ru`
	);
	return JSON.parse(await suggestions.text());
};
