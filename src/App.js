import './App.css';
import {Card, Chart, CountryPicker} from './components';
import functionsApi from './api';
import { useEffect, useState } from 'react';

function App() {
  // document.body.style.backgroundColor = '';

  const [totalDeaths, setTotalDeaths] = useState(0);
  const [totalConfirmed, settotalConfirmed] = useState(0);
  const [objDate, setObjDate] = useState(0);
  // const [dailyGlobalData, setDailyGlobalData] = useState([]);

  const [dailyTotalDeath, setDailyTotalDeath] = useState([]);  
  const [dailyTotalConfirmed, setDailyTotalConfirmed] = useState([]);
  const [dailyDate, setDailyDate] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);

  useEffect(()=>{
    const fetchApi = async() => {
      const data = await functionsApi.fetchSummary();
      console.log('summary: ',data)
      setTotalDeaths(data.Global.TotalDeaths);
      settotalConfirmed(data.Global.TotalConfirmed);
      setObjDate(data.Global.Date);
    }
    fetchApi();

    const fetchGlobalDaily = async() => {
      const data1 = await functionsApi.fetchDailyGlobalData();
      // console.log("daily global data : ", data1);
      // console.log('here dailyGlobalData : ', data1[0]['Date']);
      for(let i=0; i< data1.length; i++){
        data1[i]['Date'] = new Date(data1[i]['Date']).toDateString()
      }
      // setDailyGlobalData(data1);
      // console.log("daily global data : ", data1);

      const sortData = data1.sort((a, b) => {
        return new Date(a['Date']).getTime() - new Date(b['Date']).getTime();
      });
      // console.log('sort data :', sortData)
      // setDailyGlobalData(sortData);
      setDailyDate(sortData.map((element)=> (element['Date'])));
      setDailyTotalConfirmed(sortData.map((element)=> (element['TotalConfirmed'])));
      setDailyTotalDeath(sortData.map((element)=> (element['TotalDeaths'])));
    }
    fetchGlobalDaily();
  },[])

  const onCountryChange = async(country) => {

    setCurrentCountry(country);
    // console.log('got country: ', country);
    let data = await functionsApi.fetchCountryDailyData(country);
    // console.log('country data : ', data);
    setTotalDeaths(data[data.length-1].Deaths);
    settotalConfirmed(data[data.length-1].Confirmed);
    setObjDate(data[data.length-1].Date);


    setDailyDate(data.map((element)=> (new Date(element['Date']).toDateString())));
    setDailyTotalConfirmed(data.map((element)=> (element['Confirmed'])));
    setDailyTotalDeath(data.map((element)=> (element['Deaths'])));

  }

  return (
    <div className="container">
      <Card TotalDeaths={totalDeaths} TotalConfirmed={totalConfirmed} ObjDate={objDate}></Card>
      <CountryPicker onCountryChange={onCountryChange}/>

      <Chart dailyTotalDeath={dailyTotalDeath} dailyTotalConfirmed={dailyTotalConfirmed} dailyDate={dailyDate} currentCountry={currentCountry}></Chart>
    </div>
    
  );
}

export default App;
