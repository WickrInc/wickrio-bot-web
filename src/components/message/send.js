import React, { useEffect, useContext } from "react"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Link } from "gatsby"
import { MessageContext } from "../context"
// import Attach from "../images/attach"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip, faMicrophone, faMapMarkerAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button, makeStyles, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

let repeatlist = [{
  value: 2,
  name: '2 times'
}]

let freqlist = [{
  value: 1500,
  name: 'every 15 seconds'
}]

// add ALL GROUPS / WHOLE NETWORK
// be able to see uplaoded file preview
const SendMessage = () => {
  const {
    user,
    token,
    sendAuthentication,
    attachment,
    getSecGroups,
    setSelectedSecGroup,
    secGroups,
    setFreq,
    sendBroadcast,
    message,
    setMessage,
    setAcknowledge,
    acknowledge,
    enableRepeat,
    setRepeatNumber,
    selectedSecGroup,
    repeat,
    setAttachment
  } = useContext(MessageContext)
  // run immediately & everytime state changes

  useEffect(() => {
    // sendAuthentication()
    // console.log({ user: user })
    getSecGroups()
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

  const useStyles = makeStyles(() => ({
    text: {
      '& .MuiOutlinedInput-root': {
        fontSize: '14px',
        '& fieldset': {
          // borderColor: '#f39200',
        },
        '&:hover fieldset': {
          // borderColor: '#f39200',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#f39200',
        },
      },
    },
    select: {
      '&.MuiOutlinedInput-root': {
        fontSize: '14px',
        '&.Mui-focused': {
          borderColor: '#f39200',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#f39200',
        },
      },
    },
    color: {
      backgroundColor: '#f39200',
      color: '#ffffff',
      fontFamily: 'Open Sans',
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.14,
      padding: '10px 23px',
      letterSpacing: '1.28px',
      '&:hover': {
        opacity: .7,
        backgroundColor: '#f39200'
      },
      '&:active': {
        opacity: .7,
        backgroundColor: '#f39200'
      }
    },
    labels: {
      padding: '4px 20px',
      fontFamily: 'Open Sans',
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.14,
      letterSpacing: '1.28px',
      textAlign: 'right',
      minWidth: '120px',
      /* margin-right: 24px; */
      color: 'rgba(0, 0, 0, 0.87)'
    },
    inputs: {
      borderRadius: '4px',
      border: 'solid 1px var(--bg-light)',
      backgroundColor: 'var(--light)'
    },
    icon: {
      '&:hover': {
        color: 'var(--secondary)'
      }
    },
    chip: {
      bottom: '8px',
      position: 'absolute',
      left: '10px'
    }
  }));

  // const ColorButton = withStyles(() => ({
  //   root: {
  //     // color: theme.palette.getContrastText(purple[500]),
  //     backgroundColor: '#f39200'
  //     // '&:hover': {
  //       //   backgroundColor: purple[700],
  //       // },
  //     },
  //   }))(Button);
  console.log({ selectedSecGroup, opposite: !selectedSecGroup, message: !message.trim() })
  console.log((!message.trim() || !selectedSecGroup) ?
    true :
    false)
  const classes = useStyles();
  return (
    <form
      className="border"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 20px',
        // minWidth: '375px'
        // minWidth: '350px'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '14px'
      }}>

        <h3 className="title">New Broadcast Message</h3>
        <Button
          // type="button"
          disabled={
            !message.trim() || !selectedSecGroup ?
              true :
              false
          }
          onClick={() => sendBroadcast()}
          className={classes.color}
          // className={message ? "sendButton" : 'disabledSendButton'}
          variant="contained"
        // color="primary"
        >Send</Button>
      </div>



      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px',
        flexWrap: 'wrap'
      }}>

        <InputLabel className={classes.labels} id="secgroup-label">Send To</InputLabel>

        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            labelId="secgroup-label"
            name="secgroup"
            id='secgroup'
            disabled={secGroups.length > 1 ? false : true}
            // value={age}
            // onChange={handleChange}
            defaultValue="default"
            onChange={e => {
              setSelectedSecGroup(e.target.value)
            }}
            // label="secgroup"
            style={{
              width: '100%',
              fontFamily: 'Open Sans',
              fontSize: '14px',
              textIndent: '6px',
              minWidth: '284px'
            }}
            className={classes.select}
          >
            <MenuItem value='default' disabled>{secGroups.length > 1 ? 'Select Security Groups' : 'Getting Security Groups'}</MenuItem>
            <MenuItem value="NETWORK">Whole network</MenuItem>
            {secGroups && secGroups?.map((secgroup, idx) => {
              return (
                <MenuItem value={secgroup.id} key={idx}>{secgroup.name}</MenuItem>
              )
            })
            }
          </Select>
        </FormControl>


      </div>
      <div style={{
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>

        <label
          className="labels"
          htmlFor="text"
          style={{
            padding: '4px 20px',
          }}>Message</label>
        <div style={{
          flex: 1,
          fontSize: '14px',
          fontFamily: 'Open Sans',
          minWidth: '284px',
          position: 'relative',
          display: 'flex'
          // padding: '16px 14px'
        }}>

          <TextField
            id="text"
            name="text"
            // labelId="text"

            // label="Message"
            multiline
            rows={4}
            value={message}
            variant="outlined"
            placeholder="Add a message"
            // className={classes.inputs}
            onChange={e => {
              setMessage(e.target.value)
            }}
            className={classes.text}
            style={{
              flex: 1,
              fontSize: '14px',
              fontFamily: 'Open Sans',
              minWidth: '284px',
              // height: '160px'
              // padding: '16px 14px'
            }}
          />
          {attachment &&
            <Chip
              // icon={<FaceIcon />
              style={{
                borderRadius: '2px'
              }}
              label={attachment.name}
              // onClick={handleClick}
              className={classes.chip}
              onDelete={() => {
                setAttachment(null)

              }}
            />

          }
          <div style={{
            display: 'flex',
            position: 'absolute',
            right: '10px',
            bottom: '5px'
          }}>
            <Tooltip title="Add a voice memo" aria-label="add voice" style={{
              margin: '0 10px'
            }}>
              <span>
                <FontAwesomeIcon
                  size="lg"
                  icon={faMicrophone}
                  style={{
                    cursor: 'pointer'
                  }}
                  className={classes.icon}
                />
              </span>
            </Tooltip>

            <Tooltip title="Add a file" aria-label="add file">
              <span>

                <FontAwesomeIcon
                  size="lg"
                  icon={faPaperclip}
                  onClick={() => buildFileSelector()
                    // setAttachment()
                  }
                  style={{
                    cursor: 'pointer',
                  }}
                  className={classes.icon}
                />
              </span>
            </Tooltip>
          </div>


        </div>

      </div>
      <div
        className="checkboxes"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(284px, 250px))',
          alignItems: 'center',
          // margin: '18p x 0 18px 120px'
        }}>
        <div>
          <Checkbox
            checked={acknowledge}
            onChange={e => {
              setAcknowledge(!acknowledge)
            }}
            className={classes.checkboxes}
            size="small"
            name="acknowledge"
            id="acknowledge"
            color="primary"
          />
          <label
            className="smlabels"
            htmlFor="acknowledge">Ask for acknowledgement </label>
        </div>
        <div>


          {/* <Checkbox
            disabled
            checked={repeat}
            onChange={e => {
              enableRepeat(!repeat)
            }}
            className={classes.checkboxes}
            size="small"
            color="primary"
            name="repear"
            id="repear"
          />
          <label
            className="smlabels"
            htmlFor="repear">Repeat</label> */}
        </div>
      </div>
      {/* <div style={{
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gridGap: '20px'

      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <label
            className="labels"
            style={{
              // flex: '.2',
            }} htmlFor="numrepeat">Repeat</label>
          <select
            className="border"
            disabled
            style={{
              flex: '1',
              textIndent: '6px',
              fontSize: '14px',
              fontFamily: 'Open Sans'
            }}
            defaultValue="default"
            onChange={e => setRepeatNumber(e.target.value)}
            type="dropdown" id="numrepeat" name="numrepeat">
            <option value="default" disabled>How many times</option>

            {repeatlist?.map((repeatnum, idx) => {
              return (
                <option value={repeatnum.value} key={idx}>{repeatnum.name}</option>
              )
            })}
          </select>

        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap'

        }}>
          <label
            className="labels"
            style={{
            }} htmlFor="frequency">Frequency</label>
          <select
            className="border"
            disabled
            style={{
              flex: 1,
              textIndent: '6px',
              fontSize: '14px',
              fontFamily: 'Open Sans',
            }}
            defaultValue="default"
            onChange={e => setFreq(e.target.value)}
            type="dropdown" id="frequency" name="frequency">
            <option value="default" disabled>How often</option>

            {freqlist?.map((frequency, idx) => {
              return (
                <option value={frequency.value} key={idx}>{frequency.name}</option>
              )
            })}
          </select>
        </div>
      </div> */}

    </form >
  )
}

export default SendMessage