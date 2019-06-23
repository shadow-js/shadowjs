import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { createShadowComponent } from './ThemeProvider';

class Image extends React.Component {
  static propTypes = {
    /**
     * @default 'img'
     */
    ShadowPrefix: PropTypes.string,
    /**
     * Sets image as fluid image.
     */
    fluid: PropTypes.bool,

    /**
     * Sets image shape as rounded.
     */
    rounded: PropTypes.bool,

    /**
     * Sets image shape as circle.
     */
    roundedCircle: PropTypes.bool,

    /**
     * Sets image shape as thumbnail.
     */
    thumbnail: PropTypes.bool,
  };

  static defaultProps = {
    fluid: false,
    rounded: false,
    roundedCircle: false,
    thumbnail: false,
  };

  render() {
    const {
      ShadowPrefix,
      className,
      fluid,
      rounded,
      roundedCircle,
      thumbnail,
      ...props
    } = this.props;

    const classes = classNames(
      fluid && `${ShadowPrefix}-responsive`,
      rounded && `rounded`,
      roundedCircle && `rounded-circle`,
      thumbnail && `${ShadowPrefix}-thumbnail`,
    );

    return (
      <img // eslint-disable-line jsx-a11y/alt-text
        {...props}
        className={classNames(className, classes)}
      />
    );
  }
}

export default createShadowComponent(Image, 'shadowimg');
