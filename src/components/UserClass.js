import React from "react";
import { FaLinkedin, FaInstagramSquare, FaSteamSquare } from "react-icons/fa";
class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: "Dummy User",
        location: "Default Location",
        avatar_url: "https://picsum.photos/460/460",
      },
    };
  }
  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/mohdhamdaan");
    const json = await data.json();
    this.setState({
      userInfo: json,
    });
  }
  componentDidUpdate() {}

  componentWillUnmount() {}
  render() {
    const { name, location, avatar_url } = this.state.userInfo;

    return (
      <div className="p-5 m-auto w-4/12 bg-gray-100 rounded-lg border flex flex-col items-center border-black">
        <h2>Connect with me</h2>
        <img
          src={avatar_url}
          className="w-[300px] h-[300px] justify-self-center"
        />
        <h2 className="px-2 font-bold">Name: {name}</h2>
        <h2>🏡: {location}</h2>
        <h4 className="ml-2 flex">
          📞: 
          <a
            href="https://www.linkedin.com/in/hamdaan-ansari-b6a347228"
            className="text-blue-600 hover:text-blue-800 p-1"
            target="_blank"
          >
            {<FaLinkedin />}
          </a>
          <a
            href="https://www.instagram.com/iam_hamdaan?igsh=MzNlNGNkZWQ4Mg=="
            className="text-pink-500 hover:text-pink-300 p-1"
            target="_blank"
          >
            {<FaInstagramSquare />}
          </a>
         
        </h4>
      </div>
    );
  }
}

export default UserClass;