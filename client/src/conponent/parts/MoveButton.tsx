import { Prev, Next } from "../../icons/Icon";

interface prop {
  iconType: string;
  handleClick: () => any;
}

export default function MoveButton({ iconType, handleClick }: prop) {
  const iconTypeHandler = (iconType: string) => {
    switch (iconType) {
      case "prev":
        return <Prev />;
      case "next":
        return <Next />;
      default:
        return <Prev />;
    }
  };
  return <button onClick={handleClick}>{iconTypeHandler(iconType)}</button>;
}
