import React from "react";
import Subject from '../../components/Subject/AddSubjectModal.jsx'
import SubjectTable from '../../components/Subject/SubjectTable'
const SubjectView = () => {
     
    return (
        <div className="content">
           <Subject/>
           <SubjectTable/>
        </div>
    );
};

export default SubjectView;