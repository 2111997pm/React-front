import React, { useState } from 'react';
import axios from 'axios';

export default function AvailabilityForm({ saved, setSaved, setLink }) {
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const saveAvailability = async () => {
    if (!date || !start || !end) {
      alert('Please fill all fields');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:4000/api/availability', {
        date, start, end
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSaved([...saved, res.data]);
      setLink(res.data.linkId);
      setDate(''); setStart(''); setEnd('');
    } catch (err) {
      alert('Failed to save availability');
    }
  };

  return (
    <div className='availability-form'>
      <input type='date' value={date} onChange={e => setDate(e.target.value)} />
      <input type='time' value={start} onChange={e => setStart(e.target.value)} />
      <input type='time' value={end} onChange={e => setEnd(e.target.value)} />
      <button onClick={saveAvailability}>Save</button>
    </div>
  );
}