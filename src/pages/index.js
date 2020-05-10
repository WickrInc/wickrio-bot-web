import React, { createContext, useReducer } from "react"
import { Link, StaticQuery } from "gatsby"
import Layout from "../components/layout"
import { SendMessage } from "../components/message"
import { SentMessages } from "../components/message"
import SEO from "../components/seo"
import { MessageContextProvider } from "../components/message/context"
import Settings from "../images/svg/settings.svg"

const IndexPage = ({ location: { search } }) => {
  // console.log(search);
  // parse query string expecting 'auth' and 'username' and 'authn'

  // automatically authenticate the user instead of being passed params in url
  let params = new URLSearchParams(search)
  let username = params.get('username')
  let authcode = params.get('auth')
  let authn = params.get('authn')
  // cpmst [state, dispatch] = useReducer(

  // )

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Broadcast Bot</h1>
      <h6 className="subtitle">Subtitle 2Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</h6>
      {/* <Settings /> */}
      <MessageContextProvider>
        <SendMessage
          authcode={authcode}
          username={username}
          authn={authn}
        />
        <SentMessages />
      </MessageContextProvider>
    </Layout>
  )
}

export default IndexPage
