'use client';

import { useState } from 'react';
import { Container, Title, FormContainer, Input, Button, NavLink } from '../components/StyledComponents';
import AttendanceTable from '../components/AttendanceTable';

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
      <FormContainer>
        <Input
          type="text"
          placeholder="전화번호 뒷 4자리를 입력하세요."
          value={phoneSuffix}
          onChange={(e) => setPhoneSuffix(e.target.value)}
        />
        <Button onClick={handleShowTable}>기록 조회</Button>
        {showTable && <AttendanceTable phoneSuffix={phoneSuffix} />}
        <NavLink href="/">메인 페이지로 이동</NavLink>
      </FormContainer>
    </Container>
  );
}