
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";



const createStudent = catchAsync(async (req, res) => {
    const { password,  student: studentData } = req.body;
    // data validation using zod 
    // const zodParsedData = studentValidationSchema.parse(studentData)


    const result = await UserService.createStudentIntoDB(password, studentData);

    // send response

    // res.status(200).json({
    //   success: true,
    //   message: 'Student has been created successfully',
    //   data: result,
    // });
    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message : 'Student has been created',
      actualData: result 
    })
});



export const UserControllers = {
    createStudent
}