import React, { useState, useContext, useEffect } from "react"
import { Link } from "gatsby"
import { MessageContext } from "../context"

const SentMessages = () => {
  const { sendStatus, sentBroadcasts, downloadReport, token, secGroups } = useContext(MessageContext)
  // being reloaded twice on initial render
  // and after every change in send component
  // console.log(sentBroadcasts)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(25)

  useEffect(() => {
    sendStatus(0, 25)
    // sendBroadcastSummary()
  }, [])

  const getNextReportPage = (page, size) => {
    setPage(page + 1)
    console.log({ newpage: page })

    sendStatus(page, size)
  }

  const getLastReportPage = (page, size) => {
    console.log({ page })
    if (page !== 1) {
      setPage(page - 1)
      sendStatus(page, size)

      // console.log({ newpage: page - 1 })
      // sendStatus(page, size)
    }
  }
  // console.log({ broadcastSummary })


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
        {sentBroadcasts[0] ?
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
              {sentBroadcasts[0] && sentBroadcasts.slice(0, 24)?.map((broadcast, idx) => {
                return (
                  <tr key={idx}>
                    <td>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}>
                        <Link style={{
                          textDecoration: 'none'
                        }} to={`/messages/${broadcast.message_id}/?token=${token}`}>

                          <p className="sentmessage">
                            {broadcast.message}
                          </p>
                        </Link>

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
                        }}>{secGroups.find(group => group.id === broadcast.target)?.name || 'network'}(x members)</p>
                        <p
                          onClick={() => downloadReport(broadcast.message_id, 0, 25)}
                          style={{
                            cursor: 'pointer',
                            fontSize: 12,
                            fontWeight: 600,
                            fontFamily: 'Open Sans',
                            color: '#0060ff',
                            lineHeight: 1.33
                          }}>Download</p>
                      </div>
                    </td>
                    <td className="trow">{Math.max(0, broadcast.summary.sent - broadcast.summary.failed)}</td>
                    <td className="trow">{broadcast.summary.pending}</td>
                    <td className="trow">{broadcast.summary.failed}</td>
                    <td className="trow">{broadcast.summary.ack}</td>
                  </tr>
                )
              })
              }
            </tbody>

          </table> :
          <p style={{
            textAlign: "center"
          }}>no broadcasts yet
        </p>
        }
        {sentBroadcasts.length > 1 &&
          <>
            <p
              onClick={() => getLastReportPage(page, size)}
            >
              {'<'}
            </p>
            <p>{(page == 0 ? 1 : page) * size - 24}-{Math.min(sentBroadcasts.length, (page == 0 ? 1 : page) * size)} of {Math.min(sentBroadcasts.length, (page == 0 ? 1 : page) * size)}</p>
            <p
              onClick={() => {
                if (sentBroadcasts.length == ((page == 0 ? 1 : page) * size)) {
                  return getNextReportPage(page, size)
                }
              }}
            >
              {'>'}
            </p>
          </>
        }
      </section>
    </>
  )
}

export default SentMessages