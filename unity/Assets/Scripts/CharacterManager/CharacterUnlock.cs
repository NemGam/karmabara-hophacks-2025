using UnityEngine;
using UnityEngine.TextCore.Text;
using UnityEngine.UI;

public class CharacterUnlock : MonoBehaviour
{
    [Header("References")]
    [SerializeField] private Transform character;
    [SerializeField] private SpriteRenderer spriteRenderer;
    [SerializeField] private Animator animator;
    [SerializeField] private Image headShot;

    [Header("Character Unlock")]
    [SerializeField] private RuntimeAnimatorController newCharacterController;
    [SerializeField] private Sprite newCharacterSprite;
    [SerializeField] private Sprite newHeadShotSprite;
    
    public void UnlockCharacter()
    {
        Debug.LogWarning("UnlockCharacter called");
        float ls = character.localScale.x;
        character.localScale = new Vector3(-ls, character.localScale.y, character.localScale.z);
        
        spriteRenderer.sprite = newCharacterSprite;
        animator.runtimeAnimatorController = newCharacterController;
        headShot.sprite = newHeadShotSprite;
    }
}
