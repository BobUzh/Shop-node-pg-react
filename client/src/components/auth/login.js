import React, { useContext, useState } from "react";
import {observer} from "mobx-react-lite";

import './auth.scss';
import Spinner from "../spiner/spiner";

import { Context } from "../../index";

const Login = () => {
    const [email, setEmail] = useState(() => '');
    const [password, setPassword] = useState(() => '');
    const [loading, setLoading] = useState(() => false);
    const [message, setMessage] = useState(() => '');
    const {store} = useContext(Context);

    const submit = async () => {
        if (message) setMessage('');
        setLoading(true);

        const response = await store.login({email, password});
        if (response) setMessage(response.message);
        setLoading(false);
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
              <span>Login</span>
              <div className="input_group">
                  <label htmlFor="email">email</label>
                  <input id="email" type="text" placeholder="email" name="email"
                         value={email}
                         onChange={e => setEmail(e.target.value)}/>
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

export default observer(Login);