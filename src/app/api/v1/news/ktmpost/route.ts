import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

type NewsItem = {
  headline: string;
  slug: string;
  image?: string;
  link?: string;
};

export async function GET(request: NextRequest) {
  try {
    const response = await axios.get("https://kathmandupost.com/national");
    const html = response.data;
    const $ = cheerio.load(html);
    const newsList: NewsItem[] = [];

    $("article").each((_, el) => {
      const headline = $(el).find("h3").text().trim();
      const slug = $(el).find("p").text().trim();
      const link = $(el).find("a").attr("href");
      const image =
        $(el).find("figure img").attr("data-src") ||
        $(el).find("figure img").attr("src");

      newsList.push({
        headline,
        slug,
        image,
        link: link?.startsWith("http")
          ? link
          : `https://kathmandupost.com${link}`,
      });
    });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "News Loaded successfully",
      source: "ekantipur",
      total: newsList.length,
      news: newsList,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: ["Error while fetching news: ", error.message],
    });
  }
}
