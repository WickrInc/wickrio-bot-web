import React, { useState, useContext, useEffect } from "react"
import { Link } from "gatsby"
import { MessageContext } from "./context"

const Report = ({ id }) => {
  const { sentBroadcasts, secGroups } = useContext(MessageContext)

  useEffect(() => {
  }, [])

  const broadcast = sentBroadcasts.find(broadcast => broadcast.message_id === id)
  const secGroupName = secGroups.find(group => group.id === broadcast.target)
  const date = new Date(broadcast.when_sent)
  console.log(broadcast)

  return (
    <>
      <h3 style={{
        marginTop: '40px',
        overflow: 'scroll'
      }}
        className="title">{broadcast.message}</h3>
      <p className="subtitle">{`Sent on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()} to ${secGroupName.name}`}</p>
      <div style={{
        display: 'flex'
      }}>
        <div style={{
          margin: '0 15px'
        }}>
          <h2 style={{ margin: 0 }}>
            {broadcast.summary.sent - broadcast.summary.failed}
          </h2>
          <p>
            received
          </p>
        </div>
        <div style={{
          margin: '0 15px'
        }}>
          <h2 style={{ margin: 0 }}>
            {broadcast.summary.pending}
          </h2>
          <p>
            pending
          </p>
        </div>
        <div style={{
          margin: '0 15px'
        }}>
          <h2 style={{ margin: 0 }}>
            {broadcast.summary.failed}
          </h2>
          <p>
            failed
          </p>
        </div>
        <div style={{
          margin: '0 15px'
        }}>
          <h2 style={{ margin: 0 }}>
            {broadcast.summary.ack}
          </h2>
          <p>
            acknowledged
          </p>
        </div>
      </div>
      <section
        className="sentsection"
        style={{
          marginTop: '20px',
          overflow: 'scroll'
        }}
      >
        <table >
          <thead bgcolor="white">
            <tr>
              <th className="Date">Status</th>
              <th className="tlabel">Name</th>
              <th className="tlabel">Message</th>
              <th className="tlabel">Sent</th>
              <th className="tlabel">Read</th>
            </tr>
          </thead>
          <tbody>
            {broadcast && broadcast?.status?.map((user, idx) => {
              console.log(user)
              return (
                <tr key={idx}>
                  <td>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                      <p className="sentmessage">
                        {user.status}
                      </p>

                    </div>
                    <div style={{
                      display: 'flex'
                    }}>
                      <p style={{
                        fontSize: 12,
                        fontFamily: 'Open Sans',
                        letterSpacing: '0.41px',
                        color: 'var(--text-light)',
                        lineHeight: 1.33
                      }}>{broadcast.target}(77 members)</p>
                      <p style={{
                        fontSize: 12,
                        fontWeight: 600,
                        fontFamily: 'Open Sans',
                        color: '#0060ff',
                        lineHeight: 1.33
                      }}>Download</p>
                    </div>
                  </td>
                  <td className="trow">{user.user}</td>
                  <td className="trow">message?</td>
                  <td className="trow"><div>
                    <p style={{
                      fontSize: 12,
                      fontFamily: 'Open Sans',
                      letterSpacing: '0.41px',
                      textAlign: 'right',
                      color: 'var(--text-light)',
                      lineHeight: 1.33
                    }}>
                      {new Date(broadcast.when_sent).toLocaleDateString()}
                    </p>

                    <p style={{
                      fontSize: 12,
                      fontFamily: 'Open Sans',
                      letterSpacing: '0.41px',
                      textAlign: 'right',
                      color: 'var(--text-light)',
                      lineHeight: 1.33
                    }}>
                      {new Date(broadcast.when_sent).toLocaleTimeString()}
                    </p>
                  </div></td>
                  <td className="trow"><div>
                    <p style={{
                      fontSize: 12,
                      fontFamily: 'Open Sans',
                      letterSpacing: '0.41px',
                      textAlign: 'right',
                      color: 'var(--text-light)',
                      lineHeight: 1.33
                    }}>
                      {new Date(broadcast.when_sent).toLocaleDateString()}
                    </p>

                    <p style={{
                      fontSize: 12,
                      fontFamily: 'Open Sans',
                      letterSpacing: '0.41px',
                      textAlign: 'right',
                      color: 'var(--text-light)',
                      lineHeight: 1.33
                    }}>
                      {new Date(broadcast.when_sent).toLocaleTimeString()}
                    </p>
                  </div></td>
                </tr>
              )
            })}
          </tbody>

        </table>
      </section>
    </>
  )
}

export default Report