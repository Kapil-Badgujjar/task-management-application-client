import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectUpdate, setConfirmPassword, setNewPassword, updatePassword } from '../features/userSlice/userSlice';

export default function PasswordUpdate() {
  const dispatch = useDispatch();
  const update = useSelector(selectUpdate);
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <TextField color="primary" id="new_password" label="New Password" variant="standard" type="password" value={update.new_password ? update.new_password: ''} onChange={(e)=>dispatch(setNewPassword(e.target.value))} />
        <TextField color="primary" id="confirm_password" label="Confirm Password" variant="standard" type="text" value={update.confirm_password ? update.confirm_password: ''} onChange={(e)=>dispatch(setConfirmPassword(e.target.value))} />
        <Button variant="text" onClick={()=>{dispatch(updatePassword())}}>Update</Button>
    </div>
  )
}
