const validateId = (db, tableName) => (req, res, next) => {
	const { id } = req.params;

	db(`${tableName}`)
		.where({ id })
		.first()
		.then(response => {
			response
				? (req.response = response)
				: res.status(400).json({ message: "Invalid Id" });
			next();
		})
		.catch(error =>
		res.status(500).json({ message: "Could not validate", error })
	);
};

module.exports = {
	validateId
};