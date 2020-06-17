import React from 'react';
import App from "../../components/app/app"
import { graphql, Link } from "gatsby"
import PageHeader from '../../components/page-header/page-header';
import { heroHeights } from '../../constants/theme';
import FlexibleContent from '../../components/flexible-content/flexible-content';
import Title from '../../components/title/title';
import { buildAuthorSlug } from '../../utils/author';

const PostTemplate = ({ data }) => {
  const content = data.post;
  const cornerstone = data.cornerstone;
  const theme = cornerstone.theme || null; 
  const author = content.author;

  if (content.hero) {
    content.hero.height = heroHeights.MEDIUM
  }

  return (
    <App theme={theme}>
      <PageHeader
        menuItems={cornerstone.categories}
        theme={theme}
        hero={content.hero}
        title={content.title}
      />
      {author && (
        <Title tag={"h3"}>
          <Link to={buildAuthorSlug(author)}>{author.title}</Link>
        </Title>
      )}
      {content.content && (
        <FlexibleContent content={content.content.contentRow} />
      )}
    </App>
  )
}

export default PostTemplate;

export const pageQuery = graphql`
  query PostQuery($id: String!, $cornerstoneId: String!) {
    post: contentfulPost(id: {eq: $id}) {
      title
      hero {
        subtitle
        title
        image {
          fluid(maxWidth: 3000, quality: 90) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
      author {
        slug
        title
      }
      content {
        contentRow {
          ... on ContentfulFcCenteredText {
            title
            tag
            backgroundColour
            content {
              childMarkdownRemark {
                html
              }
            }
            internal {
              type
            }
          }
          ... on ContentfulFcSingleImage {
            title
            tag
            imagePosition
              image {
                fluid(maxWidth: 800, quality: 90) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            content {
              childMarkdownRemark {
                html
              }
            }
            internal {
              type
            }
          }
          ... on ContentfulFcGalleryRow {
            images {
              fluid(maxWidth: 800, quality: 90) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
            internal {
              type
            }
          }
        }
      }
    }
    cornerstone: contentfulPosts(id: {eq: $cornerstoneId}) {
      title
      slug
      theme
      categories {
        slug
        title
        id
        contentfulparent {
          slug
          title
        }
      }
    }
  }
`
