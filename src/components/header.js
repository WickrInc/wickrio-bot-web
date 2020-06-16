import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext, useEffect } from "react"
import { MessageContext } from "./context"

const Header = ({ siteTitle }) => {
  const {
    user,
    token,
    sendAuthorization
  } = useContext(MessageContext)

  useEffect(() => {
    sendAuthorization()

  }, [])

  return (
    <header
      style={{
        // background: `rebeccapurple`,
        // marginBottom: `1.45rem`,
      }}
    >
      <nav
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to={`/?token=${token}`}
            style={{
              color: `Black`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        {/* dropdown for account options */}
        <h3>
          {user?.email
            || 'Unauthenticated'}
        </h3>
      </nav>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
