const mongoose = require("mongoose")

const UserModel = mongoose.model("Users")


module.exports = (app) => {
    //A.Retrieve all admins
    /*Input:None
    response:(on fail) {status:-1,Message:error}
             (on sucess) {status:200, AdminsObj}
     */

    app.get('/allAdmins', async (request, response) => {
        try {
          const AdminsObj=await UserModel.find({ Type: "Admin" })
          response.send({ status: 200, AdminsObj })
        }
        catch (error) {
            response.send({ status: -1, Message: error })
        }
    });

};