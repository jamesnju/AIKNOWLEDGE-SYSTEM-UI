'use client';

interface Document {
  id: number;
  title: string;
  category: string;
  version: string;
  version_date: string;
}

interface DocumentListProps {
  documents: Document[];
  loading: boolean;
  onDelete: (id: number) => void;
}

export default function DocumentList({ documents, loading, onDelete }: DocumentListProps) {
  if (loading) {
    return <div className="text-gray-500 dark:text-gray-400">Loading documents...</div>;
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400">No documents uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all-fast"
        >
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-lg">📄</span>
              <h3 className="font-medium text-gray-900 dark:text-white">{doc.title}</h3>
              <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                {doc.category}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">v{doc.version}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Uploaded: {new Date(doc.version_date).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => onDelete(doc.id)}
            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-all-fast"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}