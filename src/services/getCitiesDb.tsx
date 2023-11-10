import * as SQLite from "expo-sqlite";

export const getCitiesDb = (cb: any): any => {
	const db = SQLite.openDatabase("weather.db");

	db.transaction((tx: any) => {
		tx.executeSql(
			"SELECT * FROM city;",
			[],
			(_: any, result: any) => {
				const rows: SQLite.SQLResultSetRowList = result.rows;
				let data: { id: number; key: string; name: string }[] = []; // or your specific type
				for (let i = 0; i < rows.length; i++) {
					data.push(rows.item(i));
				}
				console.log("All todos:", data);

				cb(data);
			},
			(_: any, error: any) => {
				console.log("Error fetching todos:", error);
			}
		);
	});
};
