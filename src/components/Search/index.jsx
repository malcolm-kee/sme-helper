import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { SearchView } from './view';

class SearchContainer extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired
    }).isRequired
  };

  handleBack = ev => {
    ev.preventDefault();
    this.props.history.goBack();
  };

  render() {
    return <SearchView onBack={this.handleBack} />;
  }
}

export const Search = withRouter(SearchContainer);

export default Search;
