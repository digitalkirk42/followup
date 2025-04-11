import React from "react";

export function Table({ children }) {
  return <table className="min-w-full table-auto border-collapse border border-gray-300">{children}</table>;
}

export function TableHead({ children }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr className="border-b border-gray-200">{children}</tr>;
}

export function TableHeaderCell({ children }) {
  return <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">{children}</th>;
}

export function TableCell({ children }) {
  return <td className="px-4 py-2 text-sm text-gray-700">{children}</td>;
}
