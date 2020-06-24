/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
const path = require('path')
// console.log("hello")

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // Only update the `/app` page.
  console.log({ page })
  if (page.path.match(/^\/messages/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/messages/*"
    // Update the page.
    createPage({
      // path: '`src/components/message/report.js',
      path: '/messages/:id',
      pathname: '/messages/:id',
      component: path.resolve(`src/components/message/report.js`)
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      // context: {
      //   pagePath: path,
      // },
    })
  }
}
