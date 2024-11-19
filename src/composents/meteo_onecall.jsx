import React, { useState, useEffect } from "react";

function OneCall() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });

            // Remplir l'URL de l'API avec les coordonnées de l'utilisateur
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code`;

            try {
              const response = await fetch(url);
              if (!response.ok) throw new Error("Erreur lors de la récupération de la météo");
              const data = await response.json();
              setWeather(data.hourly); // Obtenez les données horaires
              // console.log(data.hourly);
            } catch (error) {
              setError("Erreur lors de la récupération de la météo heure par heure.");
              console.error(error);
            }
          },
          (error) => {
            console.error("Géolocalisation refusée ou indisponible", error);
            setError("Géolocalisation refusée ou indisponible.");
          }
        );
      } else {
        console.error("La géolocalisation n'est pas supportée par ce navigateur.");
        setError("La géolocalisation n'est pas supportée par ce navigateur.");
      }
    };

    fetchLocation();
  }, []);

  // Associer les codes météo aux icônes
  const weatherIcons = {
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
  

  return (
    <section className="bg-slate-50 bg-opacity-35 rounded-xl px-2 py-2 max-w-full ">
      <div className="text-blue-950 py-1">
        <h1 className="text-xl">Aujourd'hui</h1>
      </div>

      <section className="flex flex-row max-w-full min-w-full overflow-x-scroll scrollbar-none hover:scrollbar scrollbar-thumb-slate-700">
        {weather ? (
          weather.time.slice(0, 24).map((time, index) => (
            <div key={index} className="min-w-28 border-r-2 border-slate-50">
              <h1 className="text-blue-950 flex justify-center">
                {new Date(time).getHours()}h:00
              </h1>
              <div>
                <h1 className="flex justify-center  text-3xl">
                  {weatherIcons[weather.weather_code[index]] || "❓"}
                </h1>
                <div className="flex justify-center text-blue-950 py-2 text-xl">
                  <h1>{weather.temperature_2m[index]}°</h1>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center w-full">
            <div className="py-8">
              <div className="h-16 w-16 animate-spin  rounded-full border-8 border-transparent  border-t-orange-300" type="button"> </div>
            </div>
          </div>
        )}
      </section>
    </section>
  );
}

export default OneCall;
