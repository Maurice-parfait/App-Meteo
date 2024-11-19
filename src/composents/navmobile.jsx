import React from "react";

function NavMobile() {

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <section className="bg-slate-50 bg-opacity-40 py-2 px-3 rounded-xl ">
            <section className="flex justify-between text-blue-950">
                <div>
                <button type="button"
                onClick={toggleVisibility}
                className="text-xl"
                >
                    <i class='bx bxs-home text-4xl'></i>
                </button>
                </div>

                <div>
                <button type="button"
                onClick={toggleVisibility}
                className="text-xl"
                >
                    <i class='bx bxs-city text-4xl'></i>
                </button>
                </div>

                <div>
                <button  type="button"
                onClick={toggleVisibility}
                className="text-xl"
                > 
                    <i class='bx bxs-bar-chart-square text-4xl'></i>
                </button>
                </div>
            </section>
        </section>
    )
}

export default NavMobile;