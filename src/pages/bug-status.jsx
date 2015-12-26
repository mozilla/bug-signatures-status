import React from 'react';
import { Alert, Button, Panel, Table } from 'react-bootstrap';

import { connect } from 'react-redux';

import { changeBugNumber, fetchBugSignatures, fetchBugTitle } from '../actions.jsx';
import BugForm from '../components/bug-form.jsx';
import Signature from '../components/signature.jsx';
import { BUGZILLA_BUG_URL } from '../constants.jsx';


const BugStatusContent = React.createClass({
    render() {
        let bugState = this.props.state;

        if (!bugState || bugState.isFetching) {
            return <Alert bsStyle="info">Fetching bug data... </Alert>;
        }

        if (bugState.didInvalidate) {
            return (
                <Alert bsStyle="danger">
                    An error happened while fetching bug data.
                    <Button bsStyle="warning" onClick={this.props.retryFetchingBug}>Retry</Button>
                </Alert>
            );
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
            props.dispatch(changeBugNumber(bug));
            props.dispatch(fetchBugSignatures(bug));
            props.dispatch(fetchBugTitle(bug));
        }
    },

    retryFetchingBug(e) {
        e.preventDefault();
        this.props.dispatch(fetchBugSignatures(this.props.params.id));
    },

    render() {
        let bugNumber = this.props.params.id;
        let header = `Bug ${bugNumber}`;

        let bugState = this.props.bugs[bugNumber];

        if (bugState && bugState.title) {
            header += ` - ${bugState.title}`;
        }

        header = <a href={ BUGZILLA_BUG_URL + bugNumber }>{header}</a>;

        return (
            <div>
                <Panel header={header}>
                    <BugStatusContent
                        state={bugState}
                        signatures={this.props.signatures}
                        productVersionCounts={this.props.productVersionCounts}
                        retryFetchingBug={this.retryFetchingBug}
                    />
                </Panel>
            </div>
        );
    }
});

export default connect(x => x)(BugStatusPage);
