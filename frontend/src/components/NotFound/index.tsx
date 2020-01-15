import React from 'react'

import { useHistory } from 'react-router'
import makeStyles from '@material-ui/styles/makeStyles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import takenSvg from 'resources/taken.svg'

const NotFound: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Grid container justify='center' alignItems='center' className={classes.root}>
      <Grid item xs={12}>
        <img src={takenSvg} className={classes.svg} alt='1 Claim 404' />
        <Typography variant='body1' gutterBottom className={classes.row}>
          Your link got taken by alien
        </Typography>
        <p className={classes.row}>
          <Button variant='contained' onClick={() => history.push('/app')}>
            go home
          </Button>
        </p>
      </Grid>
    </Grid>
  )
}

export default NotFound
const useStyles = makeStyles((theme: any) => ({
  root: {
    height: '100%'
  },
  row: {
    textAlign: 'center',
    color: theme.palette.text.hint
  },
  svg: {
    width: '30%',
    margin: '0 auto',
    display: 'block',
    marginBottom: theme.spacing(3)
  },
  icon: {
    fontSize: '8rem'
  }
}))