import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
import { AcademicSemesterControllers } from './academicSemester.controller';
const router = express.Router();



router.post('/create-academic-semester',
 validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema) , AcademicSemesterControllers.createAcademicSemester )

//  get single semester 
router.get('/:semesterId', AcademicSemesterControllers.getSingleAcademicSemester)

//  update 
router.patch('/:semesterId',
validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidationSchema),
AcademicSemesterControllers.updateAcademicSemester)

export const AcademicSemesterRoutes = router