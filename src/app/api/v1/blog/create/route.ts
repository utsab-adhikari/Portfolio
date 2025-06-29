import ConnectDB from "@/lib/ConnectDB";
import Blog from "@/app/models/Blog.model";
import { NextRequest, NextResponse } from "next/server";

interface BlogBody {
  title: string;
  slug: string;
  author: string;
  image: string;
  category: string;
  content: string;
  badge: string;
  partno: number;
  topic: string;
  reference: string;
}

export async function POST(request: NextRequest) {
  try {
    await ConnectDB();
    const body: BlogBody = await request.json();
    const {
      title,
      slug,
      author,
      image,
      category,
      badge,
      partno,
      topic,
      content,
      reference,
    } = body;

    if (!title || !slug || !author || !category || !content) {
      return NextResponse.json({
        message: " * fields are required",
        status: 400,
        success: false,
      });
    }

    const existingBlog = await Blog.findOne({ slug });

    if (existingBlog && existingBlog.partno === partno) {
      return NextResponse.json({
        message: "Same part exists on this Topic",
        status: 400,
        success: false,
      });
    }
    const newBlog = new Blog({
      title,
      slug,
      author,
      image,
      category,
      badge,
      content,
      partno,
      topic,
      reference,
    });

    await newBlog.save();

    return NextResponse.json({
      message: "Blog created successfully",
      status: 201,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: ["internal server error", error.message],
      status: 500,
    });
  }
}
