import cloudinary, { cloudinaryConfigured } from "../../../../../lib/cloudinary";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let publicId: string | null = null;

    if (contentType.includes("application/json")) {
      const body = await request.json();
      publicId = (body.public_id || body.publicId || body.id || (body.url ?? ""))?.toString();
    } else {
      const formData = await request.formData();
      publicId =
        formData.get("public_id")?.toString() ||
        formData.get("publicId")?.toString() ||
        formData.get("id")?.toString() ||
        formData.get("url")?.toString() ||
        null;
    }

    if (!publicId) {
      return Response.json({ error: "Missing public_id or resource identifier" }, { status: 400 });
    }

    if (!cloudinaryConfigured) {
      return Response.json(
        {
          error:
            "Missing Cloudinary configuration. Set CLOUDINARY_URL, or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
        },
        { status: 500 }
      );
    }

    const resource = await cloudinary.api.resource(publicId);

    return Response.json(
      {
        url: resource.secure_url || resource.url,
        resource,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Download error:", error);
    return Response.json({ error: "Failed to fetch Cloudinary resource" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
