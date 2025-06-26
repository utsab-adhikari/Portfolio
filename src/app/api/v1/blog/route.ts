import ConnectDB from "@/lib/ConnectDB";
import Blog from "@/models/Blog.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await ConnectDB();
  try {
    const blogs = await Blog.find({});

    if (blogs.length === 0) {
      return NextResponse.json({
        message: "Blogs Not found",
        success: false,
        status: 400,
      });
    }

    return NextResponse.json({
      message: "Blogs Loaded Sucessfully",
      success: true,
      status: 200,
      blogs,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: ["Internal Server Error", error.message],
      success: false,
      status: 500,
    });
  }
}
