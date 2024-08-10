import {
  AMOUNT_UPDATED,
  EMAIL_ID_PROVIDE_ERROR,
  JOB_RUNNED,
  MONGO_DB_ERROR,
  NO_USER_FOUND_ERROR,
  SET_MONTH_AMOUNT_ERROR,
} from "@/app/errors/errorMessages";
import user from "@/app/models/userModel";
import { connectUsersDB } from "@/app/mongoDB/users/connectUserDB";
import { userType } from "@/app/types/userTypes";
import { getTodayDate } from "@/app/utils/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { emailId } = await req.json();

  if (emailId) {
    try {
      await connectUsersDB();
      const userData: userType | null = await user.findOne({ emailId });
      if (userData) {
        if (userData?.monthLimitAmount) {
          if (userData?.lastUpdatedDate !== getTodayDate()) {
            let totalSpend = 0;
            for (
              let index = 0;
              index < userData?.todaySpends?.length;
              index++
            ) {
              totalSpend = totalSpend + userData?.todaySpends[index];
            }
            await user.updateOne(
              { emailId },
              {
                $set: {
                  todayDate: getTodayDate(),
                  lastUpdatedDate: getTodayDate(),
                  totalSpend,
                  todaySpends: [],
                  totalSaved:userData?.dailyLimit - totalSpend
                },
              }
            );
            return NextResponse.json({
              message: AMOUNT_UPDATED,
            });
          } else {
            return NextResponse.json({
              message: JOB_RUNNED,
            });
          }
        } else {
          return NextResponse.json({
            message: SET_MONTH_AMOUNT_ERROR,
          });
        }
      } else {
        return NextResponse.json({
          message: NO_USER_FOUND_ERROR,
        });
      }
    } catch {
      return NextResponse.json({
        message: MONGO_DB_ERROR,
      });
    }
  } else {
    return NextResponse.json({
      message: EMAIL_ID_PROVIDE_ERROR,
    });
  }
}
