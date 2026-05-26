"use client"

export default function DownloadPage() {
  return (
    <div>
      File download page <br />
        <div className="flex flex-wrap">
            
          <form action="/download" method="post" encType="multipart/form-data">
              <div>
                <img src="" alt="" />
              </div>
              <button type="submit">Download</button>
          </form>
          
        </div>
    </div>
  );
}