# 🕵️ Murder Mystery Interactive Experience

Welcome to the **Murder Mystery Interactive Experience**! This project immerses users in an interactive murder mystery investigation, where they must explore different locations, interrogate suspects, and solve the mystery by determining the killer.

## 🕵️ Project Overview

The **Murder Mystery Interactive Experience** allows users to:

- **Explore various locations** (e.g., dining room, kitchen, garden, study, basement, balcony).
- **Interact with suspects**, each having unique backgrounds, alibis, and clues that contribute to the mystery.
- **Solve the mystery** by gathering evidence and using deductive reasoning to choose the killer.

This interactive experience leverages both frontend and backend technologies to create an engaging, immersive game.

## 🎨 Key Features

- **Location Navigation**: Users can freely navigate between rooms, with each location containing important clues and details about the murder mystery. Locations change dynamically as users progress in the investigation.
  
- **Clickable Suspects**: Each suspect (Alice, Bob, and Clara) is represented with a detailed profile. Users can click on suspects to interrogate them and receive clues, alibis, and motives.

- **Dynamic Backgrounds**: The background of the website changes as users move between locations, providing a more immersive and interactive experience.
  
- **Killer Selection**: At any point, users can make a final choice about who they think the killer is. This choice will impact the ending of the story.

- **Interactive Chatbot**: The Python-powered NLP chatbot provides context-sensitive responses, guiding users through the investigation. The chatbot responds to questions related to the case and interacts with users based on their progress.

- **Responsive Layout**: The project is built with **Tailwind CSS** to ensure a responsive and adaptive layout that works seamlessly across devices, enhancing the user experience.

## 🛠️ Tools and Technologies Used

### Frontend:

- **React**: The frontend is built using React to create a dynamic user interface and manage the interactive components.
  
- **Tailwind CSS**: Utilized for styling, responsive layouts, and creating visually appealing UI elements.
  
- **React Router**: Used to manage navigation between different locations and scenes in the mystery, creating a seamless transition between pages.

- **JavaScript & JSX**: Implemented to handle user interactions, render dynamic content, and manage state transitions.
  
- **State Management**: React's built-in state management is used for tracking user progress, collected clues, and suspect interactions.

### Backend:

- **Python (NLP Chatbot)**: The backend is powered by a Python script using **Natural Language Processing (NLP)** to interpret and respond to user queries related to suspects, locations, and alibis.

- **NLTK**: Used for text processing and natural language understanding, allowing the chatbot to interpret user input and provide relevant clues.
  
- **Keras**: Implemented for deeper chatbot understanding and interaction modeling, making the system more robust and intelligent.

- **Flask**: Flask serves as the backend framework, handling API calls and interacting with the chatbot to provide responses to the frontend.

### Additional Features:

- **Interactive Buttons and Options**: Users can click on various buttons and options that trigger different chatbot intents, guiding them through the investigation.

- **One-time Killer Choice**: The user can make their final decision on the killer at a crucial moment in the game, which will influence the outcome.

## 🌐 How It Works

1. **Location Navigation**: When users start the game, they begin in the default location (such as the **dining room**) and can navigate through different locations like the **kitchen**, **garden**, **study**, **basement**, and **balcony**. Each room provides unique clues and interactions.

2. **Suspect Interaction**: Users can click on any of the suspects (Alice, Bob, or Clara) to open up a dialogue with the chatbot. The chatbot responds based on the selected suspect, offering information, alibis, and motives that may aid in solving the case.

3. **Chatbot Responses**: The Python backend, powered by **Flask** and the **NLP model** (using **NLTK** and **Keras**), processes user queries and responds with relevant information, including possible alibis, motives, and answers to direct questions about the case.

4. **Choosing the Killer**: After interacting with the suspects and collecting clues, the user has the opportunity to make a **one-time decision** on who they believe the killer is. Based on this selection, the narrative of the game can change, leading to different outcomes.

## 📝 Credits

This project is a creative exploration of interactive storytelling, blending **frontend web development**, **natural language processing**, and **game design**. It was built using:

- **Frontend Technologies**: React, Tailwind CSS, React Router, and JavaScript.
- **Backend Technologies**: Python (Flask, NLTK, Keras).
  
Special thanks to the open-source libraries and frameworks used to bring this project to life!

![Demo of the Project](src/assets/murder.gif)
