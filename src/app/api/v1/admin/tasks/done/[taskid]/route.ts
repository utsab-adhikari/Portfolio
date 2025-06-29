import ConnectDB from "@/lib/ConnectDB";
import News from "@/app/models/News.model";
import Task from "@/app/models/Task.model";
import { NextRequest, NextResponse } from "next/server";

interface Task {
    isDone: boolean;
    _id: string;
}

export async function PUT(
  request: NextRequest,
  context: { params: { taskid: any } }
) {
  try {
    await ConnectDB();
    const { taskid } = await context.params;
    const body:Task  = await request.json();
    const { isDone } = body;

    console.log(isDone);

    const update = await Task.findByIdAndUpdate(taskid, { isDone: isDone });

    return NextResponse.json({
      message: "Task Completed",
      success: true,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: ["Server Error", error.message],
    });
  }
}
