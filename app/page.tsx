'use client'
import { BasicBars } from "./components/BarGraph";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [issueData, setIssueData] = useState<any[]>([])
  const [issueCount, setIssueCount] = useState({
    OPEN: 0,
    IN_PROGRESS: 0,
    CLOSED: 0,
  });

  useEffect(() => {
    async function fetchIssueCounts() {
      const response = await axios.get('/api/issues');
      setIssueCount(response.data.counts);
      setIssueData(response.data.issues);
    }

    fetchIssueCounts();
  }, []);

  const TotalIssues = [
    { title: "Open Issues", total: issueCount.OPEN },
    { title: "In-progress Issues", total: issueCount.IN_PROGRESS },
    { title: "Closed Issues", total: issueCount.CLOSED },
  ];

  // Ensure the issueData is sorted in descending order based on createdAt
  const sortedIssues = issueData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="md:m-7">
        <div className="flex flex-wrap gap-10 md:ml-7">
          {TotalIssues.map((box) => (
            <div
              className=" border border-gray-300 w-fit rounded-lg shadow-md p-5 space-y-3 font-medium"
              key={box.title}
            >
              <p>{box.title}</p>
              <p className="font-bold">{box.total}</p>
            </div>
          ))}
        </div>

        <div id="bargraph" className="mt-5 border border-gray-300 w-fit rounded-lg shadow-md px-10">
          <BasicBars
            OpenIssue={issueCount.OPEN}
            InProgressIssue={issueCount.IN_PROGRESS}
            ClosedIssue={issueCount.CLOSED}
          />
        </div>
      </div>

      <div className="mt-5 lg:mt-0 p-5 border rounded-lg border-gray-300 w-full shadow-md">
        <div>
          <h1 className="font-medium mb-4">Latest Issues</h1>
          {sortedIssues && sortedIssues.length > 0 ? (
            <ul className="space-y-4">
              {sortedIssues.map((issue) => (
                <li
                  key={issue.id}
                  className="border p-3 rounded-md shadow-sm hover:bg-gray-50 transition"
                >
                  <h2 className="font-semibold text-lg">{issue.title}</h2>
                  <p className="text-sm text-gray-600">{issue.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Status: <span className="font-medium">{issue.status}</span> • Created: {new Date(issue.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent issues found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
