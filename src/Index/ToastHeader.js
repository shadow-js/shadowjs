import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import useEventCallback from '@restart/hooks/useEventCallback';

import { useShadowPrefix } from './ThemeProvider';
import CloseButton from './CloseButton';
import ToastContext from './ToastContext';

const propTypes = {
  ShadowPrefix: PropTypes.string,

  /**
   * Provides an accessible label for the close
   * button. It is used for Assistive Technology when the label text is not
   * readable.
   */
  closeLabel: PropTypes.string,

  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: PropTypes.bool,
};

const defaultProps = {
  closeLabel: 'Close',
  closeButton: true,
};

const ToastHeader = ({
  ShadowPrefix,
  closeLabel,
  closeButton,
  className,
  children,
  ...props
}) => {
  ShadowPrefix = useShadowPrefix(ShadowPrefix, 'sahdow-toast-header');

  const context = useContext(ToastContext);

  const handleClick = useEventCallback(() => {
    if (context) {
      context.onClose();
    }
  });

  return (
    <div {...props} className={classNames(ShadowPrefix, className)}>
      {children}

      {closeButton && (
        <CloseButton
          label={closeLabel}
          onClick={handleClick}
          className="ml-2 mb-1"
          data-dismiss="toast"
        />
      )}
    </div>
  );
};

ToastHeader.displayName = 'ToastHeader';
ToastHeader.propTypes = propTypes;
ToastHeader.defaultProps = defaultProps;

export default ToastHeader;
