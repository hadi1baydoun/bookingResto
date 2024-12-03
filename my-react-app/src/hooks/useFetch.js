import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url); // Await the axios.get call
            setData(res.data);
            setError(null); // Reset the error on a successful fetch
        } catch (err) {
            setError(err); // Handle errors correctly
        } finally {
            setLoading(false); // Ensure loading is set to false regardless of success or failure
        }
    };

    useEffect(() => {
        fetchData(); // Call fetchData on the first render and whenever the URL changes
    }, [url]);

    const refetch = async () => {
        await fetchData(); // Call the fetchData function manually
    };

    return { data, loading, error, refetch }; // Return refetch along with other states
};

export default useFetch;
