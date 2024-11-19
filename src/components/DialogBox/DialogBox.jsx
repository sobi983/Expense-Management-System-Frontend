import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material'; // MUI component library

// DialogBox code
const MessageDialog = ({ open, onClose, message }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Message</DialogTitle>
            <DialogContent>
                <Typography variant="body1">{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MessageDialog;
