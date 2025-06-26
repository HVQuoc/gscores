import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card = ({ children, className = "", ...props }: CardProps) => (
  <div
    className={`bg-white rounded-lg shadow p-6 my-4`}
    {...props}
  >
    {children}
  </div>
);

export default Card;