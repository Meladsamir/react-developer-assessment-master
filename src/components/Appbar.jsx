import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CategoryFilter from './CategoryFilter';

const useStyles = makeStyles((theme) => ({
  root: {},

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'block',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  results: {
    flexGrow: 1,
    fontSize: 14,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar({
  HandleQuery,
  Query,
  SelectedCategories,
  Categories,
  HandleSelectCategory,
  ShownPostsNo,
  FilteredPostsNo,
}) {
  const classes = useStyles();

  const HandleInput = (event) => {
    const query = event.target.value.trim();
    HandleQuery(query);
  };
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Posts
          </Typography>
          <Typography className={classes.results} variant="h6" noWrap>
            Display ({ShownPostsNo}) of ({FilteredPostsNo}) results
          </Typography>
          <CategoryFilter
            SelectedCategories={SelectedCategories}
            Categories={Categories}
            HandleSelectCategory={HandleSelectCategory}
          />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={Query}
              onChange={HandleInput}
              placeholder="Search by title…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
