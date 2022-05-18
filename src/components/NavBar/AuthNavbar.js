import {useContext} from 'react'
import { NavLink } from "react-router-dom";

const AuthNavbar = ({ classMenu }) => {
  return (
    <>
      <NavLink to="/dashboard" className={classMenu}>
        DASHBOARD
      </NavLink>
      <NavLink to="/root/6256e368fde0ae6f070b9eee" className={classMenu}>
        FILEMANAGER
      </NavLink>
      <NavLink to="/hubroot" className={classMenu}>
        HUBMANAGER
      </NavLink>
      <NavLink to="/upload" className={classMenu}>
        UPLOAD
      </NavLink>
      <NavLink to="/profile" className={classMenu}>
        PROFILE
      </NavLink>
    </>
  );
};

export default AuthNavbar
