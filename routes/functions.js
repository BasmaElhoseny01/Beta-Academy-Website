const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const StudentModel = mongoose.model("Students");
const InstrctorModel = mongoose.model("Instructors")
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
            Password:Password,
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
        return { status: -1, Message: error }
    }
}


const UnAssignWorkShop = async (WorkShopID, InstructorID) => {
    try {
        // let { WorkShopID, InstructorID } = request.body
        const WorkShopObj = await WorkShopModel.findById({ _id: WorkShopID })
        if (WorkShopObj == null)
            return { status: 404, Message: "No WorkShop with this ID" }
        const OldInstructor = WorkShopObj.Instructor_ID
        if (OldInstructor != -1) {
            //there is old
            //1.Remove This Work Shop from this Old Instructor's Workshops
            const InstructorObj = await InstrctorModel.findOneAndUpdate({ _id: OldInstructor }, { $pull: { WorkShops: WorkShopObj._id } })
            if (InstructorObj == null)
                return { status: 404, Message: "No Old Instructor with this ID" }
        }
        //2.Add this WorkShop to the New instructor
        if (InstructorID != "-1") {
            //there is a new instructor
            //3.add this work Shop to this New Instructor Workshops Array
            const InstructorQuery = await InstrctorModel.updateOne({ _id: InstructorID }, { $addToSet: { WorkShops: WorkShopObj._id } })
            
            if (InstructorQuery.matchedCount <= 0)
                return { status: 404, Message: "No Insrtuctor with this id" }

            if (InstructorQuery.modifiedCount <= 0)
                return { status: 200, Message: "This Instructor already has this work shop" }
        }
        //4.Update the Instructor_ID in the workshop with the InstructorID
        const WorkShopQuery = await WorkShopModel.updateOne({ _id: WorkShopID }, { $set: { Instructor_ID: InstructorID } })

        if (WorkShopQuery.matchedCount <= 0)
            return { status: 404, Message: "No WorkShop with this id" }
        if (WorkShopQuery.modifiedCount <= 0)
            return { status: 200, Message: "This WorkShop already has this Instructor" }

        return { status: 200, Message: "WorkShop Instructor Updated sucessfully" }
    }
    catch (error) {
        return { status: -1, Message: error }
    }
}

module.exports = {
    addUserFunction: addUserFunction,
    UpdateUserFunction: UpdateUserFunction,
    UnAssignWorkShop:UnAssignWorkShop
}