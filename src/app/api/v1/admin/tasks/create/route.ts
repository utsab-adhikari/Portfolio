import ConnectDB from "@/lib/ConnectDB";
import Task from "@/app/models/Task.model";
import { NextRequest, NextResponse } from "next/server";

interface TaskBody {
  title: string;
  category: string;
  date: string;
  time: string;
  description: string;
}

export async function POST(request: NextRequest) {
  try {
    await ConnectDB();

    const body: TaskBody = await request.json();
    const { title, category, date, time, description } = body;

    if (!title || !description) {
      return NextResponse.json({
        success: false,
        status: 401,
        message: "Title and Desc required",
      });
    }

    const newTask = new Task({
      title,
      category,
      date,
      time,
      description,
    });
    
    const taskid = await newTask._id;
    
    if (!newTask) {
      return NextResponse.json({
        success: false,
        status: 500,
        message: "Task Creation Failed",
      });
    }

    await newTask.save();

      return NextResponse.json({
        success: true,
        status: 201,
        message: "Task Created Successfully",
        taskid,
      });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: ["Server Error: ", error.message],
    });
  }
}
