import { Schema, model, connect, Query, Types } from 'mongoose';
import {
  TStudent,
  TUserName,
  TGuardian,
  TLocalGuardian,
  StudentModel,
  StudentMethods,
} from './student.interface';
import validator from 'validator';



const userNameSchema = new Schema<TUserName>({

  firstName: {
    type: String,
    required: [ true, 'Name is required' ],
    trim: true,
    maxlength: [20, "First name cannot be more than 20"],

    // validate : {
    //   validator: function (value: string){
    //     const firstNameCapitalize = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    //     return firstNameCapitalize === value;
    //   },
    //   message: '{VALUE} is not in capitalize format'
    // }

  },
  middleName: {
    type: String,
    required: [ true, 'Middle Name is required' ],
    // validate: {
    //   validator: (value: string)=> validator.isAlpha(value) ,
    //   message: '{VALUE} is not valid'
    // }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});





const studentSchema = new Schema<TStudent, StudentModel>({

  id: { type: String , required : [true, 'Id is required'], unique: true},

  user : {
    type : Schema.Types.ObjectId,
    required : [true, 'User id is required'],
    unique: true,
    ref: 'User'
  },



  name: {
    required: true,
    type: userNameSchema,
  },


  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid'
    },
    required: true,
  },
  dateOfBirth: { type: Date },

  email: { type: String, required: true , unique: true,
    validate: {
      validator: (value: string)=> validator.isEmail(value)
    },
    message: '{VALUE} is not a valid email'
  },

  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'B+', 'B-', 'AB+', 'AB-', 'O+'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    required: true,
    type : guardianSchema,
  },
  localGuardian: {
    required: true,
    type : localGuardianSchema,
  },
  profileImg: String,
  admissionSemester : {
    type : Schema.Types.ObjectId,
    ref : 'AcademicSemester'
  },
  isDeleted : {
    type : Boolean,
    default: false,
  }
});



// Query Middleware 


studentSchema.pre('find', function (next){
 this.find({ isDeleted  : { $ne : true}}) 
  next()
})

studentSchema.pre('findOne', function (next){
 this.find({ isDeleted  : { $ne : true}}) 
  next()
})

studentSchema.pre('aggregate', function(next){
  this.pipeline().unshift({
    $match : {
      isDeleted : { $ne : true}
    }
  })
  next()
})









// create a custom instance method
// studentSchema.methods.isUserExists = async function (id: string){
//   const existingUser = await Student.findOne({ id});

//   return existingUser;
// }

// creating a custom static method 

studentSchema.statics.isUserExists = async function (id: string){
  const existingUser = await Student.findOne({ id})
  return existingUser
}



// create a model

const Student = model<TStudent, StudentModel>('Student', studentSchema);

export default Student;
