import React from "react";

export function Table({ children, className = "", ...props }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-100 bg-white">
      <table className={`w-full text-left text-sm text-slate-700 ${className}`} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className = "", ...props }) {
  return (
    <thead
      className={`bg-slate-50/80 text-xs uppercase font-semibold text-slate-500 border-b border-slate-100 ${className}`}
      {...props}
    >
      {children}
    </thead>
  );
}

export function TableBody({ children, className = "", ...props }) {
  return <tbody className={`divide-y divide-slate-100 ${className}`} {...props}>{children}</tbody>;
}

export function TableRow({ children, className = "", ...props }) {
  return (
    <tr
      className={`transition-colors hover:bg-orange-50/30 ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children, className = "", ...props }) {
  return (
    <th
      scope="col"
      className={`px-4 py-3 text-xs font-semibold tracking-wider text-slate-600 ${className}`}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, className = "", ...props }) {
  return (
    <td className={`px-4 py-3 align-middle text-slate-700 ${className}`} {...props}>
      {children}
    </td>
  );
}

export function TableFooter({ children, className = "", ...props }) {
  return (
    <tfoot className={`border-t border-slate-100 bg-slate-50 font-medium ${className}`} {...props}>
      {children}
    </tfoot>
  );
}

export default Table;
