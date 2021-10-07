import React , {useState} from 'react'

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
import {convert} from './Record.js'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleDelete = (e) => {
        e.preventDefault();
        window.confirm("delete this record ? ")
    }
    return (
        <Card  sx={{ maxWidth: 345, margin : 3}}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "pink" }} aria-label="recipe">
                Hi
              </Avatar>
            }
            action={
              <div>
                <EditIcon onClick = {()=>{alert("editing")}}/>
                <DeleteIcon onClick ={handleDelete} />
              </div>        
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