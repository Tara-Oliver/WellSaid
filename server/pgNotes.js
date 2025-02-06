// (async () => {
// 	try {
// 		await pool.query(
// 			"ALTER TABLE cart RENAME COLUMN poster_name TO artwork_name;"
// 		);
// 		console.log("Column isFavorited removed successfully.");
// 	} catch (error) {
// 		console.error("Error removing column:", error.message);
// 	}
// })();

// (async () => {
// 	try {
// 		await pool.query(
// 			"ALTER TABLE artwork ALTER COLUMN id TYPE UUID USING (gen_random_uuid())"
// 		);
// 		console.log("id is updated successfully.");
// 	} catch (error) {
// 		console.error("Error updating column:", error.message);
// 	} finally {
// 		pool.end();
// 	}
// })();

// (async () => {
// 	try {
// 		await pool.query(
// 			"ALTER TABLE artwork ADD COLUMN id UUID DEFAULT gen_random_uuid() PRIMARY KEY;"
// 		);
// 		console.log("id is updated successfully.");
// 	} catch (error) {
// 		console.error("Error updating column:", error.message);
// 	} finally {
// 		pool.end();
// 	}
// })();

// DELETE A TABLE

// (async () => {
// 	try {
// 		await pool.query("DROP TABLE orders");
// 		console.log("updated successfully.");
// 	} catch (error) {
// 		console.error("Error updating table:", error.message);
// 	}
// })();

// REMOVE ALL ROWS FROM TABLE

// (async () => {
// 	try {
// 		await pool.query("TRUNCATE TABLE orders");
// 		console.log("updated successfully.");
// 	} catch (error) {
// 		console.error("Error updating table:", error.message);
// 	}
// })();

// UPDATE ROW OF FROM TABLE

// (async () => {
// 	try {
// 		await pool.query(
// 			"UPDATE artwork SET kind = 'Dramatic' WHERE kind = 'Drama';"
// 		);
// 		console.log("updated successfully.");
// 	} catch (error) {
// 		console.error("Error updating table:", error.message);
// 	}
// })();

// ADD CONSTRAINT suppliers_pk
//     PRIMARY KEY (supplier_id);

// const viewUsersSchema = async () => {
// 	try {
// 		const result = await pool.query(`
//       SELECT column_name, data_type, is_nullable, column_default
//       FROM information_schema.columns
//       WHERE table_name = 'cart';
//     `);
// 		console.log(result.rows); // Logs schema details for the users table
// 	} catch (error) {
// 		console.error("Error viewing users schema:", error.message);
// 	}
// };

// viewUsersSchema();

// (async () => {
// 	try {
// 		const result = await pool.query(`
//       SELECT * FROM artwork WHERE artwork_id = '963dee83-d252-4263-810b-29b7e4f6525a'`);
// 		console.log(result.rows); // Logs schema details for the users table
// 	} catch (error) {
// 		console.error("Error", error.message);
// 	}
// })();

// ;

// const newImagesArray = [
// 	{
// 		frame_color: "gold",
// 		src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977028/Cocktails_Gold_wu8vje.png",
// 	},
// 	{
// 		frame_color: "white",
// 		src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977029/Cocktails_White_f1d6rm.png",
// 	},
// 	{
// 		frame_color: "natural",
// 		src: "https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977028/Cocktails_Natural_k3vkac.png",
// 	},
// ];
// const artworkId = "963dee83-d252-4263-810b-29b7e4f6525a";

// const result = await pool.query(
// 	"UPDATE artwork SET images = $1 WHERE artwork_id = $2",
// 	[newImagesArray, artworkId]
// );

// console.log(`Rows affected: ${result.rowCount}`);
