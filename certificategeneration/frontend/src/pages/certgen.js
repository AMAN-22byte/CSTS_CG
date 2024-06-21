import React, { useEffect, useState } from 'react';
import axios from 'axios';

function handleDivDisplay() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');

    // Get the divs by their IDs
    const singleDiv = document.getElementById('singlecert-form');
    const multipleDiv = document.getElementById('bulkcert-form');

    // Hide both divs initially
    singleDiv.style.display = 'none';
    multipleDiv.style.display = 'none';

    // Show the appropriate div based on the query parameter
    if (type === 'single') {
        singleDiv.style.display = 'block';
    } else if (type === 'multiple') {
        multipleDiv.style.display = 'block';
    }
}

export default function CertGen() {
    useEffect(() => {
        handleDivDisplay();
    }, []); // Run this effect only once after the initial render since it has no properties(say values likewise...)
    const [heading, setHeading] = useState('');
    const [certificate_about, setCertificateAbout] = useState('');
    const [certificant_name, setCertificantName] = useState('');
    const [date, setDate] = useState('');
    const [company_name, setCompanyName] = useState('');
    const [certificate_provider_name, setCertificateProviderName] = useState('');
    const [usernames, setUsernames] = useState(null);
    const [email, setemail] = useState('');
    const [number_of_certs, setnumber_of_certs] = useState('');


    const submit_form_data = async () => {
        let formfield = new FormData();

        formfield.append('heading', heading);
        formfield.append('certificate_about', certificate_about);
        formfield.append('certificant_name', certificant_name);
        formfield.append('issue_date', date);
        formfield.append('company_name', company_name);
        formfield.append('certificate_provider_name', certificate_provider_name);

        await axios({
            method: 'post',
            url: 'http://localhost:8000/api/certificates/',
            data: formfield
        }).then((response) => {
            const entered_data = (response.data);
            alert('form submission successful');
            // Store the submitted ID in sessionStorage
            sessionStorage.setItem('submittedId', entered_data.id);
            window.location.href = '/formresults';
        }).catch((error) => {
            alert('form should not be empty',error);
        })
    }

    const submit_bulk_form_data = async () => {
        let bulkformfield = new FormData();

        bulkformfield.append('heading', heading);
        bulkformfield.append('certificate_about', certificate_about);
        bulkformfield.append('usernames', usernames);
        bulkformfield.append('issue_date', date);
        bulkformfield.append('company_name', company_name);
        bulkformfield.append('certificate_provider_name', certificate_provider_name);
        bulkformfield.append('email', email);
        bulkformfield.append('number_of_certificates', number_of_certs);

        await axios({
            method: 'post',
            url: 'http://localhost:8000/api/bulkcertificates/',
            data: bulkformfield
        }).then((response) => {
            const bulkformdata = (response.data);
            alert('form submission successful');
            // Store the submitted ID in sessionStorage
            sessionStorage.setItem('submittedIdBulk', bulkformdata.id);
            window.location.href = '/formresults';
        }).catch((error) => {
            alert('form should not be empty',error);
        })
    }

    return (
        <div>
            <div id="singlecert-form" className='singlecert-body'>
                <div className="form-container" id="single">
                    <h2>Enter Certificate Details for Template</h2>
                    <form>
                        <label htmlFor="heading">Heading:</label>
                        <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)} />

                        <label htmlFor='certificate_about'>Certificate About:</label>
                        <input type="text" value={certificate_about} onChange={(e) => setCertificateAbout(e.target.value)} />

                        <label htmlFor="certificant_name">Certificant Name:</label>
                        <input type="text" value={certificant_name} onChange={(e) => setCertificantName(e.target.value)} />

                        <label htmlFor="date">Date:</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

                        <label htmlFor="company_name">Company Name:</label>
                        <input type="text" value={company_name} onChange={(e) => setCompanyName(e.target.value)} />

                        <label htmlFor="certificate_provider_name">Certificate Provider Name:</label>
                        <input type="text" value={certificate_provider_name} onChange={(e) => setCertificateProviderName(e.target.value)} />

                        <button type="submit" className='submit-button' onClick={submit_form_data}>Submit</button>
                    </form>
                </div>
            </div>

            <div id="bulkcert-form" className='bulkcert-body'>
                <div className="form-container" id="multiple">
                    <h2>Enter Certificate Details</h2>
                    <form>
                        <label htmlFor="heading">Heading:</label>
                        <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)} />

                        <label htmlFor='certificate_about'>Certificate About:</label>
                        <input type="text" value={certificate_about} onChange={(e) => setCertificateAbout(e.target.value)} />

                        <div className='file-input-wrapper'>
                            <label htmlFor="usernames">Upload Usernames File</label>
                            <input
                                type="file"
                                id="usernames"
                                accept=".csv, .json"
                                onChange={(e) => setUsernames(e.target.files[0])} // Update state with selected file
                            />
                        </div>


                        <label htmlFor="date">Date:</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

                        <label htmlFor="company_name">Company Name:</label>
                        <input type="text" value={company_name} onChange={(e) => setCompanyName(e.target.value)} />

                        <label htmlFor="certificate_provider_name">Certificate Provider Name:</label>
                        <input type="text" value={certificate_provider_name} onChange={(e) => setCertificateProviderName(e.target.value)} />

                        <label htmlFor="email">Enter Email to Get Your Certificates:</label>
                        <input type="email" id="email" placeholder="john@example.com" value={email} onChange={(e) => setemail(e.target.value)} />

                        <label htmlFor="number_of_certs">Number of Certificates to Generate:</label>
                        <input type="number" id="number_of_certs" placeholder="5" value={number_of_certs} onChange={(e) => setnumber_of_certs(e.target.value)} />

                        <button type="submit" className='submit-button' onClick={submit_bulk_form_data}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
