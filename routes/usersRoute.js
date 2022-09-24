const mongoose = require("mongoose")
const UserModel = mongoose.model("Users")

module.exports = (app) => {
    //A. Add new User
    /*Input User_Name Password
    Response:1.(on success)status:200 TMessage "UserAdded Sucessfully" 
             2.(on fail)status:402 Message"Username Already Exists ", Userobj
             3. (on sysytem error) status:-1 Message:err
    */
    app.post("/AddUser", async (request, response) => {
        try {
            let { User_Name, Password, Type } = request.body;
            //check if user_Name alreadyExists
            const UserObj = await UserModel.find({ User_Name });
            if (UserObj.length > 0)
                return response.send({ status: 402, Message: "Username Already Exists", newUser: UserObj })

            //else unique username
            const newUser = new UserModel({
                User_Name,
                Password,
                Type
            })
            await newUser.save()

            newUser.User_ID = newUser._id
            await newUser.save()

            return response.send({ status: 200, Message: "User Added sucessfully", newUser })
        }
        catch (error) {
            return response.send({ status: -1, Message: error })
        }
    });


    //C. Update User [Note:User_Name is unique]
    /*Given User{} with _id and attribues which we want to be update rest are left unchanged
    Response:1.(on success){ status: 200, Message: "User Updated Sucessfully", updatedUserCollection }
             2.(on fail) { status: 405, Message: "User Name already Exists" }
             3.(on fail){ status: 404, Message: "No user with this ID" }
             4. (on sysytem error){ status: -1, Message:error }
    */
    app.put("/UpdateUser", async (request, response) => {
        try {
            const { User } = request.body
            const user_NameCollection = await UserModel.find({ _id: User._id })

            if (user_NameCollection.length > 0) {
                //is User_Name Updated
                if (User.User_Name) {
                    const user_NameCollection = await UserModel.find({ User_Name: User.User_Name })
                    if (user_NameCollection.length > 0) {
                        //checkif not used by any one else
                        if (user_NameCollection[0]._id == User._id)//he repeatedsame user name =>no problem
                        {
                            const updatedUserCollection = await UserModel.findByIdAndUpdate({ _id: User._id }, { $set: User })
                            return response.send({ status: 200, Message: "User Updated Sucessfully", updatedUserCollection })
                        }
                        else {
                            //this user name is used by another user
                            return response.send({ status: 405, Message: "User Name already Exists" })
                        }
                    }
                    else {
                        //new user name==> add directly
                        const updatedUserCollection = await UserModel.findByIdAndUpdate({ _id: User._id }, { $set: User })
                        return response.send({ status: 200, Message: "User Updated Sucessfully", updatedUserCollection })
                    }
                }
                else {
                    //no change in user Name ==>update direclty
                    const updatedUserCollection = await UserModel.findByIdAndUpdate({ _id: User._id }, { $set: User })
                    return response.send({ status: 200, Message: "User Updated Sucessfully", updatedUserCollection })
                }
            }
            else {
                return response.send({ status: 404, Message: "No user with this ID" })
            }
        }
        catch (error) {
            return response.send({ status: -1, Message:error })
        }
    });

};