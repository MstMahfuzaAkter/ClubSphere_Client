import React from "react";

const MembershipEvent = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">My Event Activity Log</h3>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          
          <thead>
            <tr>
              <th></th>
              <th> event title</th>
              <th>Club</th>
              <th>date</th>
              <th>status</th>              

            </tr>
          </thead>
          <tbody>
            
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembershipEvent;