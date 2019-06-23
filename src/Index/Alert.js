import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import useControllable from 'uncontrollable/hook';
import useEventCallback from '@restart/hooks/useEventCallback';

import createWithShadowPrefix from './utils/createWithPrefix';
import divWithClassName from './utils/divWithClassName';
import { useShadowPrefix } from './ThemeProvider';
import Fade from './Fade';
import CloseButton from './CloseButton';
import Anchor from './Anchor';

const propTypes = {
  
  ShadowPrefix: PropTypes.string,

  /**
   * The Alert visual variant
   *
   * @type {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'}
   */
  variant: PropTypes.string,

  dismissible: PropTypes.bool,

  
  show: PropTypes.bool,

  onClose: PropTypes.func,

  closeLabel: PropTypes.string,

 
  transition: elementType,
};

const defaultProps = {
  show: true,
  transition: Fade,
  closeLabel: 'Close alert',
};

const controllables = {
  show: 'onClose',
};

const Alert = React.forwardRef((uncontrolledProps, ref) => {
  const {
    ShadowPrefix,
    show,
    closeLabel,
    className,
    children,
    variant,
    onClose,
    dismissible,
    transition: Transition,
    ...props
  } = useControllable(uncontrolledProps, controllables);

  const prefix = useShadowPrefix(ShadowPrefix, 'shadow-alert');
  const handleClose = useEventCallback(e => {
    onClose(false, e);
  });

  const alert = (
    <div
      role="alert"
      {...(Transition ? props : undefined)}
      className={classNames(
        className,
        prefix,
        variant && `${prefix}-${variant}`,
        dismissible && `${prefix}-dismissible`,
      )}
    >
      {dismissible && <CloseButton onClick={handleClose} label={closeLabel} />}
      {children}
    </div>
  );

  if (!Transition) return show ? alert : null;

  return (
    <Transition unmountOnExit ref={ref} {...props} in={show}>
      {alert}
    </Transition>
  );
});

const DivStyledAsH4 = divWithClassName('h4');
DivStyledAsH4.displayName = 'DivStyledAsH4';

Alert.displayName = 'Alert';
Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

Alert.Link = createWithShadowPrefix('shadow-alert-link', {
  Component: Anchor,
});

Alert.Heading = createWithShadowPrefix('shadow-alert-heading', {
  Component: DivStyledAsH4,
});

export default Alert;
