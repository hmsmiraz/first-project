import { Schema, model, connect } from 'mongoose';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is Required'],
    trim: true,
    maxlength: [15, 'First Name can not be more than 15 characters'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is Required'],
  },
});
const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is Required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is Required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact No. is Required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is Required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is Required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Father Contact No. is Required'],
  },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local Guardian Name is Required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is Required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact No. is Required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is Required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'Id is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          '{VALUE} is not valid. The Exact Gender is Required Male/Female/Other',
      },
      required: true,
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact No. is Required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact No. is Required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is Required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is Required'],
    },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },

    profileImage: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);
// virtuals
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName} `;
});

// Query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// using delete query
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// using aggregate query
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
