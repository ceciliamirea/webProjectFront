import { MDBBtn,    MDBContainer,
  MDBInput, } from "mdb-react-ui-kit"
import axios from 'axios';
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenJoin = () => setOpenJoin(true);
  const handleCloseJoin = () => setOpenJoin(false);
  const [activityname, setactivityname] = useState("");
  const [newActivityCode, setnewActivityCode] = useState("");
  const [joinActivitystate, setjoinActivitystate] = useState("");
  const [activityDescription,setactivityDescription] = useState("");
  const [activityStartTime,setactivityStartTime] = useState("");
  const [activities,setActivities] = useState([]);
  async function createActivityApi() {
  
   await axios.post(`http://localhost:3000/api/activity`,{
      activityname:activityname,
      activityDescription:activityDescription,
      startTime: activityStartTime.slice(0,activityStartTime.indexOf("GMT")),
      createdBy: location.state._id
  
   })
      .then(res => {
        alert("Activity Created")
        setnewActivityCode(res.data.activityCode)
        setOpen(false);
        console.log(res)
      })
      .catch(err =>{
        console.log(err)
      })
    }

    async function joinActivity() {
      console.log(`http://localhost:3000/api/activityAccess/${joinActivitystate}/${location.state._id}`)
      await axios.get(`http://localhost:3000/api/activityAccess/${joinActivitystate}/${location.state._id}`)
         .then(res => {

           console.log(res)
           if(res.data.msg == "Activity found and it's available"){
            alert("Activity found and it's available")
            setOpenJoin(false);
           }
           else alert("Activity found but it's not available")
         })
         .catch(err =>{
          alert(err.response.data.msg)
           console.log(err)
         })
       }

       useEffect(() => {
        if(location.state.userRole == "Teacher"){
          axios.get(`http://localhost:3000/api/activitiesPerUser/${location.state._id}`)
          .then(res => {
            setActivities(res.data)
            console.log(res)
          })
          .catch(err =>{
           alert(err.response.data.msg)
            console.log(err)
          })
        }
        else {
          axios.get(`http://localhost:3000/api/activitiesPerStudent/${location.state._id}`)
          .then(res => {
            setActivities(res.data)
            console.log(res)
          })
          .catch(err =>{
           alert(err.response.data.msg)
            console.log(err)
          })
        }

      }, []);
  return (
    <div>MainPage
      
        {
          (location.state?.userRole == "Teacher") &&
          <div> 
            <MDBBtn className="mb-4" onClick={handleOpen}>
              Create
            </MDBBtn>
            </div>
          
       
        }

<div>
    <MDBBtn className="mb-4" onClick={handleOpenJoin}>
Join</MDBBtn></div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <p>Enter activity name:</p>
          <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='name' onChange={e=>{
            setactivityname(e.target.value);
          }}/>
          <p>Enter your password:</p>
          <MDBInput wrapperClass='mb-4' label='Short Description' id='form2' type='password' onChange={e=>{
            setactivityDescription(e.target.value);
        

          }}/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker onAccept={e=>{
                setactivityStartTime(e.$d.toString())
              }} label="Basic date time picker" />
            </DemoContainer>
      </LocalizationProvider>
      <br/>
      <MDBBtn className="mb-4" onClick={createActivityApi}>
      Create</MDBBtn>
        </Box>
      </Modal>


      <Modal
        open={openJoin}
        onClose={handleCloseJoin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <p>Enter activity code:</p>
          <MDBInput wrapperClass='mb-4' label='Code' id='form1' type='name' onChange={e=>{
            setjoinActivitystate(e.target.value);
          }}/>
      
      <MDBBtn className="mb-4" onClick={joinActivity}>
      Join</MDBBtn>
        </Box>
      </Modal>
<Box>
{
  (location.state?.userRole == "Teacher") && activities?.map(item =>{
    return (
      <Card key={item._id} sx={{ maxWidth: 345,border: 1,marginLeft:2 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.activityname}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           {item.activityDescription}
          </Typography>
          <Typography variant="body3" sx={{ color: 'text.secondary' }}>
           {item.startTime}
          </Typography>
          <br></br>
          <Typography variant="body3" sx={{ color: 'text.secondary' }}>
           {item.activityCode}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    );
  })
}
</Box>
<Box>
{
  (location.state?.userRole == "Student") && activities?.map(item =>{
    return (
      <Card key={item._id} sx={{ maxWidth: 345,border: 1,marginLeft:2 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.activityname}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           {item.activityDescription}
          </Typography>
          <Typography variant="body3" sx={{ color: 'text.secondary' }}>
           {item.startTime}
          </Typography>
          <br></br>
          <Typography variant="body3" sx={{ color: 'text.secondary' }}>
           {item.activityCode}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    );
  })
}
</Box>
</div>


  )

}
export default MainPage;