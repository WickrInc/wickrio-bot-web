import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext, useEffect } from "react"
import { MessageContext } from "./context"
import Logo from "./images/logo"
import { faChevronDown, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <FontAwesomeIcon
              style={{
                margin: '0 13px 0 0',
                color: '#f39200',
                cursor: 'pointer',
                height: '24px',
                width: '24px'
              }}
              // size="lg"
              icon={faUserCircle}
              onClick={() => {
                // getLastReportPage(report.messageID, page, size)
              }}
            />
            <h3 className="username" style={{
              margin: 0,
              fontFamily: 'Open Sans',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: 1.14,
              letterSpacing: '1.28px',
              textAlign: 'center',
              color: 'var(--dark)'
            }}>
              {user?.email
                || 'Unauthenticated'}
            </h3>

            <FontAwesomeIcon
              style={{
                // margin: '0 20px 0 0',
                height: '20px',
                width: '20px',
                cursor: 'pointer'
              }}
              icon={faChevronDown}
              onClick={() => {
                // getLastReportPage(report.messageID, page, size)
              }}
            />

          </div>


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
