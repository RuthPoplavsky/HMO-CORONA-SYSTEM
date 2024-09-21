import React from 'react';
import './memberCard.css';

const MemberCard = ({ member, coronaData }) => {
    const formattedDate = (date) => {
        const date_ = new Date(date);
        return `${date_.getFullYear()}-${(date_.getMonth() + 1).toString().padStart(2, '0')}-${date_.getDate().toString().padStart(2, '0')}`;
    }
    return (
        <div className="member-card">
            <h1>Membership Card Details</h1>
            <div>
                <h2>Member Details:</h2>
                <p>ID: {member.id}</p>
                <p>First Name: {member.firstName}</p>
                <p>Last Name: {member.lastName}</p>
                <p>City: {member.address && member.address.city}</p>
                <p>Street: {member.address && member.address.street}</p>
                <p>House Number: {member.address && member.address.housenumber}</p>
                <p>Birth Date: {formattedDate(member.birthDate)}</p>
                <p>Phone: {member.phone}</p>
                <p>Mobile: {member.mobile}</p>
                <h2>Corona Data:</h2>
                <p>Recovery Date: {formattedDate(coronaData.recoveryDate)}</p>
                <p>Positive Result Date: {formattedDate(coronaData.positiveResultDate)}</p>
                <p>Vaccination Dates:</p>
                <ul>
                    {coronaData.vaccinationDates && coronaData.vaccinationDates.map((date, index) => (
                        <li key={index}>
                            <p>Date: {formattedDate(date.date)}</p>
                            <p>Manufacturer: {date.manufacturer}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MemberCard;
