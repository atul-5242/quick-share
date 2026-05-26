import cloudinary from "../../../../../lib/cloudinary";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const file = body.file; // base64 or file path depending on your client

    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: "quick-share",
    });

    
    return Response.json(
      {
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}