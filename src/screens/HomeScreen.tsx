import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { addCityDb } from "../services/addCityDb";
import { getCitiesDb } from "../services/getCitiesDb";
import { deleteCityDb } from "../services/deleteCityDb";
import SearchInput from "../components/SearchInput";
import WeatherBox from "../components/WeatherBox";
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
			<FlatList
				data={cityKeys}
				renderItem={({ item }) => (
					<WeatherBox cityId={item.id} cityName={item.name} cityKey={item.key} deleteCity={handleDeleteCity} key={item.key} />
				)}
				keyExtractor={(item, index) => index.toString()}
				ListFooterComponent={<View style={{ height: 100 }} />}
			/>
		</View>
	);
};

export default HomeScreen;
