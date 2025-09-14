using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerInputHandler : MonoBehaviour
{
    [SerializeField] private PlayerInput _playerInput;
    [Tooltip("Set this to 1 for Player 1 (WASD), 2 for Player 2 (Arrows), etc.")]
    public int playerID = 1;
    public Vector2 Movement { get; private set; }
    public bool JumpWasPressed { get; private set; }
    public bool JumpIsHeld { get; private set; }
    public bool JumpWasReleased { get; private set; }
    public bool SprintIsHeld { get; private set; }
    public bool AttackWasPressed { get; private set; }
    
    private InputAction _moveAction;
    private InputAction _jumpAction;
    private InputAction _sprintAction;
    private InputAction _attackAction;

    private void Awake()
    {
        _moveAction = _playerInput.actions["Move" + playerID];
        _jumpAction = _playerInput.actions["Jump" + playerID];
        _sprintAction = _playerInput.actions["Sprint" + playerID];
        _attackAction = _playerInput.actions["Attack" + playerID];
    }

    private void Update()
    {
        Movement = _moveAction.ReadValue<Vector2>();

        JumpWasPressed = _jumpAction.WasPressedThisFrame();
        JumpIsHeld = _jumpAction.IsPressed();
        JumpWasReleased = _jumpAction.WasReleasedThisFrame();

        SprintIsHeld = _sprintAction.IsPressed();

        AttackWasPressed = _attackAction.WasPressedThisFrame();
    }
}