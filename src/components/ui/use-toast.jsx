import * as React from "react";
import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    setToasts((prev) => [...prev, { id: Date.now(), ...toast }]);
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-5 right-5 space-y-2 z-[9999]">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-green-600 text-white px-4 py-2 rounded shadow-md animate-fade-in-up"
          >
            <strong>{t.title}</strong>
            <div className="text-sm">{t.description}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
