import ConnectDB from "@/lib/ConnectDB";
import News from "@/app/models/News.model";
import { NextRequest, NextResponse } from "next/server";

interface NewsBody {
  headline: string;
  slug: string;
  image: string;
  link: string;
  source: string;
}

export async function GET(request: NextRequest) {
  try {
    await ConnectDB();

    const savedNews = await News.find({});

    if (!savedNews) {
      return NextResponse.json({
        success: false,
        status: 500,
        message: "News not found",
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      message: "News Loaded Successfully",
      news: savedNews
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: ["Server Error:", error.message],
    });
  }
}
