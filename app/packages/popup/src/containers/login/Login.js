import React, { Component } from 'react';
import { checkPsw } from '../../wallet/wallet';
import { startSession } from '../../utils/utils';

import './Login.css';

class InitPsw extends Component {
    constructor(props, context) {
        super(props, context);

        this.clickLogin = this.clickLogin.bind(this);
        this.handleChangePsw = this.handleChangePsw.bind(this);

        this.state = {
            psw: '',
            error: '',
        };
    }

    clickLogin() {
        if ( startSession() )
            this.props.onSuccess();//history.push('/home');
    }

    handleChangePsw(e) {
        this.setState({ showError: false });
        this.setState({ psw: e.target.value });
    }

    render() {
        return (
            <div className='container-login'>
                <div className='container-logo-login mt-5'>
                    <img src='./material/logo/pegasus-128.png' height='80' width='80' alt='pegasus logo'/>
                </div>
                <div className='row'>
                    <div className='col-12 text-center text-lg text-blue mt-1'>
                Pegasus
                    </div>
                </div>
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-10'>
                        <label htmlFor='inp-psw mt-5' className='inp'>
                            <input onChange={this.handleChangePsw} type='password' id='inp-psw' placeholder='&nbsp;'/>
                            <span className='label'>password</span>
                            <span className='border'></span>
                        </label>
                    </div>
                    <div className='col-1'></div>
                </div>
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-10 text-center'>
                        <button disabled={checkPsw(this.state.psw) ? false : true} onClick={this.clickLogin} type='submit' className='btn btn-blue mt-4'>Login</button>
                    </div>
                    <div className='col-1'></div>
                </div>
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-10 text-center'>
                        <button onClick={e => { this.props.onRestore(); }} type='submit' className='btn btn-white mt-1'>restore from seed</button>
                    </div>
                    <div className='col-1'></div>
                </div>
            </div>
        );
    }
}

export default InitPsw;