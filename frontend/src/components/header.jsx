import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { expanseNavbar } from '../redux/actions/layout'
import { logout } from '../redux/actions/auth'
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';


const drawerWidth = 250;
const styles = theme => ({
    root: {
        display: 'flex',
      },
      appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginLeft: 12,
        marginRight: 20,
      },
      hide: {
        display: 'none',
      },
      link: {
        textDecoration: 'none',
        color: '#ffffff'
      }
})
class Header extends Component {
    handleDrawerOpen = () => {
        this.props.expanseNavbar(true)
    }
    handleLogout = () => {
        this.props.logout()
    }

    render() {
        const { classes, reduxStore } = this.props;

        return (
            <AppBar position="fixed" style={{backgroundColor: '#84bf41'}}
            className={classNames(classes.appBar, {
                [classes.appBarShift]: reduxStore.layout.isSidebar,
            })}
            >
                <Toolbar disableGutters={!reduxStore.layout.isSidebar} style={{paddingRight: 15}}>
                    <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classNames(classes.menuButton, reduxStore.layout.isSidebar && classes.hide)}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" align="center" noWrap style={{margin: 'auto'}}>
                    {reduxStore.layout.activedTitle}
                    </Typography>
                    {
                    (reduxStore.auth.user && reduxStore.auth.user.token) ? 
                    <Button color="inherit" onClick={() => this.handleLogout()}>Logout</Button> :
                    <React.Fragment>
                        <Button color="inherit" ><Link to="/login" className={classes.link + ' link'}>Login</Link></Button>
                        <Button color="inherit"><Link to="/signup" className={classes.link + ' link'}>Register</Link></Button>
                    </React.Fragment>
                    }
                </Toolbar>
            </AppBar>
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
    return bindActionCreators({ expanseNavbar, logout }, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Header));