const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")

router.get("/type/:classificationId", invController.buildByClassificationId)
router.get("/detail/:invId", invController.buildByInventoryId)
router.get("/", utilities.handleErrors(invController.buildManagement))
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))

router.post("/add-classification", utilities.handleErrors(invController.addClassification))
router.post("/add-inventory", utilities.handleErrors(invController.addInventory))

module.exports = router