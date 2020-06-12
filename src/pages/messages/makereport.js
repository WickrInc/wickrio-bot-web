import React, { useState, useContext, useEffect } from "react"
import { Link } from "gatsby"
import { MessageContext } from "../../components/context"

const Report = ({ id }) => {
  const { report, secGroups, sendReportStatus } = useContext(MessageContext)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(25)


  useEffect(() => {

    // no way to get accumulated number of records 
    sendReportStatus(id, 0, 25)
  }, [])

  // const broadcast = sentBroadcasts.find(broadcast => broadcast.message_id === id)
  const secGroup = secGroups.find(group => group.id === report.target) || { name: 'network' }
  const date = new Date(report?.broadcast?.when_sent)
  // console.log({ secGroups, report, date })
  // console.log(report.broadcast.summary)

  const getNextReportPage = (id, page, size) => {
    // setPage(page + 1)
    sendReportStatus(id, page, size)
  }

  const getLastReportPage = (id, page, size) => {
    if (page !== 0) {
      setPage(page - 1)
      sendReportStatus(id, page, size)
    }
  }

  return (
    <>
      {report.broadcast ?
        <>
          <h3 style={{
            // marginTop: '40px',
            // overflow: 'scroll'

          }}
            className="title-report">{report.broadcast.message}
          </h3>
          <p className="subtitle-report">{`Sent on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()} to ${secGroup.name}`}</p>
          <div style={{
            display: 'flex',
            margin: '25px 0'

          }}>
            <div style={{
              margin: '0px 15px 0 0'
            }}>
              <h2
                className="summaryVal"
                style={{ margin: 0 }}>
                {Math.max(0, report.broadcast.summary.sent - report.broadcast.summary.failed)}
              </h2>
              <p className="summary"
                style={{ margin: 0 }}>
                received
              </p>
            </div>
            <div style={{
              margin: '0 15px'
            }}>
              <h2 className="summaryVal"
                style={{ margin: 0 }}>
                {report.broadcast.summary.pending}
              </h2>
              <p className="summary"
                style={{ margin: 0 }}>
                pending
              </p>
            </div>
            <div style={{
              margin: '0 15px'
            }}>
              <h2 className="summaryVal"
                style={{ margin: 0 }}>
                {report.broadcast.summary.failed}
              </h2>
              <p className="summary"
                style={{ margin: 0 }}>
                failed
             </p>
            </div>
            <div style={{
              margin: '0 15px'
            }}>
              <h2 className="summaryVal"
                style={{ margin: 0 }}>
                {report.broadcast.summary?.ack}
              </h2>
              <p className="summary"
                style={{ margin: 0 }}>
                acknowledged
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
            <div>
              <h2 className="report-table-title">Report</h2>
              <p className="subtitle-report">Lorem Ipsum</p>
            </div>
            <button className="downloadButton">Download</button>
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
                {report.broadcast.report?.map((user, idx) => {
                  if (user.status == 0) { user.status = "pending" }
                  else if (user.status == 1) { user.status = "sent" }
                  else if (user.status == 2) { user.status = "failed" }
                  else if (user.status == 3) { user.status = "ack" }
                  else if (user.status == 4) { user.status = "ignored" }

                  return (
                    <tr key={idx}>
                      <td>
                        <p className="sentmessagereport">
                          {user.status}
                        </p>
                      </td>
                      <td className="trowreport">{user.user}</td>
                      {user?.status_message?.includes('http') ?
                        <td className="trowreport">
                          <a href={user.status_message} rel="noopener noreferrer" target="_blank">
                            Location
                          </a>
                        </td>
                        :
                        <td className="trowreport">
                          {user.status_message}
                        </td>

                      }
                      <td className="trowreport"><div>
                        <p style={{
                          fontSize: 12,
                          fontFamily: 'Open Sans',
                          letterSpacing: '0.41px',
                          textAlign: 'right',
                          color: 'var(--text-light)',
                          lineHeight: 1.33
                        }}>
                          {new Date(user.sent_datetime).toLocaleDateString()}
                        </p>

                        <p style={{
                          fontSize: 12,
                          fontFamily: 'Open Sans',
                          letterSpacing: '0.41px',
                          textAlign: 'right',
                          color: 'var(--text-light)',
                          lineHeight: 1.33
                        }}>
                          {new Date(user.sent_datetime).toLocaleTimeString()}
                        </p>
                      </div></td>
                      <td className="trowreport"><div>
                        <p style={{
                          fontSize: 12,
                          fontFamily: 'Open Sans',
                          letterSpacing: '0.41px',
                          textAlign: 'right',
                          color: 'var(--text-light)',
                          lineHeight: 1.33
                        }}>
                          {new Date(user.read_datetime).toLocaleDateString()}
                        </p>

                        <p style={{
                          fontSize: 12,
                          fontFamily: 'Open Sans',
                          letterSpacing: '0.41px',
                          textAlign: 'right',
                          color: 'var(--text-light)',
                          lineHeight: 1.33
                        }}>
                          {new Date(user.read_datetime).toLocaleTimeString()}
                        </p>
                      </div></td>
                    </tr>
                  )
                })}
              </tbody>

            </table>
            {report.broadcast.report.length > 1 &&
              <>
                <p
                  onClick={() => getLastReportPage(page, size)}
                >
                  {'<'}
                </p>
                <p>{(page == 0 ? 1 : page) * size - 24}-{(page == 0 ? 1 : page) * size}</p>
                <p
                  onClick={() => getNextReportPage(page, size)}
                >
                  {'>'}
                </p>
              </>
            }
          </section>
        </>
        : 'loading'
      }

    </>

  )
}

export default Report