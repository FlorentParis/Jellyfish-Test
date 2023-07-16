'use client';

import react, { useEffect, useState } from 'react';
import styles from './page.module.css';
import './style/weathericons.css';
import cities from './assets/cities-fr.json';
import getWeather from './hooks/getWeather';
import Image from 'next/image';

export default function Home() {
  interface cityInterface {
    id: number;
    lat: number;
    lon: number;
    nm: string;
  }

  const [citiesList, setCitiesList] = useState<Array<cityInterface>>([]);
  const [citySelected, setCitySelected] = useState<number>(100);
  const [dataCitySelected, setDataCitySelected] = useState<any>('loading');

  useEffect(() => {
    setCitiesList(cities);
    setCitySelected(0);
  }, [cities]);

  useEffect(() => {
    getWeather(citiesList[citySelected])?.then((res) => {
      setDataCitySelected(res);
    });
  }, [citySelected]);

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div className={styles.selection}>
          <label id="city">Sélectionner votre ville</label>
          <select
            name="city"
            onChange={(e) => {
              setDataCitySelected('loading'),
                setCitySelected(parseInt(e.target.value));
            }}
          >
            {citiesList.map((city: cityInterface, key: number) => {
              return <option value={key}>{city.nm}</option>;
            })}
          </select>
        </div>
        {dataCitySelected == 'loading' ? (
          <div className={styles.loader_container}>
            <Image
              src="./icons/loader.svg"
              alt="loader icon"
              width={50}
              height={50}
            />
          </div>
        ) : (
          <>
            <div className={styles.today}>
              <span>{cities[citySelected].nm}</span>
              <span
                className={`wi wi-icon-${dataCitySelected[0]?.weather[0].id}`}
              ></span>
              <span>{`${Math.round(dataCitySelected[0]?.main.temp)} °C`}</span>
            </div>
            <ul className={styles.other}>
              {dataCitySelected.map((weatherDay: any, key: number) => {
                if (key == 0) return;
                return (
                  <li className={styles.element}>
                    <span>
                      {new Date(weatherDay.dt_txt).toString().substring(0, 3)}
                    </span>
                    <span
                      className={`wi wi-icon-${weatherDay.weather[0].id}`}
                    ></span>
                    <span>{Math.round(weatherDay.main.temp_min)}°C</span>
                    <span>{Math.round(weatherDay.main.temp_max)}°C</span>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </section>
    </main>
  );
}
