// Home.js
import React, { useState } from 'react';
import AvailabilityForm from '../components/AvailabilityForm';
import AvailabilityList from '../components/AvailabilityList';

export default function Home() {
    const [saved, setSaved] = useState([]);
    const [link, setLink] = useState(null);

    return (
        <div className='container'>
            <h2>Set Your Availability</h2>
            <AvailabilityForm saved={saved} setSaved={setSaved} setLink={setLink} />
            <AvailabilityList saved={saved} />
            {link && (
                <div>
                    <strong>Booking link:</strong>{' '}
                    <a href={`/book/${link}`} target="_blank" rel="noreferrer">
                        /book/{link}
                    </a>
                </div>
            )}
        </div>
    );
}
