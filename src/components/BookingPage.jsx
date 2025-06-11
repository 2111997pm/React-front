import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function BookingPage() {
    const { linkId } = useParams();
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [times, setTimes] = useState([]);
    const [booked, setBooked] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/availability/${linkId}`)
            .then(res => setDates(res.data))
            .catch(() => alert('Invalid booking link'));
    }, [linkId]);

    useEffect(() => {
        if (!selectedDate) return;
        const avail = dates.find(d => d.date === selectedDate);
        if (avail) {
            const [startHour] = avail.start.split(":");
            const [endHour] = avail.end.split(":");
            const slots = [];
            for (let i = parseInt(startHour); i < parseInt(endHour); i++) {
                slots.push(`${i.toString().padStart(2, '0')}:00`);
            }
            axios.get(`http://localhost:4000/api/bookings/${linkId}/${selectedDate}`).then(res => {
                setBooked(res.data);
                setTimes(slots.filter(t => !res.data.includes(t)));
            });
        }
    }, [selectedDate, dates, linkId]);

    const bookSlot = async (time) => {
        try {
            await axios.post(`http://localhost:4000/api/book`, { linkId, date: selectedDate, time });
            alert('Booked successfully!');
            setSelectedDate('');
        } catch (err) {
            alert('Booking failed');
        }
    };

    return (
        <div className='booking-page'>
            <h2>Book a Slot</h2>
            <select onChange={e => setSelectedDate(e.target.value)} value={selectedDate}>
                <option value=''>Select Date</option>
                {dates.map(d => <option key={d.id} value={d.date}>{d.date}</option>)}
            </select>
            <div className='slots'>
                {times.map(t => (
                    <button key={t} className='slot' onClick={() => bookSlot(t)}>{t}</button>
                ))}
            </div>
        </div>
    );
}