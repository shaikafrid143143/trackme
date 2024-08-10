import { MONGO_DB_ERROR, NO_USER_FOUND_ERROR, REQUEST_SUCCESS, SET_MONTH_AMOUNT_ERROR } from "@/app/errors/errorMessages";
import user from "@/app/models/userModel";
import { connectUsersDB } from "@/app/mongoDB/users/connectUserDB";
import { userType } from "@/app/types/userTypes";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { prevSpendAmount, emailId } = await req.json();
    try {
        await connectUsersDB()
        let userData: userType | null = await user.findOne({ emailId })
        if (userData) {
            if (userData?.monthlyLimitAmount) {
                await user.findOneAndUpdate({
                    emailId
                }, {
                    $push: {
                        prevDaySpends: prevSpendAmount
                    }
                })
                userData = await user.findOne({ emailId })
                let totalSpendAmount = 0;
                if (userData) {
                    for (let index = 0; index < userData?.prevDaySpends?.length; index++) {
                        totalSpendAmount = totalSpendAmount + userData?.prevDaySpends[index]
                    }
                    await user?.updateOne({ emailId }, { $set: { totalMonthSpend: totalSpendAmount, daySpend: 0 } })

                    return NextResponse.json({
                        message: REQUEST_SUCCESS
                    })
                }
                else {
                    return NextResponse.json({
                        message: NO_USER_FOUND_ERROR
                    })
                }
            }
            else {
                return NextResponse.json({
                    message: SET_MONTH_AMOUNT_ERROR
                })
            }
        }
        else {
            return NextResponse.json({
                message: NO_USER_FOUND_ERROR
            })
        }
    }
    catch {
        return NextResponse.json({
            message: MONGO_DB_ERROR
        })
    }
}