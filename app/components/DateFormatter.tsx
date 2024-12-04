// components/DateFormatter.tsx
import React from "react";

interface DateFormatterProps {
  date: string;
}

const DateFormatter: React.FC<DateFormatterProps> = ({ date }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return <span>{formatDate(date)}</span>;
};

export default DateFormatter;
