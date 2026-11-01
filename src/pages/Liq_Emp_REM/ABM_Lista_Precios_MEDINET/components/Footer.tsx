import { Button, PrevNextButtons } from "@/components/ui/Button";
import type { Direction, MoveState } from "@/types/generalTypes";
import { Search } from "lucide-react";

type Props = {
  estado: MoveState;
  handleOnChangeMove: (m: Direction) => void;
  handleOnOpenSearch: () => void;
};

const Footer = ({ estado, handleOnChangeMove, handleOnOpenSearch }: Props) => {
  return (
    <section className="flex flex-row items-center justify-between w-full h-15">
      <Button
        className="flex flex-row items-center gap-2 w-30 h-10"
        onClick={handleOnOpenSearch}
      >
        <Search width={"20px"} height={"20px"} />
        Buscar
      </Button>
      <PrevNextButtons
        estado={estado}
        handleOnChangeMove={handleOnChangeMove}
      />
      <div></div>
    </section>
  );
};

export default Footer;
