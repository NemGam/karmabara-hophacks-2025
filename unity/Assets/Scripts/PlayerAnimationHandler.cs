using System;
using UnityEngine;

public class PlayerAnimationHandler : MonoBehaviour
{
    [Header("References")]
    [SerializeField] private PlayerMovementStats MoveStats;

    [SerializeField] private PlayerMovement playerMovement;
    [SerializeField] private Animator animator;
    [SerializeField] private PlayerInputHandler input;

    [SerializeField] private PhysicsMaterial2D frictionMaterial;

    [SerializeField]private Rigidbody2D _rb2d;
    
    [Header("Colliders References")]
    [SerializeField] private Collider2D _bodyColl;
    [SerializeField] private Collider2D _feetColl;
    [SerializeField] private GameObject attackCollider;
    
    private bool _isGrounded;
    
    private RaycastHit2D _groundHit;
    void Awake()
    {
        /*MoveStats = GetComponentInParent<PlayerMovementStats>();
        playerMovement = GetComponentInParent<PlayerMovement>();
        input = GetComponentInParent<PlayerInputHandler>();
        _rb2d = GetComponentInParent<Rigidbody2D>();*/
    }

    void Update()
    {
        // is moving if Have X-dir movement and on ground
        if (input.Movement != Vector2.zero && _isGrounded)
        {
            animator.SetBool(input.SprintIsHeld ? "isSprinting" : "isWalking", true);
            Debug.Log($"HI {gameObject.name} says {input.Movement}");
        }
        else
        {
            animator.SetBool("isSprinting", false);
            animator.SetBool("isWalking", false);
        }

        if (input.AttackWasPressed)
        {
            Debug.Log($"HI {gameObject.name} says {input} and grounded is {_isGrounded}");
            animator.SetBool("isAttacking", true);
            playerMovement.SetIsStunned(true);
        }
    }

    private void FixedUpdate()
    {
        IsGrounded();
    }

    public void EnableAttackCollider()
    {
        attackCollider.SetActive(true);
    }
    
    public void DisableAttackCollider()
    {
        attackCollider.SetActive(false);
    }
    public void EndAttacking()
    {
        animator.SetBool("isAttacking", false);
        playerMovement.SetIsStunned(false);
    }

    public void SettakeDamageFalse()
    {
        animator.SetBool("takeDamage", false);
    }
    
    public void RigidBodyGiveFriction()
    {
        _rb2d.linearVelocity = Vector2.zero;
        _rb2d.angularVelocity = 0;
        if (frictionMaterial != null)
            _rb2d.sharedMaterial = frictionMaterial;
    }

    
    private void IsGrounded()
    {
        Vector2 boxCastOrigin = new Vector2(_feetColl.bounds.center.x, _feetColl.bounds.min.y);
        Vector2 boxCastSize = new Vector2(_feetColl.bounds.size.x, MoveStats.GroundDetectionRayLength);

        _groundHit = Physics2D.BoxCast(boxCastOrigin, boxCastSize, 0f, Vector2.down, MoveStats.GroundDetectionRayLength,
            MoveStats.GroundLayer);

        if (_groundHit.collider != null)
        {
            _isGrounded = true;
        }
        else
        {
            _isGrounded = false;
        }
    }
}
