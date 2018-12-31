import React, { Component } from "react";
import Layout from "../layout";
import Metadata from "../components/Metadata/Page/Metadata";

class TagsPage extends Component {
  render() {
    return (
      <Layout>
        <div className="tags-container">
          <Metadata slug="/tags" />
        </div>
      </Layout>
    );
  }
}

export default TagsPage;
