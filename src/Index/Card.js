import classNames from 'classnames';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useShadowPrefix } from './ThemeProvider';
import createWithShadowPrefix from './utils/createWithPrefix';
import divWithClassName from './utils/divWithClassName';
import CardContext from './CardContext';
import CardImg from './CardImg';

const DivStyledAsH5 = divWithClassName('h5');
const DivStyledAsH6 = divWithClassName('h6');

const CardBody = createWithShadowPrefix('card-body');

const propTypes = {
  
  ShadowPrefix: PropTypes.string,

  /**
   * Sets card background
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light')}
   */
  bg: PropTypes.string,

  /**
   * Sets card text color
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light'|'white'|'muted')}
   */
  text: PropTypes.string,

  /**
   * Sets card border color
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light')}
   */
  border: PropTypes.string,


  body: PropTypes.bool,

  as: PropTypes.elementType,
};

const defaultProps = {
  body: false,
};

const Card = React.forwardRef(
  (
    {
      ShadowPrefix,
      className,
      bg,
      text,
      border,
      body,
      children,
      as: Component = 'div',
      ...props
    },
    ref,
  ) => {
    const prefix = useShadowPrefix(ShadowPrefix, 'shadow-card');
    const cardContext = useMemo(
      () => ({
        cardHeaderShadowPrefix: `${prefix}-header`,
      }),
      [prefix],
    );

    return (
      <CardContext.Provider value={cardContext}>
        <Component
          ref={ref}
          {...props}
          className={classNames(
            className,
            prefix,
            bg && `bg-${bg}`,
            text && `text-${text}`,
            border && `border-${border}`,
          )}
        >
          {body ? <CardBody>{children}</CardBody> : children}
        </Component>
      </CardContext.Provider>
    );
  },
);

Card.displayName = 'Card';
Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

Card.Img = CardImg;

Card.Title = createWithShadowPrefix('shadow-card-title', {
  Component: DivStyledAsH5,
});
Card.Subtitle = createWithShadowPrefix('shadow-card-subtitle', {
  Component: DivStyledAsH6,
});

Card.Body = CardBody;
Card.Link = createWithShadowPrefix('shadow-card-link', { Component: 'a' });
Card.Text = createWithShadowPrefix('shadow-card-text', { Component: 'p' });
Card.Header = createWithShadowPrefix('shadow-card-header');
Card.Footer = createWithShadowPrefix('shadow-card-footer');
Card.ImgOverlay = createWithShadowPrefix('shadow-card-img-overlay');

export default Card;
