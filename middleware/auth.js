const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Token checken
  if (!token)
    return res.status(401).json({
      msg: "Benutzer ist nicht berechtigt",
    });
  try {
    //Token verifizieren
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //Benutzer von payload hinzufügen
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token nicht gültig" });
  }
}

module.exports = auth;
