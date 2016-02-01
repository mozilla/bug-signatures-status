import documentationContent from '../assets/html/documentation.html';

import React from 'react';
import { connect } from 'react-redux';
import { PageHeader, Panel } from 'react-bootstrap';

import BugForm from '../components/bug-form.jsx';


const HomePage = React.createClass({
    componentWillMount() {
        this.trackPageView();
    },

    componentWillReceiveProps(nextProps) {
        this.trackPageView();
    },

    trackPageView() {
        ga('send', 'pageview', '/');
    },

    render() {
        return (
            <div>
                <PageHeader>
                    Bug Signatures Status <small>User documentation</small>
                </PageHeader>
                <article dangerouslySetInnerHTML={ {__html: documentationContent} } />
                <br />
                <Panel header="Check a bug now">
                    <BugForm bugNumber={this.props.latestBugNumber} />
                </Panel>
            </div>
        );
    }
});

function select(state) {
    return {
        latestBugNumber: state.latestBugNumber
    }
}

export default connect(select)(HomePage);
