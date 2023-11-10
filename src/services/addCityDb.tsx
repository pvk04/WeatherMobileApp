import * as SQLite from "expo-sqlite";

export const addCityDb = ({ key, name }: { key: string; name: string }, cb: any) => {
	const db = SQLite.openDatabase("weather.db");

	db.transaction((tx) => {
		tx.executeSql(
			"INSERT INTO city (key, name) VALUES (?, ?);",
			[key, name],
			(_, result) => {
				console.log("Record inserted successfully", result.insertId);
				cb(result.insertId);
			},
			(_, error): any => {
				console.log("Error inserting record:", error);
			}
		);
	});
};
