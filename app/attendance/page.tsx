'use client';

import { useState } from 'react';
import AttendanceTable from '../components/AttendanceTable';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Input = styled.input`
  display: block;
  width: calc(100% - 40px);
  padding: 15px;
  margin: 10px auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s;

  &:focus {
    border-color: #0070f3;
    outline: none;
  }
`;

const Button = styled.button`
  display: inline-block;
  width: calc(100% - 40px);
  padding: 15px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #005bb5;
  }
`;

export default function AttendancePage() {
  const [phoneSuffix, setPhoneSuffix] = useState<string>('');
  const [showTable, setShowTable] = useState(false);

  const handleShowTable = () => {
    if (phoneSuffix) {
      setShowTable(true);
    }
  };

  return (
    <Container>
      <Title>출석 기록</Title>
      <Input
        type="text"
        placeholder="전화번호 뒷 4자리를 입력하세요."
        value={phoneSuffix}
        onChange={(e) => setPhoneSuffix(e.target.value)}
      />
      <Button onClick={handleShowTable}>기록 조회</Button>
      {showTable && <AttendanceTable phoneSuffix={phoneSuffix} />}
    </Container>
  );
}