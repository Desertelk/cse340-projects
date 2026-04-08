const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/index")
const invCont = require("../controllers/invController")

router.get("/type/:classificationId", invCont.buildByClassificationId)
router.get("/detail/:invId", invCont.buildByInventoryId)
router.get("/", utilities.handleErrors(invCont.buildManagement))
router.get("/add-inventory", utilities.handleErrors(invCont.buildAddInventory))
router.get("/add-classification", utilities.handleErrors(invCont.buildAddClassification))
router.get("/getInventory/:classification_id", utilities.handleErrors(invCont.getInventoryJSON))
router.get("/edit/:inv_id", utilities.handleErrors(invCont.buildEditInventory))

router.post("/add-classification", utilities.handleErrors(invCont.addClassification))
router.post("/add-inventory", utilities.handleErrors(invCont.addInventory))

module.exports = router