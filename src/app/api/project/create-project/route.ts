import { ApiResponse } from "@/types/ApiResponse";
import { ApiError } from "@/types/ApiError";
import UserModal from "@/models/users";
import dbConnect from "@/lib/dbConnect";
import { getAuth } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import { nanoid } from "nanoid";
import { generateContentFromAi } from "@/lib/generateContentAi";
import ProjectModal from "@/models/projects";


export async function POST(req:Request) {
    await dbConnect()

    try {
        const user = await getAuth()

        if (!user) {
            throw new ApiError(401, "Unauthorize plz relogin")
        }

        const {name , type , prompt} = await req.json()

        if (!name || !type ) {
            throw new ApiError(400, "Missing name or type")
        }

        let content = ""
        let htmloutput = ""

        const slug = slugify(name) + "-" + nanoid(6)

        if (prompt && prompt.length > 10) {
            const aiResult = await generateContentFromAi(prompt, type);
            content = typeof aiResult === "string" ? aiResult : "";
        }

        const project = await ProjectModal.create({
    name,
    type,
    content,
    slug,
    htmloutput,
    userId: user._id,
  });
        
        return Response.json(
            new ApiResponse(200 ,"Project created succesfully!" , project)
        ) 
        
        
    } catch (error) {
        console.log("creating project" , error);
         const statusCode = error instanceof ApiError ? error.statusCode : 500;
    const message = error instanceof ApiError ? error.message : "Internal Server Error";
    return Response.json(
      new ApiError(statusCode, message),
    )
    }
}