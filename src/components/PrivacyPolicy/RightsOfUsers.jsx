import React, { Component } from "react"

class RightsOfUsers extends Component {
  render() {
    return (
      <div id="rights-of-users">
        <h2>The rights of Users</h2>
        <p>
          Users may exercise certain rights regarding their Data processed
          by the Owner.</p>
        <p>In particular, Users have the right to do the following:</p>
        <ul>
          <li>
            <b>Withdraw their consent at any time.</b> Users have the right
            to withdraw consent where they have previously given their
            consent to the processing of their Personal Data.</li>
          <li>
            <b>Object to processing of their Data.</b> Users have the right
            to object to the processing of their Data if the processing is
            carried out on a legal basis other than consent. Further details
            are provided in the dedicated section below.</li>
          <li>
            <b>Access their Data.</b> Users have the right to learn if Data
            is being processed by the Owner, obtain disclosure regarding
            certain aspects of the processing and obtain a copy of the Data
            undergoing processing.</li>
          <li>
            <b>Verify and seek rectification.</b> Users have the right to
            verify the accuracy of their Data and ask for it to be updated
            or corrected.</li>
          <li>
            <b>Restrict the processing of their Data.</b> Users have the
            right, under certain circumstances, to restrict the processing
            of their Data. In this case, the Owner will not process their
            Data for any purpose other than storing it.</li>
          <li>
            <b>Have their Personal Data deleted or otherwise removed.</b>
            {" "}
            Users have the right, under certain circumstances, to obtain the
            erasure of their Data from the Owner.</li>
          <li>
            <b>
              Receive their Data and have it transferred to another
              controller.</b>
              {" "}
            Users have the right to receive their Data in a structured,
            commonly used and machine readable format and, if technically
            feasible, to have it transmitted to another controller without
            any hindrance. This provision is applicable provided that the
            Data is processed by automated means and that the processing is
            based on the User's consent, on a contract which the User is
            part of or on pre-contractual obligations thereof.</li>
          <li>
            <b>Lodge a complaint.</b> Users have the right to bring a claim
            before their competent data protection authority.</li>
        </ul>

        <h3>Details about the right to object to processing</h3>
        <p>
          Where Personal Data is processed for a public interest, in the
          exercise of an official authority vested in the Owner or for the
          purposes of the legitimate interests pursued by the Owner, Users
          may object to such processing by providing a ground related to
          their particular situation to justify the objection.</p>
        <p>
          Users must know that, however, should their Personal Data be
          processed for direct marketing purposes, they can object to that
          processing at any time without providing any justification. To
          learn, whether the Owner is processing Personal Data for direct
          marketing purposes, Users may refer to the relevant sections of
          this document.</p>

        <h3>How to exercise these rights</h3>
        <p>
          Any requests to exercise User rights can be directed to the Owner
          through the contact details provided in this document. These
          requests can be exercised free of charge and will be addressed by
          the Owner as early as possible and always within one month.</p>
      </div>
    )
  }
}

export default RightsOfUsers