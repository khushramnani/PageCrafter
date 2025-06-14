import { getAuth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { ApiResponse } from "@/types/ApiResponse";
import { ApiError } from "@/types/ApiError";
import ProjectModal from "@/models/projects";

export async function GET(req:Request) {
    await dbConnect()
    try {
        const user = await getAuth()
    
        if (!user) {
            throw new ApiError(401 , "Unauthorize")
        }

        const projects = await ProjectModal.find({userId:user._id}).sort({createdAt: -1})
        
        // console.log(projects);
        return Response.json(
            new ApiResponse(200 , "Get projects succesfully" , projects)
        ) 

    } catch (error) {
        console.log("geting projects" , error);
         const statusCode = error instanceof ApiError ? error.statusCode : 500;
    const message = error instanceof ApiError ? error.message : "Internal Server Error";
    return Response.json(
      new ApiError(statusCode, message),
    )
    }
}