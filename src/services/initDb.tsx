import * as SQLite from "expo-sqlite";

export const initDb = () => {
	const db = SQLite.openDatabase("weather.db");

	db.transaction((tx: any) => {
		tx.executeSql(
			"CREATE TABLE IF NOT EXISTS city (id INTEGER PRIMARY KEY AUTOINCREMENT, key VARCHAR(20) UNIQUE, name VARCHAR(150));",
			[],
			() => {
				console.log('Table "city" created successfully');
			},
			(_: any, error: any) => {
				console.log('Error creating table "city"', error);
			}
		);
	});
};
