const mongoose = require("mongoose");
const StudentModel = mongoose.model("Students");
const UserModel = mongoose.model("Users");
const WorkShopModel = mongoose.model("WorkShops");

const addUserFunction = async (User_Name, Password, Type) => {
    try {

        const UserObj = await UserModel.find({ User_Name });

        if (UserObj.length > 0)
            return ({ status: 402, Message: "Username Already Exists", newUser: UserObj })

        //else unique username
        if (Password) {
            const salt = await bcrypt.genSalt(10)
            Password = await bcrypt.hash(Password, salt);
        }
        const newUser = new UserModel({
            User_Name,
            Password,
            Type: Type
        })
        await newUser.save()

        newUser.User_ID = newUser._id
        await newUser.save()
        return ({ status: 200, Message: "User Added sucessfully", newUser })
    }
    catch (error) {
        return ({ status: -1, Message: error })
    }
}

const UpdateUserFunction = async (User) => {
    try {
        // const { User } = request.body
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
                        return { status: 200, Message: "User Updated Sucessfully", updatedUserCollection }
                    }
                    else {
                        //this user name is used by another user
                        return { status: 405, Message: "User Name already Exists" }
                    }
                }
                else {
                    //new user name==> add directly
                    if (User.Password) {
                        const salt = await bcrypt.genSalt(10)
                        User.Password = await bcrypt.hash(User.Password, salt);
                    }
                    const updatedUserCollection = await UserModel.findByIdAndUpdate({ _id: User._id }, { $set: User })
                    return { status: 200, Message: "User Updated Sucessfully", updatedUserCollection }
                }
            }
            else {
                //no change in user Name ==>update direclty
                if (User.Password) {
                    const salt = await bcrypt.genSalt(10)
                    User.Password = await bcrypt.hash(User.Password, salt);
                }
                const updatedUserCollection = await UserModel.findByIdAndUpdate({ _id: User._id }, { $set: User })
                return { status: 200, Message: "User Updated Sucessfully", updatedUserCollection }
            }
        }
        else {
            return { status: 404, Message: "No user with this ID" }
        }
    }
    catch (error) {
        return response.send({ status: -1, Message: error })
    }
}


module.exports={
    addUserFunction:addUserFunction,
    UpdateUserFunction:UpdateUserFunction

}