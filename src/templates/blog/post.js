import React from 'react';
import App from "../../components/app/app"
import SEO from "../../components/seo"
import { graphql } from "gatsby"
import Wrapper from '../../components/wrapper/wrapper';

const PostTemplate = ({ data }) => {
    const content = data.contentfulPost;

    return (
      <App>
        <SEO title={content.title} />
        <Wrapper>
          <h1>{content.title}</h1>
        </Wrapper>
      </App>
    )
}

export default PostTemplate;

export const pageQuery = graphql`
    query PostQuery($id: String!) {
      contentfulPost(id: {eq: $id}) {
        title
      }
    }
`
