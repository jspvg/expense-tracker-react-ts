interface UserInfoProps {
  name: string;
  profilePicture: string;
  balance: number;
  signUserOut: () => Promise<void>;
}

const UserInfo = ({
  name,
  profilePicture,
  balance,
  signUserOut,
}: UserInfoProps) => {
  return (
    <div className="user-info">
      <div className="picture">
        {profilePicture && (
          <img src={profilePicture} referrerPolicy="no-referrer" />
        )}
      </div>

      <h4>{name}</h4>
      <button onClick={signUserOut}>Sign out</button>
      <div className="balance">
        <h4>{name}'s balance:</h4>
        {balance >= 0 ? <p>${balance}</p> : <p>-${balance * -1}</p>}
      </div>
    </div>
  );
};

export default UserInfo;
