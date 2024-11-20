import React, {useState, useEffect} from "react";

function Realfroid() {
    const [location, setLocation] = useState(null);
    const [meteo, setmeteo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchlocaion = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude });

                        // l'url de l'api
                        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,apparent_temperature,wind_speed_10m,precipitation&daily=uv_index_max`;

                        // la gestion de l'api
                        try {
                            const reponse = await fetch(url);
                            if(!reponse.ok) throw Error("l'ereur lor de la recuperation de donnee meteo");
                            const data = await reponse.json();
                            setmeteo(data);
                        } catch (error) {
                            setError('Ereur lors de la recuperation de donnee meteo de vent etec ...');
                            console.error(error);
                        }
                    },
                    (error) => {
                        console.error("Géolocalisation refusée ou indisponible", error);
                        setError("Géolocalisation refusée ou indisponible.");
                    }
                )
            } else {
                console.error("La géolocalisation n'est pas supportée par ce navigateur.");
                setError("La géolocalisation n'est pas supportée par ce navigateur.");
            }
        }

        fetchlocaion();
    }, []);
    return (
        <section className="text-slate-50 bg-slate-50 bg-opacity-35 px-5  mt-5 rounded-xl">
            <div className="text-blue-950 py-2">
                <h1 className="text-2xl max-sm:text-xl">Conditions Météorologiques </h1>
            </div>

            <section className="grid grid-cols-2 max-sm:grid-cols-2">
                {!meteo ? (
                    <div className="flex justify-center w-full ml-56 max-md:ml-28 max-sm:ml-16">
                        <div className="py-12">
                            <div className="h-12 w-12 animate-spin rounded-full border-8 border-transparent border-t-orange-300 max-sm:border-t-slate-50 max-sm:border-opacity-50" type="button"> </div>
                        </div>
                    </div>
                ): (
                    <>
                        <section className="py-1 text-blue-950">
                            <div>
                                <h1>Sensation réelle</h1>
                            </div>
                            <div className="pl-8 text-slate-50">
                                <h1 className="text-4xl">{meteo.hourly.apparent_temperature[0]} °C</h1>
                            </div>
                        </section>

                        <section className="py-1 text-blue-950">
                            <div>
                                <h1>Vitesse du Vent</h1>
                            </div>
                            <div className="pl-8 text-slate-50">
                                <h1 className="text-4xl">{meteo.current_weather.windspeed} Km/h</h1>
                            </div>
                        </section>

                        <section className="py-1 text-blue-950">
                            <div>
                                <h1>Risque de pluie</h1>
                            </div>
                            <div className="pl-8 text-slate-50">
                                <h1 className="text-4xl">{meteo.hourly.precipitation[0]} %</h1>
                            </div>
                        </section>

                        <section className="py-1 text-blue-950">
                            <div>
                                <h1>Indice UV</h1>
                            </div>
                            <div className="pl-8 text-slate-50">
                                <h1 className="text-4xl"> {meteo.daily.uv_index_max[0]}</h1>
                            </div>
                        </section>
                    </>
                )}
            </section>
        </section>
    )
}

export default Realfroid;