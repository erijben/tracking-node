const UserService = require("../services/userService");

module.exports = class User{

   static async apiGetAllUsers(req, res, next){
       try {
         const Users = await UserService.getAllUsers();
         if(!Users){
            res.status(404).json("There are no User published yet!")
         }
         res.json(Users);
       } catch (error) {
          res.status(500).json({error: error})
       }

   }

   static async apiGetUserById(req, res, next){
      try {
         let id = req.params.id || {};
         const User = await UserService.getUserbyId(id);
         res.json(User);
      } catch (error) {
         res.status(500).json({error: error})
      }
   }

   static async apiCreateUser(req, res, next) {
      try {
          const { username, email, number } = req.body;
  
          // Check if required fields are present
          if (!username || !email || !number) {
              return res.status(400).json({ error: "Missing required fields." });
          }
  
          const createdUser = await UserService.createUser({ username, email, number});
          console.log("User created:", createdUser); // Ajoutez cette ligne
  
          res.json(createdUser);
      } catch (error) {
          console.error('Error creating user:', error); // Ajoutez cette ligne
          res.status(500).json({ error: error.message });
      }
  }
   static async apiUpdateUser(req, res, next){
      try {
         const comment = {}
         comment.username     = req.body.username;
         comment.email        = req.body.email;
         comment.number  = req.body.number

         const updatedUser = await UserService.updateUser(comment);

         if(updatedUser.modifiedCount === 0){
            throw new Error("Unable to update User, error occord");
         }

         res.json(updatedUser);

      } catch (error) {
         res.status(500).json({error: error});
      }
   }

   static async apiDeleteUser(req, res, next){
         try {
            const UserId = req.params.id;
            const deleteResponse =  await UserService.deleteUser(UserId)
            res.json(deleteResponse);
         } catch (error) {
            res.status(500).json({error: error})
         }
   }

}
