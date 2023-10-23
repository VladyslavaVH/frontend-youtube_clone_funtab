import * as React from 'react';
import { useEffect, useState } from 'react';
import { Stack, Typography, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import s from '../Header/Header.module.css';
import { ReactComponent as Profile } from '../../assets/profile.svg';
import { ReactComponent as CloseIcon } from '../../assets/close_icon.svg';
import { ReactComponent as BackIcon } from '../../assets/back_icon.svg';
import { ReactComponent as CheckIcon } from '../../assets/check_icon.svg';
import Login from '../Forms/Login/Login';
import Registration from '../Forms/Registration/Registration';
import CodeDialog from '../Forms/Registration/CodeDialog';
import SuccessDialog from '../Forms/Registration/SuccessDialog';
import { connect } from 'react-redux';
import { setAuthUserData } from '../../redux/auth-reducer';
import { toggleChildModalActive, toggleModalActive, 
toggleModalBlur, toggleModalChild, setIterator, toggleChildClose } from '../../redux/ui-reducer';

const style = {
  outline: 'none',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  maxHeight: '600px',
  maxWidth: '570px',
  minWidth: '440px',
  width: '55%',
  height: 'max-content',
  display: 'flex',
  flexDirection: 'column',
  padding: '15px',
};

const NestedModal = (props) => {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  
  const handleOpen = () => {
    setOpen(true);
    props.toggleModalBlur(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.toggleModalBlur(false);
  };

  const regChild = <Registration setAuthUserData={props.setAuthUserData}
  onClickSubmit={(newI) => setI(newI)} />;

  const loginChild = <Login onClickSubmit={(newI) => setI(newI)}
  setAuthUserData={props.setAuthUserData} handleClose={() => handleClose()} />;

  const codeForm = (<CodeDialog onClickSubmit={(newI) => setI(newI)} />);

  const successForm = (<SuccessDialog setAuthUserData={props.setAuthUserData}
    handleClose={() => handleClose()} />)

  const [child, setChild] = useState(null);

  
  const getChild = () => {
    switch (i) {
      case 0:
        setChild(regChild);
        break;
      case 1:
        setChild(codeForm);
      break;
      case 2:
        setChild(successForm);
      break;
      case 3:
        setChild(loginChild)
        break;
      default:
        break;
      }
  }

  useEffect(() => {
    getChild();
  }, [i]);

  useEffect(() => {
    if (props.isAuth) {
      handleClose();
    }
  }, [props.isAuth]);
      
      return (
    <div>
      <Profile className={s.profileSvg} onClick={handleOpen} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description">

        <Box sx={{ ...style }}>
          <Box sx={{display: 'flex', justifyContent: (i == 1) ? 'space-between' : 'flex-end'}}>
          {(i == 1) 
          && <BackIcon onClick={() => setI(0)} style={{cursor: 'pointer'}} />}

          {(i != 2) && <CloseIcon style={{cursor: 'pointer'}} 
              onClick={handleClose} />}
          </Box>
          {child}
        </Box>

      </Modal>
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    modalActive: state.ui.modalActive,
    childModalActive: state.ui.childModalActive,
    isReg: state.ui.isReg,
    iterator: state.ui.iterator,
    back: state.ui.back,
    childClose: state.ui.childClose
  }
};

export default connect(mapStateToProps,
  {
    toggleModalActive, toggleChildModalActive,
    setAuthUserData, toggleModalBlur,
    toggleModalChild, setIterator, toggleChildClose
  }
)(NestedModal);