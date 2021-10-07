import React , {useState,useEffect} from 'react'
import fetchClient from '../axiosClient/axiosClient'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {convert} from './Record.js'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {
    usePopupState,
    bindTrigger,
    bindMenu,
  } from 'material-ui-popup-state/hooks'
const ExpandMore = styled((props) => {
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
    const [expanded, setExpanded] = useState(false);
    const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleDelete = (e) => {
        e.preventDefault();
        alert("delete this record")
    }
    return (
        <Card sx={{ maxWidth: 345, margin : 3}}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon variant="contained" {...bindTrigger(popupState)}/>
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
              </IconButton>
            }
            title={prop.record.meetingPerson.firstName + " " + prop.record.meetingPerson.lastName}
            subheader={convert(prop.record.dateTime)}
          />
          
          
          <CardActions disableSpacing>

                <IconButton aria-label="location">
                <LocationOnIcon />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                    {prop.record.location}
                    </Typography>
                </CardContent>
                </IconButton>
                
            
            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
            </ExpandMore>
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
                <Typography paragraph>
                    {prop.record.notes? prop.record.notes:"add notes"}
                </Typography>
                
                </CardContent>
          </Collapse>
        </Card>
      );
}

export default RecordDetail