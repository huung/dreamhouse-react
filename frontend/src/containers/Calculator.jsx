import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeTitle } from '../redux/actions/layout'

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Mortgage Calculator'
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

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);