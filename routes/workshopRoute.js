const mongoose = require("mongoose")
const axios = require("axios")

const InstrctorModel = mongoose.model("Instructors")
const WorkShopModel = mongoose.model("WorkShops")
const StudentModel = mongoose.model("Students")

const lib = require('./functions')

module.exports = (app) => {

    //A.Find WorkShop by ID
    /*Input: ID 
     Response:1.(on sys fail){ status: -1, Message: error }
         2.(on fail){ status: 404, Message: "workshop not found" }
         3.(on fail){ status: 404, Message: "Instructor not found" }
         4.(on sucess){ status: 200, WorkShopObj, InstructorObj: InstructorObj[0] }
    */
    app.get("/FindWorkShopByID/:ID", async (request, response) => {
        try {
            const ID = request.params.ID;

            const WorkShopObj = await WorkShopModel.find({ _id: ID });
            if (WorkShopObj.length > 0) {
                if (WorkShopObj[0].Instructor_ID == -1) {
                    return response.send({ status: 200, WorkShopObj, InstructorObj: { Name: "No Instructor" } })
                }
                //else there is an instructor
                const InstructorObj = await InstrctorModel.find({ _id: WorkShopObj[0].Instructor_ID })
                if (InstructorObj.length > 0)
                    return response.send({ status: 200, WorkShopObj, InstructorObj: InstructorObj[0] })
                return response.send({ status: 404, Message: "Instructor not found" })

            }
            return response.send({ status: 404, Message: "workshop not found" })
        }
        catch (error) {
            return response.send({ status: -1, Message: error })
        }
    });

    //B.retieve all Workshops Ordered as Avaialbe full past
    /*Input None
    Response:1.(on success)Array of Josns Workhops
             2.(on fail)status:-1 system error
    */
    app.get("/FindWorkShops", async (request, response) => {
        try {
            const WorkShopsObj = await WorkShopModel.find({}).sort({ Status: 1, StartDate: 1 })
            return response.json(WorkShopsObj)
        }
        catch (error) {
            return response.send({ status: -1, Message: error })
        }
    });

    //C.Add WorkShop
    /*Input : Name[VIP]
        -Field
        -StartDate
        -Duration
        -SessionsPerWeek
        -SessionTime
        -**Instructor_ID -1 if no instructor or ID
        -Location
        -Price
        -MaxCapacity
        -Status
    
    Response:1.(on success)status:200 Message "WorkShop Added Sucessfully"  newWorkShop}
             2.(on success){ status: 200, Message: "This Instructor already has this work shop" }
             2.(on fail)status:402 Message"WorkShop Name Already Exists" or "No Insrtuctor with this id" 
             3. (on sysytem error) status:-1 Message:error
    */
    app.post("/AddWorkShop", async (request, response) => {
        try {

            let { Name, Field, StartDate, Duration, SessionsPerWeek, SessionTime, Student_ID, Instructor_ID, Location, Price, MaxCapacity, Status } = request.body;

            //check if Name alreadyExists
            const WorkShopobj = await WorkShopModel.find({ Name })
            if (WorkShopobj.length > 0)
                return response.send({ status: 402, Message: "WorkShop Name Already Exists" })

            //else unique Name
            const newWorkShop = new WorkShopModel({ Name, Field, StartDate, Duration, SessionsPerWeek, Instructor_ID, SessionTime, Student_ID, Location, Price, MaxCapacity, Status })
            await newWorkShop.save()


            //add this Id to the Instructor Workshops List
            //case1 has no instructor
            if (Instructor_ID === "-1")
                return response.send({ status: 200, Message: "WorkShop Added sucessfully", newWorkShop })

            //case 2 has an instructor
            const InstructorQuery = await InstrctorModel.updateOne({ _id: Instructor_ID }, { $addToSet: { WorkShops: newWorkShop._id } })

            if (InstructorQuery.matchedCount <= 0)
                return response.send({ status: 404, Message: "No Insrtuctor with this id" })

            if (InstructorQuery.modifiedCount <= 0)
                return response.send({ status: 200, Message: "This Instructor already has this work shop" })

            return response.send({ status: 200, Message: "WorkShop Added sucessfully", newWorkShop })
        }
        catch (error) {
            return response.send({ status: -1, Message: error })
        }
    });

    //D.Delete WorkShop
    /**input Id of Workshop
     * response: -(on fail):{status:404,Message:"No WorkShop with this ID"}
     *           -(on sucess):{status:200,Message:"WorkShop Deleted Sucessfully"}
     *           -(on sys fail):status: -1, Message: error 
     */
    app.post('/DeleteWorkShop', async (request, response) => {
        try {
            let { ID } = request.body;

            const WorkShopObj = await WorkShopModel.find({ _id: ID })
            if (WorkShopObj.length <= 0)
                return response.send({ status: 404, Message: "No WorkShop with this ID" })

            const workShop = WorkShopObj[0]
            //1.remove it from instryctor workshops
            const InstructorID = workShop.Instructor_ID

            if (InstructorID != -1) {
                // There is an instructor [remove this work shop from this instructor array WorkShops]
                const InstructorObj = await InstrctorModel.findOneAndUpdate({ _id: InstructorID }, { $pull: { WorkShops: workShop._id } })
            }
            //else it has no instructor
            // no work in Insstrutor

            //2.Remove it from students 
            const StudentsArr = WorkShopObj[0].EnrolledStudents;
            if (StudentsArr) {
                StudentsArr.map(async (stu) => {
                    await StudentModel.findOneAndUpdate({ _id: stu }, { $pull: { WorkShops: workShop._id } })
                });
            }

            //3.Delete record
            const WorkShopObject = await WorkShopModel.findOneAndDelete({ _id: ID })
            return response.send({ status: 200, Message: "WorkShop Deleted Sucessfully" })
        }
        catch (error) {
            return response.send({ status: -1, Message: error })
        }
    });

    // //E.UnAssignWorkShop
    // /**input:WorkShopID,NewInstructorID[-1 or ID]
    //  * Response:-(on sys err):status: -1, Message: error
    //             -(on fail):{ status: 404, Message: "No WorkShop with this ID" }"
    //             -(on fail):{ status: 404, Message: "No Old Instructor with this ID" }
    //             -(on success:{ status: 200, Message: "This Instructor already has this work shop" })
    //             -(on success):{ status: 200, Message: "This WorkShop already has this Instructor" }
    //             -(on success):{ status: 200, Message: "WorkShop Instructor Updated sucessfully" }
    //             */
    // app.put('/UnAssignWorkShop', async (request, response) => {
    //     try {
    //         let { WorkShopID, InstructorID } = request.body

    //         const WorkShopObj = await WorkShopModel.findById({ _id: WorkShopID })
    //         if (WorkShopObj == null)
    //             return response.send({ status: 404, Message: "No WorkShop with this ID" })

    //         const OldInstructor = WorkShopObj.Instructor_ID
    //         if (OldInstructor != -1) {
    //             //there is old
    //             //1.Remove This Work Shop from this Old Instructor's Workshops
    //             const InstructorObj = await InstrctorModel.findOneAndUpdate({ _id: OldInstructor }, { $pull: { WorkShops: WorkShopObj._id } })
    //             if (InstructorObj == null)
    //                 return response.send({ status: 404, Message: "No Old Instructor with this ID" })
    //         }
    //         //2.Add this WorkShop to the New instructor
    //         if (InstructorID != "-1") {
    //             //there is a new instructor
    //             //3.add this work Shop to this New Instructor Workshops Array
    //             const InstructorQuery = await InstrctorModel.updateOne({ _id: InstructorID }, { $addToSet: { WorkShops: WorkShopObj._id } })
    //             if (InstructorQuery.matchedCount <= 0)
    //                 return response.send({ status: 404, Message: "No Insrtuctor with this id" })

    //             if (InstructorQuery.modifiedCount <= 0)
    //                 return response.send({ status: 200, Message: "This Instructor already has this work shop" })
    //         }
    //         //4.Update the Instructor_ID in the workshop with the InstructorID
    //         const WorkShopQuery = await WorkShopModel.updateOne({ _id: WorkShopID }, { $set: { Instructor_ID: InstructorID } })

    //         if (WorkShopQuery.matchedCount <= 0)
    //             return response.send({ status: 404, Message: "No WorkShop with this id" })
    //         if (WorkShopQuery.modifiedCount <= 0)
    //             return response.send({ status: 200, Message: "This WorkShop already has this Instructor" })

    //         return response.send({ status: 200, Message: "WorkShop Instructor Updated sucessfully" })
    //     }
    //     catch (error) {
    //         return response.send({ status: -1, Message: error })
    //     }
    // })



    //F.Update WorkShop
    /**Input:WorkShop obj :1.[MUST] WorkShop_id 
     * reponse: -(on sys err):{status: -1, Message: error}
                -(on fail):{ status: 404, Message: "No WorkShop with this ID" }
                -(on fail):{ status: 404, Message: "This Name Already Exsits" }
                -(on fail):UnAssign responses on fail or system fail
                -(on sucess):{ status: 200, Message: "WorkShop Updated Sucessfully"}
     */
    app.put("/UpdateWorkShop", async (request, response) => {
        try {
            const { WorkShop } = request.body

            //get old workshop
            const WorkShopObj = await WorkShopModel.find({ _id: WorkShop._id })

            if (WorkShopObj.length <= 0)
                return response.send({ status: 404, Message: "No WorkShop with this ID" })

            //1.WorkShop Name
            if (WorkShop.Name) {
                //has name
                const WorkShop_Obj = await WorkShopModel.find({ Name: WorkShop.Name })
                if (WorkShop_Obj.length > 0) {
                    if (WorkShop_Obj[0]._id != WorkShop._id)
                        return response.send({ status: 404, Message: "This Name Already Exsits" })
                }
            }
            //2.WorkShopInstructor
            if (WorkShop.Instructor_ID) {
                //update Instructor
                // await axios.put("http://localhost:5000/UnAssignWorkShop", { WorkShopID: WorkShop._id, InstructorID: WorkShop.Instructor_ID }).then((res) => {
                let res = await lib.UnAssignWorkShop(WorkShop._id, WorkShop.Instructor_ID);
                if (res.status != 200)
                    return response.send(res)
                // })
            }

            //3.Update WorkShop
            await WorkShopModel.findByIdAndUpdate({ _id: WorkShop._id }, { $set: WorkShop })
            return response.send({ status: 200, Message: "WorkShop Updated Sucessfully" })
        }
        catch (error) {
            return response.send({ status: -1, Message: error })
        }
    });


    //G.find workshop by name
    /*Input: Name
     Response:1.(on sys fail){ status: -1, Message: error }
         2.(on fail){ status: 404, Message: "WorkShop Not Found" }
         3.(on success){ status: 200, WorkshopObj }
    */
    app.get("/FindWorkShopByName/:Name", async (request, response) => {
        try {
            const Name = request.params.Name;
            const WorkshopObj = await WorkShopModel.find({ Name: Name })
            if (WorkshopObj.length > 0)
                return response.send({ status: 200, WorkshopObj })

            return response.send({ status: 404, Message: "WorkShop Not Found" })
        }
        catch (error) {
            return response.send({ status: -1, Message: error })
        }
    });
};