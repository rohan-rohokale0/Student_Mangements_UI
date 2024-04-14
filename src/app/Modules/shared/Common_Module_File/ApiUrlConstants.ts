import { register } from "module";
import { environment } from "../../../../environments/environment.development";

export const ApiUrlConstants = {
  login: `${environment.apiRootUrl}api/User/login`,
  register:`${environment.apiRootUrl}api/User/register`,
  refreshToken:`${environment.apiRootUrl}api/User/refresh`,
  getAllUsers:`${environment.apiRootUrl}api/User/getAllUsers`,
  UserRegister:`${environment.apiRootUrl}api/User/Register`,
  getAllStudent:`${environment.apiRootUrl}api/Student/GetAllStudent`,
  addStudent:`${environment.apiRootUrl}api/Student/AddStudent`,
  getStudentById:`${environment.apiRootUrl}api/Student/getStudentById/`,
  updateStudentById:`${environment.apiRootUrl}api/Student/updateStudentById/`,
  deleteStudentById:`${environment.apiRootUrl}api/Student/deleteStudentById/`,
  GetAllCategory:`${environment.apiRootUrl}api/Category/GetAllCategory`,
  GetAllCourse:`${environment.apiRootUrl}api/Course/GetAllCourse`,
  AddCategory:`${environment.apiRootUrl}api/Category/AddCategory`,
  getCategoryById:`${environment.apiRootUrl}api/Category/getCategoryById/`,
  updateCategoryById:`${environment.apiRootUrl}api/Category/updateCategoryById/`,
  deleteCategoryById:`${environment.apiRootUrl}api/Category/deleteCategoryById/`,
  AddCourse:`${environment.apiRootUrl}api/Course/AddCourse`
}

