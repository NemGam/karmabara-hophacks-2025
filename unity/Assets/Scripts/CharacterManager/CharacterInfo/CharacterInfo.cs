using UnityEngine;

// This attribute lets us right-click in the Project window and create one of these
[CreateAssetMenu(fileName = "NewCharacter", menuName = "Characters/Character Info")]
public class CharacterInfo : ScriptableObject
{
    [Header("Character Details")]
    public string characterName;
    public Sprite characterPortrait; // For the character select screen
    
    [Header("Game Prefab")]
    public GameObject characterPrefab; // The actual prefab you already made
}