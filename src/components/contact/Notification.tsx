import { motion, AnimatePresence } from "framer-motion";

interface NotificationProps {
  open: boolean;
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

const Notification = ({ open, type, message, onClose }: NotificationProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 22,
              }}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#100d25]/95 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              <div
                className={`h-1 ${
                  type === "success"
                    ? "bg-gradient-to-r from-green-400 to-emerald-500"
                    : "bg-gradient-to-r from-red-500 to-pink-500"
                }`}
              />

              <div className="p-6 flex gap-4">
                <div
                  className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-xl font-bold ${
                    type === "success"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {type === "success" ? "✓" : "✕"}
                </div>

                <div className="flex-1">
                  <h3 className="text-white text-xl font-bold">
                    {type === "success"
                      ? "Message Sent!"
                      : "Something Went Wrong"}
                  </h3>

                  <p className="mt-3 text-secondary leading-7">{message}</p>
                </div>
              </div>

              <div className="px-6 pb-6 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 transition-all duration-300 text-white font-semibold shadow-lg shadow-violet-500/30"
                >
                  OK
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Notification;
