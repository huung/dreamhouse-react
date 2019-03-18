import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alertClear } from '../redux/actions/alert'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class WarningPopup extends Component {
  state = {
    fullWidth: true,
    maxWidth: 'xs',
  };

  handleClose = () => {
    this.props.alertClear()
  };

  render() {
    const {reduxStore} = this.props
    let open = reduxStore.alert.type ? true : false; 
    return (
      <Fragment>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Notification</DialogTitle>
          <DialogContent>
            <DialogContentText>
                {reduxStore.alert.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

WarningPopup.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        reduxStore: {
            alert: state.alert,
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ alertClear }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WarningPopup);