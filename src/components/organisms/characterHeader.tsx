import Character from "../../types/interface/character";

export default function characterHeader(character: Character) {
  return (
    <>
      <div className="character-header">
        <div>
          <h2>{character.name}</h2>
          <span>
            Level {character.level} {character.class}
          </span>
        </div>
        <div>
          <span>Race: {character.race}</span>
          <span>Background: {character.backstory}</span>
          <span>AC: {character.armorClass} | HP: {character.maxHP}</span>
        </div>
      </div>
    </>
  );
}
