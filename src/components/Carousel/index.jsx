import React from 'react';

import Carousel from './view';

class CarouselContainer extends React.Component {
  state = {
    activePage: 0
  };

  handlePageChange = (event, value) => {
    this.setState({ activePage: value });
  };

  handleIndexChange = index => {
    this.setState({ activePage: index });
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
