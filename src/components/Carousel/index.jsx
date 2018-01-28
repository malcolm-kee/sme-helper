import React from 'react';
import PropTypes from 'prop-types';

import Carousel from './view';

class CarouselContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onPageChange: PropTypes.func
  };

  static defaultProps = {
    onPageChange: function noop() {
      /* do nothing */
    }
  };

  state = {
    activePage: 0
  };

  handlePageChange = (event, value) => {
    this.setState({ activePage: value });
    this.props.onPageChange(value);
  };

  handleIndexChange = index => {
    this.setState({ activePage: index });
    this.props.onPageChange(index);
  };

  render() {
    return (
      <Carousel
        activePage={this.state.activePage}
        onPageChange={this.handlePageChange}
        onIndexChange={this.handleIndexChange}
        {...this.props}
      />
    );
  }
}

export default CarouselContainer;
