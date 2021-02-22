import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    borderRadius: '5%',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function Author({ author }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt={author.name} src={author.avatar} className={classes.large} />
      <span>{author.name}</span>
    </div>
  );
}
