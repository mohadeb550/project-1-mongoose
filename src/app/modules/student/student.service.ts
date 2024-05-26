import { TStudent } from './student.interface';
import Student from './student.model';



// const createStudentIntoDB = async (studentData: TStudent) => {

//   // custom static methods
//   if(await Student.isUserExists(studentData.id)){
//     throw new Error('User already exists')
//   }



//   const result = await Student.create(studentData);
//   // const student = new Student(studentData);

//   // if(await student.isUserExists(studentData.id)){
//   //   throw new Error('User already exists')
//   // }



//   // const result = await student.save() //built in instance method provided by mongoose 
//   return result;
// };




const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};



const getSingleStudentFromDB = async (studentId: string) => {
  // const result = await Student.findOne({ id: studentId });

  const result = await Student.aggregate([
    {
      $match : {
        id : studentId
      }
    }
  ])

  return result;
};


const deleteStudentFromDB = async (studentId: string) => {
  const result = await Student.updateOne({ id: studentId }, {
    $set :{ isDeleted : true}
  });
  return result;
};


export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};
