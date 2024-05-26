import config from "../../config";
import { TStudent } from "../student/student.interface";
import Student from "../student/student.model";
import { TUser } from "./user.interface";
import User from "./user.model";




const createStudentIntoDB = async (password : string, studentData: TStudent) => {
  // create a user object 
  const userData : Partial<TUser> = {}
// if password is not given , use default password 
  userData.password = password || config.default_pass;

  // set student role 
  userData.role = 'student'

  // set manually id 
  userData.id = '203010001'
  
  // create a student 
    const newUser = await User.create(userData);

    if(Object.keys(newUser).length){
      // set id, _id as user 
      studentData.id = newUser.id;
      studentData.user = newUser._id;

     const newStudent = await Student.create(studentData)
     return newStudent;
    }
  };
  
  
  export const UserService = {
    createStudentIntoDB,
  }