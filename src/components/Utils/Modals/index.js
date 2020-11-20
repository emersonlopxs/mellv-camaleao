import React from 'react';
import { Container } from './styles.module.scss';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  modal: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    alignItems: 'center',
    backgroundColor: '#f0f0f5',
    borderRadius: 10,
    boxShadow: theme.shadows[1],
    display: 'flex',
    height: 100,
    justifyContent: 'center',
    padding: theme.spacing(2, 4, 2),
    width: 100,
  },
}));

export default function OptionModal({
  text,
  close,
  open,
  fadein,
  onClick1,
  btn1,
  onClick2,
  btn2,
}) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className={classes.modal}
        closeAfterTransition
        onClose={close}
        open={open}
      >
        <Fade in={fadein}>
          <div
            className={classes.paper}
            style={{
              height: '300px',
              width: '600px',
              alignItems: 'flex-start',
            }}
          >
            <div className={Container}>
              <h2 id="transition-modal-title">{text}</h2>
              <div>
                <button onClick={onClick1} name={btn1} />
                <button onClick={onClick2} name={btn2} />
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
