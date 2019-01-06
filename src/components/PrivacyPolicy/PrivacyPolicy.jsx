import React, { Component } from "react"
import Overview from "./Overview"
import TypesOfData from "./TypesOfData"
import PlaceOfProcessing from "./PlaceOfProcessing"
import PurposesOfProcessing from "./PurposesOfProcessing"
import DetailedInformation from "./DetailedInformation"
import RightOfUsers from "./RightsOfUsers"
import AdditionalInformation from "./AdditionalInformation"

class PrivacyPolicy extends Component {
  render() {
    return (
      <section>
        <Overview />
        <TypesOfData />
        <PlaceOfProcessing />
        <PurposesOfProcessing />
        <DetailedInformation />
        <RightOfUsers />
        <AdditionalInformation />
        <p>Latest update: December 28, 2018</p>
      </section>
    )
  }
}

export default PrivacyPolicy