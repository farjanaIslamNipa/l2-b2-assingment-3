import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {AuthServices} from "./auth.service";

const registerUser = catchAsync(async(req, res) => {

  const result = await AuthServices.registerUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result
  })
})


export const AuthControllers = {
  registerUser
}
