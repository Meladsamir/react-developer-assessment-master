import { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SortIcon from '@material-ui/icons/Sort';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      minWidth: 32,
      paddingLeft: 8,
      paddingRight: 8,
      '& .MuiButton-startIcon': {
        margin: 0,
      },
    },
  },
  hideOnSmall: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
function ButtonCheckboxMenu({
  SelectedCategories,
  Categories,
  HandleSelectCategory,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleChange = (event) => {
    HandleSelectCategory(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl>
        <Button
          id="openMenu"
          variant="contained"
          color="default"
          onClick={handleOpen}
          startIcon={<SortIcon />}
          className={classes.button}
        >
          <span className={classes.hideOnSmall}>
            filter by category ({SelectedCategories.length})
          </span>
        </Button>
        <Select
          multiple
          value={SelectedCategories}
          onChange={handleChange}
          input={<Input id="select-multiple-checkbox" />}
          style={{ display: 'none' }}
          open={open}
          onClose={handleClose}
          MenuProps={{
            anchorEl: document.getElementById('openMenu'),
            style: { marginTop: 60 },
          }}
        >
          {Categories.map((name, index) => (
            <MenuItem key={index} value={name}>
              <Checkbox checked={SelectedCategories.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default ButtonCheckboxMenu;
