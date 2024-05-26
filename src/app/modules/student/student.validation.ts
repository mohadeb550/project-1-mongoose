import { z } from 'zod';

const userNameValidationSchema = z.object({

  firstName: z.string()
    .max(20, { message: "First name cannot be more than 20 characters" })
    .refine(value => /^[A-Z][a-z]*$/.test(value), { message: 'First name must be capitalized' }),
  middleName: z.string()
    .refine(value => /^[A-Za-z]+$/.test(value), { message: '{VALUE} is not valid' }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father name is required'),
  fatherContactNo: z.string().nonempty('Father contact number is required'),
  fatherOccupation: z.string().nonempty('Father occupation is required'),
  motherName: z.string().nonempty('Mother name is required'),
  motherContactNo: z.string().nonempty('Mother contact number is required'),
  motherOccupation: z.string().nonempty('Mother occupation is required'),
});

const localGuardianValidationSchema = z.object({
  name: z.string().nonempty('Local guardian name is required'),
  occupation: z.string().nonempty('Local guardian occupation is required'),
  contactNo: z.string().nonempty('Local guardian contact number is required'),
  address: z.string().nonempty('Local guardian address is required'),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
    gender: z.enum(['male', 'female', 'other'], { errorMap: () => ({ message: 'Gender is not valid' }) }),
    dateOfBirth: z.date().optional(),
    email: z.string().email({ message: '{VALUE} is not a valid email' }),
    contactNo: z.string().nonempty('Contact number is required'),
    emergencyContactNo: z.string().nonempty('Emergency contact number is required'),
    bloodGroup: z.enum(['A+', 'B+', 'B-', 'AB+', 'AB-', 'O+']).optional(),
    presentAddress: z.string().nonempty('Present address is required'),
    permanentAddress: z.string().nonempty('Permanent address is required'),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImg: z.string().optional(),
    })
  })
});



export const studentValidations = {
  createStudentValidationSchema
} ;
