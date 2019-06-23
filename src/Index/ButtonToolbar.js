import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { useShadowPrefix } from './ThemeProvider';

const propTypes = {
 
  ShadowPrefix: PropTypes.string,

  role: PropTypes.string,
};

const defaultProps = {
  role: 'toolbar',
};

const ButtonToolbar = React.forwardRef(
  ({ ShadowPrefix, className, ...props }, ref) => {
    const prefix = useShadowPrefix(ShadowPrefix, 'shadow-btn-toolbar');

    return (
      <div {...props} ref={ref} className={classNames(className, prefix)} />
    );
  },
);

ButtonToolbar.displayName = 'ButtonToolbar';
ButtonToolbar.propTypes = propTypes;
ButtonToolbar.defaultProps = defaultProps;
export default ButtonToolbar;
