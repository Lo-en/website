import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import classnames from 'classnames'

import Menu from "../menu/menu"
import Brand from "../brand/brand"
import Wrapper from "../wrapper/wrapper"

import styles from "./header.module.scss"
import { MenuKeys } from '../../constants/menus';
import { isTrayActive } from "../../state/ui/ui-selectors"
import { toggleTray } from "../../state/ui/ui-action"
import Layout from '../layout/layout';

const Header = (props) => {
  const {
    size,
    theme,
    trayIsActive,
    dispatch
  } = props
  const themeClean = theme ? theme.replace(/\s/g, "") : theme;

  const data = useStaticQuery(
    graphql`
      query {
        allContentfulMenu(filter: { menuId: { eq: "primary-menu" } }) {
          nodes {
            menuItems {
              ... on ContentfulPage {
                slug
                title
              }
              ... on ContentfulPosts {
                slug
                title
              }
              ... on ContentfulLink {
                title
                slug
              }
              ... on ContentfulPostCategory {
                slug
                title
              }
            }
          }
        }
      }
    `
  )

  const headerClass = classnames(styles.header, styles.headerBackground, {
    [styles[`theme${themeClean}`]]: themeClean,
  })
  const headerClassHeight = classnames(styles.headerInner, {
    [styles[size]]: size
  })

  const burgerClass = classnames(styles.burger, {
    [styles.burgerIsActive]: trayIsActive
  });

  const menuItems = data.allContentfulMenu.nodes[0].menuItems;

  return (
    <Layout className={headerClass}>
      <Wrapper>
        <button
          onClick={() => dispatch(toggleTray(true))}
          className={styles.menuMobile}
        >
          <span className={styles.burgerTitle}>MENU</span>
          <span className={burgerClass}>
            <i className={styles.burgerIcon}>menu</i>
          </span>
        </button>
        <Menu
          className={styles.menu}
          menuItems={menuItems}
          theme={MenuKeys.PRIMARY}
          inline
        />
        <div className={headerClassHeight}>
          <Brand />
        </div>
      </Wrapper>
    </Layout>
  )
}

Header.propTypes = {
  size: PropTypes.string,
  setTrayIsVisible: PropTypes.func,
  trayIsVisible: PropTypes.bool
}

Header.defaultProps = {
  size: 'medium',
  theme: 'Default'
}

export default connect(state => ({
  trayIsActive: isTrayActive(state)
}), null)(Header);
