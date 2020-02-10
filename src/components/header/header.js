import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types";
import React from "react";
import Menu from "../menu/menu"
import Brand from "../brand/brand"

const Header = ({ siteTitle }) => {
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
              ... on ContentfulProductCollections {
                slug
                title
              }
            }
          }
        }
      }
    `
  );

  const menuItems = data.allContentfulMenu.nodes[0].menuItems;

  return (
    <header>
      <Brand />
      <Menu menuItems={menuItems} />
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
