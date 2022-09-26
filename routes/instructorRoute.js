const mongoose = require("mongoose")
const axios = require("axios")

const InstrctorModel = mongoose.model("Instructors")
const UserModel = mongoose.model("Users")
const WorkShopModel = mongoose.model("WorkShops")
const StudentModel = mongoose.model("Students")

const lib = require('./functions')

module.exports = (app) => {
    //A.Add instructor
    /*Input [Name, Mobile, Email, Study, Salary, User_Name] 
    Response: 1. (on fail)status: 402, Message: "Username Already Exists" 
              2. (on fail)status: 402, Message: "Instructor Name Already Exists" 
              3. (on fail)status: 402, Message: "Error Happend in Last Step" 

              4. (on fail)status 402 Message"Username Already Exists ", Userobj [From Add user]
              5. (on fail)status:-1 Message:error [From Add user]

             6.(on System error)status:-1  Message:error
             7.(on sucess) { status: 200, Message: "Instructor Added Sucessfully" }
    */
    app.post("/AddInstructor", async (request, response) => {
        try {
            let { Name, Mobile, Email, Study, Salary, User_Name } = request.body;

            //check if user_Name alreadyExists
            const UserObj = await UserModel.find({ User_Name })
            if (UserObj.length > 0) {
                return response.send({ status: 402, Message: "Username Already Exists" })
            }

            //Check if the Name of the Instructor already exists
            const InstructorObj = await InstrctorModel.find({ Name })
            if (InstructorObj.length > 0)
                return response.send({ status: 402, Message: "Instructor Name Already Exists" })
            //else unique 
            // await axios.post("http://localhost:5000/AddUser", { User_Name, Password: "0000", Type: "Instructor" }).then(async (APIresponse) => {
            //     if (APIresponse.data.status != 200) {
            //         return response.send(APIresponse.data)
            //     }
            ///////////////////here
            let newUser;
            let res =await  lib.addUserFunction(User_Name,"0000", "Instructor");
             if (res.status != 200) {
                return response.send(res)
            }
            else {
                newUser = res.newUser;
            }

            //2.Add Instructor
            const newInstructor = new InstrctorModel({
                Name,
                Mobile,
                Email,
                Study,
                Salary,
                User_ID: newUser._id
            })
            await newInstructor.save()

            //3.Update User with the new aaded row id
            const updateduserCollection = await UserModel.updateOne({ _id: newUser._id }, { $set: { User_ID: newInstructor._id } })
            if (updateduserCollection.modifiedCount > 0) {
                return response.send({ status: 200, Message: "Instructor Added Sucessfully" })
            }
            return response.send({ status: 402, Message: "Error Happend in Last Step" })
            // })
        }
        catch (error) {
            return response.send({ status: -1, Message: error })
        }
    });


    //B.Find instructor by ID
    /*Input Instructor ID
    Response:1.(on success)status:200  InstructorObj UserObj
             2.(on fail)status:404 Message"User or Instructor Not found"
             3.(on System error)status:-1  Message:err
    */
    app.get("/FindInstructorByID/:ID", async (request, response) => {
        try {
            const ID = request.params.ID;

            const InstructorObj = await InstrctorModel.find({ _id: ID })
            if (InstructorObj.length > 0) {
                //get User
                const UserObj = await UserModel.find({ _id: InstructorObj[0].User_ID })
                if (UserObj.length > 0) {
                    return response.send({ status: 200, InstructorObj, UserObj })
                }
                return response.send({ status: 404, Message: "User Not Found" })
            }
            return response.send({ status: 404, Message: "Instructor Not Found" })
        }
        catch (err) {
            return response.send({ status: -1, Message: err })
        }
    });

    //C.Update Instructor
    /*Input  User{} and Instructor{} with for both _id and attribues which we want to be update rest are left unchanged
     Response:1.(on success){ status: 200, Message: "Instructor Updated Sucessfully" }
              2.(on sucess){ status: 405, Message: "Instructor Name already Exists" }
              3.(on fail){ status: 404, Message: "No Instructor with this ID" }
              4.(on fail) Update User responses 
              5.(on System error){ status: -1, Message:error }
     */
    app.put("/UpdateInstructor", async (request, response) => {
        try {
            const { Instructor, User } = request.body

            const Instructor_Collection = await InstrctorModel.find({ _id: Instructor._id })
            if (Instructor_Collection.length <= 0) {
                return response.send({ status: 404, Message: "No Instructor with this ID" })
            }

            // await axios.put("http://localhost:5000/UpdateUser", { User }).then(async (res) => {
            let res = await lib.UpdateUserFunction(User);
            if (res.status != 200) {
                return response.send(res)
            }
            else {
                const updatedUserCollection = res.updatedUserCollection
                if (Instructor.Name) {
                    const NameInstructorCollection = await InstrctorModel.find({ Name: Instructor.Name })
                    if (NameInstructorCollection.length > 0) {
                        if (Instructor._id == NameInstructorCollection[0]._id) {
                            //he uses his old name no problem
                            const updatedInsrtuctorCollection = await InstrctorModel.findByIdAndUpdate({ _id: Instructor._id }, { $set: Instructor })
                            return response.send({ status: 200, Message: "Instructor Updated Sucessfully" })
                        }
                        else {
                            return response.send({ status: 405, Message: "Instructor Name already Exists" })
                        }
                    }
                    else {
                        //completey new Name
                        const updatedInsrtuctorCollection = await InstrctorModel.findByIdAndUpdate({ _id: Instructor._id }, { $set: Instructor })
                        return response.send({ status: 200, Message: "Instructor Updated Sucessfully" })
                    }
                }
                else {
                    //No change in name update directly
                    const updatedInsrtuctorCollection = await InstrctorModel.findByIdAndUpdate({ _id: Instructor._id }, { $set: Instructor })
                    return response.send({ status: 200, Message: "Instructor Updated Sucessfully" })
                }
            }
            // });
        }
        catch (error) {
            return response.send({ status: -1, Message: error })
        }
    });


    //D.Retrieve all instructors
    /*
    input None
    Response:1.(on success)Array of Josns Workhops
             2.(on system fail) { status: -1, Message: error }
    */
    app.get("/FindInstructors", async (request, response) => {
        try {

            const InstructorsObj = await InstrctorModel.find({}).sort({ Name: 1 });
            return response.json(InstructorsObj)
        }
        catch (error) {
            return response.send({ status: -1, Message: error })
        }
    })


    //D.Delete Instructor
    /**input Id of Instructor
     * response: -(on fail):{status:404,Message:"No Instructor with this ID"}
     *           -(on fail):{ status: 404, Message: "No user with this ID" }
     *           -(on success):{status:200,Message:"Instructor Deleted Sucessfully"}
     *           -(on sys fail):status: -1, Message: error 
      */
    app.post('/DeleteInstructor', async (request, response) => {
        try {
            let { ID } = request.body;

            const InstructorObj = await InstrctorModel.find({ _id: ID });
            if (InstructorObj.length <= 0)
                return response.send({ status: 404, Message: "No Instructor with this ID" })

            //1.Set WorkShops he gave -1
            const WorkShops = InstructorObj[0].WorkShops
            if (WorkShops) {
                WorkShops.map(async (workshop) => {
                    await WorkShopModel.findOneAndUpdate({ _id: workshop }, { $set: { Instructor_ID: "-1" } })
                })
            }

            //2.Delete User
            const UserObject = await UserModel.findOneAndDelete({ _id: InstructorObj[0].User_ID })
            if (UserObject) {
                //3.delete collection
                const InstructorObject = await InstrctorModel.findOneAndDelete({ _id: ID })
                return response.send({ status: 200, Message: "Instructor Deleted Sucessfully", UserObject, InstructorObject })
            }
            return response.send({ status: 404, Message: "No user with this ID" });

        }
        catch (error) {
            return response.send({ status: -1, Message: error })
        }
    });

    //F.Instructors Students
    /**Input:Instructor ID 
     * response:-(on system fail):{status:-1,Message: err or "Error in getting Students"}
     *          -(on fail):{ status: 404, Message: "No Instructor with this ID"}
     *          -(on fail):{ status: -1, Message: "Error in getting Students" }
     *          -(on sucess):{ status: 200, MyStudents:Array.from(MyStudents)}
    */
    app.get("/MyStudents/:ID", async (request, response) => {
        try {
            const ID = request.params.ID;//instrcutor ID

            //find the collection of thie instructor
            const InstObj = await InstrctorModel.find({ _id: ID })

            if (InstObj.length <= 0)
                return response.send({ status: 404, Message: "No Instructor with this ID" })

            //get Instructor WorkShops
            const WorkShops = InstObj[0].WorkShops

            //get all students
            const Students = await StudentModel.find({})

            if (Students) {
                //loop over all students
                let MyStudents = new Set();
                for (let i = 0; i < Students.length; i++) {
                    //each student
                    const filteredArray = WorkShops.filter(value => (Students[i].WorkShops).includes(value));
                    if (filteredArray.length > 0) {
                        //add this student
                        MyStudents.add(Students[i])
                    }
                }
                return response.send({ status: 200, MyStudents: Array.from(MyStudents) })
            } else {
                return response.send({ status: -1, Message: "Error in getting Students" })
            }
        } catch (error) {
            return response.send({ status: -1, Message: error })
        }
    });
};