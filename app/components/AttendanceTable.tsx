'use client';

import { useState, useEffect } from 'react';
import supabase from '../lib/supabaseClient';

interface AttendanceRecord {
  id: number;
  phone_suffix: string;
  time: string;
  is_start: boolean;
}

const AttendanceTable: React.FC<{ phoneSuffix: string }> = ({ phoneSuffix }) => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, [phoneSuffix]);

  const fetchRecords = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('phone_suffix', phoneSuffix);

    if (error) {
      console.error('Error fetching records:', error.message);
    } else {
      setRecords(data);
    }
    setLoading(false);
  };

  const formatToKST = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  };

  return (
    <div>
      <h3>Attendance Records</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Check-in/Check-out</th>
              <th>Time (KST)</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.is_start ? 'Check-in' : 'Check-out'}</td>
                <td>{formatToKST(record.time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceTable;