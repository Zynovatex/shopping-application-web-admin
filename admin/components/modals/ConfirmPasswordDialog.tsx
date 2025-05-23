"use client";

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

interface ConfirmPasswordDialogProps {
  isOpen: boolean;                   // Controls dialog visibility
  onClose: () => void;               // Function to close the dialog
  onConfirm: (password: string) => void; // Callback with entered password on confirm
}

/**
 * ConfirmPasswordDialog component
 * Displays a modal dialog to confirm password entry before sensitive actions (e.g., reset)
 */
const ConfirmPasswordDialog: React.FC<ConfirmPasswordDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  // Local state for password input
  const [password, setPassword] = useState("");

  // Handle form submit, send entered password back via onConfirm callback
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(password);
    setPassword(""); // Clear password input after submission
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay background */}
      <div className="fixed inset-0 bg-black/25" aria-hidden="true" />

      {/* Centered modal panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
          {/* Header with title and close button */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Confirm Reset</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>

          {/* Instructional text */}
          <p className="text-sm text-gray-600 mb-4">
            Enter your password to confirm this reset action.
          </p>

          {/* Password input form */}
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Super Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A31F5] text-sm mb-4"
            />

            {/* Action buttons: Cancel & Confirm */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm rounded-md bg-[#5A31F5] text-white hover:bg-[#4827C4]"
              >
                Confirm
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConfirmPasswordDialog;
