export default function Page() {
  return (
    /*Caja Roja*/
    <div className="flex bg-secondary ">
      {/*Caja Azul*/}
      <div className="flex flex-col mx-auto justify-center w-2/3 p-5">
        {/* Caja de Titulo*/}
        <input
          type="text"
          placeholder="Nuevo Titulo"
          className="input input-bordered input-primary w-full max-w-xs mb-5 "
        />
        {/* Caja de Body*/}
        <textarea placeholder="Escribe en Markdown" className="fullscreen-textarea rounded-textarea"></textarea>
      </div>
      {/*Caja Verde */}
      <div className="flex flex-col mx-auto justify-center  w-1/3 p-5">
        <button className="btn mb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          DOWNLOAD
        </button>
        <button className="btn ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          UPLOAD FVM
        </button>
      </div>
    </div>
  );
}
