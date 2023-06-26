import "./CardButton.scss";

type CardButtonProps = {
    text: string;
};

export default function CardButton({ text } : CardButtonProps) {
  return (
    <button className="card__button">{text}</button>
  );
};