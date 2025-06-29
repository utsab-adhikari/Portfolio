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
    const body: NewsBody = await request.json();
    const { headline, slug, image, link, source } = body;

    const existingNews =
      (await News.findOne({ slug: slug })) &&
      (await News.findOne({ headline: headline }));

      if(existingNews) {
        return NextResponse.json({
        success: true,
        status: 200,
        message: "Yes",
      });
      }

       return NextResponse.json({
        success: false,
        status: 200,
        message: "No",
      });

    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: ["Server Error:", error.message],
    });
  }
}
