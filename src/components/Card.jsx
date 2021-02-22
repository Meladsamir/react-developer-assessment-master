import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Author from './Author';
import CardHeader from '@material-ui/core/CardHeader';
import CategoriesList from './CategoriesList';

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
});

export default function MediaCard({ post }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader title={post.title} subheader={post.publishDate} />
      <CardContent>
        <div className={classes.summary}>
          <Typography variant="h6" gutterBottom>
            {post.summary}
          </Typography>
        </div>
      </CardContent>
      <Author author={post.author} />
      <CategoriesList
        className={classes.categoriesList}
        categories={post.categories}
      />
    </Card>
  );
}
