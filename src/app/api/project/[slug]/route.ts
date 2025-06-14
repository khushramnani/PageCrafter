import dbConnect from "@/lib/dbConnect";
import { ApiResponse } from "@/types/ApiResponse";
import { ApiError } from "@/types/ApiError";
import { getAuth } from "@/lib/auth";
import ProjectModal from "@/models/projects";

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  await dbConnect();
  try {
    const user = await getAuth();

    if (!user) {
      throw new ApiError(401, "Unauthorize");
    }

    const getproject = await ProjectModal.findOne({ slug: params.slug });

    if (!getproject) {
      throw new ApiError(404, "project not found");
    }

    if (getproject.userId.toString() !== user._id) {
      throw new ApiError(403, "project is not belongs to the user");
    }
  } catch (error) {
    console.log("deleting projects", error);
    const statusCode = error instanceof ApiError ? error.statusCode : 500;
    const message =
      error instanceof ApiError ? error.message : "Internal Server Error";
    return Response.json(new ApiError(statusCode, message));
  }
}
