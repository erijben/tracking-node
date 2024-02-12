const Ping = require("../models/Ping");

module.exports = class PingService{
    static async getAllPings(){
        try {
            const allPing = await  Ping.find();
            return allPing;
        } catch (error) {
            console.log(`Could not fetch Pings ${error}`)
        }
    }

    static async createPing(data){
        try {

            const newPing = {
                title: data.title,
                body: data.body,
                Ping_image: data.Ping_image
            }
           const response = await new Ping(newPing).save();
           return response;
        } catch (error) {
            console.log(error);
        } 

    }
    static async getPingbyId(PingId){
        try {
            const singlePingResponse =  await Ping.findById({_id: PingId});
            return singlePingResponse;
        } catch (error) {
            console.log(`Ping not found. ${error}`)
        }
    }

    static async updatePing(title, body, PingImage){
            try {
                const updateResponse =  await Ping.updateOne(
                    {title, body, PingImage}, 
                    {$set: {date: new Date.now()}});

                    return updateResponse;
            } catch (error) {
                console.log(`Could not update Ping ${error}` );

        }
    }

    static async deletePing(PingId){
        try {
            const deletedResponse = await Ping.findOneAndDelete(PingId);
            return deletedResponse;
        } catch (error) {
            console.log(`Could  ot delete Ping ${error}`);
        }

    }
}