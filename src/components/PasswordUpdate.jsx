import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function PasswordUpdate() {
  return (
    <div style={{display: 'flex', gap: '10px;'}}>
        <TextField color="primary" id="password" label="New Password" variant="standard" type="password" />
        <TextField color="primary" id="password" label="Confirm Password" variant="standard" type="text" />
        <Button variant="text">Update Password</Button>
    </div>
  )
}
