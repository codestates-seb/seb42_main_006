import React from 'react';

type prop = {
  title: string;
  handler: () => void;
};

export default function Btn({ title, handler }: prop) {
  return (
    <div className="border-[2px] border-[#ff3366]" onClick={handler}>
      {title}
    </div>
  );
}
