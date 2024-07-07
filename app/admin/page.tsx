'use client';

import { useState } from 'react';
import { Container, Title, FormContainer, Input, Button, NavLink } from '../components/StyledComponents';
import AllAttendanceTable from '../components/AllAttendanceTable';

export default function AttendancePage() {
  const [showTable, setShowTable] = useState(false);

  const handleShowTable = () => {

      setShowTable(true);
  };

  return (
    <Container>
      <Title>출석 기록</Title>
      <FormContainer>

        <Button onClick={handleShowTable}>기록 조회</Button>
        {showTable && <AllAttendanceTable />}
        <NavLink href="/">메인 페이지로 이동</NavLink>
      </FormContainer>
    </Container>
  );
}