const mongoose = require("mongoose");
const StudentModel = mongoose.model("Students");
const UserModel = mongoose.model("Users");
const WorkShopModel = mongoose.model("WorkShops");
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
require('./usersRoute')(app)
module.exports = (app) => {

    //A.Add Student
    app.post("/AddStudent", async (request, response) => {
        try {
            let { Name, Mobile, Email, University, Faculty, Department, Academic_Year, User_Name, Password } = request.body;
          const UserObj= await UserModel.find({ User_Name });
                 if (UserObj.length > 0)
                    return response.send({ status: 402, Message: "Username Already Exists" })

                else {
                    //Check if the Name of the Student already exists
                   const Studentobj=  await StudentModel.find({ Name });
                     if (Studentobj.length > 0)
                            return response.send({ status: 402, Message: "Student Name Already Exists" })
                        else {
                            //else unique 
                            //1.add user
                            const res = await axios.post("http://localhost:5000/AddUser", { User_Name, Password, Type: "Student" })
                            if (res.data.status != 200) {
                                response.send({ status: 402, Mesaage: res.data.Message })
                                return;
                            }
                            const newUser = res.data.newUser;

                            //2.Add Student

                            const newStudent = new StudentModel({
                                Name,
                                Mobile,
                                Email,
                                University,
                                Faculty,
                                Department,
                                Academic_Year,
                                User_Name,
                                Password,
                                User_ID: newUser._id
                            })

                        const  NewStudentobj= await newStudent.save();

                                //3.Update User with the new aaded row id
                                const updateduserCollection = await UserModel.updateOne({ _id: newUser._id }, { $set: { User_ID: NewStudentobj._id } })
                                if (updateduserCollection.modifiedCount > 0) {
                                    response.send({ status: 200, Message: "Student Added Sucessfully", Student: NewStudentobj._id })
                                    return
                                }
                                return response.send({ status: 402, Message: "Error Happend in Last Step" })
                        }
                }

        } catch (error) {
            return response.send({ status: -1, Message: error })
        }
    })

    //B.Find Student by ID
    app.get(`/FindStudentByID/:ID`, async (request, response) => {
        const ID = request.params.ID;
        try {
        const Studentobj = await StudentModel.find({ _id: ID });
            if (Studentobj.length >=0) {
                    //get User
               const UserObj =await UserModel.find({ _id: Studentobj[0].User_ID })
                 if (UserObj.length >= 0) {
                            response.send({ status: 200, Studentobj, UserObj })
                        }
                        else //not found
                            response.send({ status: 404, Message: "User Not Found" })


                }
                else //not found
                    response.send({ status: 404, Message: "Student Not Found" })

        } catch (error) {
          return  response.send({ status: -1, error })
        }

    })

    //C.Check if Student is enrolled in Certain WorkShop  [NOYUSED]
    app.get(`/IsStudentEnrolled/:SID/:WID`, async (request, response) => {
        try {
            const SID = request.params.SID;
            const WID = request.params.WID;
          const StudentObj=await StudentModel.find({ _id: SID })
            if (StudentObj) {
                    const WorkShops = StudentObj[0].WorkShops
                    if (Object.values(WorkShops).indexOf(WID) > -1) {
                        //found
                        response.send({ stauts: 200, Message: true })
                    }
                    else
                        response.send({ stauts: 200, Message: false })

                }
                else //not found
                    response.send({ status: 404 })
        } catch (error) {
            return  response.send({ status: -1, error })
        }


    })

    //D.Retrieve Students Whose Student is ID
    /*Input:Student ID
    response: 1.(on fail):{ status: 404, message: "Student Not Found" }
              2.(on sys error):{ status: -1, err }
              3.(on sucess):{ stauts: 200, StudentsObj }
     */
    app.get(`/FindStudentsForStudent/:ID`, async (request, response) => {
       //Intrsuctor ID
        try {
            const ID = request.params.ID;
           const StudentObj=await StudentModel.find({ _id: ID })  ; 
             if (StudentObj.length > 0) {
                 const StudentsObj=await StudentModel.find({ WorkShops: { $in: StudentObj[0].WorkShops } })
                 if (StudentsObj.length >= 0)
                            response.send({ stauts: 200, StudentsObj })
                }

                else //not found
                    response.send({ status: 404, message: "Student Not Found" })
        } catch (error) {
            return  response.send({ status: -1, error })
        }
    })

    //E.Retrieve students Enrolled in Certain WorkShop [NotUsed]
    app.get(`/FindWorkShopStudents/:ID`, async (request, response) => {
        try {
            const ID = request.params.ID;
          const WorkShopObj=await WorkShopModel.find({ _id: ID });                
             if (WorkShopObj.length >= 0)
                    response.send({ stauts: 200, EnrolledStudents: WorkShopObj[0].EnrolledStudents })
                else //not found
                    response.send({ status: 404 })

        } catch (error) {
            return response.send({ status: -1, error })
        }

    })

    // app.get("/FindAllStudentInWorkshop/:ws", async (request, response) => {
    //   const  WorkShops= request.params.ws;

    //     StudentModel.find({ WorkShops.map((x)=>{ return   })}, (err, StudentObj) => {
    //         if (err)
    //             response.send({ status: -1, err })
    //         else if (WorkShopObj)
    //             response.send({ staus: 200, StudentObj })
    //         else //not found
    //             response.send({ status: 404 })
    //     })
    // })

    //F.Enroll
    /*
    input:Student_ID WorkShop_ID
    response:
    status: 404, Message: "No WorkShop with this id" or "No Student with this id"
    status: 200, Message: "Enrolled in WorkShop Sucessfully"  or "This student is already enrolled in this Workshop"
     */
    app.put(`/Enroll`, async (request, response) => {
        //check if this Workshop exists
        try {
            const { Student_ID, WorkShop_ID } = request.body
            const Workshop = await WorkShopModel.find({ _id: WorkShop_ID });
            if (Workshop.length <= 0) {
                response.send({ status: 404, Message: "No WorkShop with this id" })
                return
            }
            //workshop is OK

            const Studentquery = await StudentModel.updateOne({ _id: Student_ID }, { $addToSet: { WorkShops: WorkShop_ID } })
            if (Studentquery.matchedCount <= 0) {
                response.send({ status: 404, Message: "No Student with this id" })
                return
            }
            if (Studentquery.modifiedCount <= 0) {
                response.send({ status: 200, Message: "This student is already enrolled in this Workshop" })
                return;
            }

            //else done 
            //add Thus student to WorkShop

            const WorkShopquery = await WorkShopModel.updateOne({ _id: WorkShop_ID }, { $addToSet: { EnrolledStudents: Student_ID } })
            if (WorkShopquery.modifiedCount > 0) {
                response.send({ status: 200, Message: "Enrolled in WorkShop Sucessfully" })
            }
        } catch (error) {
            return response.send(error)
        }
    }
    )

    //G.UnEnroll
    /*Input : Student_ID WorkShop_ID
    response:-(on fail) status: 404, Message: "No Student with this id" 
             -(on success)  status: 200, Message: "This Student isn't Enrolled in this work shop" or
    */
    app.put(`/UnEnroll`, async (request, response) => {
        const { Student_ID, WorkShop_ID } = request.body
        try {
            const StudentQuery = await StudentModel.updateMany({ _id: Student_ID }, { $pull: { WorkShops: WorkShop_ID } })
            if (StudentQuery.matchedCount <= 0) {
                response.send({ status: 404, Message: "No Student with this id" })
                return;
            }
            else if (StudentQuery.modifiedCount <= 0) {
                response.send({ status: 200, Message: "This Student isn't Enrolled in this work shop" })
                return
            }
            else {
                //done
                //remove this Student from WorkShop
                const WorkShopQuery = await WorkShopModel.updateMany({ _id: WorkShop_ID }, { $pull: { EnrolledStudents: Student_ID } })
                if (WorkShopQuery.matchedCount <= 0) {
                    response.send({ status: 404, Message: "No WorkShop with this id" })
                    return;
                }
                else if (WorkShopQuery.modifiedCount <= 0) {
                    response.send({ status: 200, Message: "This Student isn't Enrolled in this work shop" })
                    return
                }
                else {
                    //done
                    response.send({ status: 200, Message: "Student Unenrolled successfully" })

                }
            }
        } catch (error) {
            return response.send(error)
        }
    })

    app.put(`/UpdateStudent`, async (request, response) => {
        const { Student, User } = request.body
        try {

            const Student_Collection = await StudentModel.find({ _id: Student._id })
            if (Student_Collection.length <= 0) {
                response.send({ status: 404, Message: "No Student with this ID" })
                return
            }
            const res = await axios.put("http://localhost:5000/UpdateUser", { User })
            if (res.data.status == 200)//Done User Name Updated
            {
                const updatedUserCollection = res.data.updatedUserCollection
                if (Student.Name) {
                    const NameStudentCollection = await StudentModel.find({ Name: Student.Name })
                    if (NameStudentCollection.length > 0) {
                        if (Student._id == NameStudentCollection[0]._id) {
                            //he uses his old name no problem
                            const updatedStudentrCollection = await StudentModel.findByIdAndUpdate({ _id: Student._id }, { $set: Student })
                            response.send({ status: 200, Message: "Student Updated Sucessfully" })
                        }
                        else {
                            response.send({ status: 405, Message: "Student Name already Exists" })
                        }
                    }
                    else {
                        //completey new Name
                        const updatedStudentrCollection = await StudentModel.findByIdAndUpdate({ _id: Student._id }, { $set: Student })
                        response.send({ status: 200, Message: "Student Updated Sucessfully" })
                    }
                }
                else {
                    //No change in name update directly
                    const updatedStudentrCollection = await StudentModel.findByIdAndUpdate({ _id: Student._id }, { $set: Student })
                    response.send({ status: 200, Message: "Student Updated Sucessfully" })
                }

            }
            else {
                //problem display it
                response.send({ status: res.data.status, Message: res.data.Message })
            }
        } catch (error) {
            return response.send(error)
        }
    })

    app.get(`/FindStudents`, async (request, response) => {
        try {
            const StudentsObj= await StudentModel.find({}).sort({ Name: 1 });
                   if (StudentsObj.length >= 0)
                  return  response.json(StudentsObj)

        } catch (error) {
            return response.send({ status: -1, Message: error })
        }
    })
}
