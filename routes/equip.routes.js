const  express =  require("express");
const router = express.Router();
const equipCtrl = require("../controllers/equip.controller");


router.get("/", equipCtrl.apiGetAllequips);
router.post("/add", (req, res) => {
  console.log("POST request to add");
  equipCtrl.apiCreateequip(req, res);});
   
router.get("/equip/:id", equipCtrl.apiGetequipById);
router.put("/equip/:id", equipCtrl.apiUpdateequip);
router.delete("/equip/:id", equipCtrl.apiDeleteequip);
router.put("/equip/:id/config", equipCtrl.apiUpdateEquipConfig);
router.post("/equip/:id/scheduleAutoPings", equipCtrl.apiScheduleAutoPings);
router.get("/equip/:id/pingHistory", equipCtrl.apiGetPingHistory);
router.get("/equip/:id/collectSNMPData", equipCtrl.apiCollectSNMPData);
router.get("/equip/alerts", equipCtrl.apiGetAlerts);
module.exports =  router;