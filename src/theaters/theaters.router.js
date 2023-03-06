const router = require("express").Router();
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);
//added for practice
router.route("/:theaterId").get(controller.read).all(methodNotAllowed);


module.exports = router;