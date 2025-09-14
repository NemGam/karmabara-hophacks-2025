using UnityEngine;
using TMPro;
using UnityEngine.UI; // Required for UI elements

public class CharacterSelectUI : MonoBehaviour
{
    [Header("P1 Components")]
    [SerializeField] private Image p1Portrait;
    [SerializeField] private Text p1NameText;
    [SerializeField] private Button p1_NextButton;
    [SerializeField] private Button p1_PrevButton;
    [SerializeField] private Button p1_ConfirmButton; // Add your P1 Confirm button here
    [SerializeField] private GameObject p1_ReadyIndicator; // Optional: A "READY!" text/image you turn on

    [Header("P2 Components")]
    [SerializeField] private Image p2Portrait;
    [SerializeField] private Text p2NameText;
    [SerializeField] private Button p2_NextButton;
    [SerializeField] private Button p2_PrevButton;
    [SerializeField] private Button p2_ConfirmButton; // Add your P2 Confirm button here
    [SerializeField] private GameObject p2_ReadyIndicator; // Optional: A "READY!" text/image

    [Header("Scene To Load")]
    [SerializeField] private string gameSceneName = "Arena"; // Set this to your game scene's name

    // --- State Variables ---
    private int p1CurrentIndex = 0;
    private int p2CurrentIndex = 0; 
    private bool p1LockedIn = false; // Tracks P1's ready state
    private bool p2LockedIn = false; // Tracks P2's ready state

    private GameManager gameManager;

    void Start()
    {
        gameManager = GameManager.Instance;
        
        if (gameManager == null)
        {
            Debug.LogError("FATAL ERROR: GameManager not found.");
            return;
        }

        // Hide ready indicators at start
        if (p1_ReadyIndicator != null) p1_ReadyIndicator.SetActive(false);
        if (p2_ReadyIndicator != null) p2_ReadyIndicator.SetActive(false);

        // Initialize display to default
        UpdateP1Display();
        UpdateP2Display();
    }

    // --- PLAYER 1 FUNCTIONS ---
    public void P1NextCharacter()
    {
        // Player can only switch if NOT locked in
        if (p1LockedIn) return; 

        p1CurrentIndex++;
        if (p1CurrentIndex >= gameManager.allCharacters.Count)
        {
            p1CurrentIndex = 0; // Wrap around
        }
        UpdateP1Display();
    }

    public void P1PrevCharacter()
    {
        // Player can only switch if NOT locked in
        if (p1LockedIn) return;

        p1CurrentIndex--;
        if (p1CurrentIndex < 0)
        {
            p1CurrentIndex = gameManager.allCharacters.Count - 1; // Wrap around
        }
        UpdateP1Display();
    }

    void UpdateP1Display()
    {
        CharacterInfo selected = gameManager.allCharacters[p1CurrentIndex];
        p1Portrait.sprite = selected.characterPortrait;
        p1NameText.text = selected.characterName;
    }

    // --- PLAYER 2 FUNCTIONS ---
    public void P2NextCharacter()
    {
        if (p2LockedIn) return; // Player can only switch if NOT locked in

        p2CurrentIndex++;
        if (p2CurrentIndex >= gameManager.allCharacters.Count)
        {
            p2CurrentIndex = 0;
        }
        UpdateP2Display();
    }

    public void P2PrevCharacter()
    {
        if (p2LockedIn) return; // Player can only switch if NOT locked in

        p2CurrentIndex--;
        if (p2CurrentIndex < 0)
        {
            p2CurrentIndex = gameManager.allCharacters.Count - 1;
        }
        UpdateP2Display();
    }

    void UpdateP2Display()
    {
        CharacterInfo selected = gameManager.allCharacters[p2CurrentIndex];
        p2Portrait.sprite = selected.characterPortrait;
        p2NameText.text = selected.characterName;
    }

    // --- NEW LOCK-IN FUNCTIONS ---

    public void OnP1Confirm()
    {
        p1LockedIn = true;

        // Disable P1's buttons so they can't change anything
        p1_NextButton.interactable = false;
        p1_PrevButton.interactable = false;
        p1_ConfirmButton.interactable = false;

        // Show ready indicator
        if (p1_ReadyIndicator != null) p1_ReadyIndicator.SetActive(true);

        // Check if both players are ready
        StartGameCheck();
    }

    public void OnP2Confirm()
    {
        p2LockedIn = true;

        // Disable P2's buttons
        p2_NextButton.interactable = false;
        p2_PrevButton.interactable = false;
        p2_ConfirmButton.interactable = false;

        // Show ready indicator
        if (p2_ReadyIndicator != null) p2_ReadyIndicator.SetActive(true);

        // Check if both players are ready
        StartGameCheck();
    }

    private void StartGameCheck()
    {
        // If BOTH players are locked in, start the game
        if (p1LockedIn && p2LockedIn)
        {
            // 1. Lock in the choices! This saves the selection to the persistent manager
            gameManager.player1Character = gameManager.allCharacters[p1CurrentIndex];
            gameManager.player2Character = gameManager.allCharacters[p2CurrentIndex];

            // 2. Tell the GameManager to load the next scene
            gameManager.LoadGameScene(gameSceneName);
        }
    }
}