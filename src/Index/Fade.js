import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Transition, {
  ENTERED,
  ENTERING,
} from 'react-transition-group/Transition';
import onEnd from 'dom-helpers/transition/end';
import triggerBrowserReflow from './utils/triggerBrowserReflow';

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
};

const defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
};

const fadeStyles = {
  [ENTERING]: 'show',
  [ENTERED]: 'show',
};

class Fade extends React.Component {
  handleEnter = node => {
    triggerBrowserReflow(node);
    if (this.props.onEnter) this.props.onEnter(node);
  };

  render() {
    const { className, children, ...props } = this.props;

    return (
      <Transition addEndListener={onEnd} {...props} onEnter={this.handleEnter}>
        {(status, innerProps) =>
          React.cloneElement(children, {
            ...innerProps,
            className: classNames(
              'fade',
              className,
              children.props.className,
              fadeStyles[status],
            ),
          })
        }
      </Transition>
    );
  }
}

Fade.propTypes = propTypes;
Fade.defaultProps = defaultProps;

export default Fade;
