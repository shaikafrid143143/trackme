import { DAILY_LIMIT_EXCEED_ERROR, DAILY_SPEND_AMOUNT_PROVIDE_ERROR, EMAIL_ID_PROVIDE_ERROR, MONGO_DB_ERROR, NO_USER_FOUND_ERROR, REQUEST_SUCCESS, SET_MONTH_AMOUNT_ERROR, SOME_THING_WRONG_ERROR } from "@/app/errors/errorMessages";
import user from "@/app/models/userModel";
import { connectUsersDB } from "@/app/mongoDB/users/connectUserDB";
import { userType } from "@/app/types/userTypes";
import { daysInThisMonth, getTodayDate } from "@/app/utils/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { amount, emailId } = await req.json();
    try {
        await connectUsersDB()
        if (emailId && amount > 0) {
            const userData: userType | null = await user.findOne({ emailId });
            if (userData) {
                if (userData?.monthlyLimitAmount > 0) {
                    await user.updateOne({ emailId }, {
                        $set: { daySpend: amount + userData?.daySpend, savedAmount: userData?.savedAmount - amount,todayDate:getTodayDate() }
                    })
                    const daysInMonth = daysInThisMonth()
                    return NextResponse.json({
                        message: (userData?.daySpend + amount + userData?.totalMonthSpend >= userData?.monthlyLimitAmount / daysInMonth || (userData?.daySpend + amount >= userData?.monthlyLimitAmount / daysInThisMonth()
                        )) ? DAILY_LIMIT_EXCEED_ERROR : REQUEST_SUCCESS
                    })
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