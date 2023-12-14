const Express = require("express");
const BodyParser = require("body-parser");

const Router = require("./routes");

const app = Express();

// To access json body from api request.
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

// Routes assigned from routes file.
app.use(Router);

// Server defined on port 5000.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
