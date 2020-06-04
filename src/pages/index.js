import React from "react"

import App from "../components/app/app"
// import Image from "../components/image/image"
import SEO from "../components/seo"
import { graphql, useStaticQuery } from "gatsby"
import Hero from "../components/hero/hero"
import Wrapper from "../components/wrapper/wrapper"

const IndexPage = () => {
  let data = useStaticQuery(
    graphql`
      query {
        allContentfulHomePage(filter: {id: {eq: "2d016566-5546-5b12-80b1-d15a60ca62a7"}}) {
          edges {
            node {
              id
              seoMetaData {
                title
                metaDescription {
                  content {
                    content {
                      value
                    }
                  }
                }
              }
              hero {
                title
                subtitle
                image {
                  fluid(maxWidth: 1440) {
                    ...GatsbyContentfulFluid_withWebp
                  }
                }
                cta {
                  internalUrl {
                    slug
                  }
                  text
                }
              }
            }
          }
        }
      }
    `
  );
  data = data.allContentfulHomePage.edges[0].node;

  const hero = data.hero;
  const seo = data.seoMetaData;

  return (
    <App>
      <SEO title={seo.title} description={seo.metaDescription.content[0].content[0].value} />
      <Hero image={hero.image} title={hero.title} subtitle={hero.subtitle} cta={hero.cta} />

      <Wrapper>
        
      </Wrapper>

      {/*<div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>*/}
        {/*<Image />*/}
      {/*</div>*/}
    </App>
  )
}


export default IndexPage
