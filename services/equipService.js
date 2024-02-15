const equip = require("../models/equip");
const cron = require('node-cron');
const snmp = require('snmp-native');

module.exports = class equipService {
    
    static async getAllequips() {
        try {
            const allequip = await equip.find();
            return allequip;
        } catch (error) {
            console.log(`Could not fetch equips ${error}`);
        }
    }

    static async createequip(data) {
        try {
            const newequip = {
                Nom :data.Nom,
                Type :data.Type,
                AdresseIp : data.AdresseIp,
                Emplacement :data.Emplacement,
                Etat :data.Etat,

            };
            const response = await new equip(newequip).save();
            return response;
        } catch (error) {
            console.log(error);
        } 
    }

    static async updateequip(req,res,next) {
        try { 
            const data = await equip.findOneAndUpdate(
                {_id:req.body.id},
                req.body,
                {new:true}
                  
            )
                res.status(201).json(data)
       
             } catch (error) {
               console.log(error.message)
             }
          }
    static async getequipbyId(equipId) {
        try {
            const singleequipResponse = await equip.findById({ _id: equipId });
            return singleequipResponse;
        } catch (error) {
            console.log(`equip not found. ${error}`);
        }
    }
    static async getAlerts() {
        try {
            // Ajoutez ici la logique pour récupérer les alertes depuis la base de données
            const alerts = await equip.find({ /* condition pour les alertes */ });
            return alerts;
        } catch (error) {
            console.log(`Could not fetch alerts: ${error}`);
            throw error;
        }
    }
    static async getequipbyId(equipId) {
        try {
            const singleequipResponse = await equip.findById({ _id: equipId });
            return singleequipResponse;
        } catch (error) {
            console.log(`equip not found. ${error}`);
        }
    }

    static async updateequip(Nom, Type , AdresseIp , Emplacement, Etat) {
        try {
            const updateResponse = await equip.updateOne(
                {Nom, Type , AdresseIp , Emplacement, Etat}, 
                
            );
            return updateResponse;
        } catch (error) {
            console.log(`Could not update equip ${error}`);
        }
    }

    static async deleteequip(equipId) {
        try {
            const deletedResponse = await equip.findOneAndDelete(equipId);
            return deletedResponse;
        } catch (error) {
            console.log(`Could not delete equip ${error}`);
        }
    }

    static async getPingHistory(equipId) {
        try {
            const equip = await equip.findById(equipId);
            if (!equip) {
                throw new Error("Equip not found");
            }
    
            return equip.pingHistory;
        } catch (error) {
            console.error(`Could not get ping history: ${error}`);
            throw error;
        }
    }
    
    static async collectSNMPData(equipId, target, oids) {
        try {
            const session = new snmp.Session({ host: target, port: 161, community: 'public' });

            const data = await new Promise((resolve, reject) => {
                session.get({ oids }, (error, varbinds) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(varbinds);
                    }
                    session.close();
                });
            });

            // Traitez les données récupérées selon vos besoins
            console.log('SNMP Data:', data);

            return data;
        } catch (error) {
            console.error(`Could not collect SNMP data: ${error}`);
            throw error;
        }
    }

    static scheduleAutoPings(equipId, frequency) {
        try {
            const task = cron.schedule(`*/${frequency} * * * *`, async () => {
                // Vous pouvez appeler ici la logique pour lancer un ping sur l'équipement
                console.log(`Auto Ping for Equip ${equipId} executed at ${new Date()}`);
            });
    
            // Retournez la tâche planifiée pour permettre une gestion future (arrêt, modification, etc.)
            return task;
        } catch (error) {
            console.error(`Could not schedule auto pings: ${error}`);
            throw error;
        }
    }
};