import React, { createContext, useReducer, useState } from "react"
import axios from "axios"

const MessageContext = createContext({})
const MessageContextProvider = ({ children, location }) => {
  let params = new URLSearchParams(location?.search)
  let token = params.get("token")

  // get decoded api key from authorization endpoint
  let baseAPIurl = `${location.protocol}//${location.hostname}:${
    location.hostname == "localhost" ? 4545 : location.port
  }/WickrIO/V2/Apps/Web/Broadcast`
  // let baseAPIurl = `${location.protocol}//${location.hostname}:${location.port}/WickrIO/V2/Apps/Web/Broadcast`
  // change to use usereducer
  const [user, setUser] = useState({})
  const [secGroups, setSecGroups] = useState({
    received: false,
    data: [],
  })
  const [sentBroadcasts, setSentBroadcasts] = useState({
    max_entries: 0,
    list: [],
  })
  const [broadcastSummary, setBroadcastSummary] = useState({})
  const [report, setReport] = useState({})
  const [message, setMessage] = useState("")
  const [acknowledge, setAcknowledge] = useState(false)
  const [repeat, enableRepeat] = useState(false)
  const [repeatNum, setRepeatNumber] = useState(false)
  const [freq, setFreq] = useState(false)
  const [attachment, setAttachment] = useState(false)
  const [userListFile, setUserListFile] = useState(false)
  const [selectedSecGroup, setSelectedSecGroup] = useState(null)

  // recieve token via search params, send as authorization header
  const sendAuthorization = async () => {
    // const authpath = encodeURI(`${baseAPIurl}/Authenticate/${username}`)
    const authpath = encodeURI(`${baseAPIurl}/Authorize`)
    try {
      const response = await axios.get(authpath, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      // return false or a key to authorize the user
      // localStorage.setItem('token', user?.token)
      // console.log({ response })
      setUser(response.data.user)
    } catch (err) {
      alert("Access denied: invalid user authentication code.")
      console.log(err)
    }
  }

  const getSecGroups = async () => {
    const secgrouppath = encodeURI(`${baseAPIurl}/SecGroups`)

    try {
      const response = await axios.get(secgrouppath, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      setSecGroups({
        received: true,
        data: response.data,
      })
    } catch (err) {
      alert("Your token expired! run /panel again.")
      console.log(err)
    }
  }

  const sendBroadcast = async () => {
    // console.log({
    //   sentBroadcasts,
    //   message,
    //   acknowledge,
    //   repeat,
    //   selectedSecGroup,
    //   freq,
    //   repeatNum,
    //   attachment,
    //   userListFile,
    // })

    if (!message) return console.log("need a message")
    const broadcastpath = encodeURI(`${baseAPIurl}/Message`)

    const formdata = new FormData()
    formdata.append("message", message)
    formdata.append("acknowledge", acknowledge)
    if (attachment) {
      formdata.append("attachment", attachment)
    }
    if (selectedSecGroup) {
      formdata.append("security_group", selectedSecGroup)
    }
    if (repeat && repeatNum) {
      formdata.append("repeat_num", repeatNum)
    }
    if (repeat && freq) {
      formdata.append("freq_num", freq)
    }
    try {
      const response = await axios.post(broadcastpath, formdata, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      // console.log({ response })
      if (response.data.data.message) {
        // console.log(secGroups.data.find(group => group.id === selectedSecGroup))
        // console.log({ sentBroadcasts })
        if (sentBroadcasts.list.map) {
          setSentBroadcasts({
            list: [
              {
                message_id: response.data.data.message_id,
                message: response.data.data.rawMessage,
                // 'sender': username,
                summary: {
                  pending: 0,
                  acked: 0,
                  sent: 0,
                  failed: 0,
                  read: 0,
                  ignored: 0,
                },
                target: selectedSecGroup
                  ? secGroups.data.find(group => group.id === selectedSecGroup)
                      ?.id
                  : "network",
                when_sent: new Date().toLocaleString(),
              },
              ...sentBroadcasts.list,
            ],
          })
        } else {
          setSentBroadcasts({
            list: [
              {
                message_id: response.data.data.message_id,
                message: response.data.data.rawMessage,
                // 'sender': username,
                summary: {
                  pending: 0,
                  acked: 0,
                  sent: 0,
                  failed: 0,
                  read: 0,
                  ignored: 0,
                },
                target: selectedSecGroup
                  ? secGroups.data.find(group => group.id === selectedSecGroup)
                      ?.id
                  : "network",
                when_sent: new Date().toLocaleString(),
              },
            ],
          })
        }
      }
      setMessage("")
      setAcknowledge(false)
      setRepeatNumber(false)
      setSelectedSecGroup(false)
      setFreq(false)
      setAttachment(false)
    } catch (err) {
      alert("Your token expired! run /panel again.")
      console.log(err)
      return err
    }
  }

  const downloadReport = async (id, page, size) => {
    const statuspath = encodeURI(`${baseAPIurl}/Report/${id}/${page}/${size}`)
    try {
      const response = await axios.get(statuspath, {
        responseType: "arraybuffer",
        headers: {
          Authorization: `Basic ${token}`,
        },
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "report.json") //or any other extension
      document.body.appendChild(link)
      link.click()
    } catch (err) {
      alert("Your token expired! run /panel again.")
      console.log(err)
    }
  }

  // cache results to prevent needless requests from reloading or revisiting a page and having zero updates
  const sendStatus = async (page, size) => {
    const statuspath = encodeURI(`${baseAPIurl}/Status/${page}/${size}`)
    try {
      const response = await axios.get(statuspath, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      setSentBroadcasts({
        max_entries: response.data.max_entries,
        list: response.data.list,
      })
    } catch (err) {
      alert("Your token expired! run /panel again.")
      console.log(err)
    }
  }

  const sendBroadcastSummary = async () => {
    const statuspath = encodeURI(`${baseAPIurl}/Status/1`)
    try {
      const response = await axios.get(statuspath, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      // console.log(response.data)
      setBroadcastSummary(response.data.data)
    } catch (err) {
      alert("Your token expired! run /panel again.")
      console.log(err)
    }
  }

  const sendReportStatus = async (messageID, page, size) => {
    const reportpath = encodeURI(
      `${baseAPIurl}/Report/${messageID}/${page}/${size}`
    )
    try {
      const response = await axios.get(reportpath, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      setReport({ messageID: messageID, broadcast: response.data })
    } catch (err) {
      alert("Your token expired! run /panel again.")
      console.log(err)
    }
  }

  return (
    <MessageContext.Provider
      value={{
        user,
        token,
        downloadReport,
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
        setAttachment,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}

export { MessageContextProvider, MessageContext }
