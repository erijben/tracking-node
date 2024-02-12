const  express =  require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");


router.get("/", userCtrl.apiGetAllusers);
router.post("/", userCtrl.apiCreateuser);
router.get("/user/:id", userCtrl.apiGetuserById);
router.put("/user/:id", userCtrl.apiUpdateuser);
router.delete("/user/:id", userCtrl.apiDeleteuser);

module.exports =  router;