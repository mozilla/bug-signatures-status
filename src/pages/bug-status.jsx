import React from 'react';
import { Alert, Panel, Table } from 'react-bootstrap';

import { connect } from 'react-redux';

import { fetchBugSignatures, fetchBugTitle } from '../actions.jsx';
import BugForm from '../components/bug-form.jsx';
import Signature from '../components/signature.jsx';


const BugStatusContent = React.createClass({
    render() {
        let bugState = this.props.state;

        if (!bugState || bugState.isFetching) {
            return <Alert bsStyle="info">Fetching bug data... </Alert>;
        }

        if (!bugState.signatures.length) {
            return <Alert bsStyle="warning">No data found for this bug. </Alert>;
        }

        let sigs = bugState.signatures.map(signature => {
            let sigState = this.props.signatures[signature] || {};
            let productVersionCounts = this.props.productVersionCounts || {};
            return <Signature signature={signature} state={sigState} productVersionCounts={productVersionCounts} key={signature} />;
        });
        return <div>{ sigs }</div>;
    }
});


const BugStatusPage = React.createClass({
    componentWillMount() {
        this.checkBug(this.props);
    },

    componentWillReceiveProps(nextProps) {
        this.checkBug(nextProps);
    },

    checkBug(props) {
        let bug = props.params.id;

        if (!props.bugs[bug]) {
            props.dispatch(fetchBugSignatures(bug));
            props.dispatch(fetchBugTitle(bug));
        }
    },

    render() {
        let bugNumber = this.props.params.id;
        let header = `Bug ${bugNumber}`;

        let bugState = this.props.bugs[bugNumber];

        if (bugState && bugState.title) {
            header += ` - ${bugState.title}`;
        }

        return (
            <div>
                <Panel header={header}>
                    <BugStatusContent state={bugState} signatures={this.props.signatures} productVersionCounts={this.props.productVersionCounts} />
                </Panel>
                <BugForm title="Check another bug?" bugNumber={bugNumber} />
            </div>
        );
    }
});

export default connect(x => x)(BugStatusPage);
