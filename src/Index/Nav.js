import classNames from 'classnames';
import PropTypes from 'prop-types';

import all from 'prop-types-extra/lib/all';
import React, { useContext } from 'react';
import useUncontrolled from 'uncontrollable/hook';

import { useShadowPrefix } from './ThemeProvider';
import NavbarContext from './NavbarContext';
import CardContext from './CardContext';
import AbstractNav from './AbstractNav';
import NavItem from './NavItem';
import NavLink from './NavLink';

const propTypes = {
  /**
   * @default 'nav'
   */
  ShadowPrefix: PropTypes.string,

  /** @private */
  navbarShadowPrefix: PropTypes.string,
  /** @private */
  cardHeaderShadowPrefix: PropTypes.string,

  /**
   * The visual variant of the nav items.
   *
   * @type {('tabs'|'pills')}
   */
  variant: PropTypes.string,

  /**
   * Marks the NavItem with a matching `eventKey` (or `href` if present) as active.
   *
   * @type {string}
   */
  activeKey: PropTypes.any,

  /**
   * Have all `NavItem`s to proportionatly fill all available width.
   */
  fill: PropTypes.bool,

  /**
   * Have all `NavItem`s to evenly fill all available width.
   *
   * @type {boolean}
   */
  justify: all(PropTypes.bool, ({ justify, navbar }) =>
    justify && navbar ? Error('justify navbar `Nav`s are not supported') : null,
  ),

  /**
   * A callback fired when a NavItem is selected.
   *
   * ```js
   * function (
   *  Any eventKey,
   *  SyntheticEvent event?
   * )
   * ```
   */
  onSelect: PropTypes.func,

  /**
   * ARIA role for the Nav, in the context of a TabContainer, the default will
   * be set to "tablist", but can be overridden by the Nav when set explicitly.
   *
   * When the role is "tablist", NavLink focus is managed according to
   * the ARIA authoring practices for tabs:
   * https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel
   */
  role: PropTypes.string,

  /**
   * Apply styling an alignment for use in a Navbar. This prop will be set
   * automatically when the Nav is used inside a Navbar.
   */
  navbar: PropTypes.bool,

  as: PropTypes.elementType,

  /** @private */
  onKeyDown: PropTypes.func,
};

const defaultProps = {
  justify: false,
  fill: false,
};

const Nav = React.forwardRef((uncontrolledProps, ref) => {
  let {
    as = 'div',
    ShadowPrefix,
    variant,
    fill,
    justify,
    navbar,
    className,
    children,
    activeKey,
    ...props
  } = useUncontrolled(uncontrolledProps, { activeKey: 'onSelect' });

  ShadowPrefix = useShadowPrefix(ShadowPrefix, 'shadow-nav');

  let navbarShadowPrefix, cardHeaderShadowPrefix;

  const navbarContext = useContext(NavbarContext);
  const cardContext = useContext(CardContext);

  if (navbarContext) {
    navbarShadowPrefix = navbarContext.ShadowPrefix;
    navbar = navbar == null ? true : navbar;
  } else if (cardContext) {
    ({ cardHeaderShadowPrefix } = cardContext);
  }

  return (
    <AbstractNav
      as={as}
      ref={ref}
      activeKey={activeKey}
      className={classNames(className, {
        [ShadowPrefix]: !navbar,
        [`${navbarShadowPrefix}-nav`]: navbar,
        [`${cardHeaderShadowPrefix}-${variant}`]: !!cardHeaderShadowPrefix,
        [`${ShadowPrefix}-${variant}`]: !!variant,
        [`${ShadowPrefix}-fill`]: fill,
        [`${ShadowPrefix}-justified`]: justify,
      })}
      {...props}
    >
      {children}
    </AbstractNav>
  );
});

Nav.displayName = 'Nav';
Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

Nav.Item = NavItem;
Nav.Link = NavLink;

Nav._Nav = Nav; 

export default Nav;
