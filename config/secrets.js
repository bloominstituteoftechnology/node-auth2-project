if (!process.env.JWT_SECRET) {
    console.log("NO JWT SECRET");
}

module.exports = {
    jwtSecret: process.env.JWT_SECRET || "not secure"
}
