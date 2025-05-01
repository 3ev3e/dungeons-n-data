import Character from "../../types/interface/character";
import numberField from "../atoms/numberField";

type Props = {
  strengthMod: number;
  strength: number;
  character: Character;
};

export default function SectionAbilities({
  strengthMod,
  strength,
  character,
}: Props) {
  return (
    <>
      <div className="section abilities">
        <h3>Abilities</h3>
        <div>
          {" "}
          <div className="ability">{numberField("Strength")}</div>{" "}
          <div className="ability">
            {"StrengthMod: " + (strengthMod + " ")}
            {"Strength: " + (strength + character.strength + strengthMod + " ")}
          </div>
        </div>
        <div className="ability">{numberField("Dexterity")}</div>
        <div className="ability">{numberField("Constitution")}</div>
        <div className="ability">{numberField("Intelligence")}</div>
        <div className="ability">{numberField("Wisdom")}</div>
        <div className="ability">{numberField("Charisma")}</div>
      </div>
    </>
  );
}
//TODO make mods working