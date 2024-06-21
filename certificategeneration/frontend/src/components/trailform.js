import react, { useState } from 'react';
import axios from 'axios';

export default function Details() {
        const [heading, setHeading] = useState('');
        const [certificate_about, setCertificateAbout] = useState('');
        const [certificant_name, setCertificantName] = useState('');
        const [date, setDate] = useState('');
        const [company_name, setCompanyName] = useState('');
        const [certificate_provider_name, setCertificateProviderName] = useState('');

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
            }).then((response)=>{
                console.log(response.data);
                alert('form submission successful');
            })

        }

    return (
        <div>
            <h1>Trail form here:</h1>

            <form>
                <label for="heading">Heading:</label>
                <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)} />

                <label>Certificate About:</label>
                <input type="text" value={certificate_about} onChange={(e) => setCertificateAbout(e.target.value)} />

                <label>Certificant Name:</label>
                <input type="text" value={certificant_name} onChange={(e) => setCertificantName(e.target.value)} />

                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

                <label>Company Name:</label>
                <input type="text" value={company_name} onChange={(e) => setCompanyName(e.target.value)} />

                <label>Certificate Provider Name:</label>
                <input type="text" value={certificate_provider_name} onChange={(e) => setCertificateProviderName(e.target.value)} />

                <button type="submit" onClick={submit_form_data}>Submit</button>
            </form>

            <form action="" method="post">
                        <label htmlFor="heading">Heading:</label>
                        <input type="text" id="heading" name="heading" placeholder="Certificate of Achievement" />

                        <label htmlFor="certificate_about">Certificate About:</label>
                        <textarea id="certificate_about" name="certificate_about" placeholder="This certifies that [name] has successfully completed [course] with distinction."></textarea>

                        <div className='file-input-wrapper'>
                            <label htmlFor="usernames">Upload Usernames File</label>
                            <input type="file" id="usernames" accept=".csv, .json" />
                        </div>

                        <label htmlFor="date">Date:</label>
                        <input type="date" id="date" name="date" />

                        <label htmlFor="company_name">Company Name:</label>
                        <input type="text" id="company_name" name="company_name" placeholder="Reactify Learning" />

                        <label htmlFor="certificate_provider_name">Certificate Provider Name:</label>
                        <input type="text" id="certificate_provider_name" name="certificate_provider_name" placeholder="Reactify" />

                        <label htmlFor="email">Enter Email to Get Your Certificates:</label>
                        <input type="text" id="email" placeholder="john@example.com" />

                        <label htmlFor="number_of_certs">Number of Certificates to Generate:</label>
                        <input type="number" id="number_of_certs" placeholder="5" />

                        <button className='generate-button' type='submit'>Generate Now</button>
                    </form>

        </div>
    )
}