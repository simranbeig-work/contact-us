const express = require("express");
const bodyParser = require("body-parser");
const contactUsRoutes = require("./routes/contact-us");
const dotenv = require("dotenv");
const environment = process.env.NODE_ENV || "development";

dotenv.config({ path: `.env.${environment}` });

const app = express();
app.use(bodyParser.json());

app.use("/contactus", contactUsRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
