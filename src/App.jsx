import React, { useState, useEffect} from "react";
import 'boxicons/css/boxicons.min.css';
import OneCall from "./composents/meteo_onecall";
import Realfroid from "./composents/Aircondition";
import Previsiondays from "./composents/Previsionjous";
import VilleMeteo from "./composents/villes";
import NavMobile from "./composents/navmobile";

// Définition des différentes vues
const VIEWS = {
  VIEW1: "view1",
  VIEW2: "view2",
  VIEW3: "view3",
};

export default function MyApp() {
  // pour verifier les views 
  const [activeview, setActiveView] = useState(VIEWS.VIEW1);

  //Pour la verification de la localisation
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchlocaion = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async position => {
            const {latitude, longitude} = position.coords;
            setLocation({ latitude, longitude });

            
            const apiKey_geoloc = import.meta.env.VITE_REACT_APP_API_KEY_WEATHER_GEOLOC;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey_geoloc}&units=metric`;
            
            try {
              const reponse = await fetch(url);
              const data = await reponse.json();
              setWeatherData(data);
            } catch (error) {
              setError('Erreur de récupération des données météo');
              console.error(error);
              
            }
          },
          (error) => {
            console.error("Géolocalisation refusée ou indisponible", error);
          }
        );
        
      }else {
        console.error("La géolocalisation n'est pas supportée par ce navigateur.");
      }
    };

    fetchlocaion();
  }, []);

  //***************** la logique pour la responsivite ****************************

  return (
    <section className="font-Roboto h-screen bg-gray-950 grid grid-cols-Grid gap-3 py-2 px-2 bg-[url('./assets/images/background.jpeg')] 
    bg-cover bg-center w-ful max-md:overflow-auto max-md:h-screen max-sm:grid-cols-1 max-sm:fixed max-sm:w-full">

      {/* colonne 1 */}
      <section className="bg-slate-50 bg-opacity-35 px-2 rounded-xl max-sm:hidden">
        <div className="py-4 flex justify-center"> 
          <button type="button">
            <i className='bx bx-wind text-2xl bg-orange-400 text-slate-50 p-2 rounded-xl' ></i>
          </button>
        </div>

        <div className="mt-10 flex flex-col justify-center">
          <button
            type="button"
            onClick={() => setActiveView(VIEWS.VIEW1)}
            className={activeview === VIEWS.VIEW1 ? "bg-orange-400 rounded-xl bg-opacity-75" : ""} 
          >
            <i className='bx bx-shower text-2xl py-2 px-3 text-blue-950 rounded-xl hover:bg-orange-400'>
              <h4 className="text-lg"> Meteo </h4>
            </i>
          </button>

          <button type="button"
            onClick={() => setActiveView(VIEWS.VIEW2)}
            className={activeview === VIEWS.VIEW2 ? "bg-orange-400 rounded-xl bg-opacity-75" : ""} 
          >
            <i class='bx bxs-city text-2xl  py-2 px-3 text-blue-950 rounded-xl hover:bg-orange-400'>
              <h4 className="text-lg">Villes</h4>
            </i>
          </button>
        </div>
      </section>

      
      {/* Le Premier view */}
      {activeview === "view1" && (
        <>
          {/* colle 2*/}
          <section className="grid grid-cols-Grideux gap-3 pr-2 max-lg:overflow-auto max-lg:grid-cols-1 max-md:overflow-auto max-md:grid-cols-1 
          max-sm:h-[90vh]">
            {/* colonne 1 Grideux */}
            <section className="rounded-xl min-w-[90%] overflow-auto scrollbar scrollbar-none max-lg:overflow-visible max-lg:scrollbar-default max-md:overflow-visible max-md:scrollbar-default
            max-sm:overflow-auto max-sm:min-w-full max-sm:max-w-full max-sm:h-[86vh]">
              <div className=" bg-slate-50 z-50 bg-opacity-40 py-1 rounded-xl ">
                <h1 className="flex justify-center text-5xl text-blue-950 max-sm:text-center max-sm:text-4xl">Meteo-App</h1>
              </div>
              <section className="px-10 flex items-center max-sm:flex-col max-sm:mt-5">
                {!weatherData ? (
                  <div className="flex justify-center w-full">
                    <div className="py-20">
                      <button
                        className="animate-ping h-5 w-5 rounded-full bg-orange-300"
                        type="button"
                      ></button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-1/2 max-sm:w-full">
                      <div>
                        <h1 className="text-slate-50 text-4xl font-semibold">{weatherData.name}</h1>
                        <p className="py-2 text-slate-50">
                          {weatherData.weather[0].description}
                        </p>
                      </div>
                      <div className="py-6 text-6xl text-slate-50">
                        <h1>{weatherData.main.temp} °C</h1>
                      </div>
                    </div>
                    <div className="w-1/2 flex justify-center max-sm:w-full">
                      <img
                        className="min-h-64 max-h-64"
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={weatherData.weather[0].description}
                      />
                    </div>
                  </>
                )}
              </section>

              {/* Meteo today */}
              <OneCall />

              {/* Air cond */}
              <Realfroid />
            </section>

            

            {/*colonne 2 Grideux */}
            <section className="bg-slate-50 bg-opacity-35 mt-36 rounded-xl py-4 px-4 overflow-auto scrollbar-none max-lg:overflow-visible 
            max-lg:scrollbar-default max-lg:mt-0  max-md:mt-0  max-md:overflow-visible max-md:scrollbar-default max-sm:hidden">
              <Previsiondays />
            </section>


          </section>
          
        </>
      )}

      {/* ********************* LA PARTIE DE VIEW 2 ********************** */}
      {activeview === VIEWS.VIEW2 && (
        <section className="rounded-xl h-screen px-4 py-4 overflow-auto scrollbar scrollbar-none bg-slate-50 bg-opacity-35 max-sm:h-[84vh] max-sm:overflow-auto">
          <section>
            <h2 className="text-blue-950 text-5xl flex justify-center max-sm:text-4xl">Liste des Villes</h2>
            <VilleMeteo />
          </section>
        </section>
      )}

      {/* pour la partie mobile  */}
      {activeview === "view3" && (
        <section className="bg-slate-50 hidden bg-opacity-35 mt-0 rounded-xl py-4 px-4 overflow-auto scrollbar-none 
        text-xl text-center max-sm:block h-[84vh]">
          <Previsiondays />
        </section>

      )}

      {/* la nav bar pour le phone mobile */}
      <section className="hidden max-sm:block">
          < NavMobile activeview={activeview} setActiveView={setActiveView} views={VIEWS} />
      </section>

    </section>
  );
}


