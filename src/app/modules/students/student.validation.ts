import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(15, 'First Name cannot be more than 15 characters')
    .regex(/^[A-Z][a-zA-Z]*$/, 'First Name is not in capitalize format')
    .nonempty('First Name is required'),
  middleName: z.string().trim().max(15).optional(),
  lastName: z
    .string()
    .regex(/^[a-zA-Z]+$/, 'Last Name is not valid')
    .nonempty('Last Name is required'),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father Name is required'),
  fatherOccupation: z.string().nonempty('Father Occupation is required'),
  fatherContactNo: z.string().nonempty('Father Contact No. is required'),
  motherName: z.string().nonempty('Mother Name is required'),
  motherOccupation: z.string().nonempty('Mother Occupation is required'),
  motherContactNo: z.string().nonempty('Mother Contact No. is required'),
});

const localGuardianValidationSchema = z.object({
  name: z.string().nonempty('Local Guardian Name is required'),
  occupation: z.string().nonempty('Local Guardian Occupation is required'),
  contactNo: z.string().nonempty('Local Guardian Contact No. is required'),
  address: z.string().nonempty('Local Guardian Address is required'),
});

const studentValidationSchema = z.object({
  id: z.string().nonempty('ID is required'),
  password: z.string().max(20).min(8),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({
      message:
        'Gender is not valid. The exact gender is required: Male/Female/Other',
    }),
  }),
  dateOfBirth: z.string().optional(),
  email: z.string().email('Email is not valid').nonempty('Email is required'),
  contactNo: z.string().nonempty('Contact No. is required'),
  emergencyContactNo: z.string().nonempty('Emergency Contact No. is required'),
  bloodGroup: z
    .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().nonempty('Present Address is required'),
  permanentAddress: z.string().nonempty('Permanent Address is required'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string().optional(),
  isDeleted: z.boolean(),
});

export default studentValidationSchema;
