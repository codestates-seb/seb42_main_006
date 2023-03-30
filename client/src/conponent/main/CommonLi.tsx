import MainCategory from "../main/Category";

export interface ListItemType {
  iconType: string;
  label: string;
}

export default function CommonLi({ iconType, label }: ListItemType) {
  return (
    <li>
      <MainCategory iconType={iconType} label={label} />
    </li>
  );
}
