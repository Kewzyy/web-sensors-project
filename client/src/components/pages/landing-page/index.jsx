import React from 'react'
import { Dashboard } from '../../blocks/Dashboard'
import { Paper, Typography, List, ListItem } from '@material-ui/core'
import { styles } from './styles'

export const LandingPage = () => {
  const classes = styles()

  return (
    <Dashboard title={'Grupu projekts'}>
      <Paper className={classes.paper}>
        <Typography variant='body1'>Projekta ietvaros realizēti visi sekojošie punkti:</Typography>
        <List>
          <ListItem>1. Izveidota datu attēlošanas pārskata sadaļa &#9989;</ListItem>
          <ListItem>2. Izveidota Ēkas plāna un sensoru sadaļa &#9989;</ListItem>
          <ListItem>3. Izveidota Brīdinājumu sadaļa &#9989;</ListItem>
          <ListItem>4. Realizēta rēallaika informācijas saņemšana &#9989;</ListItem>
        </List>
      </Paper>
    </Dashboard>
  )
}
