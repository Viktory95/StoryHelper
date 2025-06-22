import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Login = (props) => {
    const [register, setRegister] = useState(false)

    const submit = (data) => {
        if(register)
            axios.post(localStorage.getItem('addresses-register'), {
                user: data.user,
                password: data.password,
                authorities: 'ROLE_USER'
              })
              .then(function (response) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('username', data.user)
              })
              .catch(function (error) {
                console.error(error);
              })
              .finally(() => {
                props.reload()
              })
        else
            axios.post(localStorage.getItem('addresses-login'), {
                        user: data.user,
                        password: data.password,
                        authorities: 'ROLE_USER'
                      })
            .then(function (response) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('username', data.user)
            })
            .catch(function (error) {
                console.error(error);
            })
            .finally(() => {
                props.reload()
            })
    }

    if(register)
        return (
            <div id={'register'}>
                <button onClick={() => setRegister(false)}>Sign in</button>
                <form action={submit}>
                    <input name={'user'}/>
                    <input name={'password'}/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    else
        return (
            <div id={'login'}>
                <button onClick={() => setRegister(true)}>Sign up</button>
                <form action={submit}>
                    <input name={'user'}/>
                    <input name={'password'}/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
}

export default Login