import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeTitle } from '../redux/actions/layout'
import { findPropertyAll } from '../redux/actions/properties'
import './Properties.css'

class Properties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Properties',
        }
    };
    componentWillMount() {
        this.props.changeTitle(this.state.title)
        this.props.findPropertyAll()
    }

    PropertyDetail(id) {
        this.props.history.push('/property-detail/' + id)
    }

    render() {
        const {reduxStore} = this.props
        return (
            <div style={{padding: 20}}>
                {
                    (reduxStore.properties.properties && reduxStore.properties.properties.length) ?
                    reduxStore.properties.properties.map((property, index) => (
                        <div className="property-container" key={index} onClick={() => this.PropertyDetail(property.sfid)}>
                            <img src={property.thumbnail__c} className="property-logo" alt={property.title__c}/>
                            <div className="property-content">
                                <h2>{property.title__c}</h2>
                                <p>{property.city__c + ', ' + property.state__c + ' - $' + property.price__c}</p>
                            </div>
                        </div>
                    )) : <div></div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reduxStore: {
            layout: state.layout,
            auth: state.auth,
            properties: state.properties
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({changeTitle, findPropertyAll}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Properties);
