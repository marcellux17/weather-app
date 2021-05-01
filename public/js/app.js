const form = document.querySelector('form');
const infobox = document.querySelector('#info')
form.addEventListener('submit', e => {
    e.preventDefault();
    infobox.textContent = '';
    let loading = document.createElement('img');
    loading.setAttribute('src', '/img/loading.svg');
    let location = form.elements.location.value.trim();
    infobox.appendChild(loading);
    fetch(`/weather?adress=${location}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            loading.remove();
            if(data.error){
                infobox.textContent = data.error;
            }else{
                infobox.textContent = `its ${data.weather.temp}°C but it feels like ${data.weather.feels_like}°C`
            }
        })
        .catch(err => {
            infobox.textContent = 'location could not be found'
        })
    form.reset();
})