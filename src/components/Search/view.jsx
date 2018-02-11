import React from 'react';

import Downshift from 'downshift';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Input, { InputAdornment } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';

const styles = themes => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: themes.zIndex.modal
  },
  content: {
    flex: 1,
    overflowY: 'scroll'
  }
});

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' }
];

const BackBtn = ({ onClick }) => (
  <InputAdornment position="start">
    <IconButton onClick={onClick}>
      <Icon>arrow_back</Icon>
    </IconButton>
  </InputAdornment>
);

const SearchBtn = () => (
  <InputAdornment position="end">
    <IconButton>
      <Icon>search</Icon>
    </IconButton>
  </InputAdornment>
);

const renderTextInput = inputProps => {
  const { InputProps, ref, ...other } = inputProps;

  return <Input {...other} inputRef={ref} {...InputProps} />;
};

const renderSuggestion = params => {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = params;
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem === suggestion.label;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{ fontWeight: isSelected ? 500 : 400 }}
    >
      {suggestion.label}
    </MenuItem>
  );
};

const getSuggestion = inputValue => {
  let count = 0;

  return suggestions.filter(suggestion => {
    const keep =
      (!inputValue ||
        suggestion.label.toLowerCase().includes(inputValue.toLowerCase())) &&
      count < 5;

    if (keep) {
      count += 1;
    }

    return keep;
  });
};

export const SearchView = withStyles(styles)(({ classes, onBack }) => (
  <div className={classes.root}>
    <AppBar position="static" color="default">
      <Downshift itemToString={item => (item === null ? '' : item.label)}>
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex
        }) => (
          <div>
            <Toolbar>
              {renderTextInput({
                fullWidth: true,
                disableUnderline: true,
                InputProps: getInputProps({
                  placeholder: 'Search',
                  id: 'searchInput'
                }),
                startAdornment: <BackBtn onClick={onBack} />,
                endAdornment: <SearchBtn />
              })}
            </Toolbar>
            {isOpen ? (
              <Paper square>
                {getSuggestion(inputValue).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.label }),
                    highlightedIndex,
                    selectedItem
                  })
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    </AppBar>
    Search goes here
  </div>
));
