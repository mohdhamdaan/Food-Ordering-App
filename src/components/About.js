import UserClass from "./UserClass";
import React from "react";
class About extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <div className="p-5 m-5">
        <UserClass
          name={"Mohd Hamdaan Ansari(Class Component)"}
          location={"Meerut, Uttar Pradesh Class"}
        />
      </div>
    );
  }
}

export default About;