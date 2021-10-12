import React from "react";
import Person from "./Person";

import Divider from '@mui/material/Divider';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@mui/material/Grid';

const People = ({ contacts, setOneContact }) => {
  const styles = useStyles();
  return (
    
      <Grid container gap={0.5} className={styles.card}  marginTop= {3}>

        {contacts.map((contact) => {
          return (
            <Grid key={contact.contact._id} item xs={12} sm={12} md={4} >
              <Person contact={contact} setOneContact={setOneContact} />
              <Divider variant={'middle'} className={styles.divider} />
            </Grid>
          )
        })}

      </Grid>
    
  );
};



const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
    borderRadius: 16,
    boxShadow: '0 8px 16px 0 #BDC9D7',
    overflow: 'visible'
  },
  header: {
    fontFamily: 'Barlow, san-serif',
    backgroundColor: '#fff',
  },
  headline: {
    color: '#122740',
    fontSize: '1.25rem',
    fontWeight: 600,
  },
  link: {
    color: '#2281bb',
    padding: '0 0.25rem',
    fontSize: '0.875rem',
  },
  actions: {
    color: '#BDC9D7'
  },
  divider: {
    backgroundColor: '#d9e2ee',
    margin: '0 20px',
  }
}));




export default People;
