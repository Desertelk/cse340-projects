const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const accController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

router.get("/login", utilities.handleErrors(accController.buildLogin))
router.get("/register", utilities.handleErrors(accController.buildRegister))
router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accController.registerAccount)
)
router.post(
    "/login",
    (req, res) => {
        res.status(200).send('login process')
    }
)

module.exports = router