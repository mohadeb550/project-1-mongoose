
import { Model, Types } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherContactNo: string;
  fatherOccupation: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
};

export type TUserName = {
  firstName: string;
  middleName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user : Types.ObjectId;
  password : string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date;
  email: string;
  avatar?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'O+';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isDeleted : boolean;
};

// for creating statics methods 

export interface StudentModel extends Model<TStudent>{
  isUserExists(id: string) : Promise<TStudent | null > 
}


// for creating instance method 

// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null >
// }

// export type StudentModel = Model<TStudent, {}, StudentMethods>
