const utilities = require("./index")
const validate = {}

validate.checkUpdateData = async function (req, res, next) {
    const {
        inv_id,
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
        classification_id
    } = req.body

    let errors = []

    if (!inv_make) errors.push ({ msg: "Make is required" })
    if (!inv_model) errors.push ({ msg: "Model is required" })
    if (!inv_price) errors.push ({ msg: "Price is required" })
    if (!inv_year) errors.push ({ msg: "Year is required" }) 

    if (errors.length > 0) {
        let nav = await utilities.getNav()
        const classificationSelect = await utilities.buildClassificationList(classification_id)
        const itemName = `${inv_make} ${inv_model}`

        return res.render("inventory/edit-inventory", {
            title: "Edit " + itemName,
            nav,
            errors,
            classificationSelect,
            inv_id,
            inv_make,
            inv_model,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_year,
            inv_miles,
            inv_color,
            classification_id
        })
    }
    return next()
}

module.exports = validate