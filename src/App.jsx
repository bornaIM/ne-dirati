import React, { useEffect, useState } from "react";
import "./App.css";

import Messages from "./components/Messages/Messages";
import NewMessage from "./components/NewMessage/NewMessage";

//TODO: promijeni ova imena u nesto drukcije i smislenije
//
function randomName() {
  const adjectives = [
    "sretni",
    "grbavi",
    "crni",
    "skrti",
    "zlocesti",
    "lijepi",
    "pametni",
    "pero",
  ];
  const nouns = ["petar", "jura", "pero"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  // return adjective + ' ' + noun;
  return `${adjective} ${noun}`;
}

function randomColor() {
  // return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  const colors = [
    "#2c175c",
    "#6d1464",
    "#f0f8ff",
    "#00a86b",
    "#e19cf6",
    "#95abbb",
    "#590042",
    "#9fe2bf",
  ];

  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function App() {
  // NE RADIMO VISE
  // const [state, setState] = useState({
  //   messages: [],
  //   member: {
  //     username: randomName(),
  //     color: randomColor(),
  //   },
  // });

  const [messages, setMessages] = useState([]);

  const [username, setUsername] = useState(randomName());
  const [clientId, setClientId] = useState();
  const [color, setColor] = useState(randomColor());

  const [drone, setDrone] = useState();

  // https://www.scaledrone.com/docs/api-clients/observable-rooms
  const roomName = "observable-red-room";

  useEffect(function () {
    const drone = new window.Scaledrone("r3L2NUYI7CY6rDnq", {
      data: {
        name: username,
        color: color,
      },
    });

    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }

      setClientId(drone.clientId);
    });

    const room = drone.subscribe(roomName);

    room.on("message", (message) => {
      console.debug(message + " is added");
      const { data, id, timestamp, clientId, member } = message;
      // const messages = this.state.messages; // 3
      // messages.push({ member, text: data }); // dodaj 4-u
      // this.setState({ messages }); //spremni sve 4 u state

      setMessages(oldMessages => {
        if (!messages) {
          console.error('messages je prazan')
        }
        return [...oldMessages, { member, text: data }];
      });
    });

    setDrone(drone);

    return () => {
      // close the connection to when app unloads
      room.unsubscribe();
      drone.close();
    }
  }, []);

  const sendMessageToChat = (message) => {
    drone.publish({
      room: roomName,
      message,
    });
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>My Chat App</h1>
      </div>
      {messages.length}
      <Messages
        messages={messages}
        currentMember={{
          username,
          color,
          clientId,
        }}
      />
      <NewMessage sendMessage={sendMessageToChat} />
    </div>
  );
}

export default App;
