import { EMAIL_ID_PROVIDE_ERROR, MONGO_DB_ERROR, NO_USER_FOUND_ERROR, REQUEST_SUCCESS } from "@/app/errors/errorMessages";
import user from "@/app/models/userModel";
import { connectUsersDB } from "@/app/mongoDB/users/connectUserDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const { emailId } = await req.json()

    if (emailId) {
        try {
            await connectUsersDB()
            const userData = await user.findOne({ emailId })
            if (userData !== null) {
                return NextResponse.json({
                    message: REQUEST_SUCCESS,
                    user: userData
                })
            }
            else {
                return NextResponse.json({
                    message: NO_USER_FOUND_ERROR
                })
            }
        }
        catch (e) {
            console.log(e)
            return NextResponse.json({
                message: MONGO_DB_ERROR
            })
        }
    }
    else {
        return NextResponse.json({
            mesasge: EMAIL_ID_PROVIDE_ERROR
        })
    }



} 