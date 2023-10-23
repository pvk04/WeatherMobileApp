import { API_KEY } from "../config";

export const getCityForecast = async (cityKey: string) => {
	const suggestions = await fetch(
		`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityKey}?apikey=${API_KEY}&language=ru&metric=true`
	);
	const response = JSON.parse(await suggestions.text());
	console.log(response);

	return response;
};
