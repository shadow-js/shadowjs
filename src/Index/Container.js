import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useShadowPrefix } from './ThemeProvider';

const propTypes = {
  
  ShadowPrefix: PropTypes.string,


  fluid: PropTypes.bool,
  
  as: PropTypes.elementType,
};

const defaultProps = {
  fluid: false,
};

const Container = React.forwardRef(
  ({ ShadowPrefix, fluid, as: Component = 'div', className, ...props }, ref) => {
    const prefix = useShadowPrefix(ShadowPrefix, 'shadow-container');
    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(className, fluid ? `${prefix}-fluid` : prefix)}
      />
    );
  },
);

Container.displayName = 'Container';
Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
