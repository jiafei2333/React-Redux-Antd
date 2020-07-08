import React, { Component } from 'react'
import { connect } from 'react-redux';
import MainLayout from 'Components/Base/MainLayout';

export class Home extends Component {
    render() {
        return (
            <MainLayout>
                home page
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


