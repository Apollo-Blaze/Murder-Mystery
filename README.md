# Ravenswood Murder Mystery

Welcome to the **Ravenswood Murder Mystery Interactive Experience**! Immerse yourself in a captivating mystery investigation, where you explore different locations, interrogate suspects, and use clues to ultimately identify the killer. The game is designed to provide an interactive and dynamic gameplay experience, enhanced with new features such as a notepad, loading screens, and the ability to unlock clues from the chat history.

---

## 🕵️ Project Overview

The goal of this project is to create an immersive and interactive murder mystery experience where users can:

- **Navigate through different locations** (e.g., dining room, kitchen, garden) to gather clues.
- **Interact with suspects**, each with unique backgrounds, alibis, and motives.
- **Use clues from a dynamic notepad** to help solve the mystery and choose the killer.
- **Engage in conversations with suspects** powered by a Python-based NLP chatbot, which helps uncover hidden information and secrets.

### New Features:
- **Notepad**: A handy tool that keeps track of clues discovered throughout the game.
- **Loading Screens**: Smooth transitions with loading indicators, adding suspense and enhancing the experience.
- **Unlockable Clues**: As users progress, more clues become available in the chat history, allowing them to piece together the mystery.
- **Music**: Background music enhances the atmosphere, adding suspense during key moments.
- **Responsiveness**: The game is fully responsive, ensuring a seamless experience on both desktop and mobile devices.

---

## 🎨 Key Features

### 1. **Location Navigation**:
   - Explore various locations (e.g., dining room, kitchen, study, garden) each containing unique clues.
   - Use **React Router** to navigate smoothly between different rooms and areas in the mansion.

### 2. **Clickable Suspects**:
   - Click on suspects (e.g., Alice, Bob, Clara) to start an investigation.
   - Each suspect has a **unique alibi**, **motive**, and **background story**.
   - Investigate suspects through interactive chat with a bot powered by Python’s **NLTK and Keras**.

### 3. **Chatbot Interaction**:
   - Ask suspects questions and receive responses that reveal important clues.
   - Use the chatbot to unlock secrets, uncover hidden motivations, and piece together alibis.
   - All chat interactions are saved, allowing you to track your investigation progress.

### 4. **Notepad**:
   - Keep track of discovered clues with a **dynamic notepad**.
   - As users uncover new information, clues are added to the notepad, and the player can access them anytime during their investigation.
   - Clues are linked to specific locations or suspects, aiding in the process of identifying the killer.

### 5. **Unlockable Clues**:
   - Clues become unlocked progressively as the user interrogates suspects and explores locations.
   - Unlock hidden details about suspects and rooms to form connections and narrow down the potential killer.

### 6. **Choosing the Killer**:
   - After gathering enough clues, users can make a **one-time decision** on who they believe is the killer.
   - Make your choice and solve the mystery based on all the gathered evidence.

### 7. **Music & Sound**:
   - Background music plays during key moments to enhance the atmosphere.
   - Music dynamically adjusts to match the mood of the investigation, building suspense as you move through the mystery.

---

## 🛠️ Tools and Technologies Used

### Frontend:
- **React**: For building the user interface and managing the interactive features.
- **Tailwind CSS**: To style the components, implement a responsive layout, and create an immersive theme.
- **React Router**: For navigation between different locations and suspects.
- **JavaScript & JSX**: Used to handle dynamic content and manage user interactions.

### Backend:
- **Python**: A Python file uses **Natural Language Processing (NLP)** to power a chatbot that responds to user interactions, providing clues and alibi details.
- **Flask/Django**: Can be used to handle backend requests and serve the chatbot responses.

### New Features:
- **Notepad System**: A feature to dynamically display and save clues discovered by the user.
- **Loading States**: Animated loading screens that provide a seamless transition between scenes and maintain user engagement.
- **Responsiveness**: Fully responsive design using Tailwind CSS, ensuring compatibility across devices.

---

## 🌐 How It Works

1. **User Navigation**:
   - Users begin the game in a default location (e.g., the main hall).
   - They can use a menu bar styled with a **dark purple, slightly transparent background** to navigate to different rooms.
   - Each room contains important clues related to the murder.

2. **Suspect Interaction**:
   - Clicking on a suspect opens a chatbot interaction, allowing the player to ask questions about alibis, motives, and backgrounds.
   - The chatbot reveals new information that can be added to the **notepad**.

3. **Unlocking Clues**:
   - As the investigation progresses, users unlock new clues through interactions and exploration.
   - The chatbot responds based on the current context of the investigation, giving new details as the story evolves.

4. **Final Decision**:
   - After gathering enough evidence, the player can choose the killer.
   - The **chat history** and clues in the **notepad** help in making an informed decision.

5. **Background Music**:
   - Suspenseful and atmospheric background music sets the mood as players investigate.
   - Music changes dynamically based on the current location or event.

---

## 📝 Credits

This project was built as a creative exploration of interactive storytelling, combining **frontend development**, **natural language processing**, and **UI/UX design**. The goal was to create a fun, immersive experience that challenges players to solve a complex mystery.

---

### 🎥 Demo

Watch the interactive gameplay in action! 

![Demo of the Project](src/assets/murder.gif)

---

Feel free to explore, investigate, and most importantly—**solve the mystery**!
