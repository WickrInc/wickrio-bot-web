/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "../header"
import "./layout.css"
import { MessageContextProvider } from "../message/context"

const Layout = ({ children, location }) => {


  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  let params = new URLSearchParams(location?.search)
  let token = params.get('token')


  return (
    <MessageContextProvider
      token={token}
    // location={location}
    >
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          minWidth: 330,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()},
          {` `}
          <a href="https://www.wickr.com">Wickr</a>
        </footer>
      </div>
    </MessageContextProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
