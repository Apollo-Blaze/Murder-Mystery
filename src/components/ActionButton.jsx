import React from 'react';
import '../App.css'

function ActionButton({ onClick, text }) {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
    >
      {text}
    </button>
  );
}

export default ActionButton;
