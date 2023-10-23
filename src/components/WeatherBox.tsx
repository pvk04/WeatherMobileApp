import { getCityForecast } from "../services/getCityForecast";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

interface WeatherBoxProps {
	cityName: string;
	cityKey: string;
	deleteCity: (cityKey: string) => void;
}

const WeatherBox: React.FC<WeatherBoxProps> = ({ cityName, cityKey, deleteCity }) => {
	const [forecast, setForecast] = useState<CityForecast>();

	useEffect(() => {
		getCityForecast(cityKey).then((forecastRes) => {
			setForecast(forecastRes);
			console.log(forecastRes);
		});
	}, []);

	const confirmation = () => {
		Alert.alert("Подтверждение", "Вы действительно хотите удалить город?", [
			{
				text: "Отмена",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{
				text: "Ок",
				onPress: () => deleteCity(cityKey),
				style: "cancel",
			},
		]);
	};

	return (
		<View style={styles.weatherBox}>
			<Pressable style={styles.closeButtonWrap} onPress={confirmation}>
				<AntDesign name="closecircle" color="red" size={20} />
			</Pressable>
			<Text>{cityName}</Text>
			<Text>{forecast?.Headline.Text}</Text>
			<View style={styles.dayTypeForecast}>
				<View>
					<Text>Днем:</Text>
					<Image source={require(`/assets/${forecast?.DailyForecasts[0].Day.Icon || "01"}-s.png`)} style={{ width: 50, height: 50 }} />
					<Text>{forecast?.DailyForecasts[0].Day.IconPhrase}</Text>
				</View>
				<View>
					<Text>Ночью:</Text>
					<Image source={require(`/assets/${forecast?.DailyForecasts[0].Night.Icon || "01"}-s.png`)} style={{ width: 50, height: 50 }} />
					<Text>{forecast?.DailyForecasts[0].Night.IconPhrase}</Text>
				</View>
			</View>
		</View>
	);
};

export default WeatherBox;

const styles = StyleSheet.create({
	weatherBox: {
		position: "relative",
		display: "flex",
		flexDirection: "column",
		padding: 40,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderRadius: 5,
		backgroundColor: "white",
	},
	closeButtonWrap: {
		position: "absolute",
		top: 5,
		right: 5,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
	},
	dayTypeForecast: {
		display: "flex",
	},
});