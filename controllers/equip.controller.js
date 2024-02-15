const equipService = require("../services/equipService");

module.exports = class equip {

    static async apiGetAllequips(req, res, next) {
        try {
            const equips = await equipService.getAllequips();
            if (!equips) {
                res.status(404).json("There are no equip published yet!");
            }
            res.json(equips);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async apiGetequipById(req, res, next) {
        try {
            let id = req.params.id || {};
            const equip = await equipService.getequipbyId(id);
            res.json(equip);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    };


    
    static async apiCreateequip(req, res, next) {
        try {
            const comment = {};
            comment.Nom = req.body.Nom;
            comment.Type = req.body.Type;
            comment.AdresseIp = req.body.AdresseIp;
            comment.Emplacement = req.body.Emplacement;
            comment.Etat = req.body.Etat;
    
            const updatedequip = await equipService.createequip(comment);
            res.json(updatedequip);
    
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async apiUpdateequip(req, res, next) {
        try {
           const comment={}
    
           comment.Nom = req.body.Nom;
           comment.Type = req.body.Type;
           comment.AdresseIp = req.body.AdresseIp;
           comment.Emplacement = req.body.Emplacement;
           comment.Etat = req.body.Etat;
           
           const UpdateUser = await UserService.updatepersonneagee(comment);

           if(UpdateUser.modifiedCount === 0){
              throw new Error("Unable to create personneagee, error occord");
           }
  
           res.json(UpdateUser);
  
        } catch (error) {
           res.status(500).json({error: error});
        }
     }
    
    static async apiUpdateEquipConfig(req, res, next) {
        try {
            const equipId = req.params.id;
            const configData = req.body.config;

            const updateResponse = await equipService.updateEquipConfig(equipId, configData);

            if (updateResponse.modifiedCount === 0) {
                throw new Error("Unable to update equip configuration, error occurred");
            }

            res.json(updateResponse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async apiDeleteequip(req, res, next) {
        try {
            const equipId = req.params.id;
            const deleteResponse = await equipService.deleteequip(equipId);
            res.json(deleteResponse);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async apiGetPingHistory(req, res, next) {
        try {
            const equipId = req.params.id;
            const history = await equipService.getPingHistory(equipId);
            res.json(history);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async apiGetAlerts(req, res, next) {
      try {
          // Ajoutez ici la logique pour récupérer les alertes depuis le service
          const alerts = await equipService.getAlerts();
          res.json(alerts);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }

    static async apiScheduleAutoPings(req, res, next) {
        try {
            const equipId = req.params.id;
            const equip = await equipService.getequipbyId(equipId);

            if (!equip) {
                res.status(404).json("Equip not found");
                return;
            }

            const frequency = equip.config && equip.config.frequency ? equip.config.frequency : 60;

            const task = await equipService.scheduleAutoPings(equipId, frequency);

            res.json({ message: `Auto Pings scheduled for Equip ${equipId} with frequency ${frequency} seconds` });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async apiCollectSNMPData(req, res, next) {
        try {
            const equipId = req.params.id;
            const equip = await equipService.getequipbyId(equipId);

            if (!equip) {
                res.status(404).json("Equip not found");
                return;
            }

            const target = equip.snmpTarget;
            const oids = ['1.3.6.1.2.1.1.1.0', '1.3.6.1.2.1.1.6.0'];

            const snmpData = await equipService.collectSNMPData(equipId, target, oids);

            res.json(snmpData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}