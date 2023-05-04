import axios from 'axios';

const fetchSummary = async() => {   // app.js
    let url = 'https://api.covid19api.com/summary';

    const response = await axios.get(url);
    const data = response.data;
    return data;

}

const fetchDailyGlobalData = async() => {  // charts.js
    let url = 'https://api.covid19api.com/world?from=2020-03-01T00:00:00Z&to=2023-03-01T00:00:00Z';
    const response = await axios.get(url);
    const data = response.data;
    return data;
}

const fetchCountries = async() => {
    let url = 'https://api.covid19api.com/countries';
    const response = await axios.get(url);
    const data = response.data;
    return data;
}

const fetchCountryDailyData = async(countryName) => {
    console.log('name: ', countryName);
    let url = `https://api.covid19api.com/country/${countryName}?from=2020-03-01T00:00:00Z&to=2023-04-01T00:00:00Z`;
    const response = await axios.get(url);
    const data = response.data;
    return data;

}

const functionsApi = {
    fetchSummary, fetchDailyGlobalData, fetchCountries, fetchCountryDailyData
}
export default functionsApi;