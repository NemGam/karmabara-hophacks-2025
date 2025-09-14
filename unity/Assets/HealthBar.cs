using UnityEngine;
using System.Collections.Generic;
using UnityEngine.UI;

public class HealthBar : MonoBehaviour
{
    [SerializeField] private Slider healthSlider;
    
    [SerializeField] private int maxHp = 100;
    [SerializeField] private PlayerHealth playerHealth;

    // Update is called once per frame
    void Update()
    {
        healthSlider.value = playerHealth.health;
        healthSlider.maxValue = maxHp;
    }
}
