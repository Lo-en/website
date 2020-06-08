import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import classnames from 'classnames'

import Menu from "../menu/menu"
import Brand from "../brand/brand"
import Wrapper from "../wrapper/wrapper"

import styles from "./header.module.scss"
import { MenuKeys } from '../../constants/menus';

const Header = (props) => {
  const { size, theme } = props;
  const themeClean = theme ? theme.replace(/\s/g, "") : 'Default';

  const data = useStaticQuery(
    graphql`
      query {
        allContentfulMenu(
          filter: { menuId: { eq: "primary-menu" } }
        ) {
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
            }
          }
        }
      }
    `
  );

  const headerClass = classnames(styles.header, styles.headerBackground, {
    [styles[`theme${themeClean}`]]: themeClean,
  })
  const headerClassHeight = classnames(styles.headerInner, {
    [styles[size]]: size
  })

  const menuItems = data.allContentfulMenu.nodes[0].menuItems;

  return (
    <header className={headerClass}>
      <Wrapper>
        <Menu menuItems={menuItems} theme={MenuKeys.PRIMARY} inline/>
        <div className={headerClassHeight}>
          <Brand />
        </div>
      </Wrapper>
    </header>
  )
}

Header.propTypes = {
  size: PropTypes.string
}

Header.defaultProps = {
  size: 'medium'
}

export default Header
