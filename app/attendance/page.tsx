'use client';

import { useState } from 'react';
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
    <div>
      <h1>Attendance Records</h1>
      <input
        type="text"
        placeholder="Enter Phone Suffix"
        value={phoneSuffix}
        onChange={(e) => setPhoneSuffix(e.target.value)}
      />
      <button onClick={handleShowTable}>Show Records</button>
      {showTable && <AttendanceTable phoneSuffix={phoneSuffix} />}
    </div>
  );
}