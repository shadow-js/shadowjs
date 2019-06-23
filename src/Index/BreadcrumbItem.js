import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Anchor from './Anchor';
import { useShadowPrefix } from './ThemeProvider';

const propTypes = {
 
  ShadowPrefix: PropTypes.string,
  
  active: PropTypes.bool,

  href: PropTypes.string,
 
  title: PropTypes.node,
  
  target: PropTypes.string,

  as: PropTypes.elementType,
};

const defaultProps = {
  active: false,
};

const BreadcrumbItem = React.forwardRef(
  ({ ShadowPrefix, active, className, as: Component = 'li', ...props }, ref) => {
    const prefix = useShadowPrefix(ShadowPrefix, 'shadow-breadcrumb-item');

    const { href, title, target, ...elementProps } = props;
    const linkProps = { href, title, target };

    return (
      <Component
        ref={ref}
        className={classNames(prefix, className, { active })}
        aria-current={active ? 'page' : undefined}
      >
        {active ? (
          <span {...elementProps} className={classNames({ active })} />
        ) : (
          <Anchor {...elementProps} {...linkProps} />
        )}
      </Component>
    );
  },
);

BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbItem.propTypes = propTypes;
BreadcrumbItem.defaultProps = defaultProps;

export default BreadcrumbItem;
