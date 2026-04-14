const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const accController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')
const validate = require("../utilities/account-validation")

router.get("/login", utilities.handleErrors(accController.buildLogin))
router.get("/register", utilities.handleErrors(accController.buildRegister))
router.get("/", utilities.checkLogin, utilities.handleErrors(accController.buildAccountManagement))
router.get("/update/:account_id", utilities.checkLogin, utilities.handleErrors(accController.buildUpdateView))
router.get("/logout", utilities.handleErrors(accController.logout))
router.get("/admin", utilities.checkLogin, utilities.checkAdmin, utilities.handleErrors(accController.buildAdminView))
router.get("/getAccounts", utilities.checkLogin, utilities.checkAdmin, utilities.handleErrors(accController.getAccountsJSON))


router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accController.registerAccount)
)
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accController.accountLogin)
)

router.post(
    "/update",
    validate.updateAccountRules(),
    validate.checkUpdateData,
    utilities.handleErrors(accController.updateAccount)
)

router.post("/update-password",
    validate.updatePasswordRules(),
    validate.checkPasswordData,
    utilities.handleErrors(accController.updatePassword)
)

router.post("/update-role",
    utilities.checkLogin,
    utilities.checkAdmin,
    utilities.handleErrors(accController.updateAccountRole)
)

module.exports = router