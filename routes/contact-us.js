const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const offset = (page - 1) * limit;

  const sql = `SELECT * FROM ContactSubmissions LIMIT ${limit} OFFSET ${offset}`;

  db.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to fetch contact submissions" });
    }

    res.json({
      page: page,
      limit: limit,
      results: results,
    });
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

  // Check if the email already exists
  const checkEmailQuery = "SELECT * FROM ContactSubmissions WHERE email = ?";

  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to check email existence" });
    }

    // If email exists, return an error
    if (results.length > 0) {
      return res.status(400).json({ error: "Email is already registered!" });
    }

    //  If email doesn't exist, insert the new contact submission
    const insertQuery =
      "INSERT INTO ContactSubmissions (full_name, email, phone_number, message) VALUES (?, ?, ?, ?)";

    db.query(
      insertQuery,
      [full_name, email, phone_number, message],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Failed to add contact submission" });
        }
        res.json({ message: "Contact submission added!", id: result.insertId });
      }
    );
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { full_name, email, phone_number, message } = req.body;

  // Check if the record exists and get the current email
  const getEmailQuery = "SELECT email FROM ContactSubmissions WHERE id = ?";
  db.query(getEmailQuery, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to fetch contact submission" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Contact submission not found!" });
    }

    const currentEmail = results[0].email;

    // If the email in the request is the same as the current email, proceed with the update
    if (email === currentEmail) {
      // Update only the non-email fields
      const updateQuery =
        "UPDATE ContactSubmissions SET full_name = ?, phone_number = ?, message = ? WHERE id = ?";
      db.query(
        updateQuery,
        [full_name, phone_number, message, id],
        (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "Failed to update contact submission" });
          }

          res.json({ message: "Contact submission updated successfully!" });
        }
      );
    } else {
      // If the email is different, check for duplicates
      const checkEmailQuery =
        "SELECT * FROM ContactSubmissions WHERE email = ?";
      db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Failed to check for email duplicates" });
        }

        if (results.length > 0) {
          return res.status(400).json({
            error: "Email is already registered with another contact!",
          });
        }

        // If no duplicates are found, proceed with the full update
        const updateQuery =
          "UPDATE ContactSubmissions SET full_name = ?, email = ?, phone_number = ?, message = ? WHERE id = ?";
        db.query(
          updateQuery,
          [full_name, email, phone_number, message, id],
          (err, result) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "Failed to update contact submission" });
            }

            res.json({ message: "Contact submission updated successfully!" });
          }
        );
      });
    }
  });
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
