import { DAILY_SPEND_AMOUNT_PROVIDE_ERROR, EMAIL_ID_PROVIDE_ERROR, MONGO_DB_ERROR, REQUEST_SUCCESS } from "@/app/errors/errorMessages";
import user from "@/app/models/userModel";
import { connectUsersDB } from "@/app/mongoDB/users/connectUserDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { amount, emailId } = await req.json();
    try {
        await connectUsersDB()
        if (emailId && amount > 0) {
            await user.updateOne({ emailId }, {
                $set: { daySpend: amount }
            })
            return NextResponse.json({
                message: REQUEST_SUCCESS
            })
        }
        else {
            if (!emailId) {
                return NextResponse.json({
                    message: EMAIL_ID_PROVIDE_ERROR
                })
            }
            else {
                return NextResponse.json({
                    message: DAILY_SPEND_AMOUNT_PROVIDE_ERROR
                })
            }
        }
    }
    catch {
        return NextResponse.json({
            message: MONGO_DB_ERROR
        })
    }

}