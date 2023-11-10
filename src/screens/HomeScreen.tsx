import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import SearchInput from "../components/SearchInput";
import WeatherBox from "../components/WeatherBox";
import { addCityDb } from "../services/addCityDb";
import { getCitiesDb } from "../services/getCitiesDb";
import { deleteCityDb } from "../services/deleteCityDb";

interface HomeScreenProps {
	navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
	const [cityKeys, setCityKeys] = useState<{ id: number; name: string; key: string }[]>([]);

	useEffect(() => {
		try {
			const citiesFromDb = getCitiesDb((state: { id: number; name: string; key: string }[] | []) => {
				setCityKeys(state);
			});
			console.log(citiesFromDb);
			// setCityKeys(citiesFromDb ?? []);
		} catch (error) {
			console.log(error);
		}
	}, []);

	const handleAddCity = ({ name, key }: { name: string; key: string }) => {
		addCityDb({ key, name }, (insertedId: number) => {
			setCityKeys([...cityKeys, { id: insertedId, name, key }]);
		});
	};

	const handleDeleteCity = (cityId: number) => {
		deleteCityDb(cityId);
		const filteredCities = cityKeys.filter(({ id }) => cityId !== id);
		setCityKeys(filteredCities);
	};

	return (
		<View>
			<SearchInput addCity={handleAddCity} />
			<View style={styles.weatherBoxes}>
				{cityKeys.map((cityItem) => (
					<WeatherBox
						cityId={cityItem.id}
						cityName={cityItem.name}
						cityKey={cityItem.key}
						deleteCity={handleDeleteCity}
						key={cityItem.key}
					/>
				))}
			</View>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	weatherBoxes: {
		display: "flex",
		flexDirection: "column",
		gap: 10,
		padding: 20,
	},
});
