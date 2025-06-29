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

export async function POST(request: NextRequest) {
  try {
    await ConnectDB();
    const body: NewsBody = await request.json();
    const { headline, slug, image, link, source } = body;

    console.log(source);

    const existingNews =
      (await News.findOne({ slug: slug })) &&
      (await News.findOne({ headline: headline }));

    if (existingNews) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Already saved",
      });
    }

      const newNews = new News({
        headline,
        slug,
        image,
        link,
        source,
      });

      await newNews.save();

      return NextResponse.json({
        success: true,
        status: 200,
        message: "News Saved",
      });
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: ["Server Error:", error.message],
    });
  }
}
