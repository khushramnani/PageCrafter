import {getServerSession} from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"


export async function getAuth() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user._id) {
        return null
    }

    return session
}

