const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const accountModel = require("../models/account-model")

/*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
validate.registrationRules = () => {
    return [
        body("account_firstname")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a first name."),

        body("account_lastname")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 2 })
            .withMessage("Please provide a last name"),
            
        body("account_email")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .normalizeEmail()
            .withMessage("A valid email is required")
            .custom(async (account_email) => {
                const emailExists = await accountModel.checkExistingEmail(account_email)
                if (emailExists){
                    throw new Error("Email exists. Please log in or use a different email")
                }
            }),

        body("account_password")
            .trim()
            .notEmpty()
            .isStrongPassword({
                minLength: 12,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
            .withMessage("Password does not meet requirements.")
    ]
}

validate.checkRegData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email } = req.body
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("account/register", {
            errors,
            title: "Registration",
            nav,
            account_firstname,
            account_lastname,
            account_email,
        })
        return
    }
    next()
}

validate.loginRules = () => {
    return [
        body("account_email")
        .isEmail()
        .withMessage("A valid email is required.")
        .normalizeEmail(),

        body("account_password")
        .notEmpty()
        .withMessage("Password is required.")
    ]
}

validate.checkLoginData = async (req, res, next) => {
    const { account_email } = req.body
    let errors = validationResult(req)

    if(!errors.isEmpty()) {
        let nav = await utilities.getNav()
        return res.render("account/login", {
            title: "Login",
            nav,
            errors,
            account_email,
        })
    }
    next()
}

validate.updateAccountRules = () => {
    return [
        body("account_firstname")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("First name is required."),
        
        body("account_lastname")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Last name is required."),

        body("account_email")
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage("Valid email required.")
            .custom(async (account_email, { req }) => {
                const account_id = req.body.account_id
                const emailExists = await accountModel.checkExistingEmail(account_email)

                if (emailExists && emailExists.account_id != account_id) {
                    throw new Error("Email already exists.")
                }
            })
    ]
}

validate.checkUpdateData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email, account_id } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()

        return res.render("account/update", {
            title: "Update Account",
            nav,
            errors,
            account_firstname,
            account_lastname,
            account_email,
            account_id
        })
    }
    next()
}

validate.updatePasswordRules = () => {
    return [
        body("account_password")
            .trim()
            .notEmpty()
            .isStrongPassword({
                minLength: 12,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
            .withMessage("Password does not meet requirements.")
    ]
}

validate.checkPasswordData = async (req, res, next) => {
    const { account_id } = req.body
    
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        let nav = await utilities.getNav()

        const accountData = await accountModel.getAccountById(account_id)

        return res.render("account/update", {
            title: "Update Account",
            nav,
            errors,
            account_id: accountData.account_id,
            account_firstname: accountData.account_firstname,
            account_lastname: accountData.account_lastname,
            account_email: accountData.account_email
        })
    }
    next()
}


module.exports = validate