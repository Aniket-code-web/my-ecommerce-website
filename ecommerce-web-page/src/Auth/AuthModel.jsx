// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Modal from "@mui/material/Modal";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Alert, Snackbar } from "@mui/material";
// import RegisterUserForm from "./RegisterForm";
// import LoginUserForm from "./LoginForm";

import { Box, Modal, Typography } from "@mui/material";
import RegisterForm from "./RegisterForm";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
// };

// export default function AuthModel({ handleClose, open }) {
//   const location = useLocation();
//   const { auth } = useSelector((store) => store);
//   useEffect(() => {
//     if (auth.user) handleClose();
//   }, [auth.user]);
//   return (
//     <>
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//       size="large"
//     >
//       <Box className="rounded-md" sx={style}>
//         {location.pathname === "/login" ? (
//           <LoginUserForm/>
//         ) : (
//           <RegisterUserForm/>
//         )}
//       </Box>
//     </Modal>

//     </>

//   );
// }

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline:"none",
  boxShadow: 24,
  p: 4,
};

const AuthModel = ({handleClose,open}) => {
  const location = useLocation();
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box   sx={style}>
          {location.pathname === "/login" ? <LoginForm/>:<RegisterForm/>}   
        </Box>
      </Modal>
    </div>
  )
}

export default AuthModel;