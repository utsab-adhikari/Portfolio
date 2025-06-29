import ConnectDB from "@/lib/ConnectDB";
import Prep from "@/app/models/Prep.Model";
import { NextRequest, NextResponse } from "next/server";

interface PrepBody {
  title: string;
  category: string;
  date: string;
  dayno: number;
  description: string;
}

export async function POST(request: NextRequest) {
  try {
    await ConnectDB();

    const body: PrepBody = await request.json();
    const { title, category, date, dayno, description } = body;
    console.log(date);

    if (!title || !description) {
      return NextResponse.json({
        success: false,
        status: 401,
        message: "Title and Desc required",
      });
    }

    const newPrep = new Prep({
      title,
      category,
      date,
      dayno,
      description,
    });

    if (!newPrep) {
      return NextResponse.json({
        success: false,
        status: 500,
        message: "Prep Creation Failed",
      });
    }

    await newPrep.save();

    return NextResponse.json({
      success: true,
      status: 201,
      message: "Prep Created Successfully",
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: ["Server Error: ", error.message],
    });
  }
}
