import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alertError, alertSuccess } from '../redux/actions/alert';
import { signup } from '../redux/actions/auth';
import { changeTitle, expanseNavbar } from '../redux/actions/layout';
import {signUpEmailError} from '../redux/actions/auth'
import { withStyles } from '@material-ui/core/styles';
import './Signup.css';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Sign Up',
            email: '',
            password: '',
            confirm: '',
        }
    }

    componentWillMount() {
        this.props.changeTitle(this.state.title)
        this.props.expanseNavbar(false)
    }

    handleChange = props => event => {
        if (this.props.reduxStore.auth.emailError) {
            this.props.signUpEmailError(false)
        }
        this.setState({
            [props]: event.target.value
        })
    }

    handleRegister = () => {
        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        if (this.state.email === '') {
            this.props.alertError('Please use an email address')
        } else if (!validateEmail(this.state.email)) {
            this.props.alertError('Your email type is incorrect, please retry!');
        } else if (this.state.password === '') {
            this.props.alertError('Please use a password')
        } else if (this.state.confirm === '') {
            this.props.alertError('Please use a confirm password')
        } else if (this.state.password !== this.state.confirm) {
            this.props.alertError('Your password is not the same as your confirm password');
        } else {
            let data = {
                email: this.state.email,
                password: this.state.password
            }
            this.props.signup(data);
        }
    }

    handleRoute = (route) => {
        this.props.history.push(route)
    }

    render() {
        const state = this.state
        const { reduxStore } = this.props
        const emailError = reduxStore.auth.emailError
        return (
            <div className="registerContainer">
                <img src={process.env.PUBLIC_URL + '/images/logo.png'} className="logo" alt="Logo"/>
                <div className="form-group">
                    <label htmlFor="email" className="registerLabel">Email Address:</label>
                    <input type="email" id="email" className={'form-control ' + (emailError ? 'emailError' : '')} placeholder="Please put your email address" value={state.email} onChange={this.handleChange('email')}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="registerLabel">Password:</label>
                    <input type="password" id="password" className="form-control" placeholder="Please put your password" value={state.password} onChange={this.handleChange('password')}/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirm" className="registerLabel">Confirm Password:</label>
                    <input type="password" id="confirm" className="form-control" placeholder="Please put your confirm password" value={state.confirm} onChange={this.handleChange('confirm')}/>
                </div>
                <div className="form-group text-center">
                    <button type="button" className="btn btn-primary" onClick={() => this.handleRegister()}>Register</button>
                </div>
                <div className="form-group text-center">
                    <p>Do you already have an account? <span className="spanLink" onClick={() => this.handleRoute('/login')}>Login</span></p>
                </div>
            </div>
        )
    }
}

//import store
const mapStateToProps = (state) => {
    return {
        reduxStore: {
            layout: state.layout,
            auth: state.auth
        }
    }
}

//export store
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({changeTitle, expanseNavbar, alertError, alertSuccess, signup, signUpEmailError}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
