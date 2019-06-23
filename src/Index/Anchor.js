import React from 'react';
import PropTypes from 'prop-types';

import createChainedFunction from './utils/createChainedFunction';

const propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  disabled: PropTypes.bool,
  role: PropTypes.string,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  as: PropTypes.elementType,

  innerRef: PropTypes.any,
};

function isTrivialHref(href) {
  return !href || href.trim() === '#';
}


class Anchor extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleClick(event) {
    const { disabled, href, onClick } = this.props;

    if (disabled || isTrivialHref(href)) {
      event.preventDefault();
    }

    if (disabled) {
      event.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  }

  handleKeyDown(event) {
    if (event.key === ' ') {
      event.preventDefault();
      this.handleClick(event);
    }
  }

  render() {
    const {
    as: Component = 'a',
      disabled,
      onKeyDown,
      innerRef,
      ...props
    } = this.props;

    if (isTrivialHref(props.href)) {
      props.role = props.role || 'button';
      
      props.href = props.href || '#';
    }

    if (disabled) {
      props.tabIndex = -1;
      props['aria-disabled'] = true;
    }
    if (innerRef) props.ref = innerRef;
    return (
      <Component
        {...props}
        onClick={this.handleClick}
        onKeyDown={createChainedFunction(this.handleKeyDown, onKeyDown)}
      />
    );
  }
}

Anchor.propTypes = propTypes;

export default Anchor;
