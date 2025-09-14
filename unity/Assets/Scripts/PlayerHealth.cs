using System;
using Unity.VisualScripting;
using UnityEngine;
using System.Collections;
public class PlayerHealth : MonoBehaviour, IDamageable
{
    private PlayerMovement playerMovement;
    private DeathHandler deathHandler;
    private Animator animator;
    private Rigidbody2D rb2d;
    
    public int health = 100;

    private void Start()
    {
        playerMovement = GetComponent<PlayerMovement>();
        deathHandler = GetComponent<DeathHandler>();
        rb2d = GetComponent<Rigidbody2D>();
        animator = GetComponentInChildren<Animator>();
    }

    public void TakeDamage(int damageAmount)
    {
        health -= damageAmount;
        Debug.Log($"{gameObject.name} took {damageAmount} damage! Health is now {health}.");
     
        animator.SetBool("takeDamage", true);
        
        if (health <= 0)
        {
            deathHandler.Die();
        }
    }
    
    public void TakeDamage(int damageAmount, Vector2 knockbackDir, float knockbackForce)
    {
        playerMovement.enabled = false;
        rb2d.linearVelocity = Vector2.zero;
        rb2d.angularVelocity = 0f;
        rb2d.AddForce(knockbackDir * knockbackForce, ForceMode2D.Impulse);
        StartCoroutine(ReactivatePlayerMovementAfterDelay());
        Debug.Log($"{playerMovement?.gameObject.name} took {damageAmount} damage! Health is now knockedback.");
        TakeDamage(damageAmount);
    }
    
    private IEnumerator ReactivatePlayerMovementAfterDelay()
    {
        yield return new WaitForSeconds(0.3f);
        
        playerMovement.enabled = true;
    }
}