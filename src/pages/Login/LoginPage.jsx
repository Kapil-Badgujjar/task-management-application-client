import React, {useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import styles from './Login.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectLoginError, setEmailValue, setPasswordValue, loginUser, removeError } from '../../features/userSlice/userSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const error = useSelector(selectLoginError);
  const dispatch = useDispatch();
  function handleSubmit(event){
    event.preventDefault();
    dispatch(loginUser());
  }
  useEffect(()=>{
    setTimeout(()=>{dispatch(removeError())},3000);
  },[error]);
  useEffect(() => {
    if(user?.id){
      navigate('/dashboard');
    }
  },[user]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box className={styles.loginFormContainer} component="form" sx={{ bgcolor: '#fff', height: '100vh' }}>
          <Paper elevation={3}>
              <div className={styles.loginForm}>
                <Typography variant="h4" gutterBottom>
                  Login to your account
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField color="primary" id="email" label="Email" variant="outlined" type="email" value={user.email_id ? user.email_id: ''} onChange={(e)=>{dispatch(setEmailValue(e.target.value))}}/>
                <TextField color="primary" id="password" label="Password" variant="outlined" type="password" value={user.password ? user.password: ''} onChange={(e)=>{dispatch(setPasswordValue(e.target.value))}}/>
                <Link className={styles.links}
                  component="div"
                  variant="body2"
                  onClick={(e) => {
                    e.preventDefault(); 
                    handleSubmit(e)}}>
                      <Button color="primary" variant="contained">Login</Button>
                    </Link>
                <div >
                Don't have an account?&nbsp;&nbsp;
                <Link
                  className={styles.links}
                  variant="body2"
                  sx={{cursor: 'pointer'}}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/register');
                  }}
                >
                 Register now
                </Link>
                </div>
              </div>
          </Paper>
        </Box>
      </Container>
    </React.Fragment>
  );
}