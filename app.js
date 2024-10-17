const express = require("express");
const bodyParser = require("body-parser");
const contactUsRoutes = require("./routes/contact-us");
const db = require("./config/db");

const app = express();
app.use(bodyParser.json());

app.use("/contactus", contactUsRoutes);

const startServer = () => {
  db.query("SELECT 1", (err) => {
    if (err) {
      console.error("Database connection is not established:", err);
      process.exit(1);
    } else {
      const PORT = process.env.PORT || 8080;
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    }
  });
};

startServer();
