import cloudinary, { cloudinaryConfigured } from "../../../../../lib/cloudinary";

async function fileToDataUri(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return `data:${file.type || "application/octet-stream"};base64,${base64}`;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let uploadTarget: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const incomingFile = formData.get("file");

      if (!incomingFile) {
        return Response.json({ error: "No file provided" }, { status: 400 });
      }

      if (incomingFile instanceof File) {
        uploadTarget = await fileToDataUri(incomingFile);
      } else if (typeof incomingFile === "string") {
        uploadTarget = incomingFile;
      } else {
        return Response.json({ error: "Invalid file upload" }, { status: 400 });
      }
    } else {
      const body = await request.json();
      uploadTarget = body.file;
    }

    if (!uploadTarget) {
      return Response.json({ error: "No upload target provided" }, { status: 400 });
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

    const uploadResponse = await cloudinary.uploader.upload(uploadTarget, {
      folder: "quick-share",
    });

    return Response.json(
      {
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
        original_filename: uploadResponse.original_filename,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
