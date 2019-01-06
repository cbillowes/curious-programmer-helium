import React from "react"
import renderer from "react-test-renderer"
import Page from "../../src/pages/privacy-policy"
import PrivacyPolicy from "../../src/components/PrivacyPolicy/PrivacyPolicy"
import Overview from "../../src/components/PrivacyPolicy/Overview"
import TypesOfData from "../../src/components/PrivacyPolicy/TypesOfData"
import PlaceOfProcessing from "../../src/components/PrivacyPolicy/PlaceOfProcessing"
import PurposesOfProcessing from "../../src/components/PrivacyPolicy/PurposesOfProcessing"
import DetailedInformation from "../../src/components/PrivacyPolicy/DetailedInformation"
import RightsOfUsers from "../../src/components/PrivacyPolicy/RightsOfUsers"
import AdditionalInformation from "../../src/components/PrivacyPolicy/AdditionalInformation"

describe("privacy policy components", () => {
  it("page", () => {
    const tree = renderer.create(<Page />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("container", () => {
    const tree = renderer.create(<PrivacyPolicy />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("owner and overview", () => {
    const tree = renderer.create(<Overview />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  
  it("types of data collected", () => {
    const tree = renderer.create(<TypesOfData />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  
  it("mode and place of processing the data", () => {
    const tree = renderer.create(<PlaceOfProcessing />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  
  it("the purposes of processing", () => {
    const tree = renderer.create(<PurposesOfProcessing />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  
  it("detailed information on processing personal data", () => {
    const tree = renderer.create(<DetailedInformation />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  
  it("the rights of users", () => {
    const tree = renderer.create(<RightsOfUsers />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  
  it("additional information", () => {
    const tree = renderer.create(<AdditionalInformation />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})