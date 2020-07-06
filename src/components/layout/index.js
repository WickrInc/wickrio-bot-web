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
import '@fortawesome/fontawesome-svg-core/styles.css'
import { MessageContextProvider } from "../context"

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

  return (
    <MessageContextProvider
      location={location}
    >
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          // minWidth: 360,
          padding: `0 1.0875rem 1.45rem`,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <main style={{
          flex: 1,
          minHeight: 'calc(100vh - 162px)'
        }}>{children}</main>
      </div>
      <footer style={{
        borderTop: 'var(--bg-light) 1px solid',

      }}>
        <div
          style={{
            margin: `5px auto 7px auto`,
            maxWidth: 960,
            // minWidth: 330,
            fontFamily: 'Open Sans',
            fontSize: '14px'
          }}
        >


          © {new Date().getFullYear()},
          {` `}
          <a href="https://www.wickr.com" target="_blank">Wickr</a>
        </div>
      </footer>
    </MessageContextProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
