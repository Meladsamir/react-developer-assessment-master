import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Loader from './Loader';
import Appbar from './Appbar';
import Card from './Card';
import Zoom from '@material-ui/core/Zoom';
const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  cardsContainer: {
    marginTop: 5,
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function App() {
  const classes = useStyles();
  const pageStep = 8;
  const [appState, setAppState] = useState({
    allPosts: [],
    shownPosts: [],
    allCategories: [],
    selectedCategories: [],
    query: '',
    pageLength: pageStep,
    showLoadBtn: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log('in it');
      await fetch('/api/posts')
        .then((res) => res.json())
        .then((json) => {
          const posts = json.posts,
            catigories = GetAllCategories(posts).sort();
          setAppState({
            ...appState,
            allPosts: posts,
            //at the first all posts are shown
            shownPosts: posts,
            //set all categories
            allCategories: catigories,
            //at the first all categories are selected
            selectedCategories: catigories,
            showBtn: true,
          });
        });
    };
    fetchData();
    console.log('in effect');
    console.log(appState.selectedCategories);
  }, []);

  const GetAllCategories = (posts) => {
    let categories = [];
    posts.forEach((post) => {
      post.categories.forEach((category) => {
        if (!categories.includes(category.name)) {
          categories.push(category.name);
        }
      });
    });
    return categories;
  };

  const HandleLoadMore = () => {
    const thereMore =
      appState.pageLength + pageStep < appState.shownPosts.length;
    setAppState({
      ...appState,
      pageLength: thereMore
        ? appState.pageLength + pageStep
        : appState.shownPosts.length,
      showBtn: thereMore,
    });
  };

  const HandleSelectCategory = (categories) => {
    let filteredPosts = [];
    const isNewFilter =
      JSON.stringify(categories.sort()) !==
      JSON.stringify(appState.allCategories);
    //check if not all categories are selected
    if (isNewFilter) {
      appState.allPosts.forEach((post) => {
        for (const category of post.categories) {
          if (categories.includes(category.name)) {
            //if post belongs to selected category then add this post to
            filteredPosts.push(post);
            break;
          }
        }
      });
    } else {
      filteredPosts = appState.allPosts;
    }
    setAppState({
      ...appState,
      selectedCategories: categories,
      shownPosts: filteredPosts,
      pageLength: pageStep,
      showBtn: filteredPosts.length !== 0,
      query: '',
    });
  };

  const HandleQuery = (query) => {
    console.log(query);
    let filteredPosts = [];
    if (query !== '') {
      filteredPosts = appState.shownPosts.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );

      const thereMore = filteredPosts.length >= pageStep;
      setAppState({
        ...appState,
        query: query,
        shownPosts: filteredPosts,
        pageLength: thereMore ? pageStep : filteredPosts.length,
        showBtn: thereMore,
      });
    } else {
      HandleSelectCategory(appState.selectedCategories);
    }
  };

  //show loader if array is empty
  if (appState.allPosts.length === 0) {
    return <Loader />;
  }

  return (
    <div>
      <Appbar
        HandleQuery={HandleQuery}
        Query={appState.query}
        SelectedCategories={appState.selectedCategories}
        Categories={appState.allCategories}
        HandleSelectCategory={HandleSelectCategory}
        ShownPostsNo={
          appState.shownPosts.length > 0
            ? appState.shownPosts.length <= pageStep
              ? appState.shownPosts.length
              : appState.pageLength
            : 0
        }
        FilteredPostsNo={appState.shownPosts.length}
      />
      <div className={classes.appBarSpacer}></div>
      <Grid className={classes.cardsContainer} container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          {appState.shownPosts.slice(0, appState.pageLength).map((post, i) => (
            <Grid key={post.id} item xs={12} sm={6} md={3}>
              <Zoom style={{ transitionDelay: (i + 5) * 10 }} in={true}>
                <Card post={post} />
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {appState.showBtn && (
        <Box textAlign="center">
          <Button
            onClick={HandleLoadMore}
            style={{
              margin: 10,
            }}
            variant="contained"
          >
            LOAD MORE <br />({appState.shownPosts.length - appState.pageLength})
          </Button>
        </Box>
      )}
    </div>
  );
}
