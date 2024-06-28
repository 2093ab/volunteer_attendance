// components/AttendanceButtons.tsx
import { useState, useEffect } from 'react';
import supabase from '../lib/supabaseClient';

interface AttendanceButtonsProps {
  phoneSuffix: string;
}

interface AttendanceRecord {
  id: number;
  phone_suffix: string;
  time: string;
  is_start: boolean;
}

const AttendanceButtons: React.FC<AttendanceButtonsProps> = ({ phoneSuffix }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (phoneSuffix.length !== 4) {
      setRecords([]);
      setMessage('');
      setIsCheckedIn(false);
      return;
    }
    fetchUserStatus();
    fetchRecords();
  }, [phoneSuffix]);

  const fetchUserStatus = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('is_attending')
      .eq('phone_suffix', phoneSuffix)
      .single();
    
    if (data == null) {
      await supabase.from('users').insert({ phone_suffix: phoneSuffix });
    }
    
    if (error) {
      console.error('Error fetching user status:', error.message);
    } else {
      setIsCheckedIn(data.is_attending);
    }
  };

  const fetchRecords = async () => {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('phone_suffix', phoneSuffix);

    if (error) {
      console.error('Error fetching records:', error.message);
    } else {
      setRecords(data);
    }
  };

  const handleCheckInOut = async () => {
    if (phoneSuffix.length !== 4) {
      setMessage('Please enter a valid phone suffix.');
      return;
    }
    const isStart = !isCheckedIn;
    const { error } = await supabase
      .from('attendance')
      .insert({ phone_suffix: phoneSuffix, time: new Date().toISOString(), is_start: isStart });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      await supabase
        .from('users')
        .update({ is_attending: isStart })
        .eq('phone_suffix', phoneSuffix);

      setMessage(isStart ? 'Check-in time recorded successfully!' : 'Check-out time recorded successfully!');
      setIsCheckedIn(isStart);
      fetchRecords();
    }
  };

  const formatToKST = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  };


  return (
    <div>
      <button onClick={handleCheckInOut}>
        {isCheckedIn ? 'Check Out' : 'Check In'}
      </button>
      <p>{message}</p>
      <h3>Attendance Records:</h3>
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            {`${record.is_start ? 'Check-in' : 'Check-out'}: ${formatToKST(record.time)}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceButtons;