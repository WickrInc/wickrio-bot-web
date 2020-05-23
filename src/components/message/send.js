import React, { useEffect, useContext } from "react"
import { Link } from "gatsby"
import Attach from "../attach"
import Audio from "../audio"
import { MessageContext } from "./context"

let repeatlist = [{
  value: 2,
  name: '2 times'
}]

let freqlist = [{
  value: 1500,
  name: 'every 15 seconds'
}]

// add ALL GROUPS / WHOLE NETWORK
// be able to see uplaoded file preview
const SendMessage = () => {
  const {
    user,
    sendAuthentication,
    getSecGroups,
    setSelectedSecGroup,
    secGroups,
    setFreq,
    sendBroadcast,
    message,
    setMessage,
    setAcknowledge,
    acknowledge,
    enableRepeat,
    setRepeatNumber,
    repeat,
    setAttachment
  } = useContext(MessageContext)
  // run immediately & everytime state changes

  useEffect(() => {
    sendAuthentication()
    // console.log({ user: user })
    getSecGroups()
  }, [])

  const buildFileSelector = () => {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('id', 'file');
    fileSelector.setAttribute('name', 'attachment');
    fileSelector.addEventListener("change", (event) => {
      setAttachment(fileSelector.files[0])
    })
    fileSelector.click();
  }

  return (
    <form
      className="border"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 20px',
        // minWidth: '375px'
        // minWidth: '350px'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '14px'
      }}>

        <h3 className="title">New Broadcast Message</h3>
        <button
          type="button"
          disabled={!message ? true : false}
          onClick={() => sendBroadcast()}
          className={message ? "sendButton" : 'disabledSendButton'}
        >Send</button>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px',
        flexWrap: 'wrap'
      }}>

        <label
          className="labels"
          style={{
            // padding: '4px 20px 4px',
            // minWidth: '120px'
          }}
          htmlFor="secgroup">Send To</label>
        <select
          id='secgroup'
          className="border"
          style={{
            flex: 1,
            minWidth: '284px',
            fontFamily: 'Open Sans',
            fontSize: '14px',
            textIndent: '6px'
          }}
          defaultValue="default"
          onChange={e => {
            setSelectedSecGroup(e.target.value)
          }}
          type="dropdown" id="secgroup" name="secgroup"
        >
          <option value="default" disabled>Select Security Group</option>
          <option value='false'>Whole network</option>
          {secGroups?.map((secgroup, idx) => {
            return (
              <option value={secgroup.id} key={idx}>{secgroup.name}</option>
            )
          })}
        </select>
      </div>
      <div style={{
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>

        <label
          className="labels"
          htmlFor="message"
          style={{
          }}>Message</label>
        <textarea
          id="message"
          className="border"
          style={{
            flex: 1,
            fontSize: '14px',
            fontFamily: 'Open Sans',
            minWidth: '284px',
            padding: '16px 14px'
          }}
          value={message}
          onChange={e => {
            setMessage(e.target.value)
          }}
          rows="5"
          placeholder="Add a message"
          name="text" id="text" />
        <div style={{
          display: 'flex',
          position: 'absolute',
          right: '10px',
          bottom: '10px'
        }}>
          <div
            style={{ width: `24px` }}
            onClick={() => {
              const file = document.getElementById('file')
              console.log(file)
            }}>
            <Audio />
          </div>
          <div style={{ width: `24px` }}
            onClick={
              // () => {
              // console.log('hello')
              buildFileSelector
              // setAttachment()
              // }
            }>
            <Attach />
          </div>
        </div>
      </div>
      <div
        className="checkboxes"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(284px, 250px))',
          alignItems: 'center',
          // margin: '18px 0 18px 120px'
        }}>
        <div>

          <input
            className="border"
            style={{
              marginRight: '4px',
              fontSize: '14px',
              fontFamily: 'Open Sans'
            }}
            checked={acknowledge}
            onChange={e => {
              setAcknowledge(!acknowledge)
            }}
            type="checkbox" name="acknowledge" id="acknowledge" />
          <label
            className="smlabels"
            htmlFor="acknowledge">Ask for acknowledgement </label>
        </div>
        <div>

          <input
            style={{
              marginRight: '4px',
              fontSize: '14px',
              fontFamily: 'Open Sans',
            }}
            checked={repeat}
            onChange={e => {
              enableRepeat(!repeat)
            }}
            className="border"
            type="checkbox" name="Repeat" id="Repeat" />
          <label
            className="smlabels"
            htmlFor="Repeat">Repeat</label>
        </div>
      </div>
      <div style={{
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gridGap: '20px'

      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <label
            className="labels"
            style={{
              // flex: '.2',
            }} htmlFor="numrepeat">Repeat</label>
          <select
            className="border"

            style={{
              flex: '1',
              textIndent: '6px',
              fontSize: '14px',
              fontFamily: 'Open Sans'
            }}
            defaultValue="default"
            onChange={e => setRepeatNumber(e.target.value)}
            type="dropdown" id="numrepeat" name="numrepeat">
            <option value="default" disabled>How many times</option>

            {repeatlist?.map((repeatnum, idx) => {
              return (
                <option value={repeatnum.value} key={idx}>{repeatnum.name}</option>
              )
            })}
          </select>

        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap'

        }}>
          <label
            className="labels"
            style={{
            }} htmlFor="frequency">Frequency</label>
          <select
            className="border"
            style={{
              flex: 1,
              textIndent: '6px',
              fontSize: '14px',
              fontFamily: 'Open Sans',
            }}
            defaultValue="default"
            onChange={e => setFreq(e.target.value)}
            type="dropdown" id="frequency" name="frequency">
            <option value="default" disabled>How often</option>

            {freqlist?.map((frequency, idx) => {
              return (
                <option value={frequency.value} key={idx}>{frequency.name}</option>
              )
            })}
          </select>
        </div>
      </div>
    </form >
  )
}

export default SendMessage