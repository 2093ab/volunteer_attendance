'use client';

import { useState, useEffect } from 'react';
import supabase from '../../lib/supabaseClient';
import { TableContainer, StyledTable, TableHead, TableRow, TableHeader, TableCell, LoadingText, Subtitle } from './StyledComponents';

interface AttendanceRecord {
  id: number;
  phone_suffix: string;
  check_in_time: string;
  check_out_time: string | null;
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
      .eq('phone_suffix', phoneSuffix)
      .order('check_in_time', { ascending: false });

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
    <TableContainer>
      <Subtitle>출석 기록표</Subtitle>
      {loading ? (
        <LoadingText>Loading...</LoadingText>
      ) : (
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableHeader>Check-in Time (KST)</TableHeader>
              <TableHeader>Check-out Time (KST)</TableHeader>
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
      )}
    </TableContainer>
  );
};

export default AttendanceTable;