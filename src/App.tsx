import { useState, useEffect } from "react";
import Select from "react-select";
import TextField from "@mui/material/TextField";
import Character from "./types/interface/character";
import type { Option } from "./types/interface/option";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CharacterHeaderEdit from "./components/organisms/characterHeaderEdit";
import SectionEquipment from "./components/organisms/sectionEquipment";
import SectionSpells from "./components/organisms/sectionSpells";
import SectionSkills from "./components/organisms/sectionSkills";
import SectionAbilities from "./components/organisms/sectionAbilities";
import Footer from "./components/atoms/footer";

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
  const [traits, setTraits] = useState<Option[]>([]);
  const [languages, setLanguages] = useState<Option[]>([]);
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
      //rework equipment
      /*fetch(
        `https://www.dnd5eapi.co/api/classes/${character.class
          .toString()
          .toLowerCase()}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.starting_equipment[0].equipment)
          setEquipment(
              data.starting_equipment.results.map(
                  (equipment: { name: any }) => ({
                    label: equipment.name,
                    value: equipment.name,
                  })
                )
              
        )}
        );*/
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
    setCharacter((prev: any) => ({
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
        mod = calculateAbilityMod(character.charisma);
        setCharismaMod(mod);
        break;
      }
    }
  }

  function calculateAbilityMod(ability: number) {
    return Math.floor((ability - 10) / 2);
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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#0e1a2b" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dungeons N Data
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <CharacterHeaderEdit classes={classes} races={races} />
      <div className="container">
        <SectionAbilities
          strengthMod={strengthMod}
          strength={strength}
          dexterityMod={dexterityMod}
          dexterity={dexterity}
          constitutionMod={constitutionMod}
          constitution={constitution}
          intelligenceMod={intelligenceMod}
          intelligence={intelligence}
          wisdomMod={wisdomMod}
          wisdom={wisdom}
          charismaMod={charismaMod}
          charisma={charisma}
          character={character}
          setCharacter={setCharacter}
        />
        <SectionSkills />
        <SectionEquipment equipment={equipment} />
      </div>
      <SectionSpells spells={spells} />
      <Footer />
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
