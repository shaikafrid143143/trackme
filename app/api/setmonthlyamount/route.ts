import { MONGO_DB_ERROR, MONTHLY_AMOUNT_ZERO_ERROR, REQUEST_SUCCESS } from "@/app/errors/errorMessages";
import user from "@/app/models/userModel";
import { connectUsersDB } from "@/app/mongoDB/users/connectUserDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { monthAmount, emailId } = await req.json();
    if (!monthAmount || monthAmount <= 0) {
        return NextResponse.json({
            message: MONTHLY_AMOUNT_ZERO_ERROR
        })
    }
    else {
        try {
            await connectUsersDB()
            await user.updateOne({ emailId }, {
                $set: { monthlyLimitAmount: monthAmount, savedAmount: monthAmount }
            })

            return NextResponse.json({
                message: REQUEST_SUCCESS
            })
        }
        catch {
            return NextResponse.json({
                message: MONGO_DB_ERROR
            })
        }

    }

}