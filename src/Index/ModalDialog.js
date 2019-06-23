import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useShadowPrefix } from './ThemeProvider';

const propTypes = {
  /** @default 'modal' */
  ShadowPrefix: PropTypes.string,

  /**
   * Specifies a large or small modal.
   *
   * @type ('sm'|'lg')
   */
  size: PropTypes.string,

  /**
   * Specify whether the Component should be vertically centered
   */
  centered: PropTypes.bool,

  /**
   * Allows scrolling the `<Modal.Body>` instead of the entire Modal when overflowing.
   */
  scrollable: PropTypes.bool,
};

const ModalDialog = React.forwardRef(
  (
    { ShadowPrefix, className, centered, size, children, scrollable, ...props },
    ref,
  ) => {
    ShadowPrefix = useShadowPrefix(ShadowPrefix, 'shadow-modal');
    const dialogClass = `${ShadowPrefix}-dialog`;

    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          dialogClass,
          className,
          size && `${ShadowPrefix}-${size}`,
          centered && `${dialogClass}-centered`,
          scrollable && `${dialogClass}-scrollable`,
        )}
      >
        <div className={classNames(`${ShadowPrefix}-content`)}>{children}</div>
      </div>
    );
  },
);

ModalDialog.displayName = 'ModalDialog';
ModalDialog.propTypes = propTypes;

export default ModalDialog;
