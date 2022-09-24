const mongoose = require("mongoose")

const InstrctorModel = mongoose.model("Instructors")
const WorkShopModel = mongoose.model("WorkShops")
const StudentModel = mongoose.model("Students")


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


    //F.find workshop by name
    /*Input: Name
     Response:1.(on sys fail){ status: -1, Message: error }
         2.(on fail){ status: 404, Message: "WorkShop Not Found" }
         3.(on success){ status: 200, WorkshopObj }
    */
    app.get("/FindWorkShopByName/:Name", async (request, response) => {
        try {
            const Name = request.params.Name;
            const WorkshopObj =await WorkShopModel.find({ Name: Name })
            if (WorkshopObj.length>0)
                return response.send({ status: 200, WorkshopObj })

            return response.send({ status: 404, Message: "WorkShop Not Found" })
        }
        catch (error) {
            return response.send({ status: -1, Message: error })
        }
    });
};