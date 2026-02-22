import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: 'blog-thumbnails' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        ).end(buffer);
    });

    return NextResponse.json(result, { status: 200 });
}
