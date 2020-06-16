import React, { createContext, useReducer, useState } from "react"
import axios from "axios";


const MessageContext = createContext({});
const MessageContextProvider = ({ children, location }) => {
  let params = new URLSearchParams(location?.search)
  let token = params.get('token')

  // get decoded api key from authorization endpoint
  let baseAPIurl = `${location.protocol}//${location.hostname}:${location.hostname == 'localhost' ? 4545 : location.port}/WickrIO/V2/Apps/Web/Broadcast`
  // let baseAPIurl = `${location.protocol}//${location.hostname}:${location.port}/WickrIO/V2/Apps/Web/Broadcast`
  // change to use usereducer
  const [user, setUser] = useState({
  })
  const [secGroups, setSecGroups] = useState([])
  const [sentBroadcasts, setSentBroadcasts] = useState([])
  const [broadcastSummary, setBroadcastSummary] = useState({})
  const [report, setReport] = useState({})
  const [message, setMessage] = useState("")
  const [acknowledge, setAcknowledge] = useState(false)
  const [repeat, enableRepeat] = useState(false)
  const [repeatNum, setRepeatNumber] = useState(false)
  const [freq, setFreq] = useState(false)
  const [attachment, setAttachment] = useState(false)
  const [selectedSecGroup, setSelectedSecGroup] = useState(false)

  // recieve token via search params, send as authorization header
  const sendAuthorization = async () => {
    // const authpath = encodeURI(`${baseAPIurl}/Authenticate/${username}`)
    const authpath = encodeURI(`${baseAPIurl}/Authorize`)
    try {
      const response = await axios.get(authpath, {
        headers: {
          'Authorization': `Basic ${token}`
        }
      })
      // return false or a key to authorize the user
      // localStorage.setItem('token', user?.token)
      // console.log({ response })
      setUser(response.data.data)
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
      // console.log(response.data)
      setSecGroups(response.data)

    }
    catch (err) {
      console.log(err)
    }
  }

  const sendBroadcast = async () => {
    console.log({ message, acknowledge, repeat, selectedSecGroup, freq, repeatNum, attachment })
    if (!message) return console.log("need a message")
    const broadcastpath = encodeURI(`${baseAPIurl}/Message`)

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
      console.log({ response })
      if (response.data.data.message) {
        if (sentBroadcasts.map) {
          setSentBroadcasts([{
            message_id: response.data.data.message_id,
            message: response.data.data.message,
            // 'sender': username,
            summary: {
              pending: 0,
              ack: 0,
              sent: 0,
              failed: 0,
              read: 0
            },
            target: response.data.data.securityGroups,
            when_sent: new Date().toLocaleString()
          }, ...sentBroadcasts,
          ])
        } else {
          setSentBroadcasts([{
            message_id: response.data.data.message_id,
            message: response.data.data.message,
            // 'sender': username,
            summary: {
              pending: 0,
              ack: 0,
              sent: 0,
              failed: 0,
              read: 0
            },
            target: response.data.data.securityGroups,
            when_sent: new Date().toLocaleString()
          }])
        }
      }
    }
    catch (err) {
      console.log(err)
      return err
    }

  }

  // cache results to prevent needless requests from reloading or revisiting a page and having zero updates
  const sendStatus = async (page, size) => {
    const statuspath = encodeURI(`${baseAPIurl}/Status/${page}/${size}`)
    try {
      const response = await axios.get(statuspath, {
        headers: {
          Authorization: `Basic ${token}`
        }
      })
      console.log({ response })
      setSentBroadcasts(response.data.list)
    }
    catch (err) {
      console.log(err)
    }
  }
  const sendBroadcastSummary = async () => {
    const statuspath = encodeURI(`${baseAPIurl}/Status/`)
    try {
      const response = await axios.get(statuspath, {
        headers: {
          Authorization: `Basic ${token}`
        }
      })
      // console.log(response.data)
      setBroadcastSummary(response.data.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  const sendReportStatus = async (messageID, page, size) => {
    const reportpath = encodeURI(`${baseAPIurl}/Report/${messageID}/${page}/${size}`)
    try {
      const response = await axios.get(reportpath, {
        headers: {
          Authorization: `Basic ${token}`
        }
      })
      setReport({ messageID: messageID, broadcast: response.data })
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <MessageContext.Provider value={{
      user,
      token,
      report,
      sendAuthorization,
      getSecGroups,
      selectedSecGroup,
      setSelectedSecGroup,
      sendBroadcastSummary,
      broadcastSummary,
      sendBroadcast,
      sendStatus,
      sentBroadcasts,
      secGroups,
      setMessage,
      message,
      acknowledge,
      setAcknowledge,
      sendReportStatus,
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