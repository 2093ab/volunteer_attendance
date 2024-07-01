'use client';

import { useState, useEffect } from 'react';
import supabase from '../../lib/supabaseClient';
import { Button, Message, TableContainer, StyledTable, TableHead, TableRow, TableHeader, TableCell, LoadingText, FormContainer } from './StyledComponents';

interface AttendanceButtonsProps {
  phoneSuffix: string;
}

interface AttendanceRecord {
  id: number;
  phone_suffix: string;
  check_in_time: string;
  check_out_time: string | null;
}

const AttendanceButtons: React.FC<AttendanceButtonsProps> = ({ phoneSuffix }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserStatus();
    fetchRecords();
    setMessage('');
    setIsCheckedIn(false);
  }, [phoneSuffix]);

  const fetchUserStatus = async () => {
    const { data, error } = await supabase
      .from('attendance')
      .select('check_in_time, check_out_time')
      .eq('phone_suffix', phoneSuffix)
      .order('id', { ascending: false })
      .limit(1)
      .single();
    console.log (data);
    if (error) {
      console.error('Error fetching user status:', error.message);
    } else {
      if (data && data.check_in_time && !data.check_out_time) {
        setIsCheckedIn(true);
      } else {
        setIsCheckedIn(false);
      }
    }
  };

  const fetchRecords = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('phone_suffix', phoneSuffix)
      .order('check_in_time', { ascending: false });

    if (error) {
      console.error('Error fetching records:', error.message);
    } else {
      setRecords(data);
    }
    setLoading(false);
  };

  const handleCheckInOut = async () => {
    if (isCheckedIn) {
      // Check out
      const { error } = await supabase
        .from('attendance')
        .update({ check_out_time: new Date().toISOString() })
        .eq('phone_suffix', phoneSuffix)
        .is('check_out_time', null);

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Check-out time recorded successfully!');
        setIsCheckedIn(false);
      }
    } else {
      // Check in
      const { error } = await supabase
        .from('attendance')
        .insert({ phone_suffix: phoneSuffix, check_in_time: new Date().toISOString() });

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Check-in time recorded successfully!');
        setIsCheckedIn(true);
      }
    }

    fetchUserStatus();
    fetchRecords();
  };

  const formatToKST = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  };

  return (
    <FormContainer>
      <Button onClick={handleCheckInOut}>
        {isCheckedIn ? 'Check Out' : 'Check In'}
      </Button>
      <Message>{message}</Message>
      {loading ? (
        <LoadingText>Loading...</LoadingText>
      ) : (
        <TableContainer>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableHeader>Check-in Time</TableHeader>
                <TableHeader>Check-out Time</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.check_in_time ? formatToKST(record.check_in_time) : ''}</TableCell>
                  <TableCell>{record.check_out_time ? formatToKST(record.check_out_time) : ''}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      )}
    </FormContainer>
  );
};

export default AttendanceButtons;