const server = require('./api/server.js')

const PORT = process.env.PORT || 5000;

server.use(PORT, () => {
	console.log(`...server listening on port ${PORT}`);
});

