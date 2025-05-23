"use client";

import React from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { jsPDF } from "jspdf";

/** Type representing an admin log entry */
interface AdminLog {
  id: number;
  adminId: string;
  adminName: string;
  action: string;
  targetType: string;
  targetId: string;
  description: string;
  timestamp: string;
}

/** Props for AdminLogDetailsModal component */
interface Props {
  isOpen: boolean;
  onClose: () => void;
  log: AdminLog | null;
}

/**
 * Modal component to display detailed admin log info and export as PDF
 */
const AdminLogDetailsModal: React.FC<Props> = ({ isOpen, onClose, log }) => {
  if (!log) return null;

  /** Generates and downloads the PDF file for the log details */
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Admin Log Details", 10, 10);
    doc.setFontSize(12);
    doc.text(`Admin ID: ${log.adminId}`, 10, 20);
    doc.text(`Admin Name: ${log.adminName}`, 10, 30);
    doc.text(`Action: ${log.action}`, 10, 40);
    doc.text(`Target: ${log.targetType}`, 10, 50);
    doc.text(`Target ID: ${log.targetId}`, 10, 60);
    doc.text(`Description: ${log.description}`, 10, 70);
    doc.text(`Timestamp: ${log.timestamp}`, 10, 80);
    doc.save(`AdminLog-${log.id}.pdf`);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Modal panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6">
          {/* Header with title and close button */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Log Details</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-black">
              <X size={20} />
            </button>
          </div>

          {/* Log details */}
          <div className="text-sm space-y-2">
            <p><strong>Admin ID:</strong> {log.adminId}</p>
            <p><strong>Admin Name:</strong> {log.adminName}</p>
            <p><strong>Action:</strong> {log.action}</p>
            <p><strong>Target Type:</strong> {log.targetType}</p>
            <p><strong>Target ID:</strong> {log.targetId}</p>
            <p><strong>Description:</strong> {log.description}</p>
            <p><strong>Timestamp:</strong> {log.timestamp}</p>
          </div>

          {/* Export PDF button */}
          <div className="mt-6 text-right">
            <button
              className="bg-[#5A31F5] text-white px-4 py-2 rounded-lg hover:bg-[#4827C4]"
              onClick={handleExportPDF}
            >
              Export as PDF
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AdminLogDetailsModal;
