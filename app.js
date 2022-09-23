const express = require("express");
const app = express();
const cors = require("cors");
const pgp = require("pg-promise")(/* options */);

const DB_URL =
	process.env.DB_URL || "postgres://postgres:postgres@localhost:5432/bank";
const db = pgp(DB_URL);
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (_, res) => res.status(200).json({ msg: "hello world" }));
app.get("/accounts", async (_, res) => {
	try {
		const data = await db.any("SELECT * FROM accounts");
		res.status(200).json({ data });
	} catch (error) {
		res.status(500).json(error);
	}
});

app.listen(PORT, () => {
	console.log("🚀 ~ file: app.js ~ line 20 ~ app.listen ~ PORT", PORT);
});
