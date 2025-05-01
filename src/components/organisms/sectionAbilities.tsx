import Character from "../../types/interface/character";
import numberFieldAbilities from "../atoms/numberFieldAbilities";

type Props = {
  strengthMod: number;
  strength: number;
  dexterity: number;
  dexterityMod: number;
  constitutionMod: number;
  constitution: number;
  intelligence: number;
  intelligenceMod: number;
  wisdomMod: number;
  wisdom: number;
  charisma: number;
  charismaMod: number;
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

export default function SectionAbilities({
  strengthMod,
  strength,
  dexterity,
  dexterityMod,
  constitutionMod,
  constitution,
  intelligence,
  intelligenceMod,
  wisdomMod,
  wisdom,
  charisma,
  charismaMod,
  character,
  setCharacter
}: Props) {
  return (
    <>
      <div className="section abilities">
        <h3>Abilities</h3>
          <div className="ability">
            {numberFieldAbilities("strength", character, setCharacter)} {"+ " + (strengthMod + " ")}
            {"= " + (strength + character.strength + strengthMod + " ")}
          </div>
          <div className="ability">
            {numberFieldAbilities("dexterity", character, setCharacter)} {"+ " + (dexterityMod + " ")}
            {"= " + (dexterity + character.dexterity + dexterityMod + " ")}
          </div>
          <div className="ability">
            {numberFieldAbilities("constitution", character, setCharacter)} {"+ " + (constitutionMod + " ")}
            {"= " + (constitution + character.constitution + constitutionMod + " ")}
          </div>
          <div className="ability">
            {numberFieldAbilities("intelligence", character, setCharacter)} {"+ " + (intelligenceMod + " ")}
            {"= " + (intelligence + character.intelligence + intelligenceMod + " ")}
          </div>
          <div className="ability">
            {numberFieldAbilities("wisdom", character, setCharacter)} {"+ " + (wisdomMod + " ")}
            {"= " + (wisdom + character.wisdom + wisdomMod + " ")}
          </div>
          <div className="ability">
            {numberFieldAbilities("charisma", character, setCharacter)} {"+ " + (charismaMod + " ")}
            {"= " + (charisma + character.charisma + charismaMod + " ")}
          </div>
      </div>
    </>
  );
}