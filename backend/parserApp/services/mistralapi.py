import os
from mistralai import Mistral

def get_chat_response(agent_id, user_message):
    # Get the API key using os.getenv with a fallback if the key isn't set
    api_key = os.getenv("MISTRAL_API_KEY")
    if not api_key:
        raise ValueError("MISTRAL_API_KEY environment variable is not set.")

    # Initialize the client
    client = Mistral(api_key=api_key)

    # Make the request and get the response
    chat_response = client.agents.complete(
        agent_id=agent_id,
        messages=[
            {
                "role": "user",
                "content": user_message,
            },
        ],
        response_format = {
            "type": "json_object",
        }
    )

    return chat_response.choices[0].message.content

