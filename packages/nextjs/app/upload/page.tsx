const UploadFiles = () => {
  return (
    <div>
      <div
        className="flex flex-col justify-center items-center w-full h-screen bg-secondary "
        style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <button className="btn btn-error ">Upload Markdown Files</button>
        <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs mt-10 " />
      </div>
    </div>
  );
};

export default UploadFiles;
