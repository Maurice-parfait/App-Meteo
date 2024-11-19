import js from "@eslint/js";
import React, {useState, useEffect} from "react";

function Previsiondays() {
    const [location, setLocation] = useState(null);
    const [metprevision, setmetprevision] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocation = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude} = position.coords;
                        setLocation({ latitude, longitude});

                        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`;
                        
                        try {
                            const reponse = await fetch(url);
                            if(!reponse.ok) throw error("Ereur lors de la recuperation de donnees !");
                            const data = await reponse.json();
                            setmetprevision(data);
                            // console.log(data);
                        } catch (error) {
                            console.error(error);
                            setError(" les donnees n'est pas charger");
                        }
                    },
                    (error) => {
                        setError(" la geolocatisation a refusee ");
                        console.error(error);
                    }
                )
            } else {
                console.error("la geolocalisation n'est pas supporter par ce navigateur");
                setError(" la geolocalisation n'est pas supporter par ce navigateur ");
            }
        }
        fetchLocation();
    },[]);

     // Associer les codes météo aux icônes
  const PrevisionIcons = {
    0: "☀️", // Ciel clair
    1: "🌤️", // Généralement clair
    2: "⛅",  // Partiellement nuageux
    3: "☁️",  // Couvert
    45: "🌫️", // Brouillard
    48: "🌫️❄️", // Dépôt de brouillard givrant
    51: "🌦️", // Bruine légère
    53: "🌧️", // Bruine modérée
    55: "🌧️🌧️", // Bruine dense
    56: "🌧️❄️", // Bruine verglaçante légère
    57: "🌧️❄️", // Bruine verglaçante dense
    61: "🌦️", // Pluie légère
    63: "🌧️", // Pluie modérée
    65: "🌧️🌧️", // Pluie forte
    66: "🌧️❄️", // Pluie verglaçante légère
    67: "🌧️❄️", // Pluie verglaçante forte
    71: "❄️", // Chute de neige légère
    73: "❄️❄️", // Chute de neige modérée
    75: "❄️❄️❄️", // Chute de neige forte
    77: "❄️💨", // Grains de neige
    80: "🌦️", // Averses de pluie légères
    81: "🌧️", // Averses de pluie modérées
    82: "🌧️🌧️", // Averses de pluie violentes
    85: "❄️🌦️", // Averses de neige légères
    86: "❄️🌧️", // Averses de neige fortes
    95: "⛈️", // Orage léger ou modéré
    96: "⛈️🌨️", // Orage avec grêle légère
    99: "⛈️🌨️🌨️" // Orage avec grêle forte
  };
    return(
        <section className="">
            <div className="text-blue-950">
                <h1 className="text-xl">Prévision Pour 7 jours</h1>
            </div>

            <section className="pt-4">
                {metprevision ? (
                    metprevision.daily.time.map((time, index) => ( 
                        <section key={index} className="text-xl flex justify-between text-blue-950 py-5 border-b-2 border-gray-700">
                            <div>
                                <h1>{index === 0 ? "Aujourd'hui" : new Date(time).toLocaleDateString("fr-FR", {weekday: 'long'}) }</h1>
                            </div>

                            <div>
                                <h1>{PrevisionIcons[metprevision.daily.weather_code[index]]}</h1>
                            </div>

                            <div>
                                <h1>
                                {Math.round(metprevision.daily.temperature_2m_max[index])}°/
                                {Math.round(metprevision.daily.temperature_2m_min[index])}°
                                </h1>
                            </div>
                        </section>
                    ))
                ): (
                    <div className="flex justify-center w-full">
                        <div className="py-56">
                            <div className="h-5 w-5 animate-ping bg-orange-300 rounded-full " type="button"> </div>
                        </div>
                    </div>
                )}
            </section>
        </section>
    )
}

export default Previsiondays;