import * as SQLite from "expo-sqlite";

export const deleteCityDb = (id: number) => {
	const db = SQLite.openDatabase("weather.db");

	db.transaction((tx) => {
		tx.executeSql(
			"DELETE FROM city WHERE id = ?",
			[id],
			(_, result) => {
				console.log("Record deleted successfully", result);
			},
			(_, error): any => {
				console.log("Error inserting record:", error);
			}
		);
	});
};
