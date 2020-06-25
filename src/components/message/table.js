import React, { useState, useContext, useEffect } from "react"
import { Link } from "gatsby"
import { MessageContext } from "../context"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronDown, faChevronRight, faLessThanEqual, faCog, faRedo } from '@fortawesome/free-solid-svg-icons'
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
import { Tooltip } from "@material-ui/core"


const Row = ({ broadcast }, key) => {
  console.log({ broadcast })
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
      <TableCell component="th" scope="row"><div style={{
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
            {broadcast.when_sent ? new Date(broadcast.when_sent).toLocaleDateString() : ''}
          </p>

          <p style={{
            fontSize: 12,
            fontFamily: 'Open Sans',
            letterSpacing: '0.41px',
            textAlign: 'right',
            color: 'var(--text-light)',
            lineHeight: 1.33
          }}>
            {broadcast.when_sent ? new Date(broadcast.when_sent).toLocaleTimeString() : ''}
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
          }}>{secGroups.find(group => group.id === broadcast.target)?.name || 'network'}</p>
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
        </div></TableCell>
      <TableCell align="center">{broadcast.summary.read}</TableCell>
      <TableCell align="center">{broadcast.summary.pending}</TableCell>
      <TableCell align="center">{broadcast.summary.failed}</TableCell>
      <TableCell align="center">{broadcast.summary.acked}</TableCell>
      <TableCell align="center">{broadcast.summary.ignored}</TableCell>
      <TableCell align="center">{broadcast.summary.sent}</TableCell>
    </TableRow>
  )
}

const SentMessages = () => {
  const { sendStatus, sentBroadcasts, sendBroadcastSummary } = useContext(MessageContext)
  // being reloaded twice on initial render
  // and after every change in send component
  // console.log(sentBroadcasts)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(25)
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('when_sent');
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const useRowStyles = makeStyles({
    root: {
      margin: 0,
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
  let from = page == 0 ? 1 : page * size + 1


  let to = sentBroadcasts.list.length < size ? sentBroadcasts.max_entries : sentBroadcasts.list.length * (page + 1)


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
  return (
    <section
      className="sentsection"
      style={{
        overflow: 'scroll'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <div>
          <h3
            className="title">Sent Messages</h3>
          <p className="subtitle">Click on the message to view detailed reports</p>
        </div>
        <Tooltip title="Refresh table with current statistics" aria-label="add file">
          <div className="Rectangle"
            style={{
              borderRadius: '4px',
              border: 'solid 1px var(--bg-dark)',
              backgroundColor: 'var(--light)'
            }}
            onClick={() => {
              sendStatus(page, size)

            }}
          >
            <FontAwesomeIcon icon={faRedo} style={{
              color: '#6c6c6c',
              alignSelf: 'center'
            }} />
          </div>
        </Tooltip>
      </div>


      <TableContainer component={Paper} className={classes.root}>
        <Table className={classes.root} stickyHeader aria-label="sticky collapsible table">
          <TableHead >
            <TableRow >
              {/* <TableCell /> */}
              <TableCell
                className={classes.theader}
                // align={headCell.numeric ? 'right' : 'left'}
                // padding={headCell.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === 'when_sent' ? order : false}
              >
                <TableSortLabel
                  active={orderBy === 'when_sent'}
                  direction={orderBy === 'when_sent' ? order : 'asc'}
                  onClick={createSortHandler('when_sent')}
                >
                  Date
                  {/* {orderBy === 'when_sent' ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null} */}
                </TableSortLabel>
              </TableCell>
              <TableCell
                className={classes.theader}
                align="center">Read</TableCell>
              <TableCell
                className={classes.theader}
                align="center">Pending</TableCell>
              <TableCell
                className={classes.theader}
                align="center">Failed</TableCell>
              <TableCell
                className={classes.theader}
                align="center">Acked</TableCell>
              <TableCell
                className={classes.theader}
                align="center">Ignored</TableCell>
              <TableCell
                className={classes.theader}
                align="center">Sent</TableCell>
            </TableRow>
          </TableHead>
          {sentBroadcasts.list[0] &&
            <TableBody>

              {sentBroadcasts.list[0] &&

                stableSort(sentBroadcasts.list, getComparator(order, orderBy))
                  // sentBroadcasts.list
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  // .slice(0, 24)
                  ?.map((broadcast, idx) => {
                    return (

                      <Row broadcast={broadcast} key={broadcast.message_id} />
                    )
                  })}
            </TableBody>
          }
        </Table>
      </TableContainer>





      {/* <table > */}
      {/* <thead bgcolor="white">
            <tr>
              <th className="Date">Date</th>
              <th className="tlabel">Read</th>
              <th className="tlabel">Pending</th>
              <th className="tlabel">Failed</th>
              <th className="tlabel">Acknowledged</th>
              <th className="tlabel">Ignored</th>
              <th className="tlabel">Sent</th>
            </tr>
          </thead> */}
      {/* {sentBroadcasts.list[0] &&
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

        </table> */}

      {!sentBroadcasts.list[0] &&
        <p style={{
          backgroundColor: '#f2f3f5',
          padding: '24px 0',
          textAlign: "center",
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--text-light)',
          fontFamily: 'Open Sans'
        }}>
          Send a broadcast message to view a detailed report here
        </p>
      }


      {sentBroadcasts.list.length > 0 &&
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          margin: '10px 32px'
        }}>

          <FontAwesomeIcon
            style={{
              // margin: '0 20px 0 0',
              cursor: 'pointer'
            }}
            icon={faChevronLeft}
            onClick={() => {
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
  )
}

export default SentMessages