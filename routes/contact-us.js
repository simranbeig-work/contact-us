const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/contactus", (req, res) => {
  db.query("SELECT * FROM ContactSubmissions", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.get("/contactus/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM ContactSubmissions WHERE id = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});

router.post("/contactus", (req, res) => {
  const { full_name, email, phone_number, message } = req.body;
  const query =
    "INSERT INTO ContactSubmissions (full_name, email, phone_number, message) VALUES (?, ?, ?, ?)";
  db.query(query, [full_name, email, phone_number, message], (err, result) => {
    if (err) throw err;
    res.json({ message: "Contact submission added!", id: result.insertId });
  });
});

router.put("/contactus/:id", (req, res) => {
  const { id } = req.params;
  const { full_name, email, phone_number, message } = req.body;
  const query =
    "UPDATE ContactSubmissions SET full_name = ?, email = ?, phone_number = ?, message = ? WHERE id = ?";
  db.query(
    query,
    [full_name, email, phone_number, message, id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Contact submission updated!" });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM ContactSubmissions WHERE id = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Contact submission deleted!" });
    }
  );
});

module.exports = router;
