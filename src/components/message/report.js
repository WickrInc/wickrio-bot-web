import React, { useState, useContext, useEffect } from "react"
import { Link } from "gatsby"
import { MessageContext } from "./context"

const SentMessages = () => {
  // const { sendStatus, sentBroadcasts } = useContext(MessageContext)
  // being reloaded twice on initial render
  // and after every change in send component
  // console.log(sentBroadcasts)

  useEffect(() => {
    // sendStatus()
  }, [])

  return (
    <>
      <h3 style={{
        marginTop: '40px',
        overflow: 'scroll'
      }}
        className="title">Sent Messages</h3>
      <p className="subtitle">Click on the message to view detailed reports</p>
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
              <th className="Date">Date</th>
              <th className="tlabel">Received</th>
              <th className="tlabel">Pending</th>
              <th className="tlabel">Failed</th>
              <th className="tlabel">Acknowledged</th>
            </tr>
          </thead>
          <tbody>
            {sentBroadcasts && sentBroadcasts?.map((broadcast, idx) =>
              <tr key={idx}>
                <td>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                    <p className="sentmessage">
                      {broadcast.message}
                    </p>
                    <div>
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
                    </div>
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
                <td className="trow">r</td>
                <td className="trow">p</td>
                <td className="trow">f</td>
                <td className="trow">a</td>
              </tr>
            )}
          </tbody>

        </table>
      </section>
    </>
  )
}

export default SentMessages