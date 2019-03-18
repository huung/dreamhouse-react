import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeTitle } from '../redux/actions/layout'

class Approved extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Get Pre Approved'
        }
    };

    componentWillMount() {
        this.props.changeTitle(this.state.title)
    }
    render() {
        return (
            <div>
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
    return bindActionCreators({changeTitle}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Approved);