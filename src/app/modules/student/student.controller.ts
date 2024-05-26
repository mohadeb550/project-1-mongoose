import { StudentServices } from './student.service';
import { NextFunction, Request, RequestHandler, Response } from 'express';
// import studentValidationSchema from './student.joi.validation';
import studentValidationSchema from './student.validation';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';


const createStudent : RequestHandler = async (req, res) => {
  try {




    const { student: studentData } = req.body;
    // const { value, error } = studentValidationSchema.validate(studentData);

    // data validation using zod 
    const zodParsedData = studentValidationSchema.parse(studentData)




    // console.log(error, value)
    // if(error){
    //   res.status(500).json({
    //     success: false,
    //     message: 'something went wrong',
    //     error
    //   })
    // }




    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    // send response

    res.status(200).json({
      success: true,
      message: 'Student has been created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error
    })
  }
};


const getAllStudent : RequestHandler = catchAsync(async (req, res, next) => {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
});


const deleteStudent : RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;

  const result = await StudentServices.deleteStudentFromDB(studentId);
  res.status(200).json({
    success: true,
    message: 'Student has been deleted successfully',
    data: result,
  });
});




const getSingleStudent  = catchAsync(async (req, res, next) => {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message : 'Student is retrieved successfully',
      actualData: result 
    })
}) ;



export const StudentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent
};
