const express = require("express");
const {totalRecipients, allRecipientsData, createRecipients } = require("../laptop4dev.controller/laptop4dev.controller");
 


const router = express.Router();
router.post("/Register", createRecipients);
router.get("/AllRecipientsData", allRecipientsData);
router.get("/TotalRecipients", totalRecipients);

module.exports = router;