import mongoose, { Schema, model, models } from "mongoose";

const userModel = new Schema({
    emailId: {
        type: String,
        immutable: true,
        required: true
    },
    mobileNumber: {
        length: 10,
        type: Number,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        immutable: true,
        required: true
    },
    monthlyLimitAmount: {
        type: Number,
        required: false,
    },
    daySpend: {
        type: Number,
        required: false,
    },
    prevDaySpends: {
        type: [Number],
        required:false
    },
    totalMonthSpend: {
        type: Number,
        required:false
    },
    savedAmount: {
        type: Number,
        required:false
    },
    todayDate: {
        type: String,
        required:false
    }
})
const user = models.users || mongoose.model("users", userModel)
export default user 