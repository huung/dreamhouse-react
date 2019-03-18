import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeTitle } from '../redux/actions/layout'
import {findFavoritesAll } from '../redux/actions/favorites'
import './Properties.css'

class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Favorites',
        }
    };

    FavoriteDetail(id) {
        this.props.history.push('/property-detail/' + id)
    }

    componentWillMount() {
        this.props.changeTitle(this.state.title)
        this.props.findFavoritesAll(this.props.reduxStore.auth.user.id)
    }

    render() {
        const {reduxStore} = this.props;
        const favorites = reduxStore.favorites.favorites;
        return (
            <div style={{padding: 20}}>
                {(favorites && favorites.length) ? favorites.map((favorite, index) => (
                    <div className="property-container" key={index} onClick={() => this.FavoriteDetail(favorite.sfid)}>
                        <img src={favorite.thumbnail__c} className="property-logo" alt={favorite.title__c}/>
                        <div className="property-content">
                            <h2>{favorite.title__c}</h2>
                            <p>{favorite.city__c + ', ' + favorite.state__c + ' - $' + favorite.price__c}</p>
                        </div>
                    </div>
                )) : <div></div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reduxStore: {
            layout: state.layout,
            auth: state.auth,
            favorites: state.favorites
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({changeTitle, findFavoritesAll}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);