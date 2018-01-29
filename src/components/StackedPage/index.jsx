import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import StackedPage from './view';

class StackedPageContainer extends React.Component {
  static propTypes = {
    navTitle: PropTypes.string
  };

  static defaultProps = {
    navTitle: ''
  };

  handleBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    return <StackedPage onBack={this.handleBack} {...this.props} />;
  }
}

export default withRouter(StackedPageContainer);
