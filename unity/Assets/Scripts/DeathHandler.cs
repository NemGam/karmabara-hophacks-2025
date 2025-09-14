using System;
using Unity.VisualScripting;
using UnityEngine;

public class DeathHandler : MonoBehaviour
{
    [SerializeField] private GameObject canvas;
    private PlayerMovement playerMovement;
    private PlayerInputHandler playerInputHandler;
    private Animator animator;

    private void Start()
    {
        playerMovement = gameObject.GetComponent<PlayerMovement>();
        playerInputHandler = gameObject.GetComponent<PlayerInputHandler>();
        animator = gameObject.GetComponentInChildren<Animator>();
        
        playerInputHandler.enabled = true;
        animator.SetBool("isDead", false);
        playerMovement.isDead = false;
    }

    public void Die()
    {
        canvas.SetActive(true);
        playerInputHandler.enabled = false;
        animator.SetBool("isDead", true);
        playerMovement.isDead = true;
    }
}
