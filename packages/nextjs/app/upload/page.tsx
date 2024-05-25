const UploadFiles = () => {
  return (
    <div className="flex flex-col justify-center items-center py-32">
      <button className="btn btn-error">Subir archivos</button>
      <textarea placeholder="Bio" className="textarea textarea-bordered textarea-lg w-full max-w-xs"></textarea>
    </div>
  );
};

export default UploadFiles;
