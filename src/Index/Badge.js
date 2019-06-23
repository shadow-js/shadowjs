import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { useShadowPrefix } from './ThemeProvider';

const propTypes = {
 
  ShadowPrefix: PropTypes.string,

  /**
   * The visual style of the badge
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')}
   */
  variant: PropTypes.string,

  pill: PropTypes.bool.isRequired,
};

const defaultProps = {
  pill: false,
};

const Badge = React.forwardRef(
  ({ ShadowPrefix, variant, pill, className, ...props }, ref) => {
    const prefix = useShadowPrefix(ShadowPrefix, 'shadow-badge');
    return (
      <span
        ref={ref}
        {...props}
        className={classNames(
          className,
          prefix,
          pill && `${prefix}-pill`,
          variant && `${prefix}-${variant}`,
        )}
      />
    );
  },
);

Badge.displayName = 'Badge';
Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
