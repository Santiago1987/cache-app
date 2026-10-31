import { PrevNextButtons } from "@/components/ui/Button";
import type { Direction, MoveState } from "@/types/generalTypes";

type Props = {
  estado: MoveState;
  handleOnChangeMove: (m: Direction) => void;
};

const Footer = ({ estado, handleOnChangeMove }: Props) => {
  return (
    <section className="flex flex-row items-center justify-center w-full h-15">
      <PrevNextButtons
        estado={estado}
        handleOnChangeMove={handleOnChangeMove}
      />
    </section>
  );
};

export default Footer;
