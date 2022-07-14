import React, { useState } from "react";
import { registration } from '../../api/authApi';
import Spinner from '../spiner/spiner';
import './auth.scss';
import {observer} from "mobx-react-lite";

const Registration = () => {
    const [username, setUsername] = useState(() => '');
    const [email, setEmail] = useState(() => '');
    const [firstname, setFirstname] = useState(() => '');
    const [lastname, setLastname] = useState(() => '');
    const [password, setPassword] = useState(() => '');
    const [loading, setLoading] = useState(() => false);
    const [message, setMessage] = useState(() => '');

    const submit = async () => {
        if (message) setMessage('');
        setLoading(true);
        try {
            const loginData = await registration({username, email, firstname, lastname, password});
            localStorage.setItem('token', loginData?.data?.accessToken);
            setMessage(`Підтвердіть пошту ${loginData.data.user.email}`);

        } catch (e) {
            if (e.response?.status === 409) {
                setMessage(e.response.data);
            } else {
                setMessage('Bad request');
            }
        } finally {
            setLoading(false);
        }

    };

    const spiner = (
        <div className="mask">
            <Spinner />
        </div>
    );

    const dataMessage = (
        <div className="error">
            <h2>{message}</h2>
        </div>
    );

  return (
      <>
      <div className="auth">
          <div className="auth_form">
              {loading && spiner}

              <span>Registration</span>
              <div className="input_group">
                  <label htmlFor="usename">username</label>
                  <input id="usename" type="text" placeholder="username" name="usename"
                         value={username}
                         onChange={e => setUsername(e.target.value)}/>
              </div>
              <div className="input_group">
                  <label htmlFor="email">email</label>
                  <input id="email" type="text" placeholder="email" name="email"
                         value={email}
                         onChange={e => setEmail(e.target.value)}/>
              </div>
              <div className="input_group">
                  <label htmlFor="firstname">firstname</label>
                  <input id="firstname" type="text" placeholder="firstname" name="firstname"
                         value={firstname}
                         onChange={e => setFirstname(e.target.value)}/>
              </div>
              <div className="input_group">
                  <label htmlFor="lastname">lastname</label>
                  <input id="lastname" type="text" placeholder="lastname" name="lastname"
                         value={lastname}
                         onChange={e => setLastname(e.target.value)}/>
              </div>
              <div className="input_group">
                  <label htmlFor="password">password</label>
                  <input id="password" type="password" placeholder="password" name="password"
                         value={password}
                         onChange={e => setPassword(e.target.value)}/>
              </div>
              <div className="input_group btn">
                  <button className="auth_btn_send" type="button" onClick={submit}>Send</button>
              </div>
          </div>
      </div>
    {message && dataMessage}
      </>
  )
};

export default observer(Registration);