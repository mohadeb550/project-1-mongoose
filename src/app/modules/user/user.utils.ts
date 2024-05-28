import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

 // what we need : year, semesterCode, 4 digit number 
 export const generatedStudentId = (payload: TAcademicSemester)=> {
    const currentId = (0).toString();
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementId = `${payload.year}${payload.code}${incrementId}`
    return incrementId;
 }
