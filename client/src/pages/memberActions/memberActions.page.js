import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorModal from '../../components/errorModal/errorModal';
import GenericButton from '../../components/genericButton';
import memberService from '../../services/member.service';
import "./memberActions.page.css"

const MemberActions = () => {
  const [memberId, setMemberId] = useState("");
  const [isIdEntered, setIsIdEntered] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleBlur = async () => {
    if (memberId.trim() !== "") {
      try {
        const member = await memberService.getMemberById(memberId);
        if (member && member.error === 'Member not found') {
          setError('Member with this ID does not exist.');
          setShowModal(true);
          setIsIdEntered(false);
        } else {
          setIsIdEntered(true);
        }
      } catch (error) {
        setError("An error occurred. Please try again later");
        setShowModal(true);
        setIsIdEntered(false);
      }
    } else {
      setIsIdEntered(false);
    }
  };

  return (
    <div className="member-actions-container">
      <h1>Member Actions</h1>
      <div className="action-input">
        <input
          id='memberIdInput'
          type="text"
          placeholder="Enter Member ID"
          value={memberId}
          onChange={(event) => setMemberId(event.target.value)}
          onBlur={handleBlur}
        />
        <p className="error-message">Please enter a member ID before proceeding.</p>
      </div>
      <Link to={`/membership-card/${memberId}`}><GenericButton variant="Primery" label="Get Membership Card" style={{ margin: "1vw", width: "81%" }} disabled={!isIdEntered} /></Link>
      <Link to="/add-member"><GenericButton variant="Primery" label="Add Member" /></Link>
      <Link to={`/delete-member/${memberId}`}><GenericButton variant="Primery" label="Delete Member" disabled={!isIdEntered} /></Link>
      <Link to={`/update-member/${memberId}`}><GenericButton variant="Primery" label="Update Member" disabled={!isIdEntered} /></Link>
      <Link to="/add-corona-data"><GenericButton variant="Primery" label="Add Corona Data To Member" disabled={!isIdEntered}  /></Link>
      <Link to={`/update-corona-data/${memberId}`}><GenericButton variant="Primery" label="Update Member's Corona Data" disabled={!isIdEntered} /></Link>
      <Link to={`/delete-corona-data/${memberId}`}><GenericButton variant="Primery" label="Delete Member's Corona Data" disabled={!isIdEntered} /></Link>
      <ErrorModal show={showModal} message={error} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default MemberActions;



