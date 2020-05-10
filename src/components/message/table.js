import React, { useState, useContext } from "react"
import { Link } from "gatsby"
import { MessageContext } from "./context"

const SentMessages = () => {
  const { sentBroadcasts } = useContext(MessageContext)

  // being reloaded twice on initial render
  // and after every change in send component
  console.log(sentBroadcasts)

  return (
    <section
      className="sentsection"
    >
      <h3>Sent Messages</h3>
      <p className="subtitle">Click on the message to view detailed reports</p>
      <table>
        <thead>
          <tr>

            <th>Date</th>
            <th>Received</th>
            <th>Pending</th>
            <th>Failed</th>
            <th>Acknowledged</th>
          </tr>
        </thead>
        <tbody>
          {sentBroadcasts && sentBroadcasts.map((broadcast, idx) =>
            <tr key={idx}>
              <td>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <p>
                    {broadcast.message}
                  </p>
                  <p>
                    8:20pm
              </p>
                </div>
                <div style={{
                  display: 'flex'
                }}>
                  <p>Security Group(77 members)</p>
                  <p>Download</p>
                </div>
              </td>
              <td>r</td>
              <td>p</td>
              <td>f</td>
              <td>a</td>
            </tr>
          )}
        </tbody>

      </table>
    </section>
  )
}

export default SentMessages