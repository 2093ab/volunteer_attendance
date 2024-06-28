'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import supabase from '../../lib/supabaseClient';

interface AttendanceRecord {
  id: number;
  phone_suffix: string;
  check_in_time: string;
  check_out_time: string | null;
}

const TableContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

const TableRow = styled.tr``;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const LoadingText = styled.p`
  text-align: center;
`;

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
    <TableContainer>
      <Title>출석 기록표</Title>
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