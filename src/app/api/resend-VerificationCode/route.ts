import dbConnect from "@/lib/dbConnect";
import { ApiError } from "@/types/ApiError";
import { ApiResponse } from "@/types/ApiResponse";
import { sendVerificationEmail } from "@/helper/sendEmailToverify";
import UserModal from "@/models/users";
import { use } from "react";


export async function POST(req:Request) {
    const {email} = await req.json()
    
    try {
        const user = await UserModal.findOne({email});
        if (!user) {
            throw new ApiError(400 , "User Already Exits")
        } else if (user.isVerified) {
            throw new ApiError(401 , "User is Already verified")
        }

        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

         user.verifyCode = newOtp
        await user.save()
        const username = user.username

        const sendverificationEmail = await sendVerificationEmail(
      username,
      email,
      newOtp
    );

    if (!sendVerificationEmail) {
      throw new ApiError(401, "Failed to resend verification code");
    }

    return Response.json(
      new ApiResponse(
        201,"OTP has been sent again!"
      )
    )


    } catch (error) {
        console.log("err resend otp" , error);
         const statusCode = error instanceof ApiError ? error.statusCode : 500;
    const message = error instanceof ApiError ? error.message : "Internal Server Error";

    return Response.json(
      new ApiError(statusCode, message),
    )
    }
}
