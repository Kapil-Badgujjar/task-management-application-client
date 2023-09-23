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
import styles from './Signup.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectSignupUser, selectSignupError, setUsername, setEmail, setPassword, setConfirmPassword, removeError, registerUser, selectSignupStatus, setStatus } from '../../features/SignupSlice/signupSlice';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  const user = useSelector(selectSignupUser);
  const status = useSelector(selectSignupStatus);
  const error = useSelector(selectSignupError);
  const dispatch = useDispatch();
  function handleSubmit(event){
    event.preventDefault();
    dispatch(registerUser());
  }
  useEffect(()=> {
    if(status === 'Successful'){
      setTimeout(()=>{setStatus(), 100});
      navigate('/login');
    }
  },[status]);
  useEffect(()=>{
    setTimeout(()=>{dispatch(removeError())},2000);
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
                  Create a new account
                </Typography>
                <TextField color="primary" id="username" label="Username" variant="outlined" type="text" value={user.username ? user.username: ''} onChange={(e)=>{dispatch(setUsername(e.target.value))}}/>
                <TextField color="primary" id="email" label="Email" variant="outlined" type="email" value={user.email ? user.email: ''} onChange={(e)=>{dispatch(setEmail(e.target.value))}}/>
                <TextField color="primary" id="password" label="Password" variant="outlined" type="password" value={user.password ? user.password: ''} onChange={(e)=>{dispatch(setPassword(e.target.value))}}/>
                <TextField color="primary" id="confirmpassword" label="Confirm Password" variant="outlined" type="text" value={user.confirmPassword ? user.confirmPassword: ''} onChange={(e)=>{dispatch(setConfirmPassword(e.target.value))}}/>
                <div className={styles.errorMsg}>
                  {error && <Alert severity="error">{error}</Alert>}
                </div>
                <Link
                className={styles.links}
                  component="div"
                  variant="body2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                >
                  <Button sx={{ width: '100%'}} color="primary" variant="contained">Register</Button>
                </Link>
                <Link
                className={styles.links}
                  component="button"
                  variant="body2"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/login')
                  }}
                >
                 Login to your account!
                </Link>
              </div>
          </Paper>
        </Box>
      </Container>
    </React.Fragment>
  );
}