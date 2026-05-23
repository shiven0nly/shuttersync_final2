'use client';

import { useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function AdminCompetitionsPage() {
  const { user, isLoaded } = useUser();
  const isAdmin = user?.publicMetadata?.role === 'admin';

  const submissions = useQuery(
    api.competitionRegistrations.getAllSubmissions,
    isAdmin ? undefined : 'skip'
  );

  if (!isLoaded || submissions === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading Dashboard...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500">Unauthorized Access</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Competition Submissions</h1>
            <p className="text-sm text-gray-500">Manage all photo contest entries</p>
          </div>
          <Link href="/admin/dashboard" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            &larr; Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contestant
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Drive Links
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                      No submissions found.
                    </td>
                  </tr>
                ) : (
                  submissions.map((sub: any) => (
                    <tr key={sub._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {sub.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sub.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        {sub.upiTransactionId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <ul className="list-disc pl-4 space-y-1">
                          {(sub.driveLinks || []).map((link: string, idx: number) => (
                            <li key={idx}>
                              <a href={link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                                Link {idx + 1}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          sub.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          sub.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
