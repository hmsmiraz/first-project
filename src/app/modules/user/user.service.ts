import config from '../../config';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // if (await Student.isUserExists(studentData.id)) {
  //   throw new Error('User Already Exists');
  // }
  //   create  a user object
  const userData: Partial<TUser> = {};
  //if password is not given , use default password
  userData.password = password || (config.default_password as string);
  //   set student role
  userData.role = 'student';

  userData.id = '2030100001';

  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await Student.create(studentData);
    return newStudent;
  };
};
export const UserServices = {
  createStudentIntoDB,
};
