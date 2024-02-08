import ButtonPrimary from "./misc/ButtonPrimary";
import { FiArrowLeft } from "react-icons/fi";
type handleClickFun = () => void;
interface myProps {
  handleClick: handleClickFun;
}
export const BackButton = (props: myProps) => {
  return (
    <button
      onClick={props.handleClick}
      className="bg-purple-200 absolute left-0  text-3xl  w-8 h-8 p-2 flex justify-center  items-center m-4 rounded-full"
    >
      <FiArrowLeft />
    </button>
  );
};
