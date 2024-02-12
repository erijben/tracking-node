const PingService = require("../services/PingService");

module.exports = class Ping{

   static async apiGetAllPings(req, res, next){
      console.log('ping ok');
       try {
         const Pings = await PingService.getAllPings();
         if(!Pings){
            res.status(404).json("There are no Ping published yet!")
         }
         res.json(Pings);
        
       } catch (error) {
          res.status(500).json({error: error})
       }

   }

   static async apiGetPingById(req, res, next){
      try {
         let id = req.params.id || {};
         const Ping = await PingService.getPingbyId(id);
         res.json(Ping);
      } catch (error) {
         res.status(500).json({error: error})
      }
   }

   //static async apiCreatePing(req, res, next){
    //  try {
        // const createdPing =  await PingService.createPing(req.body);
        // res.json(createdPing);
      //} catch (error) {
       //  res.status(500).json({error: error});
      //}
   //}
   
   static async apiCreatePing(req, res, next){
      try {
         const comment = {}
         comment.title        = req.body.title;
         comment.body         = req.body.body;
         comment.PingImage = req.body.Ping_image

         const updatedPing = await PingService.createPing(comment);
         res.json(updatedPing);

      } catch (error) {
         res.status(500).json({error: error});
      }
   }
   static async apiUpdatePing(req, res, next){
      try {
         const comment = {}
         comment.title        = req.body.title;
         comment.body         = req.body.body;
         comment.PingImage = req.body.Ping_image

         const updatedPing = await PingService.updatePing(comment);

         if(updatedPing.modifiedCount === 0){
            throw new Error("Unable to update Ping, error occord");
         }

         res.json(updatedPing);

      } catch (error) {
         res.status(500).json({error: error});
      }
   }

   static async apiDeletePing(req, res, next){
         try {
            const PingId = req.params.id;
            const deleteResponse =  await PingService.deletePing(PingId)
            res.json(deleteResponse);
         } catch (error) {
            res.status(500).json({error: error})
         }
   }

}