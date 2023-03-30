const MyDefaultValue: { width: string; height: string } = {
  width: "1.15rem",
  height: "1.15rem",
};

export function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={MyDefaultValue.width}
      height={MyDefaultValue.height}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
      />
    </svg>
  );
}

export function PenIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={MyDefaultValue.width}
      height={MyDefaultValue.height}
      viewBox="0 0 256 256"
    >
      <path
        fill="currentColor"
        d="m227.32 73.37l-44.69-44.68a16 16 0 0 0-22.63 0L36.69 152A15.86 15.86 0 0 0 32 163.31V208a16 16 0 0 0 16 16h44.69a15.86 15.86 0 0 0 11.31-4.69l83.67-83.66l3.48 13.9l-36.8 36.79a8 8 0 0 0 11.31 11.32l40-40a8 8 0 0 0 2.11-7.6l-6.9-27.61L227.32 96a16 16 0 0 0 0-22.63ZM48 179.31L76.69 208H48Zm48 25.38L51.31 160L136 75.31L180.69 120Zm96-96L147.32 64l24-24L216 84.69Z"
      />
    </svg>
  );
}

export function PrevIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m13.3 17.3l-4.6-4.6q-.15-.15-.212-.325T8.425 12q0-.2.063-.375T8.7 11.3l4.6-4.6q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L10.8 12l3.9 3.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275Z"
      />
    </svg>
  );
}

export function NextIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M8.7 17.3q-.275-.275-.275-.7t.275-.7l3.9-3.9l-3.9-3.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.063.375t-.212.325l-4.6 4.6q-.275.275-.7.275t-.7-.275Z"
      />
    </svg>
  );
}
