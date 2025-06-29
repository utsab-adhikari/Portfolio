import ConnectDB from "@/lib/ConnectDB";
import Task from "@/app/models/Task.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { taskid: any } }
) {
  await ConnectDB();
  try {
    const { taskid } = await context.params;
    const task = await Task.findById({ _id: taskid });

    if (!task) {
      return NextResponse.json({
        message: "Task Not found",
        success: false,
        status: 400,
      });
    }

    return NextResponse.json({
      message: "Tasks Loaded Sucessfully",
      success: true,
      status: 200,
      task,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: ["Internal Server Error", error.message],
      success: false,
      status: 500,
    });
  }
}
