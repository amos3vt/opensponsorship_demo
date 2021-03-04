import './App.css';
import {useState} from "react";
import Axios from "axios"

function App() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState(new Date());
  const [team, setTeam] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [sports, setSports] = useState([]);
  const [about, setAbout] = useState("");

  const [profileList, setProfileList] = useState([]);

  const getProfiles = () => {
    Axios.get("/api/profile").then((res) => {
      setProfileList(res.data);
    })
  }

  const addProfile = () => {
    let sportsList = [];
    sports.forEach(sport => {sportsList.push({name: sport})})
    Axios.post("/api/profile", {
      name: name,
      dob: dob,
      team: team,
      gender: gender,
      location: {
        country: country,
        region: region,
        city: city
      },
      sports: sportsList,
      about: about
    }).then(() => {
      setProfileList([
        ...profileList,
        {
          name: name,
          dob: dob,
          team: team,
          gender: gender,
          location: {
            country: country,
            region: region,
            city: city
          },
          sports: sportsList,
          about: about
        }
      ]);
    });
  }

  return (
    <div className="App">
      <div className="info">
        <label>Full Name: </label>
        <input type="text" onChange={(event) => {setName(event.target.value)}}></input>
        <label>Date of Birth: </label>
        <input type="date" onChange={(event) => {setDob(event.target.value)}}></input>
        <label>Team: </label>
        <input type="text" onChange={(event) => {setTeam(event.target.value)}}></input>
        <label>Gender: </label>
        <select onChange={(event) => {setGender(event.target.value)}}>
          <option value="none" selected disabled hidden>Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <label>Country: </label>
        <input type="text" onChange={(event) => {setCountry(event.target.value)}}></input>
        <label>Region/State: </label>
        <input type="text" onChange={(event) => {setRegion(event.target.value)}}></input>
        <label>City: </label>
        <input type="text" onChange={(event) => {setCity(event.target.value)}}></input>
        <label>Sports: </label>
        <select multiple onChange={(event) => {setSports([event.target.value])}}>
          <option value="none" selected disabled hidden>Select</option>
          <option value="golf">golf</option>
          <option value="tennis">tennis</option>
          <option value="cricket">cricket</option>
          <option value="basketball">basketball</option>
          <option value="baseball">baseball</option>
        </select>
        <label>About: </label>
        <input type="text" onChange={(event) => {setAbout(event.target.value)}}></input>
        <button onClick={addProfile}>Submit</button>
      </div>
      <div className="profiles">
        <button onClick={getProfiles}>View Profiles</button>
        {profileList.map((val, key) => {
          return (
            <div className="profile">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Team: {val.team}</h3>
                <h3>Gender: {val.gender}</h3>
                <h3>Location: {val.location.city}, {val.location.region}, {val.location.country}</h3>
                <h3>Sports: {val.sports.map((v,k) => { return v.name+" "})}</h3>
              </div>
              <div>
                <button>Update</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
