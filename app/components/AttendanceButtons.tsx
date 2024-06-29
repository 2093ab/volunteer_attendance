'use client';

import { useState, useEffect } from 'react';
import supabase from '../../lib/supabaseClient';
import { Button, Message, FormContainer } from './StyledComponents';

interface AttendanceButtonsProps {
  phoneSuffix: string;
}

const AttendanceButtons: React.FC<AttendanceButtonsProps> = ({ phoneSuffix }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUserStatus();
  }, [phoneSuffix]);

  const fetchUserStatus = async () => {
    const { data, error } = await supabase
      .from('attendance')
      .select('check_in_time, check_out_time')
      .eq('phone_suffix', phoneSuffix)
      .order('id', { ascending: false })
      .limit(1)
      .single();

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
  };

  return (
    <FormContainer>
      <Button onClick={handleCheckInOut}>
        {isCheckedIn ? 'Check Out' : 'Check In'}
      </Button>
      <Message>{message}</Message>
    </FormContainer>
  );
};

export default AttendanceButtons;