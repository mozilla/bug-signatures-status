import documentationContent from '../assets/html/documentation.html';

import React from 'react';
import { PageHeader } from 'react-bootstrap';

import BugForm from '../components/bug-form.jsx';


const HomePage = React.createClass({
    render() {
        return (
            <div>
                <PageHeader>
                    Bug Signatures Status <small>User documentation</small>
                </PageHeader>
                <article dangerouslySetInnerHTML={{__html: documentationContent}} />
            </div>
        );
    }
});

export default HomePage;
