import React, { createContext, useReducer } from "react"
import { Link, StaticQuery } from "gatsby"
import Layout from "../components/layout"
import { SendMessage } from "../components/message"
import { SentMessages } from "../components/message"
import SEO from "../components/seo"
import { MessageContextProvider } from "../components/message/context"
import Settings from "../components/settings"

const IndexPage = ({ location: { search } }) => {
  // console.log(search);
  // parse query string expecting 'auth' and 'username' and 'authn'

  // TODO: automatically authenticate the user instead of being passed params in url
  let params = new URLSearchParams(search)
  let username = params.get('username')
  let authcode = params.get('auth')
  let authn = params.get('authn')

  // TODO: implement loading or redirect or protected routes before authenticating users

  return (
    <Layout>
      <SEO title="Home" />
      <div style={{
        display: 'flex',
      }}>
        <div>
          <h1>Broadcast Bot</h1>
          <h6 className="subtitle">Subtitle 2Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</h6>
        </div>
        <Settings />
      </div>
      <MessageContextProvider
        authcode={authcode}
        username={username}
        authn={authn}>
        <SendMessage />
        <SentMessages />
      </MessageContextProvider>
    </Layout>
  )
}

export default IndexPage
