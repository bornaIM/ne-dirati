import { useState } from "react";

const NewMessage = (props) => {

  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSendMessage = () => {
    setText("");
    props.sendMessage(text);
  };

  return (
    <div>
      <input
        onChange={(e) => onChange(e)}
        value={text}
        type="text"
        placeholder="Enter your message and press ENTER"
        // autoFocus={true}
      />
      <button onClick={() => onSendMessage()}>Send</button>
    </div>
  );
};

export default NewMessage;
