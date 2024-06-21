import axios from 'axios';
import React, { useState, useEffect} from 'react';

export default function FormResults() {
    const [certid, setCertId] = useState([]);
    const [submittedId, setSubmittedId] = useState('');

    const [BulkCertId, setBulkCertId] = useState([]);
    const [certidBulk, setCertIdBulk] = useState([]);

    const getId = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/certificates/');
            setCertId(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const getBulkId = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/bulkcertificates/');
            setBulkCertId(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        getId();
        getBulkId();

        // Retrieve the submitted ID from sessionStorage
        const idFromSessionStorage = sessionStorage.getItem('submittedId');
        setSubmittedId(idFromSessionStorage);

        // retrieve the submitted ID from session storage for bulkform
        const idFromSessionStorageBulk = sessionStorage.getItem('submittedIdBulk');
        setCertIdBulk(idFromSessionStorageBulk);
    }, []);
    
    useEffect(() => {

    }, []); // Passing an empty dependency array to ensure useEffect only runs once on component mount

    return (
        <div>
            <h1>Form Results</h1>
            <ul>
                {certid.map((cert) => (
                    <li key={cert.id}>
                        ID: {cert.id}
                    </li>
                ))}
            </ul>
            <ul>
                {BulkCertId.map((cert) => (
                    <li key={cert.id}>
                        ID: {cert.id}
                    </li>
                ))}
            </ul>
        <div>
            {/* Display the submitted ID */}
            <h2>Form Submission Results</h2>
            <p>Submitted ID: {submittedId}</p>
            {/* Other content of the page */}
        </div>

        <div>
            {/* Display the submitted ID for bulkform */}
            <h2>Bulk Form Submission Results</h2>
            <p>Submitted ID: {certidBulk}</p>
            {/* Other content of the page */}
        </div>
        </div>
    );
}
