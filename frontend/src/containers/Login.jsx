import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeTitle, expanseNavbar } from '../redux/actions/layout'
import { alertError, alertSuccess } from '../redux/actions/alert';
import { login } from '../redux/actions/auth'
import { withStyles } from '@material-ui/core/styles';

const styles = {
    loginForm: {
        maxWidth: 400,
        margin: '23vh auto 0',
        padding: '75px 20px 20px',
        position: 'relative',
        borderRadius: 8,
        backgroundColor: '#84bf4199',
        boxShadow: '0 2px 5px 1px #888888'
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
    loginLabel: {
        color: '#333333'
    },
    spanLink: {
        borderBottom: '1px solid #178cd0',
        cursor: 'pointer'
    }
}
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Login',
            email: '',
            password: '',
            remember: false
        }
    }
    componentWillMount() {
        this.props.changeTitle(this.state.title)
        this.props.expanseNavbar(false)
    }
    
    handleChange = prop => event => {
        this.setState({
            [prop]: event.target.value
        })
    }

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handleLogin = () => {
        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        if (this.state.email === '') {
            this.props.alertError('You should put down email address');
        } else if (!validateEmail(this.state.email)) {
            this.props.alertError('Your email type is incorrect. please retry!');
        } else if (this.state.password === '') {
            this.props.alertError('You should put down password')
        } else {
            let data = {
                email: this.state.email,
                password: this.state.password,
            }
            this.props.login(data)
        }
    }

    handleRoute = (route) => {
        this.props.history.push(route)
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.loginForm}>
                  <img src={process.env.PUBLIC_URL + '/images/logo.png'} className={classes.logo} alt="Logo"/>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" value={this.state.email} onChange={this.handleChange('email')}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.handleChange('password')}/>
                </div>
                <div className="form-group">
                    <label className={classes.loginLabel}><input type="checkbox" value={this.state.remember} onChange={this.handleChange('remember')} style={{marginRight: 10}}/>Remember me?</label>                
                </div>
                <div className="form-action text-right">
                    <button type="button" className="btn btn-primary" onClick={() => this.handleLogin()}>Login</button>
                </div>
                <div className="form-group" style={{marginTop: 15}}>
                    <p className="text-center">Don't you have already account? <span className={classes.spanLink} onClick={() => this.handleRoute('/signup')}>Signup</span></p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reduxStore: {
            layout: state.layout,
            auth: state.auth
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ changeTitle, expanseNavbar, login, alertError, alertSuccess }, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login));