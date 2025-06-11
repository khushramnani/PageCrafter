import dbConnect from "@/lib/dbConnect";
import UserModal from "@/models/users";
import { verifyCodeSchema } from "@/schemas/verifyCode";
import { ApiError } from "@/types/ApiError";
import { ApiResponse } from "@/types/ApiResponse";




export async function POST(req:Request){
    dbConnect()

    try {
        const {email , code} = await req.json()

        const user = await UserModal.findOne({email})

        if (!user) {
           throw new ApiError(401 , "User Already Exits")
        }

        const checkValidation = verifyCodeSchema.safeParse({code})

        if (!checkValidation.success) {
            throw new ApiError(400 , "Plz enter your Otp correctly ")
        }

        const verify = user.verifyCode == code

        const verifyExpiry = new Date(user.verifyCodeExpiry) > new Date()

        if (verify && verifyExpiry) {
            
            user.isVerified = true
            await user.save()

            return Response.json(
                new ApiResponse(200 , "Verification Successfull")
            )
        } else if (!verifyExpiry) {
            throw new ApiError(403,"Otp Expired Plz resend your Otp")
        } else {
            throw new ApiError(400 , "Verification Code Does not Matched!")
        }

    } catch (error) {
        console.error("Error on checking verification", error);

  if (error instanceof ApiError) {
    return Response.json(
      new ApiResponse(error.statusCode, error.message),
      { status: error.statusCode }
    );
  }

  return Response.json(
    new ApiResponse(500, "Something went wrong on checking code"),
    { status: 500 }
  );
        
    }
}


