import React from 'react'
import Container from 'react-bootstrap/Container'
import {Card, CardContent, Typography, Grid} from '@material-ui/core'
import CountUp from 'react-countup';
import cx from 'classnames';
import styles from './Card.module.css'
export default function Cards({TotalDeaths, TotalConfirmed, ObjDate}) {
  if(!TotalDeaths || !TotalConfirmed || !ObjDate){
    return;
  }
  return (

    <Container className={styles.container}>
        <Grid container spacing={3}>
          <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
            <CardContent>
              <Typography color='textSecondary' gutterBottom>Infected</Typography>
              <CountUp
              start={0}
              end={TotalConfirmed}
              duration={2.75}
              separator=",">
                
              </CountUp>

              <Typography color='textSecondary' >{new Date(ObjDate).toDateString()}</Typography>
              <Typography variant='body2'>Number of active cases of Covid 19</Typography>

            </CardContent>
          </Grid>

          <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
            <CardContent>
              <Typography color='textSecondary' gutterBottom>Recoveries</Typography>
              <CountUp
              start={0}
              end={TotalConfirmed - TotalDeaths}
              duration={2.75}
              separator=",">
                
              </CountUp>
              <Typography color='textSecondary' >{new Date(ObjDate).toDateString()}</Typography>
              <Typography variant='body2'>Number of recoveries from Covid 19</Typography>

            </CardContent>
          </Grid>

          <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.death)}>
            <CardContent>
              <Typography color='textSecondary' gutterBottom>Deaths</Typography>
              <CountUp
              start={0}
              end={TotalDeaths}
              duration={2.75}
              separator=",">
                
              </CountUp>
              <Typography color='textSecondary' >{new Date(ObjDate).toDateString()}</Typography>
              <Typography variant='body2'>Number of deaths from Covid 19</Typography>

            </CardContent>
          </Grid>
        </Grid>
    </Container>
  )
}
