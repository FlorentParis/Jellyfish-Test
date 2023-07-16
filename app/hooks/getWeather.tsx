export default function getWeather(city: any) {
  if (city) {
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=001bfe5e09fd4ab646f217c3705ad3f7&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        const parsedData = [];

        for (let i = 0; i < 32; i += 8) {
          const weather = data.list[i];
          parsedData.push(weather);
        }

        return parsedData;
      });
  }
}
