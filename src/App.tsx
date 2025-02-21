import { useState, useEffect } from "react";
import Select from "react-select";

interface Character {
  name: string;
  race: string;
  class: string;
  level: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  strengthMod: number;
  dexterityMod: number;
  constitutionMod: number;
  intelligenceMod: number;
  wisdomMod: number;
  charismaMod: number;
  armorClass: number;
  initiative: number;
  speed: number;
  maxHP: number;
  spells: string[];
  equipment: string[];
  traits: string[];
  personality: string;
  ideals: string;
  bonds: string;
  flaws: string;
  allies: string;
  backstory: string;
  gold: number;
  age: number;
  height: number;
  weight: number;
  eyes: string;
  skin: string;
  hair: string;
  profBonus: number;
  passiveWisdom: number;
  languages: string[];
  featuresTraits: string[];
  proficiencies: string[];
}

interface Option {
  label: string;
  value: string;
}

function App() {
  const [character, setCharacter] = useState<Character>({
    name: "",
    race: "",
    class: "",
    level: 1,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    strengthMod: 0,
    dexterityMod: 0,
    constitutionMod: 0,
    intelligenceMod: 0,
    wisdomMod: 0,
    charismaMod: 0,
    armorClass: 0,
    initiative: 0,
    speed: 0,
    maxHP: 0,
    spells: [],
    equipment: [],
    traits: [],
    personality: "",
    ideals: "",
    bonds: "",
    flaws: "",
    allies: "",
    backstory: "",
    gold: 0,
    age: 0,
    height: 0,
    weight: 0,
    eyes: "",
    skin: "",
    hair: "",
    profBonus: 0,
    passiveWisdom: 0,
    languages: [],
    featuresTraits: [],
    proficiencies: [],
  });

  const [races, setRaces] = useState<Option[]>([]);
  const [classes, setClasses] = useState<Option[]>([]);
  const [equipment, setEquipment] = useState<Option[]>([]);
  const [spells, setSpells] = useState<Option[]>([]);
  
  useEffect(() => {
    fetch("https://www.dnd5eapi.co/api/races")
      .then((res) => res.json())
      .then((data) =>
        setRaces(
          data.results.map((race: { name: string }) => ({ label: race.name, value: race.name }))
        )
      );

    fetch("https://www.dnd5eapi.co/api/classes")
      .then((res) => res.json())
      .then((data) =>
        setClasses(
          data.results.map((cls: { name: string }) => ({ label: cls.name, value: cls.name }))
        )
      );
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-800 text-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">D&D Character Builder</h1>
      <label className="block mb-2">
        Name:
        <input
          type="text"
          value={character.name}
          onChange={(e) => setCharacter({ ...character, name: e.target.value })}
          className="w-full p-2 text-black rounded"
        />
      </label>
      <label className="block mb-2">
        Race:
        <Select
          options={races}
          onChange={(selected) =>
            selected && setCharacter({ ...character, race: selected.value })
          }
          className="text-black"
        />
      </label>
      <label className="block mb-2">
        Class:
        <Select
          options={classes}
          onChange={(selected) =>
            selected && setCharacter({ ...character, class: selected.value })
          }
          className="text-black"
        />
      </label>
    </div>
  );
}

export default App;
