declare interface CitySuggestion {
	Version: string;
	Key: string;
	Type: string;
	Rank: number;
	LocalizedName: string;
	Country: {
		ID: string;
		LocalizedName: string;
	};
	AdministrativeArea: {
		ID: string;
		LocalizedName: string;
	};
}

declare interface CityForecast {
	Headline: {
		EffectiveDate: stirng;
		EffectiveEpochDate: number;
		Severity: number;
		Text: string;
		Category: string;
		EndDate: string;
		EndEpochDate: number;
		MobileLink: string;
		Link: string;
	};
	DailyForecasts: [
		{
			Date: string;
			EpochDate: number;
			Temperature: {
				Minimum: {
					Value: number;
					Unit: string;
					UnitType: number;
				};
				Maximum: {
					Value: number;
					Unit: string;
					UnitType: number;
				};
			};
			Day: {
				Icon: number;
				IconPhrase: string;
				HasPrecipitation: boolean;
				PrecipitationType: string;
				PrecipitationIntensity: string;
			};
			Night: {
				Icon: number;
				IconPhrase: string;
				HasPrecipitation: boolean;
			};
			Sources: [string];
			MobileLink: string;
			Link: string;
		}
	];
}
