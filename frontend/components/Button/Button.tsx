interface Props {
  title: string;
  onClick: () => void;
  style?: string;
}

const Button: React.FC<Props> = ({ title, onClick, style }) => {
  if (style) {
    return (
      <button className={style} type="button" onClick={onClick}>
        {title}
      </button>
    );
  }

  return (
    <button
      className="subtitle text-lg px-8 py-4 text-black-800 font-semibold rounded-full border border-purple-200  hover:bg-purple-100 hover:border-transparent "
      type="button"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
