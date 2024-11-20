import React from "react";

function NavMobile({ setActiveView, views, activeview }) {

    return (
        // la nav bar de pour le mobile 
        <section className="max-sm:bg-slate-50 max-sm:bg-opacity-25 max-sm:py-2 max-sm:px-3 max-sm:rounded-xl max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:w-full">
            <section className="max-sm:flex max-sm:justify-between max-sm:text-blue-950">
                <div>
                <button type="button"
                onClick={() => setActiveView(views.VIEW1)}
                className={activeview === views.VIEW1 ? "rounded-xl bg-opacity-75 text-slate-50" : "text-xl" }
                >
                    <i class='bx bxs-home text-4xl'></i>
                </button>
                </div>

                <div>
                <button  type="button" 
                onClick={() => setActiveView(views.VIEW2)}
                className={activeview === views.VIEW2 ? "rounded-xl bg-opacity-75 text-slate-50" : "text-xl" }>
                    <i class='bx bxs-city text-4xl'></i>
                </button>
                </div>

                <div>
                <button  type="button"
                onClick={() => setActiveView(views.VIEW3)}
                className={activeview === views.VIEW3 ? "rounded-xl bg-opacity-75 text-slate-50" : "text-xl" }
                > 
                    <i class='bx bxs-bar-chart-square text-4xl'></i>
                </button>
                </div>
            </section>
        </section>
    )
}

export default NavMobile;