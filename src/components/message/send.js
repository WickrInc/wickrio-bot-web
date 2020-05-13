import React, { useEffect, useState, useContext } from "react"
import { Link } from "gatsby"
import Attach from "../attach"
import Audio from "../audio"
import axios from "axios"
import { MessageContext } from "./context"

// add ALL GROUPS / WHOLE NETWORK


// help command includes url and authentication code 
// console.log(MessageContextProvider)

// be able to see uplaoded file preview
const SendMessage = () => {
  const {
    getSecGroups,
    secGroups,
    sendBroadcast,
    message,
    setMessage,
    sendStatus,
    setAcknowledge,
    acknowledge,
    setRepeat,
    repeat,
    attachment,
    setAttachment
  } = useContext(MessageContext)

  const [selectedSecGroup, setSelectedSecGroup] = useState()
  // const {} = useContext(MessageContext)
  // run immediately & everytime state changes
  useEffect(() => {
    // authorizeUser()
    getSecGroups()
    sendStatus()
    // console.log(secGroups)
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
        padding: '12px',
        minWidth: '350px'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>

        <h3 className="title">New Broadcast Message</h3>
        <button onClick={() => sendBroadcast()} type="button"
          style={{
            width: '86px',
            height: '36px',
            fontFamily: 'Open Sans',
            fontSize: '14px',
            fontWeight: 600,
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 1.14,
            borderRadius: '4px',
            backgroundColor: 'var(--secondary)',
            lineHeight: '1.14',
            letterSpacing: '1.28px',
            textAlign: 'center',
            color: ' var(--light)'
          }}
        >Send</button>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px'
      }}>

        <label
          className="labels"
          style={{
            paddingRight: '20px',
            minWidth: '120px'
          }}
          htmlFor="secgroup">Send To</label>
        <select
          id='secgroup'
          className="border"
          style={{
            flex: '0 0 50%',
          }}
          defaultValue="default"
          onChange={setSelectedSecGroup}
          type="dropdown" id="secgroup" name="secgroup">

          <option value="default" disabled>Choose a Security Group</option>
          {secGroups && secGroups.map((secgroup, idx) => {
            return (
              <option value={secgroup.id} key={idx}>{secgroup.name}</option>
            )
          })}
        </select>
      </div>
      <div style={{
        display: 'flex',
        position: 'relative',
        alignItems: 'center'

      }}>

        <label
          className="labels"
          htmlFor="message"
          style={{
            paddingRight: '20px',
            minWidth: '120px'
          }}>Message</label>
        <textarea
          id="message"
          className="border"
          style={{
            flex: 1
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
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        alignItems: 'center',
        margin: '18px 0 18px 120px'
      }}>
        <div>

          <input
            className="border"
            style={{
              marginRight: '4px'
            }}
            checked={acknowledge}
            onChange={e => {
              // setAck(!ack)
              let checkboxValue = !acknowledge
              setAcknowledge(checkboxValue)
            }}

            type="checkbox" name="acknowledge" id="acknowledge" />
          <label
            className="smlabels"
            htmlFor="acknowledge">Ask for acknowledgement </label>
        </div>
        <div>

          <input
            style={{
              marginRight: '4px'
            }}
            checked={repeat}
            onChange={e => {
              // console.log(repeat)
              setRepeat(!repeat)
              // let checkboxValue = !repeat
              // setAck(checkboxValue)
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(275px, 1fr))',
        gridGap: '20px'

      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <label
            className="labels"
            style={{
              // flex: '.2',
              paddingRight: '20px',
              minWidth: '120px'
            }} htmlFor="numrepeat">Repeat</label>
          <select
            className="border"

            style={{
              flex: '1'
            }}
            defaultValue="Number of times "
            type="dropdown" id="numrepeat" name="numrepeat">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
          </select>

        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <label
            className="labels"
            style={{
              paddingRight: '20px',
              minWidth: '120px'
            }} htmlFor="frequency">Frequency</label>
          <select
            className="border"
            style={{
              flex: 1
            }}
            defaultValue="Send message every..."
            type="dropdown" id="frequency" name="frequency">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
          </select>
        </div>
      </div>
    </form >
  )
}

export default SendMessage