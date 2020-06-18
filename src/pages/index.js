import React from "react"
import { SendMessage } from "../components/message"
import { SentMessages } from "../components/message"
import SEO from "../components/seo"
import Settings from "../components/images/settings"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

const IndexPage = ({ location }) => {
  // parse query string expecting 'token' which is a jwt token with
  // TODO: automatically authenticate the user instead of being passed params in url


  // TODO: implement loading or redirect or protected routes before authenticating users
  return (
    <>
      <SEO title="Home" />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <h1>Broadcast Bot</h1>
          {/* <h6 className="subtitle">Subtitle 2Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</h6> */}
        </div>
        {/* <div style={{ width: '24px' }}> */}
        {/* <Settings /> */}
        <div className="Rectangle">

          <FontAwesomeIcon icon={faCog} style={{
            color: '#6c6c6c',
            alignSelf: 'center'
          }} />
          {/* </div> */}
        </div>
      </div>
      <SendMessage />
      <SentMessages />
    </>
  )
}

export default IndexPage
