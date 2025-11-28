import React from "react";

const Message = ({ message, showBar }) => {
  if (!message) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded shadow-lg bg-white text-black text-center font-medium z-50 w-[300px]">
      {message}

      {showBar && (
        <div className="h-1 bg-blue-500 mt-2 rounded-full animate-progress"></div>
      )}
    </div>
  );
};

export default Message;
