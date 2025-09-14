using UnityEngine;

public class AttackBox : MonoBehaviour
{
    [SerializeField] private int damageToDeal = 13;
    [SerializeField] private bool applyKnockback = true;
    [SerializeField] private float knockbackForce = 100f;
    
    private void OnTriggerEnter2D(Collider2D other)
    {
        IDamageable damageableObject = other.GetComponentInParent<IDamageable>();
        Debug.Log($"Found this guy {other.name} it has a {damageableObject} damgeable Object");
        if (damageableObject != null)
        {
            if (applyKnockback)
            {
                Vector2 knockbackDir = (other.transform.position - transform.position);
                damageableObject.TakeDamage(damageToDeal, knockbackDir, knockbackForce);
            }
            else
            {
                damageableObject.TakeDamage(damageToDeal);
            }
        }
    }
}
