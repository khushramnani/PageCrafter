import dbConnect from "@/lib/dbConnect";
import UserModal from "@/models/users";
import { ApiError } from "@/types/ApiError";
import bcrypt from "bcrypt";
import { ApiResponse } from "@/types/ApiResponse";
import { sendVerificationEmail } from "@/helper/sendEmailToverify";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await req.json();

    const generateVerifyCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const hasedPassword = await bcrypt.hash(password, 10);
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    const existingUser = await UserModal.findOne({ email });

    if (existingUser) {
      if (existingUser?.isVerified) {
        throw new ApiError(400, "User Already Exists");
      } else {
        existingUser.password = hasedPassword;
        (existingUser.verifyCode = generateVerifyCode),
          (existingUser.verifyCodeExpiry = expiryDate);

        await existingUser.save();

        const sendverificationEmail = await sendVerificationEmail(
          username,
          email,
          generateVerifyCode
        );

        if (!sendVerificationEmail) {
          throw new ApiError(401, "Failed to send verification code");
        }

        return Response.json(
          new ApiResponse(201, "OTP has been sent to your email plz verify")
        );
      }
    }

    const NewUser = new UserModal({
      username,
      email,
      password: hasedPassword,
      isVerified: false,
      verifyCode: generateVerifyCode,
      verifyCodeExpiry: expiryDate,
      profilePicture: undefined,
    });

    await NewUser.save();

    const sendverificationEmail = await sendVerificationEmail(
      username,
      email,
      generateVerifyCode
    );

    if (!sendVerificationEmail) {
      throw new ApiError(401, "Failed to send verification code");
    }

    return Response.json(
      new ApiResponse(
        201,
        NewUser,
        "OTP has been sent to your email plz verify"
      )
    );
  } catch (error) {
    console.log("Error in sign-up", error);

    throw new ApiError(500, "User not registered");
  }
}
