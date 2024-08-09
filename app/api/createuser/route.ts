import { EMAIL_ID_PROVIDE_ERROR, MONGO_DB_ERROR, NAME_PROVIDE_NAME, PASSWORD_PROVIDE_ERROR, REQUEST_SUCCESS } from "@/app/errors/errorMessages";
import user from "@/app/models/userModel";
import { connectUsersDB } from "@/app/mongoDB/users/connectUserDB";
import { NextResponse } from "next/server";


async function checkJson(req: any) {
    const { emailId, firstName, lastName, password } = await req;
    if (!emailId) {
        return EMAIL_ID_PROVIDE_ERROR
    }
    else if (!password) {
        return PASSWORD_PROVIDE_ERROR
    }
    else if (!lastName && !firstName) {
        return NAME_PROVIDE_NAME
    }
    else {
        return REQUEST_SUCCESS
    }
}

export async function POST(req: Request) {
    const requestJson = await req.json()
    const { emailId, password, firstName, lastName } = requestJson;
    const name = firstName + lastName;
    if (await checkJson(requestJson) === "SUCCESS") {
        try {
            await connectUsersDB()
            await user.create({
                name, emailId, password, monthlyLimitAmount: 0, daySpent: 0, daySpend: 0
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
    else {
        return NextResponse.json({
            message: await checkJson(requestJson)
        })
    }
}