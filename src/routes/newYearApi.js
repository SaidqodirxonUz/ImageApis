const express = require("express");
const router = express.Router();

const { api1 } = require("../controllers/1");
const { api2 } = require("../controllers/2");
const { api3 } = require("../controllers/3");
const { api4 } = require("../controllers/4");
const { api5 } = require("../controllers/5");
const { api6 } = require("../controllers/6");
const { api7 } = require("../controllers/7");
const { ozgaramiz } = require("../controllers/ozgaramiz");

router.get("/1", api1);
router.get("/2", api2);
router.get("/3", api3);
router.get("/4", api4);
router.get("/5", api5);
router.get("/6", api6);
router.get("/7", api7);
router.get("/20", ozgaramiz);

module.exports = router;
