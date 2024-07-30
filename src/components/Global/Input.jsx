const Input = ({ name, placeholder, type, handleClick }) => {
  return (
    <div>
      <label className="mb-2 text-[#fefefe]" htmlFor="lname">
        {name}
      </label>
      <input
        type={type}
        className="text-[18px] bg-transparent"
        name={name}
        id={name}
        placeholder={placeholder}
        required
        onChange={handleClick}
      />
    </div>
  );
};

export default Input;
