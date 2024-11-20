import LogoutButton from './LogoutButton';
const ClientInfo = ({ client }) => {
    console.log("info",client);
    return (
        <div>
            <h2>Welcome, {client.name}</h2>
            <LogoutButton />
            <p>Email: {client.email}</p>
            <p>Contact: {client.contact}</p>
        </div>
    );
};

export default ClientInfo;
