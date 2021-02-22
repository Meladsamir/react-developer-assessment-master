import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    boxShadow: 'none',
  },
  chip: {
    margin: theme.spacing(0.4),
  },
}));

export default function ChipsArray({ categories }) {
  const classes = useStyles();

  return (
    <Paper component="ul" className={classes.root}>
      {categories.map((category) => {
        return (
          <li key={category.id}>
            <Chip label={category.name} className={classes.chip} />
          </li>
        );
      })}
    </Paper>
  );
}
