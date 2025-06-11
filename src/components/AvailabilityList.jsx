import React from 'react';

export default function AvailabilityList({ saved }) {
    return (
        <div className='availability-list'>
            <h3>Saved Slots (local only):</h3>
            <ul>
                {saved.map(s => (
                    <li key={s.id}>{s.date}: {s.start} - {s.end}</li>
                ))}
            </ul>
        </div>
    )
}