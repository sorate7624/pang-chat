// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faTriangleExclamation,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
// import 'animate.css';
// import './App.css';
import './App.scss';

function App() {
  const DEVELOP_URL = 'http://43.202.54.148:5000';
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorSignin, setErrorSignin] = useState('');
  const [errorSignup, setErrorSignup] = useState('');
  const [successSignup, setSuccessSignup] = useState('');
  const [eyeIconVisible, setEyeIconVisible] = useState(false);
  const [isSigninActive, setIsSigninActive] = useState(true);

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setEyeIconVisible(!eyeIconVisible);
  };

  const handleSigninSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        `${DEVELOP_URL}/signin`,
        {
          signinId: id,
          signinPw: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setErrorSignin('');
        console.log('response.data: ', response.data);
        console.log('로그인 성공했으니 목록으로 넘어가야 함');
        // 로그인 성공시 다음 로직을 추가합니다.
      })
      .catch((error) => {
        const errorCode = error.response.status;
        setErrorSignin(error.message);

        // setSuccessSignup('');
        if (errorCode === 400) {
          setErrorSignin('Invalid ID/Password. Please try again.');
        } else {
          setErrorSignin('Server error. Please Contact Pang.');
        }
        console.error('로그인 실패:', error.message);
        console.log(error);
      });
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        `${DEVELOP_URL}/signup`,
        {
          signupId: id,
          signupPw: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log('response.data: ', response.data);
        setErrorSignup('');
        setSuccessSignup('Sign up is complete. Please log in.');
      })
      .catch((error) => {
        const errorCode = error.response.status;
        setSuccessSignup('');
        if (errorCode === 400) {
          setErrorSignup('ID is duplicated.');
        } else {
          setErrorSignup('Server error. Please Contact Pang.');
        }
        console.error('회원 등록 실패:', error.message);
        console.log(error);
      });
  };

  const toggleSigninButton = (event) => {
    const isSigninButton = event.target.className.includes('signin');

    if (isSigninButton) {
      setIsSigninActive(true);
    } else {
      setIsSigninActive(false);
    }

    setId('');
    setPassword('');
    setEyeIconVisible(false);
    setErrorSignin('');
    setErrorSignup('');
    setSuccessSignup('');
  };

  return (
    <>
      <header>
        <h1 className="logo animate__animated animate__fadeInDown">
          <img src="../public/pang-chat.png" alt="pang-chat-icon" />
          <a href="#">Pang Chat</a>
        </h1>
      </header>
      <main className="container">
        <div className="box animate__animated animate__fadeIn">
          {isSigninActive ? (
            <form className="box-signin" onSubmit={handleSigninSubmit}>
              <div className="top-header">
                <h3>Welcome, Pang chat</h3>
                <small>We are happy to have you back.</small>
              </div>
              <div className="input-group">
                <div className="input-field">
                  <input
                    type="text"
                    value={id}
                    onChange={handleIdChange}
                    id="signinId"
                    required
                    className="input-box"
                  />
                  <label htmlFor="signinId">ID</label>
                </div>
                <div className="input-field">
                  <input
                    type={eyeIconVisible ? 'text' : 'password'}
                    id="signinPassword"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    className="input-box"
                  />
                  <label htmlFor="signinPassword">Password</label>
                  <div className="eye-area">
                    <div className="eye-box" onClick={togglePasswordVisibility}>
                      <FontAwesomeIcon
                        icon={eyeIconVisible ? faEye : faEyeSlash}
                      />
                    </div>
                  </div>
                </div>
                <input
                  type="submit"
                  className="input-submit signin"
                  value="Sign In"
                />
              </div>
              {errorSignin && (
                <p className="notice-txt">
                  <FontAwesomeIcon icon={faTriangleExclamation} /> {errorSignin}
                </p>
              )}
            </form>
          ) : (
            <form className="box-signup" onSubmit={handleSignupSubmit}>
              <div className="top-header">
                <h3>Sign Up, Now</h3>
                <small>We are happy to have you with us.</small>
              </div>
              <div className="input-group">
                <div className="input-field">
                  <input
                    type="text"
                    value={id}
                    onChange={handleIdChange}
                    id="signupId"
                    required
                    className="input-box"
                  />
                  <label htmlFor="signupId">ID</label>
                </div>
                <div className="input-field">
                  <input
                    type={eyeIconVisible ? 'text' : 'password'}
                    id="signupPassword"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    className="input-box"
                  />
                  <label htmlFor="signupPassword">Password</label>
                  <div className="eye-area">
                    <div className="eye-box" onClick={togglePasswordVisibility}>
                      <FontAwesomeIcon
                        icon={eyeIconVisible ? faEye : faEyeSlash}
                      />
                    </div>
                  </div>
                </div>
                <input
                  type="submit"
                  className="input-submit signup"
                  value="Sign Up"
                />
              </div>
              {errorSignup && (
                <p className="notice-txt">
                  <FontAwesomeIcon icon={faTriangleExclamation} /> {errorSignup}
                </p>
              )}
              {successSignup && (
                <p className="notice-txt success">
                  <FontAwesomeIcon icon={faCircleCheck} /> {successSignup}
                </p>
              )}
            </form>
          )}
          <div className="switch" onClick={toggleSigninButton}>
            {/* <button className={`signin ${isSigninActive ? "btn-active" : ""}`}>Sign In</button>
            <button className={`signup ${isSigninActive ? "" : "btn-active"}`}>Sign Up</button> */}
            {isSigninActive ? (
              <>
                <button className="signin btn-active">Sign In</button>
                <button className="signup">Sign Up</button>
              </>
            ) : (
              <>
                <button className="signin">Sign In</button>
                <button className="signup btn-active">Sign Up</button>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
