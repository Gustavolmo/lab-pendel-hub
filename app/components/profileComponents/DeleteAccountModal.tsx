import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { signOut, useSession } from 'next-auth/react';
import { deleteAllRoute, deleteUser, leaveAllJoinedRide } from '@/library/private/private';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteAccountModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data: session, status } = useSession();

  const handleDeleteUser = () => {
    leaveAllJoinedRide(session?.user?.email)
    deleteAllRoute(session?.user?.email)
    deleteUser(session?.user?.email)
    signOut()
  };

  return (
    <div>
      <Button onClick={handleOpen}>Delete Account</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Delete Account
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want delete your account?
          </Typography>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleDeleteUser}>Delete</button>
        </Box>
      </Modal>
    </div>
  );
}
