import React from "react";

function NavMobile({ setActiveView, views, activeview }) {

    return (
        <section className="bg-slate-50 bg-opacity-25 py-2 px-3 rounded-xl fixed bottom-0 left-0 w-full">
            <section className="flex justify-between text-blue-950">
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