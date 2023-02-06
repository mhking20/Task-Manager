const express = require("express");

const router = express.Router();

const {getalltask , posttask , deletetask , patchtask , deletealltask} = require("../components/components")

router.route("/").get(getalltask).post(posttask).delete(deletealltask);
router.route("/:id").delete(deletetask).patch(patchtask)

module.exports = router