import classNames from 'classnames';
import css from 'dom-helpers/style';
import React from 'react';
import PropTypes from 'prop-types';
import onEnd from 'dom-helpers/transition/end';
import Transition, {
  EXITED,
  ENTERED,
  ENTERING,
  EXITING,
} from 'react-transition-group/Transition';

import triggerBrowserReflow from './utils/triggerBrowserReflow';
import createChainedFunction from './utils/createChainedFunction';

const MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight'],
};

function getDimensionValue(dimension, elem) {
  let offset = `offset${dimension[0].toUpperCase()}${dimension.slice(1)}`;
  let value = elem[offset];
  let margins = MARGINS[dimension];

  return (
    value +
    parseInt(css(elem, margins[0]), 10) +
    parseInt(css(elem, margins[1]), 10)
  );
}

const collapseStyles = {
  [EXITED]: 'collapse',
  [EXITING]: 'collapsing',
  [ENTERING]: 'collapsing',
  [ENTERED]: 'collapse show',
};

const propTypes = {

  in: PropTypes.bool,

  mountOnEnter: PropTypes.bool,

  
  unmountOnExit: PropTypes.bool,

  
  appear: PropTypes.bool,

  
  timeout: PropTypes.number,

 
  onEnter: PropTypes.func,
  
  onEntering: PropTypes.func,

  onEntered: PropTypes.func,

  onExit: PropTypes.func,
  
  onExiting: PropTypes.func,
 
  onExited: PropTypes.func,

  
  dimension: PropTypes.oneOfType([
    PropTypes.oneOf(['height', 'width']),
    PropTypes.func,
  ]),

  
  getDimensionValue: PropTypes.func,


  role: PropTypes.string,
};

const defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,

  dimension: 'height',
  getDimensionValue,
};

class Collapse extends React.Component {
  getDimension() {
    return typeof this.props.dimension === 'function'
      ? this.props.dimension()
      : this.props.dimension;
  }

  /* -- Expanding -- */
  handleEnter = elem => {
    elem.style[this.getDimension()] = '0';
  };

  handleEntering = elem => {
    const dimension = this.getDimension();
    elem.style[dimension] = this._getScrollDimensionValue(elem, dimension);
  };

  handleEntered = elem => {
    elem.style[this.getDimension()] = null;
  };

  /* -- Collapsing -- */
  handleExit = elem => {
    const dimension = this.getDimension();
    elem.style[dimension] = `${this.props.getDimensionValue(
      dimension,
      elem,
    )}px`;
    triggerBrowserReflow(elem);
  };

  handleExiting = elem => {
    elem.style[this.getDimension()] = null;
  };

  // for testing
  _getScrollDimensionValue(elem, dimension) {
    const scroll = `scroll${dimension[0].toUpperCase()}${dimension.slice(1)}`;
    return `${elem[scroll]}px`;
  }

  render() {
    const {
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      className,
      children,
      ...props
    } = this.props;

    delete props.dimension;
    delete props.getDimensionValue;

    const handleEnter = createChainedFunction(this.handleEnter, onEnter);
    const handleEntering = createChainedFunction(
      this.handleEntering,
      onEntering,
    );
    const handleEntered = createChainedFunction(this.handleEntered, onEntered);
    const handleExit = createChainedFunction(this.handleExit, onExit);
    const handleExiting = createChainedFunction(this.handleExiting, onExiting);

    return (
      <Transition
        addEndListener={onEnd}
        {...props}
        aria-expanded={props.role ? props.in : null}
        onEnter={handleEnter}
        onEntering={handleEntering}
        onEntered={handleEntered}
        onExit={handleExit}
        onExiting={handleExiting}
      >
        {(state, innerProps) =>
          React.cloneElement(children, {
            ...innerProps,
            className: classNames(
              className,
              children.props.className,
              collapseStyles[state],
              this.getDimension() === 'width' && 'width',
            ),
          })
        }
      </Transition>
    );
  }
}

Collapse.propTypes = propTypes;
Collapse.defaultProps = defaultProps;

export default Collapse;
