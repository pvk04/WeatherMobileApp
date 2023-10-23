import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import SearchInput from "../components/SearchInput";
import WeatherBox from "../components/WeatherBox";

interface HomeScreenProps {
	navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
	const [cityKeys, setCityKeys] = useState<{ name: string; key: string }[]>([{ name: "test", key: "2452108" }]);

	const handleAddCity = ({ name, key }: { name: string; key: string }) => {
		// if (cityKeys.includes(cityKey)) return;
		setCityKeys([...cityKeys, { name, key }]);
	};

	const handleDeleteCity = (cityKey: string) => {
		const filteredCities = cityKeys.filter(({ key }) => cityKey !== key);
		setCityKeys(filteredCities);
	};

	return (
		<View>
			<SearchInput addCity={handleAddCity} />
			<View style={styles.weatherBoxes}>
				{cityKeys.map((cityItem) => (
					<WeatherBox cityName={cityItem.name} cityKey={cityItem.key} deleteCity={handleDeleteCity} key={cityItem.key} />
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
