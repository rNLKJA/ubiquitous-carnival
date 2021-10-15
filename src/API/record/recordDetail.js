import React, { useState } from 'react'

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { convert } from './Record.js'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import fetchClient from "../axiosClient/axiosClient"
import Popover from '@mui/material/Popover';

const ExpandMore1 = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const RecordDetail = (prop) => {

  const [expand, setExpand] = useState(false);
  const onExpandClick = () => {
    setExpand(!expand);
  };
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    setExpand(!expand);
  };



  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    window.confirm("(ｏ・_・)ノ Delete this record ? ")
    const recordId = {
      recordId: prop.record._id
    }

    console.log("deleting ", recordId)
    await fetchClient.post('/record/deleteOneRecord', { recordId: prop.record._id }).then((res) => console.log(res.data.status))
    window.location.href = "/record";
  }

  const open = Boolean(anchorEl);

  return (
    <Card sx={{ maxWidth: 500, margin: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "pink" }} aria-label="recipe">
            {prop.record.meetingPerson.lastName[0].toUpperCase()}
          </Avatar>
        }
        action={
          <div>
            <EditIcon onClick={() => { prop.setOneRecord({ ...prop.record, selected: true }) }} />
            <DeleteIcon onClick={handleDelete} />
          </div>
        }

        title={prop.record.meetingPerson.firstName + " " + prop.record.meetingPerson.lastName}
        subheader={convert(prop.record.dateTime)}
      />
      <CardContent>

        {(expand) ? '' : <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: '100%', nowrap: 'true' }}>
          <Typography noWrap >

            {"Notes : \n" + "  " + prop.record.notes.replace('\n\r', "")}

          </Typography>
        </div>}

      </CardContent>


      <CardActions >
        <div style={{ width: "80%", display: "flex", whiteSpace: "nowrap" }}>
          <IconButton aria-label="location">
            <LocationOnIcon />
            <CardContent>
              <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: '11rem' }}>
                <Typography aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  noWrap color="text.secondary">
                  {prop.record.location}
                </Typography>

                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: 'none',
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 1 }}>{prop.record.location}</Typography>
                </Popover>
              </div>

            </CardContent>
          </IconButton>
        </div>

        <ExpandMore1
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore1>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <IconButton aria-label="phone">
          <PhoneIcon />
          <Typography variant="body2" color="text.secondary">
            {prop.record.meetingPerson.phone[0]}
          </Typography>
        </IconButton>
        <CardContent>
          <Typography paragraph>Notes: </Typography>
          <Typography
            variant="body1"
            style={{ whiteSpace: 'pre-line' } }
          >
            {prop.record.notes ? prop.record.notes : "add notes"}
          </Typography>

        </CardContent>
      </Collapse>
    </Card>
  );
}

export default RecordDetail