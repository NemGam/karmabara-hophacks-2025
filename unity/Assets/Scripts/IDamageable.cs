using UnityEngine;

public interface IDamageable
{
    void TakeDamage(int damageAmount, Vector2 knockbackDir, float knockbackForce);
    void TakeDamage(int damageAmount);
}
