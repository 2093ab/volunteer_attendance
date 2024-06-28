// app/pages/page.tsx
'use client';

import { useState } from 'react';
import AttendanceButtons from './components/AttendanceButtons';

export default function Home() {
  const [phoneSuffix, setPhoneSuffix] = useState<string>('');

  return (
    <div>
      <h1>Attendance System</h1>
        <div>
          <input 
            type="text" 
            placeholder="Phone Suffix"
            value={phoneSuffix}
            
            onChange={(e) => setPhoneSuffix(e.target.value)} 
          />
          <AttendanceButtons phoneSuffix={phoneSuffix} />
        </div>
    </div>
  );
}