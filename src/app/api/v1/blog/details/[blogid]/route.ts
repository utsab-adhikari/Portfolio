import ConnectDB from "@/lib/ConnectDB";
import Blog from "@/app/models/Blog.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { blogid: any } }
) {
  await ConnectDB();
  try {
    const { blogid } = await context.params;
    const blog = await Blog.findById({ _id: blogid });

    if (!blog) {
      return NextResponse.json({
        message: "Blog Not found",
        success: false,
        status: 400,
      });
    }

    return NextResponse.json({
      message: "Blogs Loaded Sucessfully",
      success: true,
      status: 200,
      blog,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: ["Internal Server Error", error.message],
      success: false,
      status: 500,
    });
  }
}
