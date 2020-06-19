import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext, useEffect } from "react"
import { MessageContext } from "./context"
import Logo from "./images/logo"

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
        marginBottom: '30px',
        height: '64px',
        borderRadius: '4px',
        boxShadow: '0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 3px -2px rgba(0, 0, 0, 0.12), 0 3px 4px 0 rgba(0, 0, 0, 0.14)',
        backgroundColor: 'var(--light)',
        zIndex: 99,
        position: 'sticky',
        top: 0
      }}
    >
      <nav
        style={{
        }}
      >
        <div style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `.8rem .6rem`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Link
            to={`/?token=${token}`}
            style={{
              color: `Black`,
              textDecoration: `none`,
              width: '100%',
              maxWidth: '160px'
            }}
          >
            <Logo />
          </Link>
          {/* dropdown for account options */}
          <h3 style={{
            margin: 0
          }}>
            {user?.email
              || 'Unauthenticated'}
          </h3>
        </div>

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
