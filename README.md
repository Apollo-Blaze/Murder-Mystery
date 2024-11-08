# Murder Mystery Interactive Experience

Welcome to the Murder Mystery Interactive Experience! This project is designed to engage users in a thrilling murder mystery investigation. Users explore locations, interact with suspects, and ultimately solve the mystery by determining the killer.

## 🕵️ Project Overview

The goal of this project is to create an interactive murder mystery experience where users can:

- Move through different locations relevant to the mystery (e.g., dining room, kitchen, garden).
- Interact with multiple suspects, each with unique backgrounds, alibis, and motives.
- Use the provided clues to interrogate suspects and solve the case by identifying the killer.

This application is powered by a combination of frontend and backend technologies for seamless, engaging gameplay.

## 🎨 Key Features

- **Location Navigation**: Users can explore locations like the kitchen, study, and garden. Each location has clues that may aid in solving the mystery.
- **Clickable Suspects**: Each suspect, represented with their image and name, can be clicked on to investigate or interrogate.
- **Killer Selection**: Users have the option to make a final decision and choose who they think is the killer.

## 🛠️ Tools and Technologies Used

### Frontend:

- **React**: For building the user interface, creating components, and managing the interactive features.
- **Tailwind CSS**: To style components, implement a responsive layout, and create an immersive theme.
- **React Router**: For navigating through various "locations" (or scenes) within the mystery.
- **JavaScript & JSX**: Used to add functionality to components, manage user interactions, and render dynamic content.

### Backend:

- **Python (NLP Chatbot)**: A Python file uses Natural Language Processing to power a chatbot that responds to user interactions, providing clues or alibi details from suspects.
- **NLTK and Keras**: Used for natural language processing tasks, enabling the chatbot to understand and respond to user questions.
- **Flask**:Flask can manage the backend interactions and serve the chatbot responses.

## 🌐 How It Works

- **User Navigation**: Users start in the default location and can explore various rooms by navigating through the menu bar, styled with a dark purple, slightly transparent background.
- **Suspect Interaction**: Users can click on suspects to initiate an interaction, prompting the bot to share clues, alibis, or background information.
- **Chatbot Response**: The backend Python chatbot provides detailed responses based on user queries and the context of the investigation.
- **Choosing the Killer**: After investigating suspects and collecting information, users can make a one-time choice to select the killer.

## 📝 Credits

This project was built as a creative exploration of interactive storytelling, combining skills in frontend development, natural language processing, and UI/UX design.

![Demo of the Project](src/assets/murder.gif)
