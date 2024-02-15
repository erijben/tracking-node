const User = require("../models/user");

module.exports = class UserService{
    static async getAllUsers(){
        try {
            const allUsers = await  User.find();
            return allUsers;
        } catch (error) {
            console.log(`Could not fetch Users ${error}`)
        }
    }

    static async createUser(data){
        try {

            const newUser = {
                username: data.username,
                email: data.email,
                number:data.number
               
            }
           const response = await new User(newUser).save();
           return response;
        } catch (error) {
            console.log(error);
        } 

    }
    static async getUserbyId(UserId){
        try {
            const singleUserResponse =  await User.findById({_id: UserId});
            return singleUserResponse;
        } catch (error) {
            console.log(`User not found. ${error}`)
        }
    }

    static async updateUser(username,email,number){
        try {
            const updateResponse =  await User.updateOne(
                {username,email,number}, 
                );

                return updateResponse;
        } catch (error) {
            console.log(`Could not update personneagee ${error}` );

    }
}

    static async deleteUser(UserId){
        try {
            const deletedResponse = await User.findOneAndDelete(UserId);
            return deletedResponse;
        } catch (error) {
            console.log(`Could  ot delete User ${error}`);
        }

    }
}