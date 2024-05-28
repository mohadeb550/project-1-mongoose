
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import AcademicSemester from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester)=>{


   
    if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
        throw new Error('Invalid Semester Code');
    }

    const result = await AcademicSemester.create(payload)
    return result
}


const getAllAcademicSemestersFromDB = async () =>{
    return await AcademicSemester.find()
}

const getSingleAcademicSemesterFromDB = async (id: string) =>{
    return await AcademicSemester.findById(id)
}

const updateAcademicSemesterIntoDB = async (id: string, payload: Partial<TAcademicSemester>) => {
    if(payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code){
        throw new Error('Invalid Semester Code')
    }
    const result = await AcademicSemester.findOneAndUpdate({_id: id}, payload, { new : true})
    return result;
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    updateAcademicSemesterIntoDB,
    getSingleAcademicSemesterFromDB,
    getAllAcademicSemestersFromDB
}