const mongoose = require("mongoose")
const UserModel = mongoose.model("Users")

const bcrypt = require("bcrypt")
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
            const salt = await bcrypt.genSalt(10)
            Password = await bcrypt.hash(Password, salt);
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

    //B.Login
    /*Input User_Name Password
    Response:1.(on success)status:200 Type:student-Student-admin  User_ID 
             2.(on fail)status:404 Message"Username or password is wrong"
             3.(on system fail):{ status: -1, Message: error }
    */
    app.get('/Login/:User_Name/:Password', async (request, response) => {
        try {
            const User_Name = request.params.User_Name
            const Password = request.params.Password

            //go to DB and chek for this 
            const UserCollection = await UserModel.findOne({ User_Name })
            if (UserCollection) {
                const ValidPassword = await bcrypt.compare(Password, UserCollection.Password)
                if (ValidPassword)
                    return response.send({ status: 200, Type: UserCollection.Type, User_ID: UserCollection.User_ID })
                return response.send({ status: 404, Message: "Password is Wrong" })
            }
            return response.send({ status: 404, Message: "UserName is Wrong" })
        }
        catch (error) {
            return response.send({ status: -1, Message: error })
        }
    });

    //C. Update User [Note:User_Name is unique]
    /*Given User{} with _id and attribues which we want to be update rest are left unchanged
    Response:1.(on success){ status: 200, Message: "User Updated Sucessfully", updatedUser/Collection }
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
                            if (User.Password) {
                                const salt = await bcrypt.genSalt(10)
                                User.Password = await bcrypt.hash(User.Password, salt);
                            }
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
                        if (User.Password) {
                            const salt = await bcrypt.genSalt(10)
                            User.Password = await bcrypt.hash(User.Password, salt);
                        }
                        const updatedUserCollection = await UserModel.findByIdAndUpdate({ _id: User._id }, { $set: User })
                        return response.send({ status: 200, Message: "User Updated Sucessfully", updatedUserCollection })
                    }
                }
                else {
                    //no change in user Name ==>update direclty
                    if (User.Password) {
                        const salt = await bcrypt.genSalt(10)
                        User.Password = await bcrypt.hash(User.Password, salt);
                    }
                    const updatedUserCollection = await UserModel.findByIdAndUpdate({ _id: User._id }, { $set: User })
                    return response.send({ status: 200, Message: "User Updated Sucessfully", updatedUserCollection })
                }
            }
            else {
                return response.send({ status: 404, Message: "No user with this ID" })
            }
        }
        catch (error) {
            return response.send({ status: -1, Message: error })
        }
    });

    //D.Find user by ID
    /*Input:Id of User
    response:(on fail):status:-1 Message:error
             (on Sucess): status:200 UserObj 
             (ID not found) status:404 Message:"User Not Found"
    */
    app.get("/FindUserByID/:ID", async (request, response) => {
        try {
            const ID = request.params.ID;
            const UserObj = await UserModel.find({ _id: ID })
            if (UserObj.length > 0)
                return response.send({ status: 200, UserObj })
            return response.send({ status: 404, Message: "User Not Found" })
        }
        catch (error) {
            return response.send({ status: -1, Message: error })
        }
    });

    //E. Delete User
    /**input Id of user
     * response: -(on fail):{status:404,Message:"No user Found with this iD"}
     *           -(on success):{status:200,Message:"User Deleted Sucessfully"}
     *           -(on sys fail):{status: -1, Message: error }
    */
    app.post('/DeleteUser', async (request, response) => {
        try {
            let { ID } = request.body;
            const DeletedObj = await UserModel.deleteOne({ _id: ID })

            if (DeletedObj.deletedCount > 0)
                return response.send({ status: 200, Message: "User Deleted Sucessfully" })

            return response.send({ status: 404, Message: "No user Found with this iD" })
        }
        catch (error) {
            return response.send({ status: -1, Message: error })
        }
    });


    //F. Reset User Password [Note:User_Name is unique]
    /*Given User_Name
    Response:1.(on success):{ status: 200, Message: "User Updated Sucessfully" }
             2.(on fail):{ status: 404, Message: "User_Name doesn't exist" }
             3. (on sysytem error){ status: -1, Message: error }
    */
    app.put("/ResetUser", async (request, response) => {
        try {
            const { User_Name } = request.body
            const user_NameCollection = await UserModel.find({ User_Name })
            // return response.send(user_NameCollection)
            if (user_NameCollection.length <= 0)
                return response.send({ status: 404, Message: "User_Name doesn't exist" })

            const salt = await bcrypt.genSalt(10)
            const Password = await bcrypt.hash("0000", salt);
            await UserModel.findByIdAndUpdate({ _id: user_NameCollection[0]._id }, { $set: { Password: Password } })

            return response.send({ status: 200, Message: "User Updated Sucessfully" })
        }
        catch (error) {
            return response.send({ status: -1, Message: error })
        }
    });

};