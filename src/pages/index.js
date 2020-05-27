import React from "react"
import Layout from "../components/layout"
import { SendMessage } from "../components/message"
import { SentMessages } from "../components/message"
// import SEO from "../components/seo"
import { MessageContextProvider } from "../components/message/context"
// import Settings from "../components/images/settings"

const IndexPage = ({ location }) => {
  // parse query string expecting 'token' which is a jwt token with
  // TODO: automatically authenticate the user instead of being passed params in url


  // TODO: implement loading or redirect or protected routes before authenticating users
  return (
    <>
      {/* <SEO title="Home" /> */}

      <div style={{
        display: 'flex',
      }}>
        <div>
          <h1>Broadcast Bot</h1>
          <h6 className="subtitle">Subtitle 2Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</h6>
        </div>
        {/* <Settings /> */}
      </div>
      <SendMessage />
      <SentMessages />
    </>
  )
}

export default IndexPage
