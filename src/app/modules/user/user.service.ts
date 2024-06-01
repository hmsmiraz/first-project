import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);

  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  // create session
  // for admission semester type error in line 31 (line 24-26)
  if (!admissionSemester) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Admission semester not found');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);
    // transaction-1
    const newUser = await User.create([userData, { session }]);
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    // transaction-2

    const newStudent = await Student.create([payload], { session });
    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    // if success commit session
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    // if failed abort session
    await session.abortTransaction();
    await session.endSession();
  }
};
export const UserServices = {
  createStudentIntoDB,
};
