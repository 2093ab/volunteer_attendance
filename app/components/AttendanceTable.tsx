'use client';

import { useState, useEffect } from 'react';
import supabase from '../../lib/supabaseClient';
import { TableContainer, StyledTable, TableHead, TableRow, TableHeader, TableCell, LoadingText, Subtitle, ModalContainer, Input, ModalButton } from './StyledComponents';

interface AttendanceRecord {
  id: number;
  phone_suffix: string;
  check_in_time: string;
  check_out_time: string | null;
}

const AttendanceTable: React.FC<{ phoneSuffix: string }> = ({ phoneSuffix }) => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<AttendanceRecord | null>(null);
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');

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

  const openModal = (record: AttendanceRecord) => {
    setCurrentRecord(record);
    setCheckInTime(record.check_in_time ? toLocalInputFormat(record.check_in_time) : '');
    setCheckOutTime(record.check_out_time ? toLocalInputFormat(record.check_out_time) : '');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentRecord(null);
  };

  const handleSave = async () => {
    if (currentRecord) {
      const localCheckInTime = `${checkInTime}:00+09:00`;
      const localCheckOutTime = checkOutTime ? `${checkOutTime}:00+09:00` : null;
      const { error } = await supabase
        .from('attendance')
        .update({ check_in_time: localCheckInTime, check_out_time: localCheckOutTime || null })
        .eq('id', currentRecord.id);

      if (error) {
        console.error('Error updating record:', error.message);
      } else {
        fetchRecords();
        closeModal();
      }
    }
  };

  const toLocalString = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  };

  const toLocalInputFormat = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
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
              <TableHeader>Check-in Time</TableHeader>
              <TableHeader>Check-out Time</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {records.map((record) => (
              <TableRow key={record.id} onClick={() => openModal(record)}>
                <TableCell>{record.check_in_time ? toLocalString(record.check_in_time) : ''}</TableCell>
                <TableCell>{record.check_out_time ? toLocalString(record.check_out_time) : ''}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      )}
      <ModalContainer
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <h2>기록 수정</h2>
        <Input
          type="datetime-local"
          value={checkInTime}
          onChange={(e) => setCheckInTime(e.target.value)}
        />
        <Input
          type="datetime-local"
          value={checkOutTime}
          onChange={(e) => setCheckOutTime(e.target.value)}
        />
        <ModalButton onClick={handleSave}>저장</ModalButton>
        <ModalButton onClick={closeModal}>취소</ModalButton>
      </ModalContainer>
    </TableContainer>
  );
};

export default AttendanceTable;