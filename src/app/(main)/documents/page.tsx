'use client';

import DocumentList from '@/src/components/documents/DocumentList';
import UploadForm from '@/src/components/documents/UploadForm';
import { useAuth } from '@/src/contexts/AuthContext';
import apiService from '@/src/lib/api';
import { useEffect, useState } from 'react';

export default function DocumentsPage() {
  const  userId  = useAuth();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDocuments = async () => {
    try {
      const data = await apiService.getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleUploadSuccess = () => {
    loadDocuments();
  };

  const handleDelete = async (docId: number) => {
    if (confirm('Are you sure you want to delete this document?')) {
      await apiService.deleteDocument(docId);
      loadDocuments();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Document Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Upload and manage technical documentation</p>
      </div>

      <UploadForm onSuccess={handleUploadSuccess} />
      
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Documents</h2>
        <DocumentList documents={documents} loading={loading} onDelete={handleDelete} />
      </div>
    </div>
  );
}