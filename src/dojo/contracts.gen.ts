import { DojoProvider, DojoCall } from "@dojoengine/core";
import { Account, AccountInterface } from "starknet";

export function setupWorld(provider: DojoProvider) {

	const build_game_createPlayer_calldata = (player_id: string): DojoCall => {
		return {
			contractName: "game",
			entrypoint: "create_player",
			calldata: [player_id],
		};
	};

	const game_createPlayer = async (snAccount: Account | AccountInterface, player_id: string) => {
		try {
			return await provider.execute(
				snAccount as any,
				build_game_createPlayer_calldata(player_id),
				"full_starter_react",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_updateAttributes_calldata = (
		player_id: string,
		fame: number,
		charisma: number,
		stamina: number,
		intelligence: number,
		leadership: number
	): DojoCall => {
		return {
			contractName: "game",
			entrypoint: "update_attributes",
			calldata: [player_id, fame.toString(), charisma.toString(), stamina.toString(), intelligence.toString(), leadership.toString()],
		};
	};

	const game_updateAttributes = async (
		snAccount: Account | AccountInterface,
		player_id: string,
		fame: number,
		charisma: number,
		stamina: number,
		intelligence: number,
		leadership: number
	) => {
		try {
			return await provider.execute(
				snAccount as any,
				build_game_updateAttributes_calldata(player_id, fame, charisma, stamina, intelligence, leadership),
				"full_starter_react",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_addCurrency_calldata = (player_id: string, amount: string): DojoCall => {
		return {
			contractName: "game",
			entrypoint: "add_currency",
			calldata: [player_id, amount],
		};
	};

	const game_addCurrency = async (snAccount: Account | AccountInterface, player_id: string, amount: string) => {
		try {
			return await provider.execute(
				snAccount as any,
				build_game_addCurrency_calldata(player_id, amount),
				"full_starter_react",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_spendCurrency_calldata = (player_id: string, amount: string): DojoCall => {
		return {
			contractName: "game",
			entrypoint: "spend_currency",
			calldata: [player_id, amount],
		};
	};

	const game_spendCurrency = async (snAccount: Account | AccountInterface, player_id: string, amount: string) => {
		try {
			return await provider.execute(
				snAccount as any,
				build_game_spendCurrency_calldata(player_id, amount),
				"full_starter_react",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_recordLogin_calldata = (player_id: string): DojoCall => {
		return {
			contractName: "game",
			entrypoint: "record_login",
			calldata: [player_id],
		};
	};

	const game_recordLogin = async (snAccount: Account | AccountInterface, player_id: string) => {
		try {
			return await provider.execute(
				snAccount as any,
				build_game_recordLogin_calldata(player_id),
				"full_starter_react",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	return {
		game: {
			createPlayer: game_createPlayer,
			buildCreatePlayerCalldata: build_game_createPlayer_calldata,
			updateAttributes: game_updateAttributes,
			buildUpdateAttributesCalldata: build_game_updateAttributes_calldata,
			addCurrency: game_addCurrency,
			buildAddCurrencyCalldata: build_game_addCurrency_calldata,
			spendCurrency: game_spendCurrency,
			buildSpendCurrencyCalldata: build_game_spendCurrency_calldata,
			recordLogin: game_recordLogin,
			buildRecordLoginCalldata: build_game_recordLogin_calldata,
		},
	};
}