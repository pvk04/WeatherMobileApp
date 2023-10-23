import { getAutocompleteCities } from "../services/getAutocompleteCities";
import { useState } from "react";
import { Text, TextInput, StyleSheet, FlatList, View, TouchableOpacity } from "react-native";

interface SearchInputProps {
	addCity: ({ name, key }: { name: string; key: string }) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ addCity }) => {
	const [searchCity, setSearchCity] = useState("");
	const [suggestions, setSuggestions] = useState<CitySuggestion[] | []>([]);
	const [timeoutState, setTimeoutState] = useState<NodeJS.Timeout>();

	const handleSearchChange = (text: any) => {
		clearTimeout(timeoutState);
		setSuggestions([]);
		setSearchCity(text);

		const timeout = setTimeout(async () => {
			const suggestionCities = await getAutocompleteCities(text);
			setSuggestions(suggestionCities);
		}, 600);
		setTimeoutState(timeout);
	};

	const handleAddCity = (item: CitySuggestion) => {
		setSuggestions([]);
		setSearchCity("");
		addCity({ name: item.LocalizedName, key: item.Key });
	};

	return (
		<View>
			<TextInput style={styles.searchInput} placeholder="Добавить город" onChangeText={handleSearchChange} value={searchCity} />
			<FlatList
				style={styles.suggestionsContainer}
				data={suggestions}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => {
							handleAddCity(item);
						}}
					>
						<Text style={styles.suggestion}>
							{item.LocalizedName} ({item.Country.LocalizedName} - {item.AdministrativeArea.LocalizedName})
						</Text>
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item.Key}
			/>
		</View>
	);
};

export default SearchInput;

const styles = StyleSheet.create({
	searchInput: {
		height: 60,
		paddingHorizontal: 20,
		borderColor: "gray",
		borderWidth: 1,
	},
	suggestionsContainer: {
		maxHeight: 300,
		backgroundColor: "white",
		borderBlockColor: "black",
	},
	suggestion: {
		width: "100%",
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: "black",
	},
});
