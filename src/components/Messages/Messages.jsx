const Messages = (props) => {
  const renderMessage = (message) => {
    const { member, text } = message;
    const { currentMember } = props;
    const messageFromMe = member.id === currentMember.clientId;
    const className = messageFromMe ? "currentMember" : "";
    
    return (
      <li className={"Messages-message " + className}>
        <span
          className="avatar"
          style={{ backgroundColor: member.clientData.color }}
        >
          {getMessageInitials(member.clientData.name)}
        </span>
        <div className="Message-content">
          <div className="username">{member.clientData.username}</div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  };

  const getMessageInitials = (fullName) => {
    const nameParts = fullName.toUpperCase().split(" ");
    return nameParts[0][0] + nameParts[1][0];
  };

  return (
    <ul className="Messages-list">
      {props.messages.map((m) => renderMessage(m))}
    </ul>
  );
};

export default Messages;
