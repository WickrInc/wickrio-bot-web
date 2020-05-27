/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import 'typeface-open-sans';
import Layout from './src/components/layout';
import { MessageContextProvider } from './src/components/message/context';
import React from "react"



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