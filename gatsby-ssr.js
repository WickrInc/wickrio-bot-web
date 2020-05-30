/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import React from "react"
import Layout from "./src/components/layout"
import { match } from '@reach/router/lib/utils';

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    // <MessageContextProvider
    //   token={token}
    // >
    <Layout {...props}>
      {element}
    </Layout>
    // {/* </MessageContextProvider> */}
  )
}


// See https://github.com/gatsbyjs/gatsby/issues/13965
// export const extractPageMatchParams = (props) => {
//   if (props.pageContext.matchPath) {
//     const result = match(props.pageContext.matchPath, props.location.pathname);
//     if (result && result.params) {
//       return result.params;
//     }
//   }
//   // Empty make it easier to use in pages without having to check for null/undefined
//   return {};
// };

// const ScanPage = (props) => {
//   const params = extractPageMatchParams(props);

//   if ( !params.id ) renderLoader()
//   else renderScanPage(params.id)
// }