import React, { useEffect, useState } from 'react'
import { FormControl, NativeSelect } from '@material-ui/core'
import functionsApi from '../../api'
import cx from 'classnames';
import styles from './CountryPicker.module.css'
export default function CountryPicker(props) {

  const [countries, setcountries] = useState([]);

  useEffect(()=> {

    const fetchcountries = async() => {
      let data = await functionsApi.fetchCountries();
      setcountries(data);
    }
    fetchcountries();
  }, [])

  return (
    <FormControl className={cx(styles.container)}>
      <NativeSelect defaultValue="" onChange={(e)=>{props.onCountryChange(e.target.value)}}>
        {countries.length > 0 ? countries.map((element, index)=> {
          return <option key={index} value = {element.Slug}>{element.Country}</option>
        }) : ""}
        <option value='global'>Global</option>
      </NativeSelect>
    </FormControl>
  )
}
