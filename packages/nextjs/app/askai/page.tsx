export default function Page() {
  return (
    /*Caja Roja*/

    <div className="flex bg-secondary ">
      {/*Caja Azul*/}
      <div className="flex flex-col mx-auto justify-center w-2/3 p-5">
        <div>
          {/* Caja de Titulo*/}
          <input
            type="text"
            placeholder="Ask your notes"
            className="input input-bordered input-primary w-full max-w-xs mb-5 "
          />
          <button className="btn btn-error ">Submit</button>
        </div>

        {/* Caja de Body*/}
        <textarea placeholder="Answer..." className="fullscreen-textarea rounded-textarea"></textarea>
      </div>
      {/*Caja Verde */}
      <div className="flex flex-col mx-auto justify-center  w-1/3 p-5  rounded-textarea">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
              Open drawer
            </label>
          </div>

          <div className="drawer-side  rounded-textarea ">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-5 w-80 min-h-full bg-base-100 text-base-content rounded-textarea ">
              <ul className="menu p-5 w-80 min-h-full bg-base-100 text-base-content rounded-lg"></ul>
              <div
                className="hero min-h-screen"
                style={{
                  backgroundImage: "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
                }}
              >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                  <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Your notes here</h1>
                    <p className="mb-5"></p>
                    <button className="btn btn-primary">*notes*</button>
                  </div>
                </div>
              </div>
              {/* Sidebar content here */}
              <li>
                <a>Nota 1 </a>
              </li>
              <li>
                <a>Nota 2</a>
              </li>
              <li>
                <a>Nota 3</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
