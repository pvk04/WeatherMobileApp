import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/screens/HomeScreen";
import { initDb } from "./src/services/initDb";

const Stack = createStackNavigator();

function App() {
	initDb();

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Погода" component={HomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
