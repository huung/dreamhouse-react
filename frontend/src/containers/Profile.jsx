import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeTitle } from '../redux/actions/layout'
import { updateProfile } from '../redux/actions/auth';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    profileContainer: {
        padding: 20,
        margin: '10vh auto 0',
        width: '80%'
    }
}
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Profile',
            id: '',
            email: '',
            password: ''
        }
    };

    componentWillMount() {
        this.setState({
            id: this.props.reduxStore.auth.user.id,
            email: this.props.reduxStore.auth.user.email
        })
    } 

    handleChange = prop => event => {
        this.setState({
            [prop]: event.target.value
        })
    }

    handleUpdate = () => {
        let data = {id: this.state.id, password: this.state.password}
        this.props.updateProfile(data)
    }

    render() {
        const { classes } = this.props
        const state = this.state
        return (
            <div className={classes.profileContainer}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <h2>{state.email}</h2>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Change Password</label>
                    <input type="password" className="form-control" value={state.password} onChange={this.handleChange('password')}/>
                </div>
                <div className="form-group text-right">
                    <button type="button" className="btn btn-success" onClick={() => this.handleUpdate()}>Update Profile</button>
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
    return bindActionCreators({changeTitle, updateProfile}, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Profile));