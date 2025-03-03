import { useState, useEffect } from "react";
import Select from "react-select";
import Textarea from "@mui/joy/Textarea";
import TextField from "@mui/material/TextField";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

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
  level: number;
  label: string;
  value: string;
}

export default function App() {
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
    //subclass: "",
    //background: "",
    //alignment: "",
    //xp: 0,
    //currentHP: 10,
    //tempHP: 0,
    //deathSaves: { successes: 0, failures: 0 },
    //TODO later -> skills: {},
    //TODO later -> savingThrows: {},
    //TODO later -> attacks: [],
    //spellcasting: { ability: "", spellSaveDC: 0, spellAttackBonus: 0, knownSpells: [], preparedSpells: [], spellSlots: {} },
    //treasure: "",
    //inspiration: 0,
  });

  const [characters, setCharacters] = useState<Character[]>([]);
  const [races, setRaces] = useState<Option[]>([]);
  const [classes, setClasses] = useState([]);
  const [strengthUseState, setStrengthUseState] = useState(0);
  const [dexterityUseState, setDexterityUseState] = useState(0);
  const [constitutionUseState, setConstitutionUseState] = useState(0);
  const [intelligenceUseState, setIntelligenceUseState] = useState(0);
  const [wisdomUseState, setWisdomUseState] = useState(0);
  const [charismaUseState, setCharismaUseState] = useState(0);
  const [subclasses, setSubclasses] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [spells, setSpells] = useState<Option[]>([]);
  const [spellDescriptions, setSpellDescriptions] = useState({});
  const [traits, setTraits] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [featuresTraits, setFeaturesTraits] = useState({});
  const [proficiencies, setProficiencies] = useState([]);
  const [abilityScores, setAbilityScores] = useState([
    { label: 15, value: 15 },
    { label: 14, value: 14 },
    { label: 13, value: 13 },
    { label: 12, value: 12 },
    { label: 10, value: 10 },
    { label: 8, value: 8 },
  ]);
  useEffect(() => {
    fetch("https://www.dnd5eapi.co/api/races")
      .then((res) => res.json())
      .then((data) =>
        setRaces(
          data.results.map((race: { name: any }) => ({
            label: race.name,
            value: race.name,
          }))
        )
      );

    fetch("https://www.dnd5eapi.co/api/classes")
      .then((res) => res.json())
      .then((data) =>
        setClasses(
          data.results.map((cls: { name: any }) => ({
            label: cls.name,
            value: cls.name,
          }))
        )
      );
  }, []);

  useEffect(() => {
    fetch("https://www.dnd5eapi.co/api/equipment")
      .then((res) => res.json())
      .then((data) =>
        setEquipment(
          data.results.map((eq: { name: any }) => ({
            label: eq.name,
            value: eq.name,
          }))
        )
      );

    //TODO make more effective evtl with fetch (ability bonuses)
    if (character.race != "") {
      fetch(
        `https://www.dnd5eapi.co/api/races/${character.race
          .toString()
          .toLowerCase()}`
      )
        .then((res) => res.json())
        .then((data) => {
          setLanguages(
            data.languages.map((eq: { name: any }) => ({
              label: eq.name,
              value: eq.name,
            }))
          );
          setTraits(
            data.traits.map((eq: { name: any }) => ({
              label: eq.name,
              value: eq.name,
            }))
          );
        });
      if (character.race == "Dragonborn") {
        setStrengthUseState(2);
        setDexterityUseState(0);
        setConstitutionUseState(0);
        setIntelligenceUseState(0);
        setWisdomUseState(0);
        setCharismaUseState(1);
        character.speed = 30;
      } else if (character.race == "Dwarf") {
        setStrengthUseState(2); //mountain dwarf
        setDexterityUseState(0);
        setConstitutionUseState(2);
        setIntelligenceUseState(0);
        setWisdomUseState(1); //hill dwarf
        setCharismaUseState(0);
        character.speed = 25;
      } else if (character.race == "Elf") {
        setStrengthUseState(0);
        setDexterityUseState(2);
        setConstitutionUseState(0);
        setIntelligenceUseState(1); //high elf
        setWisdomUseState(1); //wood elf
        setCharismaUseState(1); //drow / dark elf
        character.speed = 30;
      } else if (character.race == "Gnome") {
        setStrengthUseState(0);
        setDexterityUseState(1); //forest gnome
        setConstitutionUseState(1); //rock gnome
        setIntelligenceUseState(2);
        setWisdomUseState(0);
        setCharismaUseState(0);
        character.speed = 25;
      } else if (character.race == "Half-Elf") {
        setStrengthUseState(0);
        setDexterityUseState(0);
        setConstitutionUseState(0);
        setIntelligenceUseState(0);
        setWisdomUseState(0);
        setCharismaUseState(2);
        character.speed = 30;
      } else if (character.race == "Half-Orc") {
        setStrengthUseState(2);
        setDexterityUseState(0);
        setConstitutionUseState(1);
        setIntelligenceUseState(0);
        setWisdomUseState(0);
        setCharismaUseState(0);
        character.speed = 30;
      } else if (character.race == "Halfling") {
        setStrengthUseState(0);
        setDexterityUseState(2);
        setConstitutionUseState(1); //stout halfling
        setIntelligenceUseState(0);
        setWisdomUseState(0);
        setCharismaUseState(1); //lightfoot halfling
        character.speed = 25;
      } else if (character.race == "Human") {
        setStrengthUseState(1);
        setDexterityUseState(1);
        setConstitutionUseState(1);
        setIntelligenceUseState(1);
        setWisdomUseState(1);
        setCharismaUseState(1);
        character.speed = 30;
      } else if (character.race == "Tiefling") {
        setStrengthUseState(0);
        setDexterityUseState(0);
        setConstitutionUseState(0);
        setIntelligenceUseState(1);
        setWisdomUseState(0);
        setCharismaUseState(2);
        character.speed = 30;
      }
    }

    if (character.class) {
      fetch(
        `https://www.dnd5eapi.co/api/2014/classes/${character.class
          .toString()
          .toLowerCase()}/proficiencies`
      )
        .then((res) => res.json())
        .then((data) =>
          setProficiencies(
            data.results.map((eq: { name: any }) => ({
              label: eq.name,
              value: eq.name,
            }))
          )
        );
      fetch(
        `https://www.dnd5eapi.co/api/classes/${character.class
          .toString()
          .toLowerCase()}/spells`
      )
        .then((res) => res.json())
        .then((data) =>
          setSpells(
            data.results
              ? data.results.map((spell: { name: any; level: any }) => ({
                  label: spell.name,
                  value: spell.name,
                  level: spell.level,
                }))
              : []
          )
        );

      fetch(
        `https://www.dnd5eapi.co/api/classes/${character.class
          .toString()
          .toLowerCase()}/subclasses`
      )
        .then((res) => res.json())
        .then((data) =>
          setSubclasses(
            data.results
              ? data.results.map((subclass: { name: any }) => ({
                  label: subclass.name,
                  value: subclass.name,
                }))
              : []
          )
        );
    }
  }, [character.class || character.race]);

  const handleChange = (field: keyof Character, value: any) => {
    setCharacter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveCharacter = () => {
    setCharacters([...characters, character]);
  };

  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters]);

  const saveCharacter = () => {
    const updatedCharacters = [
      ...characters.filter((c) => c.name !== character.name),
      character,
    ];
    setCharacters(updatedCharacters);
    localStorage.setItem("characters", JSON.stringify(updatedCharacters));
  };

  /*const handleStatChange = (   
    selectedOption: { value: number },
    stat: string
  ) => {
    if (character[stat]) {
      setAbilityScores((prev) => [
        ...prev,
        { label: character[stat], value: character[stat] },
      ]);
    }
    setCharacter((prev) => ({ ...prev, [stat]: selectedOption.value }));
    setAbilityScores((prev) =>
      prev.filter((score) => score.value !== selectedOption.value)
    );
  };*/

  const handleStatChange = (
    selectedOption: { value: number },
    stat: string
  ) => {
    if (stat) {
      setAbilityScores((prev) => [
        ...prev,
        { label: Number(stat), value: Number(stat) },
      ]);
    }

    setCharacter((prev) => ({ ...prev, [stat]: selectedOption.value }));

    setAbilityScores((prev) =>
      prev.filter((score) => score.value !== selectedOption.value)
    );
  };

  /*const handleSpellHover = async (spellName: string | number) => {
    if (!spellDescriptions[spellName]) {
      const res = await fetch(
        "https://www.dnd5eapi.co/api/spells/${spellName}"
      );
      const data = await res.json();
      setSpellDescriptions((prev) => ({
        ...prev,
        [spellName.toString().toLowerCase()]: data.desc,
      }));
    }
  };*/

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-800 text-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">D&D Character Builder</h1>
      {/* Character Inputs */}
      <label className="block mb-2">
        Name:
        <input
          type="text"
          value={character.name}
          onChange={(e) => setCharacter({ ...character, name: e.target.value })}
          className="w-full p-2 text-black rounded"
        />
      </label>
      <br />
      <label className="block mb-2">
        Level:
        <input
          type="number"
          value={character.level}
          onChange={(e) =>
            setCharacter({ ...character, level: parseInt(e.target.value) })
          }
          className="w-full p-2 text-black rounded"
          min="1"
          max="20"
        />
      </label>
      <br />
      <label className="block mb-2">
        Race:
        <Select
          options={races}
          onChange={(selected: Option | null) =>
            selected && handleChange("race", selected.value)
          }
          className="text-black"
        />
      </label>
      <label className="block mb-2">
        Class:
        <Select
          options={classes}
          onChange={(selected: Option | null) =>
            selected && handleChange("class", selected.value)
          }
          className="text-black"
        />
      </label>
      {/* Ability Scores Inputs */}
      {[
        "strength",
        "dexterity",
        "constitution",
        "intelligence",
        "wisdom",
        "charisma",
      ].map((stat) => (
        <label key={stat} className="block mb-2">
          {stat.charAt(0).toUpperCase() + stat.slice(1)}:
          <Select
            options={abilityScores}
            onChange={(selected: any) => handleStatChange(selected, stat)}
            className="text-black"
          />
        </label>
      ))}
      {[
        "strengthMod",
        "dexterityMod",
        "constitutionMod",
        "intelligenceMod",
        "wisdomMod",
        "charismaMod",
      ].map((stat) => (
        <label key={stat} className="block mb-2">
          {stat.charAt(0).toUpperCase() + stat.slice(1)}:
          <input
            type="number"
            value={stat}
            onChange={(e) =>
              setCharacter({ ...character, [stat]: parseInt(e.target.value) })
            }
            className="w-full p-2 text-black rounded"
            min="-5"
            max="10"
          />
        </label>
      ))}
      <br />
      {"Strength: " +
        (strengthUseState + character.strength + character.strengthMod + " ")}
      {"Dexterity: " +
        (dexterityUseState +
          character.dexterity +
          character.dexterityMod +
          " ")}
      {"Constitution: " +
        (constitutionUseState +
          character.constitution +
          character.constitutionMod +
          " ")}
      {"Intelligence: " +
        (intelligenceUseState +
          character.intelligence +
          character.intelligenceMod +
          " ")}
      {"Wisdom: " +
        (wisdomUseState + character.wisdom + character.wisdomMod + " ")}
      {"Charisma: " +
        (charismaUseState + character.charisma + character.charismaMod)}
      <br />
      {/* Equipment and Spells */}
      <label className="block mb-2">
        Equipment:
        <Select
          options={equipment}
          isMulti
          onChange={(selected) =>
            setCharacter({
              ...character,
              equipment: selected.map((item: { value: any }) => item.value),
            })
          }
          className="text-black"
        />
      </label>
      <label className="block mb-2">
        Spells (Level {character.level} or lower):
        <Select
          options={spells.filter((spell) => spell.level <= character.level)}
          isMulti
          onChange={(selected) =>
            setCharacter({
              ...character,
              spells: selected.map((item: { value: any }) => item.value),
            })
          }
          className="text-black"
        />
      </label>
      <label className="block mb-2">
        ArmorClass:
        <input
          type="number"
          value={character.armorClass}
          onChange={(e) =>
            setCharacter({ ...character, armorClass: parseInt(e.target.value) })
          }
          className="w-full p-2 text-black rounded"
          min="1"
          max="20"
        />
      </label>
      <label className="block mb-2">
        Initiative:
        <input
          type="number"
          value={character.initiative}
          onChange={(e) =>
            setCharacter({ ...character, initiative: parseInt(e.target.value) })
          }
          className="w-full p-2 text-black rounded"
          min="1"
          max="20"
        />
      </label>
      <TextField
        disabled
        id="speed-field"
        label="Speed"
        type="number"
        value={character.speed}
        onChange={(e) =>
          setCharacter({ ...character, speed: parseInt(e.target.value) })
        }
      />
      <label className="block mb-2">
        MaxHP:
        <input
          type="number"
          value={character.maxHP}
          onChange={(e) =>
            setCharacter({ ...character, maxHP: parseInt(e.target.value) })
          }
          className="w-full p-2 text-black rounded"
          min="1"
          max="20"
        />
      </label>
        <FormControl>
      <FormLabel>Traits:</FormLabel>
        <Textarea
          value={traits.map((item: { value: any }) => item.value).join(", ")} // Convert array to string
          onChange={(e) =>
            setCharacter({
              ...character,
              traits: e.target.value.split(",").map((item) => item.trim()), // Convert back to array
            })
          }
          className="text-black"
        />
      </FormControl>
      <label className="block mb-2">
        Personality:
        <input
          type="text"
          value={character.personality}
          onChange={(e) =>
            setCharacter({ ...character, personality: e.target.value })
          }
          className="w-full p-2 text-black rounded"
        />
      </label>
      <label className="block mb-2">
        Ideals:
        <input
          type="text"
          value={character.ideals}
          onChange={(e) =>
            setCharacter({ ...character, ideals: e.target.value })
          }
          className="w-full p-2 text-black rounded"
        />
      </label>
      <label className="block mb-2">
        Bonds:
        <input
          type="text"
          value={character.bonds}
          onChange={(e) =>
            setCharacter({ ...character, bonds: e.target.value })
          }
          className="w-full p-2 text-black rounded"
        />
      </label>
      <label className="block mb-2">
        Flaws:
        <input
          type="text"
          value={character.flaws}
          onChange={(e) =>
            setCharacter({ ...character, flaws: e.target.value })
          }
          className="w-full p-2 text-black rounded"
        />
      </label>
      <label className="block mb-2">
        Allies:
        <input
          type="text"
          value={character.allies}
          onChange={(e) =>
            setCharacter({ ...character, allies: e.target.value })
          }
          className="w-full p-2 text-black rounded"
        />
      </label>
      <label className="block mb-2">
        Backstory:
        <input
          type="text"
          value={character.backstory}
          onChange={(e) =>
            setCharacter({ ...character, backstory: e.target.value })
          }
          className="w-full p-2 text-black rounded"
        />
      </label>
      <label className="block mb-2">
        Gold:
        <input
          type="number"
          value={character.gold}
          onChange={(e) =>
            setCharacter({ ...character, gold: parseInt(e.target.value) })
          }
          className="w-full p-2 text-black rounded"
          min="0"
        />
      </label>
      <label className="block mb-2">
        Age:
        <input
          type="number"
          value={character.age}
          onChange={(e) =>
            setCharacter({ ...character, age: parseInt(e.target.value) })
          }
          className="w-full p-2 text-black rounded"
          min="0"
        />
      </label>
      <label className="block mb-2">
        Height:
        <input
          type="number"
          value={character.height}
          onChange={(e) =>
            setCharacter({ ...character, height: parseInt(e.target.value) })
          }
          className="w-full p-2 text-black rounded"
          min="0"
        />
      </label>
      <label className="block mb-2">
        Weight:
        <input
          type="number"
          value={character.weight}
          onChange={(e) =>
            setCharacter({ ...character, weight: parseInt(e.target.value) })
          }
          className="w-full p-2 text-black rounded"
          min="0"
        />
      </label>
      <label className="block mb-2">
        Eyes:
        <input
          type="text"
          value={character.eyes}
          onChange={(e) => setCharacter({ ...character, eyes: e.target.value })}
          className="w-full p-2 text-black rounded"
        />
      </label>
      <label className="block mb-2">
        Skin:
        <input
          type="text"
          value={character.skin}
          onChange={(e) => setCharacter({ ...character, skin: e.target.value })}
          className="w-full p-2 text-black rounded"
        />
      </label>
      <label className="block mb-2">
        Hair:
        <input
          type="text"
          value={character.hair}
          onChange={(e) => setCharacter({ ...character, hair: e.target.value })}
          className="w-full p-2 text-black rounded"
        />
      </label>
      <label className="block mb-2">
        ProfBonus:
        <input
          type="number"
          value={character.profBonus}
          onChange={(e) =>
            setCharacter({ ...character, profBonus: parseInt(e.target.value) })
          }
          className="w-full p-2 text-black rounded"
          min="0"
          max="20"
        />
      </label>
      <label className="block mb-2">
        PassiveWisdom:
        <input
          type="number"
          value={character.passiveWisdom}
          onChange={(e) =>
            setCharacter({
              ...character,
              passiveWisdom: parseInt(e.target.value),
            })
          }
          className="w-full p-2 text-black rounded"
          min="0"
          max="20"
        />
      </label>
      <FormControl>
      <FormLabel>Languages:</FormLabel>
        <Textarea
          value={languages.map((item: { value: any }) => item.value).join(", ")} // Convert array to string
          onChange={(e) =>
            setCharacter({
              ...character,
              languages: e.target.value.split(",").map((item) => item.trim()), // Convert back to array
            })
          }
          className="text-black"
        />
      </FormControl>
      <label className="block mb-2">
        FeaturesTraits:
        <input
          type="text"
          value={character.featuresTraits}
          onChange={(set) =>
            set && handleChange("featuresTraits", set.target.value)
          }
          className="w-full p-2 text-black rounded"
        />
      </label>
      <FormControl>
      <FormLabel>Proficiencies:</FormLabel>
        <Textarea
          value={proficiencies
            .map((item: { value: any }) => item.value)
            .join(", ")} // Convert array to string
          onChange={(e) =>
            setCharacter({
              ...character,
              proficiencies: e.target.value
                .split(",")
                .map((item) => item.trim()), // Convert back to array
            })
          }
          className="text-black"
        />
      </FormControl>
      {/* Save Character Button */}
      <button
        onClick={handleSaveCharacter}
        className="mt-4 p-2 bg-blue-600 text-white rounded"
      >
        Save Character
      </button>
      {/* Display All Saved Characters */}
      <div className="mt-6">
        <h3 className="font-bold">Saved Characters:</h3>
        <ul>
          {characters.map((char, index) => (
            <li key={index}>
              <strong>{char.name}</strong> ({char.class} - {char.level})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
