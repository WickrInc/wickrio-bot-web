import React, { createContext, useReducer, useState } from "react"
import axios from "axios";


const MessageContext = createContext();
const MessageContextProvider = ({ children, token, }) => {
  // hardcoded should be dynamic, received by the /panel command
  let hostIP = 'http://localhost'
  // hostIP = 'http://9ad6fbb1.ngrok.io'
  const botPort = '4545'
  const botAPIKey = "12345" // where do i get this from? cannot 
  // const baseAPIurl = `${hostIP}:${botPort}/WickrIO/V1/Apps/${botAPIKey}`
  // get decoded api key from authorization endpoint
  const baseAPIurl = `${hostIP}:${botPort}/WickrIO/V1/Apps/${botAPIKey}`


  // change to use usereducer
  const [user, setUser] = useState({

  })
  const [secGroups, setSecGroups] = useState([])
  const [sentBroadcasts, setSentBroadcasts] = useState([])
  const [message, setMessage] = useState("")
  const [acknowledge, setAcknowledge] = useState(false)
  const [repeat, enableRepeat] = useState(false)
  const [repeatNum, setRepeatNumber] = useState(false)
  const [freq, setFreq] = useState(false)
  const [attachment, setAttachment] = useState(false)
  const [selectedSecGroup, setSelectedSecGroup] = useState(false)

  // recieve token via search params, send as authorization header
  const sendAuthentication = async () => {
    // const authpath = encodeURI(`${baseAPIurl}/Authenticate/${username}`)
    const authpath = encodeURI(`${baseAPIurl}/Authenticate`)
    try {
      const response = await axios.get(authpath, {
        headers: {
          'Authorization': `Basic ${token}`
        }
      })
      // return false or a key to authorize the user
      // localStorage.setItem('token', user?.token)
      console.log(response.data)

      setUser(response.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  const getSecGroups = async () => {
    const secgrouppath = encodeURI(`${baseAPIurl}/SecGroups`)
    try {
      const response = await axios.get(secgrouppath, {
        headers: {
          'Authorization': `Basic ${token}`
        }
      })
      setSecGroups(response.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  const sendBroadcast = async () => {
    console.log({ message, acknowledge, repeat, selectedSecGroup, freq, repeatNum })
    if (!message) return console.log("need a message")
    const broadcastpath = encodeURI(`${baseAPIurl}/Broadcast`)
    const formdata = new FormData()
    formdata.append('message', message)
    formdata.append('acknowledge', acknowledge)
    if (attachment) {
      formdata.append('attachment', attachment)
    }
    if (selectedSecGroup) {
      formdata.append('security_group', selectedSecGroup)
    }
    if (repeat && repeatNum) {
      formdata.append('repeat_num', repeatNum)
    }
    if (repeat && freq) {
      formdata.append('freq_num', freq)
    }
    try {
      const response = await axios.post(broadcastpath, formdata, {
        headers: {
          'Authorization': `Basic ${token}`
        }
      })
      if (sentBroadcasts.map) {
        setSentBroadcasts([{
          'message_id': 'hardcoded, needs response from api',
          'message': message,
          // 'sender': username,
          'target': 'target',
          'when_sent': new Date().toLocaleString()
        }, ...sentBroadcasts,
        ])
      } else {
        setSentBroadcasts([{
          'message_id': 'hardcoded, needs response from api',
          'message': message,
          // 'sender': username,
          'target': 'target',
          'when_sent': new Date().toLocaleString()
        }])
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  // cache results to prevent needless requests from reloading or revisiting a page and having zero updates
  const sendStatus = async () => {
    const statuspath = encodeURI(`${baseAPIurl}/Status`)
    try {
      const response = await axios.get(statuspath, {
        headers: {
          Authorization: `Basic ${token}`
        }
      })
      setSentBroadcasts(response.data.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <MessageContext.Provider value={{
      user,
      sendAuthentication,
      getSecGroups,
      selectedSecGroup,
      setSelectedSecGroup,
      sendBroadcast,
      sendStatus,
      sentBroadcasts,
      secGroups,
      setMessage,
      message,
      acknowledge,
      setAcknowledge,
      repeat,
      enableRepeat,
      repeatNum,
      setRepeatNumber,
      freq,
      setFreq,
      attachment,
      setAttachment
    }}>
      {children}
    </MessageContext.Provider>
  )
}

export {
  MessageContextProvider,
  MessageContext
}