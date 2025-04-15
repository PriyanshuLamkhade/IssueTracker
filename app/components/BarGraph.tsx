'use client';

import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export function BasicBars({ OpenIssue, InProgressIssue, ClosedIssue }: any) {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['OPEN ISSUE', 'IN-PROGRESS ISSUE', 'CLOSED ISSUE'] }]}
      series={[{ data: [OpenIssue, InProgressIssue, ClosedIssue] }]}
      width={500}
      height={400}
    />
  );
}
