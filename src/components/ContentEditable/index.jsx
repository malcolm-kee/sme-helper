import React from 'react';
import { findDOMNode } from 'react-dom';

export class ContentEditable extends React.Component {
  lastHtml = null;

  emitChange = () => {
    const html = findDOMNode(this).innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          name: this.props.name,
          value: html
        }
      });
    }
    this.lastHtml = html;
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== findDOMNode(this).innerHTML;
  }

  componentDidUpdate() {
    if (this.props.html !== findDOMNode(this).innerHTML) {
      findDOMNode(this).innerHTML = this.props.html;
    }
  }

  render() {
    const { html, ...restProps } = this.props;

    return (
      <div
        contentEditable={true}
        onInput={this.emitChange}
        onBlur={this.emitChange}
        dangerouslySetInnerHTML={{ __html: html }}
        {...restProps}
      />
    );
  }
}
