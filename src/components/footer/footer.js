import _ from "lodash"
import { graphql, useStaticQuery, Link } from "gatsby"
import { connect } from "react-redux"
import React from "react"
import classnames from "classnames"

import Wrapper from "../wrapper/wrapper"
import styles from "./footer.module.scss"
import { MenuKeys, MenuThemes } from '../../constants/menus';
import Menu from "../menu/menu"
import Title from "../title/title"
import Row from "../grid/row/row"
import Col from '../grid/col/col';
import { GridSize } from '../../constants/grid';
import Layout from '../layout/layout';
import { getActiveTheme } from '../../state/ui/ui-selectors';

const buildCategoryMenus = (menuItems) => {
  const keys = [];
  const menu = [];

  menuItems.forEach((item) => {
    const parent = item.contentfulparent;
    const childMenuData = {
      slug: item.slug,
      title: item.title,
      contentfulparent: item.contentfulparent
    }

    if (keys.includes(parent.id)) {
      const index = _.findIndex(menu, {
        slug: parent.slug
      });

      menu[index].menuItems.push(childMenuData);
    } else {
      menu.push({
        title: parent.title,
        slug: parent.slug,
        menuItems: [childMenuData]
      })

      keys.push(parent.id);
    }
  });

  return menu;
}

const Footer = ({ activeTheme }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site: site {
          siteMetadata {
            title
          }
        }
        pageMenu: allContentfulMenu(filter: { menuId: { eq: "page-menu" } }) {
          nodes {
            menuItems {
              ... on ContentfulPage {
                slug
                title
              }
            }
          }
        }
        cornerstoneMenu: allContentfulMenu(
          filter: { menuId: { eq: "cornerstone-content-menu" } }
        ) {
          nodes {
            menuItems {
              ... on ContentfulPostCategory {
                id
                slug
                title
                contentfulparent {
                  id
                  slug
                  title
                }
              }
            }
          }
        }
        botanyblendMenu: allContentfulMenu(
          filter: { menuId: { eq: "botanyblend" } }
        ) {
          nodes {
            menuItems {
              ... on ContentfulLink {
                slug
                title
              }
            }
          }
        }
      }
    `
  )
  const menus = {
    [MenuKeys.CORNERSTONE_MENU]: buildCategoryMenus(
      data.cornerstoneMenu.nodes[0].menuItems
    ),
    [MenuKeys.PAGE_MENU]: data.pageMenu.nodes[0].menuItems,
    [MenuKeys.BOTANYBLEND]: data.botanyblendMenu.nodes[0].menuItems,
  }
  const themeClean = activeTheme ? activeTheme.replace(/\s/g, "") : activeTheme
  const footerClass = classnames(styles.footer, {
    [styles[`theme${themeClean}`]]: activeTheme,
  })

  const gridSize = GridSize.SMALL

  return (
    <Layout className={footerClass}>
      <Wrapper>
        <Row size={gridSize} className={styles.row}>
          <Col className={styles.col} size={gridSize}>
            <Title className={styles.title} type={"h4"}>
              Sama Wellbeing
            </Title>
            <Menu
              className={styles.menu}
              theme={MenuThemes.FOOTER}
              menuItems={menus[MenuKeys.PAGE_MENU]}
            />
          </Col>
          {menus[MenuKeys.CORNERSTONE_MENU].map((item, key) => (
            <Col className={styles.col} key={key} size={gridSize}>
              <Title className={styles.title} type={"h4"}>
                <Link to={`/${item.slug}/`}>{item.title}</Link>
              </Title>
              <Menu
                className={styles.menu}
                theme={MenuThemes.FOOTER}
                menuItems={item.menuItems}
              />
            </Col>
          ))}
        </Row>
        <div className={styles.botanyblend}>
          <Title className={styles.title} type={"h4"}>
            <a
              href="https://botanyblend.com/"
              title="Organic Face and Body Oils"
            >
              Botanyblend.com
            </a>
          </Title>
          <Menu
            className={styles.menu}
            theme={MenuThemes.FOOTER}
            menuItems={menus[MenuKeys.BOTANYBLEND]}
          />
        </div>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} {data.site.siteMetadata.title}
        </div>
      </Wrapper>
    </Layout>
  )
}

export default connect(
  state => ({
    activeTheme: getActiveTheme(state),
  }),
  null
)(Footer);
