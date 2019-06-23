import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import createWithShadowPrefix from './utils/createWithPrefix';
import { useShadowPrefix } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'media'
   */
  ShadowPrefix: PropTypes.string,

  as: PropTypes.elementType,
};

const Media = React.forwardRef(
  ({ ShadowPrefix, className, as: Component = 'div', ...props }, ref) => {
    const prefix = useShadowPrefix(ShadowPrefix, 'shadow-media');

    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(className, prefix)}
      />
    );
  },
);

Media.displayName = 'Media';
Media.propTypes = propTypes;

Media.Body = createWithShadowPrefix('shadow-media-body');

export default Media;
