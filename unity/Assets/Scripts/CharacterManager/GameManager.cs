using UnityEngine;
using UnityEngine.SceneManagement;
using System.Collections.Generic;

public class GameManager : MonoBehaviour
{
    public static GameManager Instance;

    [Header("Character Database")]
    public List<CharacterInfo> allCharacters;

    [Header("Player Selections")]
    public CharacterInfo player1Character;
    public CharacterInfo player2Character;

    // Use Awake to set up the Singleton
    void Awake()
    {
        // If an Instance already exists and it's not this one, destroy this one
        if (Instance != null && Instance != this)
        {
            Destroy(this.gameObject);
        }
        else
        {
            // This is the first or only instance, so make it THE Instance
            Instance = this;
            DontDestroyOnLoad(this.gameObject); // This is the magic!
        }
    }

    public void LoadGameScene(string sceneName)
    {
        // Add any "pre-game-start" logic here if you need it
        SceneManager.LoadScene(sceneName);
    }
}