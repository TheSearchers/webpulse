import { useState, useContext } from "react";
import { When } from "react-if";
import { LoginContext } from "../Auth/auth";

import { Modal } from "react-responsive-modal";

import "./form.css";
import { text } from "superagent/lib/node/parsers";
export default function Register() {
  const auth = useContext(LoginContext);

  const onOpenModal = () => auth.setOpen(true);
  const onCloseModal = () => auth.setOpen(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    event.preventDefault();
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    if (
      userInfo.username !== "" &&
      userInfo.username !== null &&
      userInfo.password !== "" &&
      userInfo.password !== null &&
      userInfo.email !== null &&
      userInfo.email !== ""
    ) {
      auth.signup(userInfo);
    }
  };
  return (
    <>
      <When condition={auth.registered}>
        <Modal open={auth.open} onClose={auth.onCloseModal} center>
          <div className="singin-div">
            <form>
              <div className="form-group">
                <h2>Sign up</h2>

                <input
                  onChange={handleChange}
                  type="text"
                  name="username"
                  className="form-control"
                  id="User Name"
                  placeholder="Enter User Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter your Password"
                  required
                />
              </div>

              {/* <label htmlFor="role" style={{fontSize: "20px"}}> Choose a role :</label>
          <select name="role" id="role" onChange={handleChange} style={{marginLeft:"20px"}}>
            <option className="btn btn-outline-primary" value="user">
              user
            </option>
            <option className="btn btn-outline-primary" value="admin">
              admin
            </option>
          </select>
          <br></br> */}

              <button
                type="submit"
                onClick={handelSubmit}
                className="btn btn-success"
              >
                Signup
              </button>

              <label>
                Already have an account?{" "}
                <span className="span" onClick={auth.renderedForm}>
                  Login
                </span>
              </label>
            </form>
          </div>
        </Modal>
      </When>
    </>
  );
}
