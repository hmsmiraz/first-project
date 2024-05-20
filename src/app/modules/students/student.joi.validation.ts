import Joi from 'joi';
// creating joi schema for validation
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(15)
    .required()
    .regex(/^[A-Z][a-zA-Z]*$/)
    .messages({
      'string.base': 'First Name must be a string',
      'string.empty': 'First Name is required',
      'string.max': 'First Name cannot be more than 15 characters',
      'string.pattern.base': '{#label} is not in capitalize format',
      'any.required': 'First Name is required',
    }),
  middleName: Joi.string().trim().max(15).optional(),
  lastName: Joi.string()
    .required()
    .regex(/^[a-zA-Z]+$/)
    .messages({
      'string.base': 'Last Name must be a string',
      'string.empty': 'Last Name is required',
      'string.pattern.base': '{#label} is not valid',
      'any.required': 'Last Name is required',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.base': 'Father Name must be a string',
    'string.empty': 'Father Name is required',
    'any.required': 'Father Name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.base': 'Father Occupation must be a string',
    'string.empty': 'Father Occupation is required',
    'any.required': 'Father Occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.base': 'Father Contact No. must be a string',
    'string.empty': 'Father Contact No. is required',
    'any.required': 'Father Contact No. is required',
  }),
  motherName: Joi.string().required().messages({
    'string.base': 'Mother Name must be a string',
    'string.empty': 'Mother Name is required',
    'any.required': 'Mother Name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.base': 'Mother Occupation must be a string',
    'string.empty': 'Mother Occupation is required',
    'any.required': 'Mother Occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.base': 'Mother Contact No. must be a string',
    'string.empty': 'Mother Contact No. is required',
    'any.required': 'Mother Contact No. is required',
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Local Guardian Name must be a string',
    'string.empty': 'Local Guardian Name is required',
    'any.required': 'Local Guardian Name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.base': 'Local Guardian Occupation must be a string',
    'string.empty': 'Local Guardian Occupation is required',
    'any.required': 'Local Guardian Occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Local Guardian Contact No. must be a string',
    'string.empty': 'Local Guardian Contact No. is required',
    'any.required': 'Local Guardian Contact No. is required',
  }),
  address: Joi.string().required().messages({
    'string.base': 'Local Guardian Address must be a string',
    'string.empty': 'Local Guardian Address is required',
    'any.required': 'Local Guardian Address is required',
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'ID must be a string',
    'string.empty': 'ID is required',
    'any.required': 'ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'string.base': 'Gender must be a string',
    'string.empty': 'Gender is required',
    'any.only':
      '{#label} is not valid. The Exact Gender is Required Male/Female/Other',
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email is required',
    'string.email': '{#label} is not valid Email',
    'any.required': 'Email is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Contact No. must be a string',
    'string.empty': 'Contact No. is required',
    'any.required': 'Contact No. is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.base': 'Emergency Contact No. must be a string',
    'string.empty': 'Emergency Contact No. is required',
    'any.required': 'Emergency Contact No. is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-')
    .optional()
    .messages({
      'string.base': 'Blood Group must be a string',
      'any.only': '{#label} is not valid Blood Group',
    }),
  presentAddress: Joi.string().required().messages({
    'string.base': 'Present Address must be a string',
    'string.empty': 'Present Address is required',
    'any.required': 'Present Address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.base': 'Permanent Address must be a string',
    'string.empty': 'Permanent Address is required',
    'any.required': 'Permanent Address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local Guardian is required',
  }),
  profileImage: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'string.base': 'Status must be a string',
    'any.only': '{#label} is not valid Status',
  }),
});

export default studentValidationSchema;
