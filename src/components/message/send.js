import React, { useEffect, useState, useContext } from "react"
import { Link } from "gatsby"
import Image from "../image"
import axios from "axios"
import { MessageContext, MessageContextProvider } from "./context"

// help command includes url and authentication code 
// console.log(MessageContextProvider)

const SendMessage = ({ authcode, username, authn }) => {
  const { getSecGroups, secGroups, sendBroadcast, message, setMessage, sendStatus } = useContext(MessageContext)
  const [selectedSecGroup, setSelectedSecGroup] = useState()
  // run immediately & everytime state changes
  useEffect(() => {
    // authorizeUser()
    getSecGroups(username, authcode, authn)
    sendStatus(username, authcode, authn)
    // console.log(secGroups)
  }, [])


  return (
    <form
      className="border"
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>

        <h3 className="title">New Broadcast Message</h3>
        <button onClick={() => sendBroadcast(username, authcode, authn)} type="button"
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
        alignItems: 'center'

      }}>

        <label
          className="labels"
          style={{
            flex: '0 0 10%'

          }}>Send To</label>
        <select
          className="border"
          style={{
            flex: '0 0 30%',
            marginBottom: '16px'
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
          style={{
            flex: '0 0 10%'
          }}>Message</label>
        <textarea
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
          <div style={{ width: `24px` }}>
            <Image />
          </div>
          <div style={{ width: `24px` }}>
            <Image />
          </div>
        </div>
      </div>
      <div style={{
        display: 'flex',
        width: '90%',
        left: '10%',
        position: 'relative',
        alignItems: 'center',
        margin: '18px 0 18px 24px'
      }}>
        <input
          className="border"
          style={{
            marginRight: '4px'
          }}
          type="checkbox" name="acknowledgement" id="acknowledgement" />
        <label
          className="smlabels"
          htmlFor="acknowledgement">Ask for acknowledgement </label>
        <input
          style={{
            marginLeft: '32px',
            marginRight: '4px'
          }}
          className="border"
          type="checkbox" name="Repeat" id="Repeat" />
        <label
          className="smlabels"
          htmlFor="Repeat">Repeat</label>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>

        <label
          className="labels"
          style={{
            flex: '0 0 10%'
          }} htmlFor="numrepeat">Repeat</label>
        <select
          className="border"

          style={{
            flex: '0 0 30%'
          }}
          defaultValue="Number of times "
          type="dropdown" id="numrepeat" name="numrepeat">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>
        <label
          className="labels"
          style={{
            marginLeft: '64px',
            flex: '0 0 10%'
          }} htmlFor="frequency">Frequency</label>
        <select
          className="border"
          style={{
            flex: '0 0 30%'
          }}
          defaultValue="Send message every..."
          type="dropdown" id="frequency" name="frequency">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>
      </div>
    </form >
  )
}

export default SendMessage