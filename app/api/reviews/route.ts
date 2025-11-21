import { NextResponse } from "next/server";

interface Review {
  name: string;
  review: string;
  productId: string;
}

const reviews: Review[] = [];

export async function POST(req: Request) {
  try {
    const { name, review, productId } = await req.json();

    if (!name || !review || !productId ) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 });
    }

    const newReview = { name, review, productId };
    reviews.push(newReview);

    return NextResponse.json({ message: "Review added", reviews }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(reviews, { status: 200 });
}
