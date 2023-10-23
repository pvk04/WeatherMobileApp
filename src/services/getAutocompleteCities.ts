export const getAutocompleteCities = async (city: string) => {
	const suggestions = await fetch(
		`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=OqAxn2B4hdSDNUjZfBmxtmt8fl1sdH3T&q=${city}&language=ru`
	);
	return JSON.parse(await suggestions.text());
};
