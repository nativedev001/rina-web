'use client';
import { Download } from 'lucide-react';
export function PrintButton() { return <button className="button outline" onClick={() => window.print()}><Download size={15}/> Print / save as PDF</button>; }
