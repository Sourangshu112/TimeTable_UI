'use client'


import { redirect } from 'next/navigation';
import { exportToJson } from '../createJSON';

export default function Home() {



  redirect('/home/InstitutionSetup');
}