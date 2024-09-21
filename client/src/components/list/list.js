import React from 'react';
import { Link } from 'react-router-dom';
import GenericButton from '../genericButton';
import './list.css';

const List = ({ member }) => {
    return (
        <div className="generic-list">
            <p>ID: {member.id}</p>
            <p>Name: {member.firstName} {member.lastName}</p>
            <div style={{ margin: "10px 0" }}>
                <Link to={`/membership-card/${member.id}`}><GenericButton variant={"primary"} label={"Get Member's Details"}/></Link>
            </div>
        </div>
    );
};

export default List;
