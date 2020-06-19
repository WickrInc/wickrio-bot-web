import React, { useState, useContext, useEffect } from "react"
import { Link } from "gatsby"
import { MessageContext } from "../context"
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


const Row = ({ user }, key) => {
  const { downloadReport, token, secGroups } = useContext(MessageContext)

  const useRowStyles = makeStyles({
    root: {
      boxShadow: 'none',
      '& > *': {
        borderBottom: 'unset',
      }
    },
  });
  const classes = useRowStyles();
  const [open, setOpen] = useState(false)

  return (
    <TableRow className={classes.root} key={key}>
      {/* <TableCell>
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell> */}
      <TableCell align="center">
        <p className="sentmessagereport">
          {user.status}
        </p>
      </TableCell>
      <TableCell align="center">
        <p className="sentmessagereport">
          {user.user}
        </p>
      </TableCell>

      <TableCell align="center">
        {
          user?.status_message?.includes('http') ?
            <a href={user.status_message} rel="noopener noreferrer" target="_blank">
              Location
          </a> :
            user.status_message}

      </TableCell>
      <TableCell align="center">
        <div>
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
        </div>
      </TableCell>
      <TableCell align="center">
        <div>
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
        </div></TableCell>
    </TableRow>
  )
}




const Report = ({ id }) => {
  const { report, secGroups, sendReportStatus, downloadReport, sentBroadcasts, sendStatus } = useContext(MessageContext)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(25)
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('when_sent');
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const useRowStyles = makeStyles({
    root: {
      boxShadow: 'none',
      maxHeight: 800,
      '& > *': {
        borderBottom: 'unset',
      }
    },
    theader: {
      backgroundColor: '#fff',
      fontFamily: 'Open Sans',
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.14,
      letterSpacing: '1.28px',
      // textAlign: right;
      color: 'var(--text-light)'

    }
  });
  const classes = useRowStyles();
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    console.log({ orderBy, property, order, isAsc })
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    sendStatus(0, 25)
    // sendBroadcastSummary()
  }, [])

  const getNextReportPage = (page, size) => {
    sendStatus(page + 1, size)
    setPage(page + 1)
  }

  const getLastReportPage = (page, size) => {
    if (page !== 0) {
      sendStatus(page - 1, size)
      setPage(page - 1)

      // console.log({ newpage: page - 1 })
      // sendStatus(page, size)
    }
  }
  let from = page == 0 ?
    (sentBroadcasts.list.length - (sentBroadcasts.list.length - 1)) * page + 1 :
    size * (sentBroadcasts.list.length - (sentBroadcasts.list.length - 1)) + 1


  let to = sentBroadcasts.list.length * (page + 1)


  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }


  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, sentBroadcasts.list.length - page * rowsPerPage);

  console.log({ id })

  useEffect(() => {

    // no way to get accumulated number of records 
    sendReportStatus(id, 0, 25)
  }, [])

  // const broadcast = sentBroadcasts.find(broadcast => broadcast.message_id === id)
  const secGroup = secGroups.find(group => group.id === report?.broadcast?.target) || { name: 'network' }
  const date = new Date(report?.broadcast?.when_sent)
  // console.log({ secGroups, report, date })
  // console.log(report.broadcast.summary)

  console.log({ report })


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
                recieved
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
              {/* <p className="subtitle-report">Lorem Ipsum</p> */}
            </div>
            <button className="downloadButton" onClick={() => downloadReport(report.broadcast.message_id, 0, 25)}>Download</button>
          </div>
          <section
            className="sentsection"
            style={{
              marginTop: '20px',
              overflow: 'scroll'
            }}
          >

            <TableContainer component={Paper} className={classes.root}>
              <Table stickyHeader aria-label="sticky collapsible table">
                <TableHead >
                  <TableRow >

                    <TableCell
                      className={classes.theader}
                    // align={headCell.numeric ? 'right' : 'left'}
                    // padding={headCell.disablePadding ? 'none' : 'default'}
                    >
                      <TableSortLabel
                        active={orderBy === 'when_sent'}
                        direction={orderBy === 'when_sent' ? order : 'asc'}
                        onClick={createSortHandler('when_sent')}
                      >
                        Status
                        </TableSortLabel>
                    </TableCell>
                    <TableCell
                      className={classes.theader}
                      align="center">Name</TableCell>
                    <TableCell
                      className={classes.theader}
                      align="center">Message</TableCell>
                    <TableCell
                      className={classes.theader}
                      align="center">Sent</TableCell>
                    <TableCell
                      className={classes.theader}
                      align="center">Read</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {report.broadcast.report?.map((user, idx) => {
                    if (user.status == 0) { user.status = "pending" }
                    else if (user.status == 1) { user.status = "sent" }
                    else if (user.status == 2) { user.status = "failed" }
                    else if (user.status == 3) { user.status = "ack" }
                    else if (user.status == 4) { user.status = "ignored" }
                    else if (user.status == 5) { user.status = "aborted" }
                    else if (user.status == 6) { user.status = "read" }
                    else if (user.status == 7) { user.status = "delivered" }
                    console.log({ user })
                    return (
                      <Row user={user} key={user.message_id} />
                    )
                  })}
                </TableBody>

              </Table>
            </TableContainer>



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