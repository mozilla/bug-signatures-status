import React from 'react';
import { Col, Panel, Input, ButtonInput } from 'react-bootstrap';
import { History } from 'react-router';


const BugForm = React.createClass({
    mixins: [ History ],

    click(e) {
        e.preventDefault();
        var bugNumber = this.refs.bugnumber.getValue();
        if (bugNumber) {
            this.history.push({
                pathname: '/bug/' + bugNumber,
                state: {bug: bugNumber}
            });
        }
    },

    render() {
        return (
            <form onSubmit={this.click}>
                <Input
                    type="text"
                    ref="bugnumber"
                    defaultValue={this.props.bugNumber}
                    addonBefore="Bug"
                    placeholder="123456789"
                    autoFocus="true"
                />
                {' '}
                <ButtonInput type="submit" value="Check" bsStyle="primary" onClick={this.click} />
            </form>
        );
    }
});


export default BugForm;
