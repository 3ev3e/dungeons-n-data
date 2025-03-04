import { useState, useEffect } from "react";
import Select from "react-select";
import Textarea from "@mui/joy/Textarea";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";

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
  const [strength, setStrength] = useState(0);
  const [dexterity, setDexterity] = useState(0);
  const [constitution, setConstitution] = useState(0);
  const [intelligence, setIntelligence] = useState(0);
  const [wisdom, setWisdom] = useState(0);
  const [charisma, setCharisma] = useState(0);
  const [strengthMod, setStrengthMod] = useState(0);
  const [dexterityMod, setDexterityMod] = useState(0);
  const [constitutionMod, setConstitutionMod] = useState(0);
  const [intelligenceMod, setIntelligenceMod] = useState(0);
  const [wisdomMod, setWisdomMod] = useState(0);
  const [charismaMod, setCharismaMod] = useState(0);
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
        setStrength(2);
        setDexterity(0);
        setConstitution(0);
        setIntelligence(0);
        setWisdom(0);
        setCharisma(1);
        character.speed = 30;
      } else if (character.race == "Dwarf") {
        setStrength(2); //mountain dwarf
        setDexterity(0);
        setConstitution(2);
        setIntelligence(0);
        setWisdom(1); //hill dwarf
        setCharisma(0);
        character.speed = 25;
      } else if (character.race == "Elf") {
        setStrength(0);
        setDexterity(2);
        setConstitution(0);
        setIntelligence(1); //high elf
        setWisdom(1); //wood elf
        setCharisma(1); //drow / dark elf
        character.speed = 30;
      } else if (character.race == "Gnome") {
        setStrength(0);
        setDexterity(1); //forest gnome
        setConstitution(1); //rock gnome
        setIntelligence(2);
        setWisdom(0);
        setCharisma(0);
        character.speed = 25;
      } else if (character.race == "Half-Elf") {
        setStrength(0);
        setDexterity(0);
        setConstitution(0);
        setIntelligence(0);
        setWisdom(0);
        setCharisma(2);
        character.speed = 30;
      } else if (character.race == "Half-Orc") {
        setStrength(2);
        setDexterity(0);
        setConstitution(1);
        setIntelligence(0);
        setWisdom(0);
        setCharisma(0);
        character.speed = 30;
      } else if (character.race == "Halfling") {
        setStrength(0);
        setDexterity(2);
        setConstitution(1); //stout halfling
        setIntelligence(0);
        setWisdom(0);
        setCharisma(1); //lightfoot halfling
        character.speed = 25;
      } else if (character.race == "Human") {
        setStrength(1);
        setDexterity(1);
        setConstitution(1);
        setIntelligence(1);
        setWisdom(1);
        setCharisma(1);
        character.speed = 30;
      } else if (character.race == "Tiefling") {
        setStrength(0);
        setDexterity(0);
        setConstitution(0);
        setIntelligence(1);
        setWisdom(0);
        setCharisma(2);
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

  useEffect(() => {
    [
      "strength",
      "dexterity",
      "constitution",
      "intelligence",
      "wisdom",
      "charisma",
    ].map((stat) => setAbilityMod(stat));
  }, [character]);

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

  function setAbilityMod(ability: string) {
    let mod: number;
    switch (ability) {
      case "strength": {
        mod = calculateAbilityMod(character.strength);
        setStrengthMod(mod);
        break;
      }
      case "dexterity": {
        mod = calculateAbilityMod(character.dexterity);
        setDexterityMod(mod);
        break;
      }
      case "constitution": {
        mod = calculateAbilityMod(character.constitution);
        setConstitutionMod(mod);
        break;
      }
      case "intelligence": {
        mod = calculateAbilityMod(character.intelligence);
        setIntelligenceMod(mod);
        break;
      }
      case "wisdom": {
        mod = calculateAbilityMod(character.wisdom);
        setWisdomMod(mod);
        break;
      }
      case "charisma": {
        console.log(character.charisma)
        mod = calculateAbilityMod(character.charisma);
        console.log(mod)
        setCharismaMod(mod);
        console.log(charismaMod)
        break;
      }
    }
  }

  function calculateAbilityMod(ability: number) {
    if (ability === 1) {
      return -5;
    } else if (ability === 2 || ability === 3) {
      return -4;
    } else if (ability === 4 || ability === 5) {
      return -3;
    } else if (ability === 6 || ability === 7) {
      return -2;
    } else if (ability === 8 || ability === 9) {
      return -1;
    } else if (ability === 10 || ability === 11) {
      return 0;
    } else if (ability === 12 || ability === 13) {
      return 1;
    } else if (ability === 14 || ability === 15) {
      return 2;
    } else if (ability === 16 || ability === 17) {
      return 3;
    } else if (ability === 18 || ability === 19) {
      return 4;
    } else if (ability === 20 || ability === 21) {
      return 5;
    } else if (ability === 22 || ability === 23) {
      return 6;
    } else if (ability === 24 || ability === 25) {
      return 7;
    } else if (ability === 26 || ability === 27) {
      return 8;
    } else if (ability === 28 || ability === 29) {
      return 9;
    } else if (ability === 30) {
      return 10;
    } else {
      return 0;
    }
  }

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
      {/*[
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
      ))*/}
      <label className="block mb-2">
        Strength:
        <input
          type="number"
          value={character.strength}
          onChange={(e) =>
            setCharacter({ ...character, strength: parseInt(e.target.value) })
          }
          className="w-full p-2 text-black rounded"
          min="1"
          max="30"
        />
      </label>
      <label className="block mb-2">
      Dexterity:
        <input
          type="number"
          value={character.dexterity}
          onChange={(e) =>
            setCharacter({ ...character, dexterity: parseInt(e.target.value) })
          }
          className="w-full p-2 text-black rounded"
          min="1"
          max="30"
        />
      </label>
      <label className="block mb-2">
      Constitution:
        <input
          type="number"
          value={character.constitution}
          onChange={(e) =>
            setCharacter({ ...character, constitution: parseInt(e.target.value) })
          }
          className="w-full p-2 text-black rounded"
          min="1"
          max="30"
        />
      </label>
      <label className="block mb-2">
      Intelligence:
        <input
          type="number"
          value={character.intelligence}
          onChange={(e) =>
            setCharacter({ ...character, intelligence: parseInt(e.target.value) })
          }
          className="w-full p-2 text-black rounded"
          min="1"
          max="30"
        />
      </label>
      <label className="block mb-2">
      Wisdom:
        <input
          type="number"
          value={character.wisdom}
          onChange={(e) =>
            setCharacter({ ...character, wisdom: parseInt(e.target.value) })
          }
          className="w-full p-2 text-black rounded"
          min="1"
          max="30"
        />
      </label>
      <label className="block mb-2">
      Charisma:
        <input
          type="number"
          value={character.charisma}
          onChange={(e) =>
            setCharacter({ ...character, charisma: parseInt(e.target.value) })
          }
          className="w-full p-2 text-black rounded"
          min="1"
          max="30"
        />
      </label>
      <br />
      {"StrengthMod: " + (strengthMod + " ")}
      {"DexterityMod: " + (dexterityMod + " ")}
      {"ConstitutionMod: " + (constitutionMod + " ")}
      {"IntelligenceMod: " +
        (intelligenceMod +
          " ")}
      {"WisdomMod: " + (wisdomMod + " ")}
      {"CharismaMod: " + (charismaMod)}
      <br />
      {"Strength: " +
        (strength + character.strength + strengthMod + " ")}
      {"Dexterity: " +
        (dexterity + character.dexterity + dexterityMod + " ")}
      {"Constitution: " +
        (constitution +
          character.constitution +
          constitutionMod +
          " ")}
      {"Intelligence: " +
        (intelligence +
          character.intelligence +
          intelligenceMod +
          " ")}
      {"Wisdom: " + (wisdom + character.wisdom + wisdomMod + " ")}
      {"Charisma: " + (charisma + character.charisma + charismaMod)}
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
