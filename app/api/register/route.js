import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongo";
import { createUser } from "@/queries/user";

export const POST = async (request) => {
  try {
    // Parse the request body
    const { name, email, password } = await request.json();

    console.log("Received:", { name, email, password });

    // Validate input
    if (!name || !email || !password) {
      return new NextResponse(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    // Create a DB Connection
    await dbConnect();

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Form a DB payload
    const newUser = {
      name,
      password: hashedPassword,
      email,
    };

    // Update the DB
    await createUser(newUser);

    return new NextResponse(JSON.stringify({ message: "User has been created" }), { status: 201 });
  } catch (err) {
    console.error("Error creating user:", err);

    return new NextResponse(JSON.stringify({ error: err.message || "Internal Server Error" }), { status: 500 });
  }
};
