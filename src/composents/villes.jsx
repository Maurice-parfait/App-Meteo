import React, { useState, useEffect } from "react";

function VilleMeteo() {
    const [dataville, setDataVille] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            // la clef api 
            const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY_VILLE;
            const CITY_IDS = [
                "2332453,361058,343590,3378644,2314302,2306104,2302357,2312873,2332931,232422,2462881,2473449,2563191,201424,231502,2253356,2240449,2312888,232756", // Premier groupe (20 IDs)
                "251833,2311397,2260494,2377450,2464461,2467454,2470451,2246678,203799,2313033,229051,231833,330144,344972,330145,3369157,342953,239343,231009,2304266" // Deuxième groupe (20 IDs)
            ];

            let results = []; 

            
            for (let i = 0; i < CITY_IDS.length; i++) {
                // le lien api pour recuperer les differentes villes de l'afrique
                const url = `https://api.openweathermap.org/data/2.5/group?id=${CITY_IDS[i]}&units=metric&appid=${API_KEY}`;
                try {
                    const response = await fetch(url);
                    if(!response.ok) throw error('erreur lors de la recuperation de data de la ville');
                    const data = await response.json();
                    results = [...results, ...data.list]; 
                } catch (error) {
                    console.error("Erreur lors de la récupération des données", error);
                }
            }

            setDataVille(results); 
        };

        fetchData();
    }, []);

    return (
        <section className="grid grid-cols-2 gap-3 mt-4 max-md:grid-cols-1 ">
            {dataville.length > 0 ? (
                dataville.map((ville, index) => ( 
                    <section key={ville.id} className=" bg-slate-50 bg-opacity-35 text-blue-950 p-4 rounded-xl grid grid-cols-2 items-center">
                        <section>
                            <h1 className="text-3xl">{ville.name}</h1>
                            <h3>{ville.weather[0].description}</h3>
                            <h1 className="text-2xl">{ville.main.temp} °C</h1>
                        </section>

                        <section className="flex justify-center">
                            <img
                                src={`https://openweathermap.org/img/wn/${ville.weather[0].icon}@2x.png`}
                                alt={ville.weather[0].description}
                            />
                        </section>
                    </section>
                ))
            ) : (
                // le loader por la ville
                <div className="flex justify-center h-screen items-center relative inset-0 ">
                    <div className="flex justify-end w-full max-md:justify-center max-sm:justify-center">
                        <div className="h-7 w-7 animate-ping bg-orange-300 rounded-full" type="button"> </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default VilleMeteo;
