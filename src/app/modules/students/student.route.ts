import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudents);
router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
router.delete('/:id', StudentControllers.deleteStudent);

export const StudentsRoutes = router;
