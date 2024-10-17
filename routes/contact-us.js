const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM ContactSubmissions", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM ContactSubmissions WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database query error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "Contact not found" });
      }

      res.json(result[0]);
    }
  );
});

router.post("/", (req, res) => {
  const { full_name, email, phone_number, message } = req.body;
  const query =
    "INSERT INTO ContactSubmissions (full_name, email, phone_number, message) VALUES (?, ?, ?, ?)";
  db.query(query, [full_name, email, phone_number, message], (err, result) => {
    if (err) throw err;
    res.json({ message: "Contact submission added!", id: result.insertId });
  });
});

router.put("/:id", (req, res) => {
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
