const invModel = require("../models/inventory-model")
const utilities = require("../utilities")
const invCont = {}


invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

invCont.buildByInventoryId = async function (req, res, next){
    try {
        const inv_id = req.params.invId
        const data = await invModel.getInventoryById(inv_id)
        const nav = await utilities.getNav()
        const vehicleHTML = await utilities.buildVehicleDetail(data)

        const name = `${data.inv_make} ${data.inv_model}`

        res.render("inventory/detail", {
            title: name,
            nav,
            vehicleHTML,
        })
    } catch (error){
        next(error)
    }
}

invCont.buildManagement = async function (req, res, next){
    let nav = await utilities.getNav()
    res.render("inventory/management", {
        title: "Inventory Management",
        nav,
    })
}

invCont.buildAddInventory = async function (req, res, next){
    let nav = await utilities.getNav()
    const classificationList = await utilities.buildClassificationList()

    res.render("inventory/add-inventory", {
        title: "Add New Inventory Item",
        nav,
        classificationList,
    })
}

invCont.addInventory = async function (req, res, next) {
    let nav = await utilities.getNav()
    const classificationList = await utilities.buildClassificationList(req.body.classification_id)

    const {
        classification_id,
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color
    } = req.body

    const result = await invModel.addInventory(
        classification_id,
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color
    )

    if(result) {
        req.flash("notice", "Inventory item added successfully.")
        res.status(201).render("inventory/management", {
            title: "Inventory Management",
            nav,
        })
    } else {
        req.flash("notice", "Failed to add inventory item.")
        res.status(501).render("inventory/add-inventory", {
            title: "Add New Inventory Item",
            nav,
            classificationList,
            ...req.body
        })
    }
}

invCont.buildAddClassification = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
        title: "Add New Classification",
        nav,
    })
}

invCont.addClassification = async function (req, res, next) {
    let nav = await utilities.getNav()
    const { classification_name } = req.body

    const result = await invModel.addClassification(classification_name)

    if (result) {
        req.flash("notice", `Classification "${classification_name}" added successfully.`)

        nav = await utilities.getNav()

        res.status(201).render("inventory/management", {
            title: "Inventory Management",
            nav,
        }) 
    } else {
        req.flash("notice", "Failed to add classification.")
        res.status(501).render("inventory/add-classification", {
            title: "Add New Classification",
            nav,
        })
    }
}


module.exports = invCont