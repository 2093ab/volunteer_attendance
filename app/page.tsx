'use client';

import { useState } from 'react';
import { Container, Title, FormContainer, Input, Button, NavLink } from './components/StyledComponents';
import AttendanceButtons from './components/AttendanceButtons';

const Home = () => {
  const [phoneSuffix, setPhoneSuffix] = useState<string>('');

  return (
    <Container>
      <Title>출석 관리 시스템</Title>
      <FormContainer>
        <Input
          type="text"
          placeholder="전화번호 뒷 4자리를 입력하세요."
          value={phoneSuffix}
          onChange={(e) => setPhoneSuffix(e.target.value)}
        />
        <AttendanceButtons phoneSuffix={phoneSuffix} />
        <NavLink href="/attendance">출석 기록 보기</NavLink>
      </FormContainer>
    </Container>
  );
};

export default Home;