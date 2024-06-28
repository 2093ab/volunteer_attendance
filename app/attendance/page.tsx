'use client';

import { useState } from 'react';
import AttendanceTable from '../components/AttendanceTable';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  display: block;
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px auto;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  display: inline-block;
  width: 100%;
  padding: 10px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
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