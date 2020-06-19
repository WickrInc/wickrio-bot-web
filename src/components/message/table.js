import React, { useState, useContext, useEffect } from "react"
import { Link } from "gatsby"
import { MessageContext } from "../context"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const SentMessages = () => {
  const { sendStatus, sentBroadcasts, downloadReport, token, secGroups } = useContext(MessageContext)
  // being reloaded twice on initial render
  // and after every change in send component
  // console.log(sentBroadcasts)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(25)
  useEffect(() => {
    sendStatus(0, 25)
    // sendBroadcastSummary()
  }, [])

  const getNextReportPage = (page, size) => {
    console.log({ newpage: page })

    sendStatus(page + 1, size)
    setPage(page + 1)
  }

  const getLastReportPage = (page, size) => {
    console.log({ page })
    if (page !== 0) {
      sendStatus(page - 1, size)
      setPage(page - 1)

      // console.log({ newpage: page - 1 })
      // sendStatus(page, size)
    }
  }
  console.log({ sentBroadcasts })
  let from = page == 0 ?
    (sentBroadcasts.list.length - (sentBroadcasts.list.length - 1)) * page + 1 :
    size * (sentBroadcasts.list.length - (sentBroadcasts.list.length - 1)) + 1


  let to = sentBroadcasts.list.length * (page + 1)


  return (
    <>
      <section
        className="sentsection"
        style={{
          margin: '40px 0',
          overflow: 'scroll'
        }}
      >
        <h3
          className="title">Sent Messages</h3>
        <p className="subtitle">Click on the message to view detailed reports</p>

        <table >
          <thead bgcolor="white">
            <tr>
              <th className="Date">Date</th>
              <th className="tlabel">Read</th>
              <th className="tlabel">Pending</th>
              <th className="tlabel">Failed</th>
              <th className="tlabel">Acknowledged</th>
              <th className="tlabel">Ignored</th>
              <th className="tlabel">Sent</th>
            </tr>
          </thead>
          {sentBroadcasts.list[0] &&
            <tbody>
              {sentBroadcasts.list[0] && sentBroadcasts.list.slice(0, 24)?.map((broadcast, idx) => {
                // console.log({ broadcast })
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
                    <td className="trow">{broadcast.summary.read}</td>
                    <td className="trow">{broadcast.summary.pending}</td>
                    <td className="trow">{broadcast.summary.failed}</td>
                    <td className="trow">{broadcast.summary.ack}</td>
                    <td className="trow">{broadcast.summary.ignored}</td>
                    <td className="trow">{broadcast.summary.sent}</td>
                  </tr>
                )
              })
              }
            </tbody>
          }

        </table>

        {!sentBroadcasts[0] && <p style={{
          backgroundColor: '#f2f3f5',
          padding: '24px 0',
          textAlign: "center"
        }}>send a broadcast message to view a detailed report here
          </p>}


        {sentBroadcasts.list.length > 0 &&
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            margin: '24px 32px'
          }}>

            <FontAwesomeIcon
              style={{
                // margin: '0 20px 0 0',
                cursor: 'pointer'
              }}
              icon={faChevronLeft}
              onClick={() => {
                console.log({ page, size })
                getLastReportPage(page, size)
              }}
            />
            {/* <p>{page == 0 ? ((page == 0 ? 1 : page) * size - 24) : }-{Math.min(sentBroadcasts.list.length, (page == 0 ? 1 : page) * size)} of {sentBroadcasts.max_entries}</p> */}
            {/* <p>{(page == 0 ? 1 : page) * size - sentBroadcasts.list.length + 1}-{Math.min(sentBroadcasts.list.length, (page == 0 ? 1 : page) * size)} of {sentBroadcasts.max_entries}</p> */}
            <p style={{
              margin: '0 20px',
              fontFamily: 'Open Sans',
              fontSize: '14px'
              // cursor: 'pointer'
            }}
            >{from} - {to} of {sentBroadcasts.max_entries}</p>

            <FontAwesomeIcon
              style={{
                // margin: '0 20px 0 0',
                cursor: 'pointer'
              }}
              icon={faChevronRight}
              onClick={() => {
                if (to < sentBroadcasts.max_entries) {

                  getNextReportPage(page, size)
                }
              }} />
          </div>
        }
      </section>
    </>
  )
}

export default SentMessages