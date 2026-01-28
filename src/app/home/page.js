'use client'


import { redirect } from 'next/navigation';
import { exportToJson } from '../createJSON';

export default function Home() {

  return (
    <div>
      <h1>Settings</h1>
      <button onClick={exportToJson}>
        Download Data as JSON
      </button>
    </div>
  );

  // redirect('/home/InstitutionSetup');
}