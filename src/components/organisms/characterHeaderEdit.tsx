import { useEffect, useState } from "react";
import numberField from "../atoms/numberField";
import Select from "../atoms/select";
import textField from "../atoms/textField";
import Character from "../../types/interface/character";
import type { Option } from "../../types/interface/option";

type Props = {
  classes: Option[];
  races: Option[];
  character: Character;
  setLanguages: React.Dispatch<React.SetStateAction<Option[]>>;
  setTraits: React.Dispatch<React.SetStateAction<Option[]>>;
};

function CharacterHeaderEdit({
  classes,
  races,
  character,
  setLanguages,
  setTraits,
}: Props) {
  const [races2, setRaces] = useState<Option[]>([]);

  useEffect(() => {
    fetch("https://www.dnd5eapi.co/api/races")
      .then((res) => res.json())
      .then((data) =>
        setRaces(
          data.results.map((race: { name: string }) => ({
            label: race.name,
            value: race.name,
          }))
        )
      );
  }, []); // fetch race list on mount

  useEffect(() => {
    if (character.race !== "") {
      fetch(`https://www.dnd5eapi.co/api/races/${character.race.toLowerCase()}`)
        .then((res) => res.json())
        .then((data) => {
          setLanguages(
            data.languages.map((lang: { name: string }) => ({
              label: lang.name,
              value: lang.name,
            }))
          );
          setTraits(
            data.traits.map((trait: { name: string }) => ({
              label: trait.name,
              value: trait.name,
            }))
          );
        });
    }
  }, [character.race]); // only refetch when race changes

  return (
    <div className="character-header">
      <div>
        <h2>{textField("Name")}</h2>
        <span>{numberField("Level")}</span>
        <span><Select label="Class" options={classes} />
        </span>
      </div>
      <div>
        <span><Select label="Race" options={races2} />
        </span>
        <span>
          {numberField("Armor Class")} {numberField("Health Points")}
        </span>
      </div>
    </div>
  );
}

export default CharacterHeaderEdit;
