import { useEffect, useState } from 'react';
import axios from 'axios';


const PrivatePage = ({ history }) => {
    const [ error, setError ] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            return history.push("/login");
        }
        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${localStorage.getItem("authToken")}`
                }
            }
            try{
                const {data} = await axios.get('http://localhost:5000/api/private',config);
                setPrivateData(data.data);
            }catch(err){
                localStorage.removeItem("authToken");
                setError("you are not authorized plz login");
            }
        };
        fetchPrivateData();

    }, [history]);

    const logoutHandler = ()=>{
        localStorage.removeItem("authToken");
        history.push("/login");
    };

    return (
        error ? <span className="error-message">{error}</span> : <>
            <div style={{background:"green", color:"white"}}>
                {privateData}
            </div>
            <button onClick={logoutHandler}>Logout</button>
        </>
    )
}

export default PrivatePage
