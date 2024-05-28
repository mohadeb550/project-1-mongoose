import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemester.constant';






const academicSemesterSchema = new Schema<TAcademicSemester>({

  name: {
    type: String,
    required: true,
    enum : AcademicSemesterName
  },
  year: {
    type: String,
    required: true,
  },
  code : {
    type : String,
    required: true,
    enum : AcademicSemesterCode
  },
  startMonth : {
    type : String,
    enum : Months,
    required: true
  },
  endMonth : {
    type : String,
    enum : Months,
    required: true
  },
}, { timestamps: true});


// use moongose pre hook middleware 
academicSemesterSchema.pre('save', async function(next){
  const isSemesterExist = await AcademicSemester.findOne({
    year: this.year,
    name : this.name,
  });
  if(isSemesterExist){
    throw new Error('Semester is already exists')
  }
  next()
})



// create a model

const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);

export default AcademicSemester;
