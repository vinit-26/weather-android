import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from '../global-variables.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public api: {
    apiKey: '793c48a9808a6c9a952d5de7017cef2e',
    baseUrl: 'https://api.openweathermap.org/data/2.5/'
  }

  setPosition(position) {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    let apiUrl = 'https://api.openweathermap.org/data/2.5/'
    let apiKey = '793c48a9808a6c9a952d5de7017cef2e';
    const api2 = `${apiUrl}weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    fetch(api2)
      .then(weather => {
        return weather.json();
      }).then(data => {
        // this.global.apiData = data;
        const notificationElmnt = document.querySelector('.notification') as HTMLElement;
        notificationElmnt.style.display = 'none';
        data.main.temp = Math.floor(data.main.temp) - 273;
        data.main.temp_min = Math.floor(data.main.temp_min) - 273;
        data.main.temp_max = Math.floor(data.main.temp_max) - 273;
        const city = document.querySelector('.location .city');
        city.innerHTML = `${data.name} ${data.sys.country}`;

        const date = document.querySelector('.location .date');
        const now = new Date();
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = days[now.getDay()];
        const date1 = now.getDate();
        const month = months[now.getMonth()];
        const year = now.getFullYear();
        date.innerHTML = `${day} ${date1} ${month} ${year}`;


        const image = document.querySelector('.location .image2');
        image.innerHTML = `<img src="../../assets/icon/${data.weather[0].icon}.png" alt="image"/>`;
        const temp = document.querySelector('.current .temp');
        temp.innerHTML = `${(data.main.temp).toFixed(0)}<span>&deg;C</span>`;
        const weather = document.querySelector('.current .weather');
        weather.innerHTML = `${data.weather[0].main}`;
        const lowHigh = document.querySelector('.current .hi-low');
        lowHigh.innerHTML = `Max: ${(data.main.temp_max).toFixed(0)}<span>&deg;C</span><br> Min: 
        ${(data.main.temp_min).toFixed(0)}<span>&deg;C</span>`;
      });
  }


  showError(error) {
    const notificationElmnt = document.querySelector('.notification') as HTMLElement;
    notificationElmnt.style.display = 'block';
    notificationElmnt.innerHTML = `<p> ${error.message} </p>`;
  }

  getResult(event) {
    if (event.keyCode === 13) {
      let apiUrl = 'https://api.openweathermap.org/data/2.5/'
      let apiKey = '793c48a9808a6c9a952d5de7017cef2e';
      const value = event.target.value
      const api1 = `${apiUrl}weather?q=${value}&units=metric&appid=${apiKey}`;
      fetch(api1)
        .then(weather => {
          return weather.json();
        }).then(data => {
          if (data.cod !== '404') {
            const notificationElmnt = document.querySelector('.notification') as HTMLElement;
            notificationElmnt.style.display = 'none';
            const city = document.querySelector('.location .city');
            city.innerHTML = `${data.name} ${data.sys.country}`;

            const date = document.querySelector('.location .date');
            const now = new Date();
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const day = days[now.getDay()];
            const date1 = now.getDate();
            const month = months[now.getMonth()];
            const year = now.getFullYear();
            date.innerHTML = `${day} ${date1} ${month} ${year}`;


            const image = document.querySelector('.location .image2');
            image.innerHTML = `<img src="../../assets/icon/${data.weather[0].icon}.png" alt="image"/>`;
            const temp = document.querySelector('.current .temp');
            temp.innerHTML = `${(data.main.temp).toFixed(0)}<span>&deg;C</span>`;
            const weather = document.querySelector('.current .weather');
            weather.innerHTML = `${data.weather[0].main}`;
            const lowHigh = document.querySelector('.current .hi-low');
            lowHigh.innerHTML = `Max: ${(data.main.temp_max).toFixed(0)}<span>&deg;C</span><br> Min: 
            ${(data.main.temp_min).toFixed(0)}<span>&deg;C</span>`;
          }
          else {
            const notificationElmnt = document.querySelector('.notification') as HTMLElement;
            notificationElmnt.style.display = 'block';
            notificationElmnt.innerHTML = `<p>${data.message}</p>`;
          }
        });
    }
  }


  getResultByLatNlon(api: string) {
    // fetch(api)
    //   .then(weather => {
    //     return weather.json();
    //   }).then(weather => {
    //     weather.main.temp = Math.floor(weather.main.temp) - 273;
    //     weather.main.temp_min = Math.floor(weather.main.temp_min) - 273;
    //     weather.main.temp_max = Math.floor(weather.main.temp_max) - 273;
    //     // displayResults(weather);
    //   });
  }
  displayResults(data) {
    const city = document.querySelector('.location .city');
    const date = document.querySelector('.location .date');
    city.innerHTML = `${data.name} ${data.sys.country}`;

    const now = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[now.getDay()];
    const date1 = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    date.innerHTML = `${day} ${date1} ${month} ${year}`;

    const image = document.querySelector('.location .image');
    image.innerHTML = `<img src="./icons/${data.weather[0].icon}.png" alt="image"/>`;
    const temp = document.querySelector('.current .temp');
    temp.innerHTML = `${(data.main.temp).toFixed(0)}<span>&deg;C</span>`;
    const weather = document.querySelector('.current .weather');
    weather.innerHTML = `${data.weather[0].main}`;
    const lowHigh = document.querySelector('.current .hi-low');
    lowHigh.innerHTML = `MAX: ${(data.main.temp_max).toFixed(0)}<span>&deg;C</span><br> MIN: 
    ${(data.main.temp_min).toFixed(0)}<span>&deg;C</span>`;
  }

  dateBuilder() {
    const now = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  }
  ngOnInit() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(this.setPosition, this.showError);
    }
    else {
      const notificationElmnt = document.querySelector('.notification') as HTMLElement;
      notificationElmnt.style.display = 'block';
      notificationElmnt.innerHTML = "<p>Browser Doesn't support Geploaction</p>";
    }

  }
}
