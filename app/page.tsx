'use client';

import { useState } from 'react';
import styled from 'styled-components';
import AttendanceButtons from './components/AttendanceButtons';

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
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

const Home = () => {
  const [phoneSuffix, setPhoneSuffix] = useState<string>('');

  return (
    <Container>
      <Title>Attendance System</Title>
      <div>
        <Input
          type="text"
          placeholder="Phone Suffix"
          value={phoneSuffix}
          onChange={(e) => setPhoneSuffix(e.target.value)}
        />
        <AttendanceButtons phoneSuffix={phoneSuffix} />
      </div>
    </Container>
  );
};

export default Home;