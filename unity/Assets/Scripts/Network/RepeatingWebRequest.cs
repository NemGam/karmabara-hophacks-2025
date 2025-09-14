using System.Collections;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Events;

// 1. CREATE THIS CLASS
// This class matches the structure of the JSON data from the server.
// It MUST have [System.Serializable] to work with JsonUtility.
[System.Serializable]
public class TodoItem
{
    public int userId;
    public int level;
    public string title;
    public bool completed;
}

// -----------------------------------------------------------------

public class RepeatingWebRequest : MonoBehaviour
{
    [SerializeField] private UnityEvent onSuccessUnityEvents;
    
    private string uri = "https://f04b084a894a.ngrok-free.app/api/v1/users/1/profile";
    private bool alreadyUnlocked = false;
    void Start()
    {
        StartCoroutine(GetRequestLoop(uri));
    }

    public void CompleteUnlock()
    {
        alreadyUnlocked = true;
    }
    IEnumerator GetRequestLoop(string uri)
    {
        while (true) 
        {
            Debug.Log("Sending new GET request...");

            using (UnityWebRequest webRequest = UnityWebRequest.Get(uri))
            {
                yield return webRequest.SendWebRequest();

                switch (webRequest.result)
                {
                    case UnityWebRequest.Result.ConnectionError:
                    case UnityWebRequest.Result.DataProcessingError:
                        Debug.LogError($"Error: {webRequest.error}");
                        break;
                    case UnityWebRequest.Result.ProtocolError:
                        Debug.LogError($"HTTP Error: {webRequest.error}");
                        break;
                    
                    // 2. THIS IS WHERE YOU ADD YOUR PROCESSING CODE
                    case UnityWebRequest.Result.Success:
                        
                        if (alreadyUnlocked) break;
                        // Get the raw JSON text from the request
                        string jsonResponse = webRequest.downloadHandler.text;
                        Debug.Log($"Raw Response: {jsonResponse}");
        
                        try
                        {
                            // Convert the JSON string into your C# class object
                            TodoItem todo = JsonUtility.FromJson<TodoItem>(jsonResponse);

                            // 3. NOW YOU CAN USE THE DATA!
                            Debug.Log($"PROCESSING SUCCESSFUL!");
                            
                            if (todo.level == 3)
                                onSuccessUnityEvents?.Invoke();
                        }
                        catch (System.Exception e)
                        {
                            // This catches errors if the JSON is malformed
                            Debug.LogError($"JSON Parse Error: {e.Message}");
                        }
                        break;
                }
            }

            // uri = "https://jsonplaceholder.typicode.com/todos/1";
            // Wait 5 seconds before repeating the loop
            yield return new WaitForSeconds(5f);
        }
    }
}