import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailClick: () => void;
  onWhatsAppClick: () => void;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, onEmailClick, onWhatsAppClick }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl p-6 w-full max-w-sm text-center space-y-4 shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-xl font-bold text-gray-900">Send Message</h2>
            <p className="text-gray-600">Choose how you want to contact us:</p>
            <div className="space-y-2">
              <button
                onClick={onEmailClick}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Send via Email
              </button>
              <button
                onClick={onWhatsAppClick}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
              >
                Contact via WhatsApp
              </button>
              <button
                onClick={onClose}
                className="text-sm text-gray-500 mt-2 hover:underline"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dialog;
