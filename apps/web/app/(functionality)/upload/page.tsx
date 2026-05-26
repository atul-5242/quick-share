"use client"

export default function UploadPage() {
  return (
    <div>
      File Upload page <br />
        <div className="flex flex-wrap">
        <form action="/upload" method="post" encType="multipart/form-data">
            <input type="file" name="file" />
            <button type="submit">Upload</button>
        </form> 
        </div>
    </div>
  );
}