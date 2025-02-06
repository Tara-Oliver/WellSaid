import createArtworkTable from "./createArtworkTable.js";
import createCartTable from "./createCartTable.js";
import createFavoriteTable from "./createFavoriteTable.js";
import createUserTable from "./createUserTable.js";
import populateArtwork from "../scripts/populateArtwork.js";
import createOrderTable from "./createOrderTable.js";

const setupDatabase = async () => {
	await createUserTable();
	await createArtworkTable();
	await createOrderTable();
	await createCartTable();
	await createFavoriteTable();
	await populateArtwork().catch((error) =>
		console.error("Error populating artwork table:", error.message)
	);
};

setupDatabase();
