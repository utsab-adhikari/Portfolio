import ConnectDB from "@/lib/ConnectDB";
import Task from "@/app/models/Task.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        await ConnectDB();

        const tasks = await Task.find({});

        if(!tasks) {
            return NextResponse.json({
            success: false,
            status: 400,
            message: ["Tasks Not Found"]
        })
        }

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Tasks Found",
            tasks
        })
        
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            message: ["Internal Server Error", error.message]
        })
    }
}