using System;
using System.Collections;
using System.Collections.Generic;
using NUnit.Framework.Constraints;
using Unity.Mathematics;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    [Header("References")]
    public PlayerMovementStats MoveStats;
    [SerializeField] private Collider2D _bodyColl;
    [SerializeField] private Collider2D _feetColl;
    [SerializeField] private PlayerInputHandler input;

    private Rigidbody2D _rb;

    //movement vars
    [Header("Movement Variables")]
    private Vector2 _moveVelocity;
    [SerializeField] private bool _isFacingRight;

    //jump vars
    public float VerticalVelocity { get; private set; }
    public bool IsStunned { get; private set; }
    private bool _isJumping;
    private bool _isFastFalling;
    private bool _isFalling;
    private float _fastFallTime;
    private float _fastFallReleaseSpeed;
    private int _numberOfJumpsUsed;

    //apex vars
    private float _apexPoint;
    private float _timePastApexThreshold;
    private bool _isPastApexThreshold;

    //jump buffer vars
    private float _jumpBufferTimer;
    private bool _jumpReleasedDuringBuffer;

    //coyote time vars
    private float _coyoteTimer;
    
    //collision check vars
    private RaycastHit2D _groundHit;
    private RaycastHit2D _headHit;
    private bool _isGrounded;
    private bool _bumpedHead;
    
    // Dead flag
    public bool isDead = false;

    private void Awake()
    {
        _rb = GetComponent<Rigidbody2D>();
    }

    private void Update()
    {
        CountTimers();
        JumpCheck();
    }

    private void FixedUpdate()
    {
        CollisionChecks();
        
        Jump();
        
        if (isDead) return;
        if (IsStunned) return;
        
        if (_isGrounded)
        {
            Move(MoveStats.GroundAcceleration, MoveStats.GroundDeceleration, input.Movement);
        }
        else
        {
            Move(MoveStats.AirAcceleration, MoveStats.AirDeceleration, input.Movement);
        }
    }
    
    private void OnDrawGizmos()
    {
        if (MoveStats.ShowWalkJumpArc)
        {
            DrawJumpArc(MoveStats.MaxWalkSpeed, Color.white);
        }


        if (MoveStats.ShowRunJumpArc)
        {
            DrawJumpArc(MoveStats.MaxRunSpeed, Color.red);
        }
    }

    #region Movement
    private void Move(float acceleration, float deceleration, Vector2 moveInput)
    {
        if (moveInput != Vector2.zero)
        {
            //check if needs to turn
            TurnCheck(moveInput);

            Vector2 targetVelocity = Vector2.zero;
            if (input.SprintIsHeld)
            {
                targetVelocity = new Vector2(moveInput.x, 0f) * MoveStats.MaxRunSpeed;
            }
            else
            {
                targetVelocity = new Vector2(moveInput.x, 0f) * MoveStats.MaxWalkSpeed;
            }

            _moveVelocity = Vector2.Lerp(_moveVelocity, targetVelocity, acceleration * Time.deltaTime);
            _rb.linearVelocity = new Vector2(_moveVelocity.x, _rb.linearVelocity.y);
        }
        else if (moveInput == Vector2.zero)
        {
            _moveVelocity = Vector2.Lerp(_moveVelocity, Vector2.zero, deceleration * Time.deltaTime);
            _rb.linearVelocity = new Vector2(_moveVelocity.x, _rb.linearVelocity.y);
        }
    }

    private void TurnCheck(Vector2 moveInput)
    {
        if (_isFacingRight && moveInput.x < 0)
        {
            Turn(false);
        }
        else if (!_isFacingRight && moveInput.x > 0)
        {
            Turn(true);
        }
    }

    private void Turn(bool turnRight)
    {
        if (turnRight)
        {
            _isFacingRight = true;
            Vector3 ls = transform.localScale;
            ls.x = -ls.x;
            transform.localScale = ls;
        }
        else
        {
            _isFacingRight = false;
            Vector3 ls = transform.localScale;
            ls.x = Math.Abs(ls.x);
            transform.localScale = ls;
        }
    }
    #endregion
    
    #region Jump
    
    private void JumpCheck()
    {
        //When Jump pressed
        if (input.JumpWasPressed)
        {
            Debug.Log("Hi IN Jump");
            _jumpBufferTimer = MoveStats.JumpBufferTime;
            _jumpReleasedDuringBuffer = false;
        }

        //When Jump Released
        if (input.JumpWasReleased)
        {
            Debug.Log("Hi IN JumpRelease");
            if (_jumpBufferTimer > 0f)
            {
                _jumpReleasedDuringBuffer = true;
            }

            if (_isJumping && VerticalVelocity > 0f)
            {
                Debug.Log("Hi IN VerticalVelocity > 0");
                if (_isPastApexThreshold)
                {
                    Debug.Log("Hi IN ApexThreshold");
                    _isPastApexThreshold = false;
                    _isFastFalling = true;
                    _fastFallTime = MoveStats.TimeForUpwardsCancel;
                    VerticalVelocity = 0f;
                }
                else
                {
                    Debug.Log("Hi IN Else Threashold");
                    _isFastFalling = true;
                    _fastFallReleaseSpeed = VerticalVelocity;
                }
            }
        }
        //INITIATE JUMP WITH JUMP BUFFERING AND COYOTE TIME
        if (_jumpBufferTimer > 0f && !_isJumping && (_isGrounded || _coyoteTimer > 0f))
        {
            Debug.Log("Hi IN Buffer");
            InitiateJump(1);

            if (_jumpReleasedDuringBuffer)
            {
                _isFastFalling = true;
                _fastFallReleaseSpeed = VerticalVelocity;
            }
        }

        // Double Jump
        else if (_jumpBufferTimer > 0f && _isJumping && _numberOfJumpsUsed < MoveStats.NumberOfJumpsAllowed)
        {
            Debug.Log("Hi IN Double Jump");
            _isFastFalling = false;
            InitiateJump(1);
        }

        //Air Jump after Cyote time
        else if (_jumpBufferTimer > 0f && _isFalling && _numberOfJumpsUsed < MoveStats.NumberOfJumpsAllowed - 1)
        {
            Debug.Log("Hi IN Cyote time");
            InitiateJump(2);
            _isFastFalling = false;
        }

        // Landed
        if ((_isJumping || _isFalling) && _isGrounded && VerticalVelocity <= 0f)
        {
            Debug.Log("Hi IN landed");
            _isJumping = false;
            _isFalling = false;
            _isFastFalling = false;
            _fastFallTime = 0f;
            _isPastApexThreshold = false;
            _numberOfJumpsUsed = 0;

            VerticalVelocity = Physics2D.gravity.y;
        }
    }

    private void InitiateJump(int numberOfJumpsUsed)
    {
        if (!_isJumping)
        {
            _isJumping = true;
        }

        _jumpBufferTimer = 0f;
        _numberOfJumpsUsed += numberOfJumpsUsed;
        VerticalVelocity = MoveStats.InitialJumpVelocity;
    }

    private void Jump()
    {
        //APPLY GRAVITY WHILE JUMPING
        if (_isJumping)
        {
            Debug.Log("Hi IN _isJumping");
            //CHECK FOR HEAD BUMP
            if (_bumpedHead || IsStunned)
            {
                _isFastFalling = true;
            }

            //GRAVITY ON ASCENDING
            if (VerticalVelocity >= 0f)
            {
                //APEX CONTROLS
                _apexPoint = Mathf.InverseLerp(MoveStats.InitialJumpVelocity, 0f, VerticalVelocity);

                if (_apexPoint > MoveStats.ApexThreshold)
                {
                    if (!_isPastApexThreshold)
                    {
                        _isPastApexThreshold = true;
                        _timePastApexThreshold = 0f;
                    }

                    if (_isPastApexThreshold)
                    {
                        _timePastApexThreshold += Time.fixedDeltaTime;
                        if (_timePastApexThreshold < MoveStats.ApexHangTime)
                        {
                            VerticalVelocity = 0f;
                        }
                        else
                        {
                            VerticalVelocity = -0.01f;
                        }
                    }
                }
                //GRAVITY ON ASCENDING BUT NOT PAST APEX THRESHOLD
                else
                {
                    Debug.Log("Hi IN falling before Apex");
                    VerticalVelocity += MoveStats.Gravity * Time.fixedDeltaTime;
                    if (_isPastApexThreshold)
                    {
                        _isPastApexThreshold = false;
                    }
                }
            }

            //GRAVITY ON DESCENDING
            else if (!_isFastFalling)
            {
                VerticalVelocity += MoveStats.Gravity * MoveStats.GravityOnReleaseMultiplier * Time.fixedDeltaTime;
            }

            else if (VerticalVelocity < 0f)
            {
                if (!_isFalling)
                {
                    _isFalling = true;
                }
            }
        }
        //JUMP CUT
        if (_isFastFalling)
        {
            if (_fastFallTime > MoveStats.TimeForUpwardsCancel)
            {
                VerticalVelocity += MoveStats.Gravity * MoveStats.GravityOnReleaseMultiplier * Time.fixedDeltaTime;
            }
            else if (_fastFallTime < MoveStats.TimeForUpwardsCancel)
            {
                VerticalVelocity = Mathf.Lerp(_fastFallReleaseSpeed, 0f, (_fastFallTime / MoveStats.TimeForUpwardsCancel));
            }

            _fastFallTime += Time.fixedDeltaTime;
        }

        //NORMAL GRAVITY WHILE FALLING
        else if (!_isGrounded && !_isJumping)
        {
            if (!_isFalling)
            {
                _isFalling = true;
            }

            VerticalVelocity += MoveStats.Gravity * Time.fixedDeltaTime;
        }

        //CLAMP FALL SPEED
        VerticalVelocity = Mathf.Clamp(VerticalVelocity, -MoveStats.MaxFallSpeed, 50f);


        _rb.linearVelocity = new Vector2(_rb.linearVelocity.x, VerticalVelocity);
    }


    #endregion
    
    #region Collision Checks

    private void IsGrounded()
    {
        Vector2 boxCastOrigin = new Vector2(_feetColl.bounds.center.x, _feetColl.bounds.min.y);
        Vector2 boxCastSize = new Vector2(_feetColl.bounds.size.x, MoveStats.GroundDetectionRayLength);

        _groundHit = Physics2D.BoxCast(boxCastOrigin, boxCastSize, 0f, Vector2.down, MoveStats.GroundDetectionRayLength, MoveStats.GroundLayer);
    
        if (_groundHit.collider != null)
        {
            _isGrounded = true;
        }
        else { _isGrounded = false; }


        #region Debug Visualization
        if (MoveStats.DebugShowIsGroundedBox)
        {
            Color rayColor;
            if (_isGrounded)
            {
                rayColor = Color.green;
            }
            else { rayColor = Color.red; }

            Debug.DrawRay(new Vector2(boxCastOrigin.x - boxCastSize.x / 2, boxCastOrigin.y), Vector2.down * MoveStats.GroundDetectionRayLength, rayColor);
            Debug.DrawRay(new Vector2(boxCastOrigin.x + boxCastSize.x / 2, boxCastOrigin.y), Vector2.down * MoveStats.GroundDetectionRayLength, rayColor);
            Debug.DrawRay(new Vector2(boxCastOrigin.x - boxCastSize.x / 2, boxCastOrigin.y - MoveStats.GroundDetectionRayLength), Vector2.right * boxCastSize.x, rayColor);
        }
        #endregion
    }
    
    private void BumpedHead()
    {
        Vector2 boxCastOrigin = new Vector2(_feetColl.bounds.center.x, _bodyColl.bounds.max.y);
        Vector2 boxCastSize = new Vector2(_feetColl.bounds.size.x * MoveStats.HeadWidth, MoveStats.HeadDetectionRayLength);

        _headHit = Physics2D.BoxCast(boxCastOrigin, boxCastSize, 0f, Vector2.up, MoveStats.HeadDetectionRayLength, MoveStats.GroundLayer);
        _bumpedHead = _headHit.collider != null;


        #region Debug Visualization
    
        if (MoveStats.DebugShowHeadBumpBox)
        {
            float headWidth = MoveStats.HeadWidth;


            Color rayColor;
            rayColor = _bumpedHead ? Color.green : Color.red;


            Debug.DrawRay(new Vector2(boxCastOrigin.x - boxCastSize.x / 2 + headWidth, boxCastOrigin.y), Vector2.up * MoveStats.HeadDetectionRayLength, rayColor);
            Debug.DrawRay(new Vector2(boxCastOrigin.x + boxCastSize.x / 2 + headWidth, boxCastOrigin.y), Vector2.up * MoveStats.HeadDetectionRayLength, rayColor);
            Debug.DrawRay(new Vector2(boxCastOrigin.x - boxCastSize.x / 2 + headWidth, boxCastOrigin.y + MoveStats.HeadDetectionRayLength), Vector2.right * boxCastSize.x * headWidth, rayColor);
        }

        #endregion
    }
    #endregion

    public void SetIsStunned(bool newIsStunned)
    {
        this.IsStunned = newIsStunned;
        if (_isGrounded)
        {
            Move(800f, 800f, Vector2.zero);
        }
        else
        {
            Move(MoveStats.AirAcceleration + 400f, MoveStats.AirDeceleration + 400f, input.Movement);
        }
        Debug.Log(IsStunned);
    }

    public void TakeKnockback(Vector2 knockback, float knockbackForce, float stunedDuration)
    {
        IsStunned = true;
        Move(knockbackForce, knockbackForce, knockback);
        StartCoroutine(SetIsStunnedAfterDelay(stunedDuration, false));
    }

    private void CollisionChecks()
    {
        IsGrounded();
        BumpedHead();
    }
    
    #region Timers

    private void CountTimers()
    {
        _jumpBufferTimer -= Time.deltaTime;

        if (!_isGrounded)
        {
            _coyoteTimer -= Time.deltaTime;
        }
        else { _coyoteTimer = MoveStats.JumpCoyoteTime; }
    }
    
    private IEnumerator SetIsStunnedAfterDelay(float time, bool value)
    {
        yield return new WaitForSeconds(time);
        
        IsStunned = value;
    }
    
    #endregion
    
    private void DrawJumpArc(float moveSpeed, Color gizmoColor)
    {
        Vector2 startPosition = new Vector2(_feetColl.bounds.center.x, _feetColl.bounds.min.y);
        Vector2 previousPosition = startPosition;
        float speed = 0f;
        if (MoveStats.DrawRight)
        {
            speed = moveSpeed;
        }
        else { speed = -moveSpeed; }
        Vector2 velocity = new Vector2(speed, MoveStats.InitialJumpVelocity);

        Gizmos.color = gizmoColor;

        float timeStep = 2 * MoveStats.TimeTillJumpApex / MoveStats.ArcResolution; // time step for the simulation
        float totalTime = (2 * MoveStats.TimeTillJumpApex) + MoveStats.ApexHangTime; // total time of the arc including hang time

        for (int i = 0; i < MoveStats.VisualizationSteps; i++)
        {
            float simulationTime = i * timeStep;
            Vector2 displacement;
            Vector2 drawPoint;


            if (simulationTime < MoveStats.TimeTillJumpApex) // Ascending
            {
                displacement = velocity * simulationTime + 0.5f * new Vector2(0, MoveStats.Gravity) * simulationTime * simulationTime;
            }
            else if (simulationTime < MoveStats.TimeTillJumpApex + MoveStats.ApexHangTime) // Apex hang time
            {
                float apexTime = simulationTime - MoveStats.TimeTillJumpApex;
                displacement = velocity * MoveStats.TimeTillJumpApex + 0.5f * new Vector2(0, MoveStats.Gravity) * MoveStats.TimeTillJumpApex * MoveStats.TimeTillJumpApex;
                displacement += new Vector2(speed, 0) * apexTime; // No vertical movement during hang time
            }
            else // Descending
            {
                float descendTime = simulationTime - (MoveStats.TimeTillJumpApex + MoveStats.ApexHangTime);
                displacement = velocity * MoveStats.TimeTillJumpApex + 0.5f * new Vector2(0, MoveStats.Gravity) * MoveStats.TimeTillJumpApex * MoveStats.TimeTillJumpApex;
                displacement += new Vector2(speed, 0) * MoveStats.ApexHangTime; // Add horizontal movement during hang time
                displacement += new Vector2(speed, 0) * descendTime + 0.5f * new Vector2(0, MoveStats.Gravity) * descendTime * descendTime;
            }

            drawPoint = startPosition + displacement;

            if (MoveStats.StopOnCollision)
            {
                RaycastHit2D hit = Physics2D.Raycast(previousPosition, drawPoint - previousPosition, Vector2.Distance(previousPosition, drawPoint), MoveStats.GroundLayer);
                if (hit.collider != null)
                {
                    // If a hit is detected, stop drawing the arc at the hit point
                    Gizmos.DrawLine(previousPosition, hit.point);
                    break;
                }
            }

            Gizmos.DrawLine(previousPosition, drawPoint);
            previousPosition = drawPoint;
        }
    }
}