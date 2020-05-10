import React, { createContext, useReducer, useState } from "react"
import axios from "axios";


const MessageContext = createContext();

// let initialState = {
//   count: 10,
//   currentColor: "#bada55"
// };

// let reducer = (state, action) => {
//   switch (action.type) {
//     case "broadcast":
//       return initialState;
//     case "getsecgroups":
//       return { ...state, count: state.count + 1 };

//     // case "set-color":
//     //   return { ...state, currentColor: action.payload };
//   }
// };



const MessageContextProvider = ({ children }) => {
  // const [state, dispatch] = React.useReducer(countReducer, { count: 0 })

  // hardcoded should be dynamic, received by the /panel command
  // panel on the broadcast bot from the wickr client will cause the bot
  // to run the gatsby serve command and open the broadcast bot gatsby webapp
  const hostIP = 'http://localhost'
  const botPort = '4545'
  const botAPIKey = "12345"
  const baseAPIurl = `${hostIP}:${botPort}/WickrIO/V1/Apps/${botAPIKey}`




  const [secGroups, setSecGroups] = useState([])
  const [sentBroadcasts, setSentBroadcasts] = useState([])
  const [message, setMessage] = useState("")
  const [ack, setAck] = useState("")
  const [repeat, setRepeat] = useState("")
  const [repeatNum, setRepeatNum] = useState("")
  const [freq, setFreq] = useState()



  // this method will be depreciated or at least auto ran, 
  // a wickr front end client will pass the authorization token to this app when launched from a signed in user 

  // send username and basic token as an authorization header
  const sendAuthentication = async (username) => {
    // Authorization: Basic base64_auth_token

    const authpath = `${baseAPIurl}/Authenticate/${username}`

    try {
      const response = await axios(authpath)
      // return false or a key to authorize the user
      console.log(response)

    }
    catch (err) {
      console.log(err)
    }
  }

  // bot needs to have an auth code and username in requested route
  // and a basic base 64 token
  // stealing / sharing base 64 token or the given url could allow for mocked requests from the allowed resources from attackers
  // should hide base 64 encoded token instead of sharing it via url
  // get list of security groups
  const getSecGroups = async (username, authcode, authn) => {
    // console.log({ username, authn, authcode })
    const secgrouppath = `${baseAPIurl}/SecGroups/${username}/${authcode}`
    // const botAuthToken = `Basic ${authn}`

    try {
      const response = await axios.get(secgrouppath, {
        headers: {
          'Authorization': `Basic ${authn}`
        }
      })
      // console.log(response)
      setSecGroups(response.data)

    }
    catch (err) {
      console.log(err)
    }
  }

  const sendBroadcast = async (username, auth, authn) => {
    // console.log({ username, auth, authn, message })

    const broadcastpath = `${baseAPIurl}/Broadcast/${username}/${auth}`

    try {
      const response = await axios.post(broadcastpath, {
        'message': message
      }, {
        headers: {
          'Authorization': `Basic ${authn}`
        }
      })
      // console.log({ response })
      setSentBroadcasts([{
        'message_id': 'hardcoded, needs response from api',
        'message': message,
        'sender': username,
        'target': message,
        'when_sent': new Date().toLocaleString()
      }, ...sentBroadcasts,

      ])

      // sendStatus(username, auth, authn)
      // setSentBroadcasts(response.data)
      // console.log(sentBroadcasts)
    }
    catch (err) {
      console.log(err)
    }
  }

  const sendStatus = async (username, auth, authn) => {
    // console.log({ username, auth, authn, message })

    const statuspath = `${baseAPIurl}/Status/${username}/${auth}`

    try {
      const response = await axios.get(statuspath, {
        headers: {
          'Authorization': `Basic ${authn}`
        }
      })
      setSentBroadcasts(response.data)
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <MessageContext.Provider value={{
      getSecGroups,
      sendBroadcast,
      sendStatus,
      sentBroadcasts,
      secGroups,
      setMessage,
      message,

    }}>
      {children}
    </MessageContext.Provider>
  )
}

export {
  MessageContextProvider,
  MessageContext
}