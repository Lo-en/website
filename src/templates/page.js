import React from 'react';
import App from "../components/app/app"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const PageTemplate = ({ data }) => {
    const content = data.contentfulPage;

    return (
      <App>
        <SEO title="Product Page" />
        <h1>
            {content.title}
        </h1>
      </App>
    );
}

export default PageTemplate;

export const pageQuery = graphql`
    query PageQuery($id: String!) {
      contentfulPage(id: {eq: $id}) {
        title
      }
    }
`
