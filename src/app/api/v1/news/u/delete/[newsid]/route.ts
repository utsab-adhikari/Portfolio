import ConnectDB from "@/lib/ConnectDB";
import News from "@/app/models/News.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { newsid: any } }
) {
  try {
    await ConnectDB();
    const { newsid } = await context.params;
    await News.findByIdAndDelete({ _id: newsid });

      return NextResponse.json({
        message: "News Deleted",
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
