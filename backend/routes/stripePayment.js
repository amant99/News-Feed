var express = require("express");
const { makepayment } = require("../controllers/stripePayment");
var router = express.Router();


router.post("/stripePayment",makepayment)



module.exports = router;