import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alertError, alertSuccess } from '../redux/actions/alert';
import { signup } from '../redux/actions/auth';
import { changeTitle, expanseNavbar } from '../redux/actions/layout';
import {signUpEmailError} from '../redux/actions/auth'
import { withStyles } from '@material-ui/core/styles';
const styles = {
    registerContainer: {
        maxWidth: 400,
        margin: '18vh auto 0',
        padding: '70px 20px 20px',
        borderRadius: 8,
        backgroundColor: '#84bf4199',
        position: 'relative',
        boxShadow: '0 2px 5px 1px #888888'
    },
    registerLabel: {
        color: '#333333'
    },
    logo: {
        boxShadow: '0 3px 8px 3px #2f1f1f',
        position: 'absolute',
        width: 150,
        top: -80,
        left: 'calc(50% - 77px)',
        borderRadius: '50%',
        border: '4px solid #84bf41'
    },
    spanLink: {
        borderBottom: '1px solid #178cd0',
        cursor: 'pointer'
    },
    emailError: {
        borderColor: 'red',
        boxShadow: '0 0 0 0.2rem #f14a4abf'
    }
}
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
            this.props.alertError('You should put down email address')
        } else if (!validateEmail(this.state.email)) {
            this.props.alertError('Your email type is incorrect. please retry!');
        } else if (this.state.password === '') {
            this.props.alertError('You should put down password')
        } else if (this.state.confirm === '') {
            this.props.alertError('You should put down confirm password')
        } else if (this.state.password !== this.state.confirm) {
            this.props.alertError('Your password is not same with your confirm password');
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
        const {classes, reduxStore} = this.props
        const emailError = reduxStore.auth.emailError
        return (
            <div className={classes.registerContainer}>
                <img src={process.env.PUBLIC_URL + '/images/logo.png'} className={classes.logo} alt="Logo"/>
                <div className="form-group">
                    <label htmlFor="email" className={classes.registerLabel}>Email Address :</label>
                    <input type="email" id="email" className={'form-control ' + (emailError ? classes.emailError : '')} placeholder="Please put your email address" value={state.email} onChange={this.handleChange('email')}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className={classes.registerLabel}>Password :</label>
                    <input type="password" id="password" className="form-control" placeholder="Please put your password" value={state.password} onChange={this.handleChange('password')}/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirm" className={classes.registerLabel}>Confirm Password :</label>
                    <input type="password" id="confirm" className="form-control" placeholder="Please put your confirm password" value={state.confirm} onChange={this.handleChange('confirm')}/>
                </div>
                <div className="form-group text-right">
                    <button type="button" className="btn btn-primary" onClick={() => this.handleRegister()}>Register</button>
                </div>
                <div className="form-group text-center">
                    <p>Do you have already account? <span className={classes.spanLink} onClick={() => this.handleRoute('/login')}>Login</span></p>
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
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Signup));