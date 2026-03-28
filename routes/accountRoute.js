const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const accController = require("../controllers/accountController")

router.get("/login", utilities.handleErrors(accController.buildLogin))
router.get("/register", utilities.handleErrors(accController.buildRegister))
router.post("/register", utilities.handleErrors(accController.registerAccount))

module.exports = router