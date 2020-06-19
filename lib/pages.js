const path = require('path');
// Generic App View
const pageView = path.resolve('./src/templates/page/page.js');

const buildPages = (createPage, data) => {
  const Pages = data.allContentfulPage.nodes;

  Pages.forEach(page => {
    const { slug, id } = page;

    createPage({
      path: `/${slug}/`,
      component: pageView,
      context: {
        slug: slug,
        id: id
      },
    })
  });
}

module.exports.buildPages = buildPages;
